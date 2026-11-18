# AGENTS.md: tile store website template

One-page website for a tile shop or bathroom studio with a showroom, free samples and its own fitters. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, Lenis 1.3.4 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/tile-store-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/tile-store-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/tile-store-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/tile-store-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits.
- Selectors the scripts use:
  - `section-script:navigation`: `.nav__menu` `.nav__list`
  - `section-script:samples`: `.sp__form` `.sp__msg` `data-limit` `data-missing` `data-sent`
  - `scene-script:bonds`: `.bd__name` `.bd__track`
  - `scene-script:rooms`: `.rm__item` `.rm__marker`
  - `scene-script:glazes`: `.gz__stage` `.gz__rail` `.gz__bay`
  - `scene-script:service`: `.sv__steps` `.sv__step`
- The blue, yellow and red fields, the ruled cells and the bond wall are CSS, not images: recolour them through the colour variables in :root (yellow is --color-3, blue --color-4, red --color-5).
- The bond wall has four rows of seven cells, and each row's slide to half bond and third bond is written in the bonds scene CSS as a share of the wall's width for seven equal cells; keep seven cells of equal size in every row (five show at once on a wide screen, 3.5 on phones), or a shifted row opens a gap at the right and the joints miss.
- The four room photos are stacked layers, and the rooms scene CSS gives each of .rm__room--1 to .rm__room--4 its own clip-path keyframes: keep exactly four photos, one per caption, in the same order as the list.
- The glazes row is measured by the script, so the scroll length follows the number of bays; a new bay needs its own .gz__bay--<name> rule for its field colour, and the photo and colour field of each bay sit in its own .gz__top.
- The sample form text lives in data-limit, data-missing and data-sent on the status line: change the sentences there and keep {name} and {count}.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #ffffff (page ground and the fill of every cell between the rules, button text on black, text of checked sample chips and lit step numbers), `--color-2` #121212 (text, the rules between cells, primary buttons, checked sample chips, lit step numbers, the black wall cell and the Ink glaze field), `--color-3` #ffcf00 (yellow: the blocks in the navigation bar, opening and contact, button hover wipe, current-section underline, active bond and room markers, the current step, guarantee and phone cards, the Saffron glaze), `--color-4` #1858b8 (blue: the block in the opening and the strip beside the samples form, the moving step marker, focus outlines on buttons and fields, the Cobalt glaze), `--color-5` #e1251b (red: end of the navigation bar, blocks in the opening, materials, contact and footer, the Signal glaze and wall cells), `--color-6` #d9d9d9 (grey: the table header row, the Chalk glaze field, one wall cell and the ground behind the glaze photos), `--color-7` #5c5c5c (captions and descriptions in small text, and the No cells in the materials table); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, form, phone, map, email, social): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Free sample button in the opening: now #samples (the sample form); owner's target: your sample request page, or keep it on the form.
- Visit the showroom link in the opening: now #contact; owner's target: keep it on the contact section, or your appointment booking page.
- Sample box icon in the top bar: now #samples; owner's target: your samples or catalogue page.
- Basket icon in the top bar: now #opening, with a count of 0 that nothing updates; owner's target: your shop basket, or remove the icon if you do not sell online.
- Directions link in the contact section: now a Google Maps search for the city only; owner's target: the map URL of your showroom.
- How a job runs link in the fitters section: now #service; owner's target: keep it, or your fitting page.
- The form in `#samples` (fields `sample`, `name`, `email`, `postcode`) sends nothing; `section-script:samples` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name TEGEL (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (26, Unsplash: opening 1, bonds 5, materials 6, rooms 4, samples 1, glazes 5, fitters 3, contact 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Shop facts: "1,400 wall and floor tiles", "since 2014", "Showroom open Monday to Saturday, 9 to 5:30" in the opening against Monday to Friday 9:00 to 17:30 and Saturday 9:00 to 16:00 in the contact section (opening, footer, contact).
- Materials and prices: six materials with their uses and prices from £29 to £110 per m² (materials); "Prices per square metre include VAT" (footer).
- Finished rooms: Stranmillis, Holywood, Lisburn Road and Cregagh with their tile descriptions; the photos are stock photos, and the opening caption "Signal 10×10, a bathroom in Holywood" (opening, rooms).
- Samples: up to five free pieces, "ten centimetres across", posted "the next working day", "leave Belfast tomorrow" (samples, service).
- House glazes: Cobalt, Saffron, Signal, Chalk and Ink, "dipped for us by a small pottery in Stoke-on-Trent", each in a square, a metro and a hexagon (glazes).
- Fitters: "Five fitters on the books and no subcontractors"; Ruth Kerr ("eleven years with us"), Declan Moore, Tomasz Nowak; the photos are stock photos (fitters).
- Guarantee: "Two years' guarantee on every wall and floor we lay" (fitters).
- Job terms: measuring for £40 refunded with the order, the setting-out in half an hour, a tenth spare for cuts, unopened boxes back within 60 days, "Most bathrooms take four to six days" (service, FAQ).
- Delivery and returns: three working days to Great Britain on a pallet, next working day in Northern Ireland, a two-hour slot for Belfast addresses, no returns on cut-to-order or clearance tiles (FAQ).
- Technical claims: add a tenth for cuts, a seventh for diagonal and herringbone, R10 or higher for shower floors (FAQ). Check them for your trade.
- Contact: phone, email, "1 Example Street, Belfast BT1 0ZZ" (contact, footer, FAQ card).
- Footer: "© 2026 TEGEL Tiles Ltd, registered in Northern Ireland, NI000000."; put in your legal name and registration number.

## Known limits
- Without JavaScript the menu button cannot open the link list on phones, the sample form does not run its checks, and the basket count stays 0.
- The sample form is a demo and sends nothing; connect it to Formspree, Netlify Forms or your own endpoint.
- The basket icon is decoration: it goes to the top of the page and its count is never updated.
- The opening hours line says Monday to Saturday 9 to 5:30 while the contact section lists Saturday until 16:00; make them agree.
- The top bar hides while you scroll down and returns on scroll up, also with reduced motion on and in Firefox.
- The bonds (two screens of scrolling), rooms (three screens) and glazes (about one screen on a laptop) sections hold the screen (CSS sticky) for long stretches of scrolling, which feels long on a phone.
- Section links jump straight to the section with no offset for the sticky top bar, so after a jump upward the bar can cover the top of the section.
- Without CSS scroll-driven animation support (Firefox today) or with reduced motion on, the scroll animations and the smooth wheel are off and no section is held: the bond wall stays in stack bond with no bond name marked, the rooms keep their first cell layout, the glaze bays wrap into a grid and the service marker rests on the first step. In Firefox the opening still loads in.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and TEGEL left only in class names.
