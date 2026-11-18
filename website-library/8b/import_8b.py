#!/usr/bin/env python3
"""Ingest MIT-licensed 8B source files; never execute upstream code or fetch demo media."""
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
import argparse
import hashlib
import json
import os
import re
import subprocess
import time
import urllib.request

ROOT = Path(__file__).resolve().parent
CATALOG = "https://8b.com/templates/index.json"
EXPECTED = """cut-short cannonball elbowroom linnea-house misprint dillys two-buckets footnote highkick small-talk inset outre vernis ostro brume affina farlight fettle resin-cabinet sixpenny monella keylight halide splosh spare-hour melty haldane furrow tegel pinfall refactor grist little-drum quarter-moon kickstand shortrun quarter-turn glaze bankermark quire saylo squiggle loam ohmstead chewsday snort hush kinfold twirl pierhead zenith merge strade kilnfield kitfell kelvin-house wrenfield aubade mallow-house glim solsta hale oriel pipit quiet-systems binario-tre nocturna murmur halyard pervenche spotted inertia overtone okapi senti squarefoot arco gabble spinway undertone scrawl kurvo hwaro hundred fellgate ferrule hushkey linea sillage onda softlife sill ondo dotdrum midblock arcline reflow tallyhouse evenkeel ombrelle loud-kettle isoline hopla burrow ashlar moth-marigold""".split()
REQUIRED = ("LICENSE", "CREDITS.md", "README.md", "AGENTS.md", "index.html")
RASTER = re.compile(rb"data\s*:\s*(?:image/(?!svg\+xml)[^;,\s]+|font/[^;,\s]+|application/(?:font[^;,\s]*|octet-stream)|video/[^;,\s]+|audio/[^;,\s]+)", re.I)
MIT_MARKERS = (b"MIT License", b"Permission is hereby granted, free of charge", b"THE SOFTWARE IS PROVIDED")
MAX_BYTES = 12 * 1024 * 1024

def fetch(url):
    for attempt in range(3):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "ATREZZO-8B-source-audit/1.0"})
            with urllib.request.urlopen(req, timeout=35) as response:
                data = response.read(MAX_BYTES + 1)
            if len(data) > MAX_BYTES:
                raise ValueError("file size limit exceeded")
            return data
        except Exception:
            if attempt == 2:
                raise
            time.sleep(2 ** attempt)

def blob_sha(data):
    return hashlib.sha1(b"blob " + str(len(data)).encode() + b"\0" + data).hexdigest()

def mit_ok(data):
    return all(marker in data for marker in MIT_MARKERS) and re.search(rb"Copyright[^\n]*8B", data, re.I)

def get_commit(repo):
    out = subprocess.check_output(["git", "ls-remote", "--exit-code", "https://github.com/" + repo + ".git", "refs/heads/main"], timeout=45, env={**os.environ, "GIT_TERMINAL_PROMPT": "0"}, text=True)
    sha = out.strip().split()[0]
    if not re.fullmatch("[0-9a-f]{40}", sha):
        raise ValueError("invalid upstream commit")
    return sha

def write_exact(path, data):
    if path.exists():
        if path.read_bytes() != data:
            raise ValueError("will not overwrite differing file: " + str(path))
        return
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(data)

def ingest(entry):
    slug = entry["slug"]
    repo = entry.get("github", {}).get("repo", "")
    row = {"slug": slug, "name": entry.get("name"), "categories": entry.get("categories", []),
           "upstream": "https://github.com/" + repo, "demo": entry.get("links", {}).get("demo"),
           "design_md_url": entry.get("links", {}).get("design_md"), "license": "MIT",
           "client_ready": False, "visual_qa": "pending"}
    try:
        if not re.fullmatch(r"8bsite/[a-z0-9-]+-template", repo):
            raise ValueError("not an approved 8bsite template repo")
        if entry.get("license", {}).get("code") != "MIT":
            raise ValueError("catalog does not declare MIT")
        directory = ROOT / "templates" / slug
        provenance = directory / "ATREZZO-PROVENANCE.json"
        previous = json.loads(provenance.read_text()) if provenance.exists() else None
        if previous and previous.get("upstream") != row["upstream"]:
            raise ValueError("existing provenance mismatch")
        sha = previous["commit"] if previous else get_commit(repo)
        if not re.fullmatch("[0-9a-f]{40}", sha):
            raise ValueError("invalid pinned commit")
        row["commit"] = sha
        prefix = f"https://raw.githubusercontent.com/{repo}/{sha}/"
        files = {}
        license_bytes = fetch(prefix + "LICENSE")
        if not mit_ok(license_bytes):
            raise ValueError("upstream MIT notice not confirmed")
        files["LICENSE"] = license_bytes
        for name in REQUIRED[1:]:
            data = fetch(prefix + name)
            data.decode("utf-8")
            if not data.strip():
                raise ValueError("empty file: " + name)
            files[name] = data
        if not re.search(rb"(?i)(license|licence)", files["CREDITS.md"]):
            raise ValueError("credits need manual review")
        if RASTER.search(files["index.html"]):
            raise ValueError("embedded binary media in CSS version needs rights review")
        if b"<!doctype html" not in files["index.html"].lower():
            raise ValueError("invalid HTML entry")
        excluded = ["previews/ (binary media and screenshots not copied)"]
        try:
            gsap = fetch(prefix + "index.gsap.html")
            gsap.decode("utf-8")
            if RASTER.search(gsap):
                excluded.append("index.gsap.html: embedded binary media; manual rights review")
            elif b"<!doctype html" not in gsap.lower():
                excluded.append("index.gsap.html: invalid HTML")
            else:
                files["index.gsap.html"] = gsap
        except Exception as exc:
            excluded.append("index.gsap.html: not retrieved: " + str(exc))
        # Preflight any collisions before writing source bytes.
        for name, data in files.items():
            p = directory / name
            if p.exists() and p.read_bytes() != data:
                raise ValueError("existing file differs: " + name)
        for name, data in files.items():
            write_exact(directory / name, data)
        row.update({"status": "source-imported-not-qa-approved", "files": sorted(files),
                    "blob_sha1": {name: blob_sha(data) for name, data in files.items()},
                    "sha256": {name: hashlib.sha256(data).hexdigest() for name, data in files.items()},
                    "excluded": excluded, "third_party": "Remote demo assets remain third-party. No external media downloaded. Replace photos, brand, example data and contacts before client use; check CREDITS and separate GSAP/Lenis/font terms."})
        # Preserve the already imported Onda provenance file; manifest records fresh verification.
        if not provenance.exists():
            write_exact(provenance, (json.dumps(row, ensure_ascii=False, indent=2) + "\n").encode())
    except Exception as exc:
        row.update({"status": "blocked", "reason": str(exc)})
    return row

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--workers", type=int, default=8)
    args = parser.parse_args()
    catalog = json.loads(fetch(CATALOG))
    if catalog.get("license") != "MIT" or catalog.get("count") != 106:
        raise SystemExit("Catalog changed: inspect before importing")
    entries = catalog.get("templates", [])
    by_slug = {e.get("slug"): e for e in entries if isinstance(e, dict) and e.get("slug") in EXPECTED}
    if len(EXPECTED) != 106 or len(set(EXPECTED)) != 106 or set(by_slug) != set(EXPECTED):
        raise SystemExit("Catalog allowlist mismatch")
    with ThreadPoolExecutor(max_workers=max(1, min(args.workers, 12))) as pool:
        rows = list(pool.map(ingest, (by_slug[slug] for slug in EXPECTED)))
    imported = [row for row in rows if row["status"] == "source-imported-not-qa-approved"]
    blocked = [row for row in rows if row["status"] == "blocked"]
    manifest = {"catalog": CATALOG, "catalog_updated": catalog.get("updated"),
                "expected": 106, "imported_count": len(imported), "blocked_count": len(blocked),
                "gsap_count": sum("index.gsap.html" in row["files"] for row in imported),
                "policy": "External source collection, not an approved ATREZZO component or production-ready client website.",
                "templates": rows}
    (ROOT / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    lines = ["# 8B — External website source inventory", "", f"Imported: {len(imported)} / 106. Blocked: {len(blocked)}. GSAP variants: {manifest['gsap_count']}.", "",
             "Original code and notices preserved. No preview binaries copied. Visual, accessibility and client QA pending.", "",
             "| Name | Source | Status | Local HTML |", "|---|---|---|---|"]
    for row in rows:
        label = (row.get("name") or row["slug"]).replace("|", "\\|")
        local = f"[HTML](templates/{row['slug']}/index.html)" if row["status"] != "blocked" else "—"
        lines.append(f"| {label} | [8B]({row['upstream']}) | {row['status']} | {local} |")
    (ROOT / "INDEX.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Imported {len(imported)} / 106, blocked {len(blocked)}; GSAP {manifest['gsap_count']}")
    # A partial result is explicit; the workflow preserves it for review rather than pretending full success.

if __name__ == "__main__":
    main()
