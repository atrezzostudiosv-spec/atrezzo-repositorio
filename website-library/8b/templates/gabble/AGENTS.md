# AGENTS.md: podcast website template

One-page website for a podcast network or audio collective with shows, authors, a studio and live events. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/podcast-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/podcast-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/podcast-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/podcast-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:nav`: `.nav-menu` `.nav-close` `.nav-links` `.nav-panel__foot`
  - `scene-script:episode`: `.ep-script`
  - `scene-script:shows`: `.sh-stage` `.sh-track` `.sh-cell` `.sh-tile`
  - `scene-script:authors`: `.au-grid` `.au-face`
  - `scene-script:submit`: `.sb-path` `.sb-line` `.sb-rail` `.sb-marker` `.sb-step` `.sb-fill` `.sb-text`
  - `scene-script:letters`: `.lt-grid` `.lt-window` `.lt-thread`
- `style="--len:N"` = characters in that display line, spaces included: `gabble` is 6.
- The footer wordmark is sized by style="--len:6", the number of characters of "gabble": update it when the name changes length.
- The submit scene has three fixed anchor points on the loop line (x 200, 600 and 1000 in its SVG), one per step: keep three steps or edit the scene and the line. Each contact band carries its own slide direction in inline variables (--contact-li-ct-band-translate-from and --contact-span-m-text-7-translate-from, minus for the left, plus for the right): copy them with a band you add. The letters scene picks each message's side from the lt-msg--out class (the first message is shown from the start).
- The orange field, the waveform bars (inline --ep-h per bar), the white loops and the colour trails are CSS and SVG: recolour them through the variables in :root, not by editing the shapes.
- The search fields are plain GET forms to /search with the name q; the nav links, the overlay and the footer rely on the section ids (plus, episode, shows, authors, studio, submit, live, letters, faq, contact).
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #ffffff (page ground, listener chat bubbles, live date rows, two studio fact tiles, FAQ rows, text on the ink sections), `--color-2` #1e1c22 (text, the shows, live and footer grounds, dark buttons, favicon letter), `--color-3` #ff6b1f (the opening field, main buttons, show replies in the chat, the author count circle, the submission marker, the footer loop), `--color-4` #f9e38c (studio ground, yellow show and contact tiles, live date blocks, the first step's fill), `--color-5` #cdbbf8 (letters ground, player card, lavender tiles, light text on the ink sections), `--color-6` #f1f0f3 (FAQ ground, grey pills such as search and Log in, the FAQ icon discs and the menu button), `--color-7` #646069 (secondary text, captions, search placeholder), `--color-8` #a98af2 (submission loop line, step ring borders and phone rail, the voice note waveform marks), `--color-9` #b8860a (only in leftover rules for a first screen that is no longer in the page, nothing visible uses it), `--color-10` #6a45d6 (show names on the author cards); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, form, email, phone, map, social): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Search shows fields in the top bar and the menu overlay: now a GET form to /search with the query in q; owner's target: your own search page, or remove the fields if the site has no search.
- Log in links in the top bar and the menu overlay: now /login; owner's target: your listener or author sign-in page, or remove them.
- Join buttons in the top bar and the menu overlay: now #submit; owner's target: your sign-up page, or keep #submit to send people to the submission steps.
- Try Plus free for a month button in the opening: now #faq; owner's target: your paid membership sign-up page.
- Listen to episode 41 button in the episode section: now #shows; owner's target: the page or player of the featured episode.
- Browse all shows button in the shows section: now /shows; owner's target: your full show list.
- Book a session button in the studio section: now #contact; owner's target: your studio booking page, or keep #contact once the contact details are real.
- Send a pilot button in the submit section: now mailto:pitch@gabble.example; owner's target: your submission form or the inbox that takes pilots.
- Tickets links on the four live dates: now /live/lisbon-november, /live/porto-november, /live/madrid-december, /live/lisbon-december; owner's target: the ticket page of each event.
- Send a voice note button in the letters section: now /voice-note; owner's target: your voice note form or the app page that takes recordings.
- Visit band in the contact section: now a Google Maps search for Lisbon; owner's target: a map link to your real address.
- Privacy link in the footer: now /privacy; owner's target: your privacy policy.
- The form in `#nav` (fields `q`) sends nothing. Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it.
- The form in `#nav` (fields `q`) sends nothing. Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it.
- The name Gabble (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (24, Unsplash: navigation 3, opening 3, episode 1, shows 8, authors 6, studio 2, live 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Network size: "+1.2k authors" (nav), "1,200 authors" (authors heading, meta description and og:description), "+1,194 authors" (count card), "Eight of 640" shows (shows).
- Plus prices and terms: "Four euros a month" (opening), "Four euros a month or forty a year", first month free, cancel in two taps (faq), 18, 11 and 9 episodes of the three Plus series (opening).
- Author payments: "70% of Plus income" in the launch step (submit) and "Seventy percent of Plus income goes to authors, split by minutes listened, paid every month", free shows share sponsor income, "one short sponsor message per episode at most" (faq).
- Acceptance: "about one show in five" and "two editors listen within ten days and write back either way" (submit).
- Studio: two soundproofed rooms, a booth for two and a table for six, eight free hours a month per author, a producer on call, four microphones and a mixer, open Monday to Saturday 9:00 to 21:00, the address "Example Street 1, Lisbon. Ring twice." (studio, contact).
- Live dates: four nights, 14 Nov and 19 Dec in Lisbon at The Lantern Room, 29 Nov in Porto at Garage Nine, 6 Dec in Madrid at Sala Norte, with the show names on each, the recording going out the following week (live).
- The featured episode: Small Bridges, Ep. 41, 38 min, the guest Mira Okafor, an acoustic engineer, her claims (a low B flat in a north-east wind above thirty kilometres an hour, four dampers, a perfect fifth lower) and the timestamps (episode, transcript).
- Show and host data: eight shows with hosts and episode counts (7 to 52 episodes) and topic badges (shows); six author names with their shows and bios such as "Bakes from midnight to six" or "Botanist with 140 plants" (authors); three Plus hosts with roles (opening).
- Voice notes: up to a minute long, answered on air every Friday with name and city, and the three sample questions with listeners' names, cities and lengths (letters).
- Apps and feeds: "Our own app on phones and the web", every podcast app that reads a feed, a private feed for Plus shows (faq); also the claim that Plus has no ads (opening).
- Contact: an answer "within two working days", pitch, hello and phone placeholders (pitch@gabble.example, hello@gabble.example, +351 21 000 0000) and the tagline "Podcasts by curious people" (contact, submit, footer).
- Photos of real-looking people named on the page (the six authors and the guest): their alt texts name them, so replace names and photos together.

## Known limits
- Without JavaScript the menu button cannot open the overlay at any width, so the top bar has no section links (on phones it shows only the logo, the Join button and that menu button); the search fields send people to /search, which does not exist yet.
- The page has no audio player: the waveform and the timestamps are decoration, and "Listen to episode 41" only jumps to the shows section until you link it to a real player or episode page.
- The shows row and the letters chat are held in place with CSS sticky while you scroll; on short screens the shows stage can be taller than the viewport, so test it on a laptop height. The episode player stays stuck at the top on phones while the transcript scrolls under it.
- Without scroll-driven animation support (Firefox today), and with reduced motion on, the page shows its finished layout with ordinary scrolling: the shows as a four by two grid (two columns on phones), the full chat thread, the transcript in full ink, every step filled and the opening loop already drawn. The top bar still hides on scroll down in both cases.
- The author grid is built for six cards plus the count card (data-8b-fixed="7"): the name and bio fades are CSS :nth-of-type rules for the first six, so an added author shows without the fade unless those rules get a new entry.
- Several texts sit on the loud orange field and the lavender tiles in dark ink; if you change those colours keep the contrast of dark text on them.
- The stylesheet still carries about ninety lines of unused rules for a first screen that is no longer in the page (selectors starting #opening .op-first, .op-card, .op-new, .op-media and similar); they do nothing and can be deleted.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Gabble left only in class names.
