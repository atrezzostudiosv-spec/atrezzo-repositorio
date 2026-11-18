# AGENTS.md: law firm website template

One-page website for a commercial law firm that acts for growing companies, their founders and boards. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.4 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/law-firm-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/law-firm-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/law-firm-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/law-firm-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:nav`: `.nav__toggle` `.nav__close` `.nav__menu`
  - `section-script:contact`: `.contact__form` `.contact__status` `data-sent`
  - `scene-script:practice`: `.practice__panels` `.area` `.practice__index` `.area__figure` `.area__piece` `data-figure`
  - `scene-script:people`: `.people__hold` `.people__track` `.person`
  - `scene-script:fees`: `.mode__bar`
  - `scene-script:contact`: `.contact__fan` `.contact__photo`
- The red figures in the practice panels are CSS spans (.area__piece), not images: each panel's data-figure (split, skew, halves, plots) sets their resting shapes in the section CSS, and scene:practice animates only as many pieces as its table holds for that figure (2, 4, 2, 3). Keep the data-figure values and piece counts, and recolour them through --color-4.
- Each city photo on the ring sits by its inline style --city-i: ten values from -4.5 to 4.5, 19 degrees apart, with Edinburgh and Dublin at -0.5 and 0.5 resting at the top. If you add or remove a city, renumber --city-i so the values stay centred on 0.
- The h1 is three .opening__line spans with one .opening__word each: the CSS steps the second and third lines to the right and the scroll animation moves each of the three lines on its own by its :nth-child position, so keep three short lines.
- The fee bars are a diagram, not data: their reach is set in CSS per data-reach (exact 9%, cap 52% with the .mode__stop line at the same 52%, estimate 94% fading out). Keep the stop's left value equal to the cap bar's width.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #ffffff (page ground, promise cells, the full-screen menu, the fog and mist over the opening photo, button text), `--color-2` #262626 (text, logo, dark buttons, the cap's stop line on the fee scale, the shade that darkens a covered practice panel), `--color-3` #d5d5d5 (ground of the practice section and its four panels), `--color-4` #d3271d (the one accent: logo square, practice shapes, serif promises and fee names, fee bars, the hover fill of buttons and icons), `--color-5` #5c5c5c (small grey text (notes, addresses, promise and fee lines, the legal line), form labels and underlines, table heads and years, the rules between questions), `--color-6` #dcdcdc (hairlines (nav edge, table rows, promise cells, fee tracks, footer edge), empty photo frames, the pale start of the ink effect), `--color-7` #f1f1f1 (ground of the partners, questions and footer); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, form, email, social): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Book a first call buttons in the nav bar, the phone menu and the questions section: now #contact; owner's target: your booking calendar URL (Calendly, Cal.com) if clients book first calls there, or keep #contact once the form is connected.
- Talk to the corporate, disputes, employment and property team links in the four practice panels: now #contact; owner's target: a page per practice area or the lead partner's contact, or keep #contact.
- Privacy notice, Cookies, Complaints, Terms of engagement and Modern slavery statement links in the footer: now #footer (nothing); owner's target: the URLs of your own policy pages, or remove the ones you do not publish.
- The form in `#contact` (fields `name`, `email`, `company`, `matter`, `message`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Fellgate (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (26, Unsplash: opening 1, practice areas 4, offices 10, partners 6, pro bono 1, contact 4): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Size and places: "seventy lawyers" in Edinburgh, London and Dublin (page title, meta description, opening statement, partners heading); team sizes 22, 18, 14 and 16 lawyers (practice terms).
- History: "Three litigators founded the firm in 2009" (opening) and the promises "set down in 2009" (principles).
- Service promises: answers "in plain English, in writing, within one working day" (opening, principles, contact statement, the form's thank-you line), "advice you can act on the same day" and "Most of our clients use two of them within their first year" (practice intro), work starts "within the same week", urgent matters the same day (FAQ).
- The five promises are said to be written into every engagement letter, with the guarantee "If we break one, the next month of work on your matter is on us" (principles).
- Practice terms: Series A to C rounds, deal ranges £2m to £150m (corporate) and £500k to £60m (real estate), forums Court of Session, High Court, Irish courts and arbitration, employers of 20 to 2,000 people (practice areas).
- People: six partners with practice, city and direct line (Anders Holm and Fiona Strachan as founding partners, Samuel Adeyemi as managing partner, Callum Rennie, Inés Carvalho, Grace Nwosu, titles in the alt texts), four of them named as lead partners (practice terms); the portraits are stock photos of real people (partners).
- Matters: six invented client matters from 2023 to 2026 with places, sums and outcomes (a £48m Series C "Closed in nine weeks", a 140-person restructure with "No tribunal claims", six warehouse sites, a £2.1m claim "Recovered in full before trial") and the line "Clients described with their permission" (selected matters). Publish only matters your clients allow.
- Network: partner firms in Lisbon, Madrid, Paris, Amsterdam, Copenhagen, Stockholm, Milan and "five more countries", "twelve more countries", "briefed in one call and billed through us", one engagement letter and one invoice (offices, FAQ).
- Offices: three addresses and phones (1 Example Street placeholders and zero numbers after the build), office photos captioned as the Edinburgh, London and Dublin rooms (offices, contact).
- Pro bono: "One working day in ten", eviction cases with the law centres of Glasgow and Dublin, "forty small trusts", a free first-contract clinic "every second Thursday" (pro bono).
- Fees: fixed, capped and hourly terms, "Most matters run on a fixed or capped fee", "above it, we carry it", "Capped fees stay capped"; a first call of thirty minutes with a partner, free (fees, FAQ, questions side). No prices are on the page.
- Scope: acts for founders, directors and senior executives in matters connected to their companies, "We do not handle family or criminal matters", Scots, English and Irish law (FAQ).
- Legal status and regulators: "a limited liability partnership registered in Scotland", regulated by the Law Society of Scotland, the Solicitors Regulation Authority and the Law Society of Ireland, "© 2026 Fellgate LLP." (footer): put in your own legal form, registration number and regulator.
- Contact lines: a New matters phone and email, an out-of-hours mobile, "A partner will call you within one working day" (contact).

## Known limits
- Without JavaScript, below 1000 px the menu button cannot open the overlay and the section links and the Book a first call button are hidden; the footer holds only policy links, so phones have no section navigation beyond the links inside the copy.
- The form sends nothing: with JavaScript it checks the fields and shows the thank-you line; without it the browser posts to #contact on the same page. Connect Formspree, Netlify Forms or your own endpoint.
- With the scroll motion on, the statements with the ink effect (opening, pro bono, contact) start in the pale hairline grey (#dcdcdc on white, about 1.4:1) and reach full ink only as they scroll towards the middle of the screen; without it they are dark from the start.
- On phones a stuck practice panel is taller than the screen: it is lifted so its terms stay in view, and the top of its photo passes under the index row.
- The ten city photos on the ring carry no visible labels; only their alt texts and the paragraph inside the arc name the cities.
- Without scroll-driven animation support (Firefox today) or with reduced motion on, the scroll animations do not run: the four practice panels follow one another as plain screens, the six partners sit in a grid, the stair, the ring, the fee bars and the office photos rest in place and the wheel scrolls natively. The fog photo stays held behind the second screen; the opening load-in and the fog drift still play in Firefox, not with reduced motion.
- The practice panels and the promises are fixed at four and five (data-8b-fixed): the index links name each panel, and on phones only the second and fourth promises slide in, through :nth-of-type rules; a sixth promise would stay still there.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Fellgate left only in class names.
