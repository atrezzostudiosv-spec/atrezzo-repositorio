# AGENTS.md: print studio website template

One-page website for a print studio or small press, with a price calculator, shop and workshop dates. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/print-studio-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/print-studio-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/print-studio-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/print-studio-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits.
- Selectors the scripts use:
  - `section-script:nav`: `.nav__toggle` `.nav__close`
  - `section-script:quote`: `.quote__form` `.quote__ticket` `data-out` `data-quote-mail` `.quote__lines` `data-setup` `data-passes` `data-rate` `data-factor` `data-label` `data-days-small` `data-days-mid` `data-days-large`
  - `section-script:contact`: `.contact__form` `data-sent`
  - `scene-script:press-pass`: `.press__art` `.lane` `.press__band` `.press__panel` `.drum`
  - `scene-script:process-run`: `.process__window` `.process__track`
  - `scene-script:workshops-index`: `.workshops__lane` `.workshops__carriage` `.session`
  - `scene-script:contact-landing`: `.contact__lanes` `.lane` `.drum`
- `style="--len:N"` = characters in that display line, spaces included: `Two inks,` is 9, `ten thousand dots.` is 18, `dotdrum` is 7.
- The drums, lanes, halftone trails, the colour chart and the sample sheet are HTML and CSS (gradients and masks), not images: recolour them through the tokens.
- The quote calculator's rates are data attributes on the form; change them there, and the currency in section-script:quote.
- The scene scripts measure these classes, so keep them: in the opening .press__art .lane, .drum, .press__band and .press__panel (as many lanes as bands); in the process .process__window and .process__track; in the workshops .workshops__lane, .workshops__carriage and .session (the script sets data-waiting on each); at the contact foot .contact__lanes, .lane and .drum.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #11138d (ultramarine: the blue bands and the text on paper white), `--color-2` #ed008e (fluorescent pink: drums, halftone trails, buttons, the studio and questions bands), `--color-3` #f3f3fa (paper white bands, and the text on blue), `--color-4` #07061f (near-black: text on pink, button labels, secondary text on paper white); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, email, form, phone, social): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Order links under each of the eight editions: now mailto:shop@dotdrum.example with the edition in the subject; owner's target: your shop or checkout URL for each edition (or keep the email with your real address).
- Book a place links under each of the five workshops: now mailto:hello@dotdrum.example with the workshop in the subject; owner's target: your booking or ticketing URL for each session (or keep the email with your real address).
- The Send this ticket button in the quote section: now a mailto: address (the script adds the job lines); owner's target: your real email address, or your own quote or order form.
- The form in `#quote` (fields `format`, `copies`, `inks`, `paper`, `sides`) is a live price calculator, not a contact form: `section-script:quote` updates the job ticket and builds the Send this ticket mailto link. Keep it; the rates live in its data attributes.
- The form in `#contact` (fields `name`, `email`, `message`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Dotdrum (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (13, Unsplash: opening 1, studio 3, editions 8, workshops 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Edition prices and formats: Soft Machines £9 (zine, 32 pp, A5), Pink Weather £14 (12 postcards), Quiet Pages £6 (booklet, 24 pp, A6), Overprint Almanac £22 (book, 96 pp, A5), Fold Here £5 (zine, 16 pp, A6), Night Buses £30 (3 × A3 posters), Back Issues £12 (magazine, 64 pp, A4), Spine Index £45 (box of ten zines); "when a run sells out, it stays sold out" (editions).
- Workshop dates, durations, prices and places: Thu 15 Oct (3 hours, £65, 2 places left), Sat 24 Oct (6 hours, £120, 4 left), Wed 4 Nov (3 hours, £70, 6 left), Sat 14 Nov (4 hours, £85, 3 left), Thu 26 Nov (3 hours, £70, 5 left), with 2026 dates in the datetime attributes; "evening sessions for six people at a time" (workshops; note the Saturday sessions are daytime).
- Print rates and the claim "These are our real rates; the quote we send back will match" (quote): per-copy rates A6 £0.09, A5 £0.15, A4 £0.24, A3 £0.40, factors for two inks (×1.7), paper (×1.15, ×1.6) and double-sided (×1.85), setup £18 per ink, the default ticket £118 / £0.59 a copy, turnaround 2, 3 or 5 working days by run size; prices in GBP (the form's data attributes and section-script:quote).
- Run sizes: 30 to 3,000 copies (opening facts, the quote copies field, FAQ "smallest and largest runs") and "runs from 30 copies, workshops every month" (meta description).
- Turnaround and timings: ready "the next working day" (process, Dry, trim, fold), "two working days after you approve the proof", large runs up to five (FAQ), masters "30 seconds each", "ten minutes to dry" (process) and "dries for a minute" (opening note), "two hundred A3 posters take about forty minutes" (process).
- Machines and specs: up to 130 sheets a minute, A3 at most, a guillotine cutting a 500-sheet stack within half a millimetre, saddle-stitching up to 64 pages, a drying rack with eighty shelves (studio, process); papers Recycled 90 g, Uncoated 120 g, Card 300 g (quote) and uncoated 70 to 300 g (FAQ).
- Materials and service: soy-based inks, recycled stock as standard, packed flat in recycled card, every overlap proofed before the run, the ink names Medium Blue and Fluorescent Pink (opening, inks, process, FAQ).
- People and history: Ines and Tom who run the studio from a former bicycle workshop, "one secondhand duplicator", "six years on" (opening, studio).
- Clients and jobs in the press log: Low Tide Records, Hollow Oak Poetry Night, Gallery Seven, Northern Soup, The Cycling Kitchen, Small Hours Collective, with copies and inks (runs); "artists, bands, galleries" (opening); "the largest we have printed is 3,000 flyers" and the offset printer referral (FAQ).
- Place, hours and delivery: the address Unit 4, Inkwell Yard Works, Sheffield S0 0AA and the street "off Inkwell Yard" (studio, contact, footer), Sheffield (opening facts, footer), "collect in Sheffield or post anywhere in the UK" (opening), open Tuesday to Friday 10-6, Saturday 11-4 (contact).
- Service: "We answer within a working day" (the contact form's data-sent message).
- Copyright "© 2026 Dotdrum Press · Printed in two inks in Sheffield" (footer).

## Known limits
- Without JavaScript the phone menu button cannot open the overlay and the job ticket shows its default job only; the links stay reachable in the hero and the footer.
- Without scroll-driven animation support (Firefox today) the page shows its finished layout: the drums sit in their print, the plates in register, the process stations as a plain list beside the printed sheet; only the opening load-in and the drums' gentle bob still play. With reduced motion on, nothing moves.
- The editions rack and the contact foot move exactly four lanes each through CSS :nth-of-type rules; a fifth lane would stay still unless those rules get a fifth entry.
- On screens shorter than 640 px the first screen grows past the viewport and the print starts later; the process stage needs about 600 px of height on phones, below that the sheet shrinks.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Dotdrum left only in class names.
