# AGENTS.md: tailor website template

One-page website for a bespoke tailor or made-to-order clothier that takes fittings in a workroom and on tour. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/tailor-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/tailor-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/tailor-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/tailor-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:nav`: `.nv-menu` `.nv-overlay` `.nv-close`
  - `section-script:contact`: `.co-form` `.co-status` `.co-done`
  - `scene-script:fittings-track`: `.ft-stage` `.ft-view` `.ft-track` `.ft-progress` `.ft-step` `.ft-photo` `.ft-dash`
  - `scene-script:cut-ease`: `.ct-word`
  - `scene-script:visits-stamp`: `.vs-list` `.vs-roller` `.vs-item`
  - `scene-script:archive-bands`: `.m-pill`
- `style="--len:N"` = characters in that display line, spaces included: `Soft shoulder` is 13, `High armhole` is 12, `Long roll` is 9, `Clean back` is 10, `Come in` is 7, `Haldane` is 7.
- The text ring on the gold stamp is an SVG textPath with a fixed textLength="268" and the brand name in its text; when you rename, keep the ring about the same length or change textLength to fit.
- Each trait word in the house cut and the headline "Come in" carry an inline style="--len:N" that sizes them; set N to the number of characters of your new text. The footer wordmark carries --len:7 the same way.
- The sparkles, the stamp and the hairlines are CSS and SVG, not images: recolour them through the colour variables in :root (gold is --color-4, the deep green --color-3).
- The fittings travel and the share of it each photo and dash takes are measured by the inline motion kit, and the progress sparkles are made one per step, so adding or removing a step needs no other change. The cloth row is marked data-8b-fixed="6": each swatch carries its own scattered start (offset, tilt and size) as --cloth-div-cl-sticker-* variables in its inline style, and the CSS times the six by :nth-of-type.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #121413 (page ground, header bar fill once you scroll, text on the gold stamp, hover fill of the opening button), `--color-2` #f3f2ee (main text, hairline dashes under the steps, outlines of buttons, the dash in the contact headline), `--color-3` #1d5a49 (ground of the full-height opening panel, hover fill of most buttons, the green glow under portrait stickers), `--color-4` #e2a73c (gold: focus outlines, step labels, trunk show outlines and sparkles, the stamp, lit progress sparkles, ring around a sticker on hover), `--color-5` #c2c8c4 (secondary text: notes, cloth mills, form labels, FAQ answers), `--color-6` #3b403d (hairlines, price row dividers, the unfilled progress line and its unlit sparkles), `--color-7` #1c201e (ground behind photos while they load, and the background of the form's select list); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, email, form, social): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Book a fitting online button in the top bar and the menu: now #contact (the request form at the bottom); owner's target: your booking page URL (Calendly, Cal.com) if fittings are booked online, or keep it on the form.
- Book your first fitting button in the opening: now #contact; owner's target: your booking page URL, or keep it on the form.
- Order cuttings by post button in the cloth section: now #contact; owner's target: your cuttings request page or form.
- Book a slot links in the trunk shows list (five cities): now #contact; owner's target: a booking link for each city and date, or the form.
- Privacy and Terms links in the footer: now #privacy and #terms, which do not exist on the page, so the links go nowhere; owner's target: your privacy and terms pages.
- The form in `#contact` (fields `name`, `email`, `where`, `phone`, `message`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Haldane (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (18, Unsplash: opening 2, cloth 6, fittings 4, cutters 3, cut 1, archive 1, contact 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Process promises: "Twelve weeks from the first measure to collection", "Around eighty hours of hand work in every coat", "Your pattern kept on file for as long as you wear us" (opening); "Twenty-six measures" (fittings).
- Cloth library: "Four hundred cloths", mills in the Scottish Borders, Huddersfield and Biella, and the six swatches with their mills and weights, for example "Yorkshire · 13 oz" (cloth).
- Fitting schedule: twelve weeks, three fittings three to four weeks apart, a second suit from the same pattern in around eight weeks (fittings, FAQ).
- People: Isla Rennie (head cutter, "twenty-two years at the board"), Morag Duthie (coatmaker), Anh Tran (finisher); the portraits are stock photos (cutters).
- Prices and terms: Two-piece suit from £3,400, Three-piece from £3,950, Sports coat from £2,450, Overcoat from £3,800, Trousers from £980, with weeks and fittings for each; cloth from house bunches, a year of free alterations and a half deposit (commissions).
- Trunk shows: London (Mayfair, 4 to 6 November), Manchester (Spinningfields, 13 to 14 November), Copenhagen (Indre By, 21 to 22 November), New York (Upper East Side, 2 to 5 December), Glasgow (Merchant City, 15 to 16 January), "twice a year" (visits, FAQ).
- Archive and aftercare: reorders with a single fitting, free alterations for the first year, repairs and repressing at cost, for life (archive).
- Claims in the FAQ: "About a third of the cutting book" is for women, patterns drawn from nothing rather than adjusted from a block, a new pattern always cut instead of tracing an owned suit (FAQ).
- Hours and place: Tuesday to Saturday, 10:00 to 18:00, evenings by appointment; "1 Example Street, Edinburgh EH1 0ZZ" (contact, footer, menu).
- Service: "A cutter will reply within one working day with fitting times" (the form's thank-you line) and "A first fitting takes an hour" (contact).
- Footer: "© 2026 Haldane Bespoke Tailors Ltd"; put in your legal name.

## Known limits
- Without JavaScript the Menu button cannot open the overlay, and under 860 px the top links are hidden, so only the footer links stay reachable.
- The Privacy and Terms links in the footer point at anchors that do not exist yet.
- The request form sends nothing: it shows the thank-you line after a check, so connect it to Formspree, Netlify Forms or your own endpoint.
- The top bar hides while you scroll down and returns on scroll up, also with reduced motion on and in Firefox.
- The cloth and fittings sections hold the screen while you scroll (CSS sticky): about 1.1 screens for the cloth and about 3.3 to 4.2 screens for the sideways fittings track (measured at 390 to 1920 px wide), which feels long on laptop screens.
- A seventh swatch gets no scattered start of its own: without its own --cloth-div-cl-sticker-* values it starts from the first swatch's offset, tilt and size.
- Section links jump straight to the section with no offset for the 72 px header, so after a jump upward the bar can cover the top of the section.
- Without CSS scroll-driven animation support (Firefox today) or with reduced motion on, the entrance and scroll animations and the smooth wheel are off: nothing is held, the swatches sit in one row as pills, the steps stack with their photos, the stamp rests at the foot of the trunk show list with every row gold, and the headline photo pills show open from the start.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Haldane left only in class names.
