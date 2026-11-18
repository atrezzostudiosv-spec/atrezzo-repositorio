# AGENTS.md: perfumery website template

One-page website for an independent perfumery that sells by appointment and by post. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/perfumery-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/perfumery-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/perfumery-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/perfumery-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:nav`: `.nav-toggle` `.nav-close`
  - `section-script:visit`: `.vs-form` `.vs-status` `data-sent` `data-error`
  - `scene-script:opening`: `.op-strips` `.op-strip`
  - `scene-script:origins`: `.or-stage` `.or-tile--c` `.or-photo` `.or-tile`
  - `scene-script:cabinet`: `.cb-title` `.cb-word` `.cb-deck` `.cb-card`
- `style="--len:N"` = characters in that display line, spaces included: `Noses` is 5.
- The origins grid has six tiles placed by their classes (or-tile--a to or-tile--f, with one layout for desktop and one for phone), and the CSS scene targets each class: or-tile--c (the rose, in the middle column) starts full screen and the other five fly in at their own times. Add or remove tiles only together with their grid placement and their scene rules.
- The cabinet deals four cards: each card carries its starting tilt inline (--cabinet-li-cb-card-rotate-from), and the CSS spaces the deal for four over a scroll track 330vh tall; a fifth card needs its own tilt, a new spacing and a longer track.
- The six round openings of the sample set are six radial gradients in the photo's mask (one set for desktop, one for phone), widened by the custom property --blind-set-r and lined up with the six numbered labels; keep six labels, or add gradients for more.
- The four tasting strips in the opening carry their starting fan angles inline (--opening-li-op-strip-rotate-from and its phone twin); a new strip needs its own pair.
- The big word "Noses" is sized from style="--len:5", the number of characters; change it with the word.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #141213 (near-black: page ground, nav bar once it turns solid, opening second screen, origins, noses and footer grounds, and the text colour on cream and white sections), `--color-2` #f1eade (warm cream: type on the dark sections, ground of shelf, accord, resting, questions and visit, the four tasting strips, the numbered vial discs and the hover fill of dark buttons), `--color-3` #573726 (dark brown: top of the first screen's gradient, ground of the sample set section and backing of the portrait arches), `--color-4` #8c5f43 (mid brown: lower end of the first screen's gradient), `--color-5` #ffffff (white: ground of the cabinet section, the footer card, white buttons and the menu button, the disc behind the number on the shelf, and the thread line on the visit section), `--color-6` #675a50 (muted brown-grey: small print, batch numbers, notes labels, FAQ answers and form placeholders on the light sections), `--color-7` #a99d91 (muted warm grey: secondary text on the dark sections, such as the origin places, the second heading half and the portrait bios), `--color-8` #b48a5a (amber: the thread lines on the cream sections and footer card, and the ring around the number of scents on the shelf); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, email, form, phone): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Book a session link in the header: now #visit; owner's target: your booking page URL if you take bookings elsewhere, or keep it on the request form.
- Book a blind session button in the first screen: now #visit; owner's target: your booking page URL, or keep it on the request form.
- How a blind session works link in the second screen: now #questions; owner's target: keep it, or point it to a page that explains your tasting.
- See if a seat is free button in the shelf section: now #visit; owner's target: your availability or booking page, or keep it on the request form.
- Smell all four at home first: the Blind Set link under the cabinet: now #blind-set; owner's target: keep it, or point it to your sample set product page.
- Order the Blind Set button: now a mailto: link with the subject "The Blind Set"; owner's target: your shop or checkout link for the sample set.
- Send request button of the booking form: now a script checks name, email and the consent box and shows a thank-you line; nothing is sent (the form has action="#visit"); owner's target: a form service (Formspree, Netlify Forms) or your booking system, or remove the form and keep the email and phone.
- The form in `#visit` (fields `name`, `email`, `day`, `notes`, `consent`) sends nothing; `section-script:visit` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name The Resin Cabinet (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (24, Unsplash: opening 3, origins 6, shelf 1, cabinet 4, accord 2, resting 3, noses 3, blind-set 1, visit 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Perfumer and team: Ines Marlow trained in Grasse, Callum Reid, Sara Okafor, and their biographical lines (noses).
- Shelf size: "41 scents on the shelf", "eleven small houses", "four extraits", "six growers and distillers" (shelf, cabinet, origins).
- Extrait names, numbers, notes and prices: No. 11 Wet Cedar £148, No. 23 Low Smoke £156, No. 37 Salt Iris £172, No. 40 Night Jasmine £164, 50 ml (cabinet).
- Material origins and seasons: six materials with places and months (origins). They are specific to this brand; replace them with your own sourcing.
- Session terms: "Fifty minutes at the table", "a dozen strips", "A session costs £25, taken off any bottle you buy", Thursday to Saturday 11:00 to 18:00 by appointment (questions, visit).
- Sample set: six vials of 2 ml, £38 credited against the first full bottle (blind set, questions).
- Batch status: Batch 23 week 5 of 8, "bottling planned for late November", Batch 37 filtering, Batch 41 forming (resting).
- Shipping and returns: "Within the UK and the EU", packed "by hand on Mondays", "Unopened bottles within 30 days", swap opened ones for samples (questions).
- Newsletter policy: "No newsletter. We write when a batch is ready." (footer).
- Contact details: address, phone, email and the district name "Leith" used in the copy (menu, shelf, visit, footer).
- Training and claims: "Trained in Grasse", "turns down most briefs", "None of them sells on commission" (noses).

## Known limits
- Without JavaScript the menu button cannot open the menu, so below 860 px, where the header links are hidden, only the footer links remain; the booking form has no sending code.
- The origins and cabinet sections sit in tall scroll tracks with held stages, so on short screens the photos and cards are cramped.
- The two small notes beside the heading are 13 px cream text over the brown gradient and photos; check their contrast again when you change the photos or colours.
- The scenes move large parts (the ink dome, the origins stage, the dealt deck), which can feel heavy on slow phones.
- Without CSS scroll-driven animation support (Firefox today) or with reduced motion on, the scroll scenes do not run and the wheel scrolls natively: the origins and cabinet sit as plain grids, the thread lines show fully drawn and the dark second screen simply slides over the sticky first one. The opening's load-in and its two slow loops (floating cards, panning arch photo) still play in Firefox, not with reduced motion.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and The Resin Cabinet left only in class names.
