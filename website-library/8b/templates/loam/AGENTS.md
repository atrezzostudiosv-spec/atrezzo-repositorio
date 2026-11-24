# AGENTS.md: landscaping website template

One-page website for a landscape gardening firm that designs, builds, plants and looks after gardens. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/landscaping-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/landscaping-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/landscaping-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/landscaping-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:navigation`: `.nav__menu` `.menu__close` `data-state`
  - `section-script:contact`: `.ct__form` `.ct__status` `data-missing` `data-sent`
  - `scene-script:wildlife`: `.wl__sentence` `.wl__word` `.wl__pill`
  - `scene-script:seasons`: `.ss__pin` `.ss__track`
- `style="--len:N"` = characters in that display line, spaces included: `loam` is 4.
- The services board holds exactly four beds (data-8b-fixed="4"): the CSS gives .sv__bed--1 to .sv__bed--4 their places and the scroll keyframes move the seams through five states made for four. Keep four beds, renamed to your services.
- The principle bands and the season panels are fixed at four and the quotes at three (data-8b-fixed): the CSS motion picks each band's tilt, each quote's pile position and each season's colour by its position.
- The seasons' colours are the tokens --color-3, --color-5, --color-7 and --color-8: the .ss__panel--spring, --summer, --autumn and --winter rules use them, and so do the scroll keyframes that turn the held section's ground and text colour, so recolour the seasons in :root. The sideways travel is measured from the track's width.
- The wordmark "loam" in the footer is sized by style="--len:4", the number of characters of the word; update it when you rename the business. The corner tabs and notches (.m-plot, .m-plot__tab) are CSS shapes driven by custom properties such as --plot-trw; the contact scene animates those two on wide screens.
- Headings with the rise effect are cut into lines by the inline motion kit when they come near the screen, so keep them as plain text without inner links or tags.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #ffffff (page background, the navigation bar, form fields, text on forest and near-black panels), `--color-2` #141713 (body text, filled buttons, the fourth principle band, the footer panel, dashed field borders), `--color-3` #eef48b (lime panels (opening statement, first principle band, contact, first quote, spring), button hover fill, mobile menu overlay, footer wordmark), `--color-4` #525a50 (captions, fact labels, place names, lead text and answers in the questions section), `--color-5` #1f3d2c (forest panels (second principle band, wildlife sentence, summer, third quote) and the ground behind photos), `--color-6` #e5eae2 (sage panels (third principle band, second quote), the navigation outline and photo thumbnail ground), `--color-7` #d57d4f (terracotta, used only for the autumn panel), `--color-8` #dce7ed (pale blue-grey, used only for the winter panel); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, form, phone, email): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Book a site visit buttons (navigation bar, menu overlay, opening, footer): now #contact; owner's target: keep them on the contact form, or point them to your booking calendar.
- How we garden link in the opening: now #principles; owner's target: keep it, or change it if you rename or remove the principles section.
- What aftercare involves link in the wildlife section: now #seasons; owner's target: keep it, or point it to a separate aftercare page.
- Phone links in the contact tab and the footer: now tel: links to a placeholder number; owner's target: your office phone in tel: form (+44...).
- Email links in the contact tab and the footer: now mailto: links to a placeholder address; owner's target: your office email.
- Request a visit button of the form: now a script that checks name, email and postcode and shows a thank-you line; nothing is sent; owner's target: your form endpoint (Formspree, Netlify Forms) or your CRM form, and drop the thank-you script.
- The form in `#contact` (fields `name`, `email`, `phone`, `postcode`, `size`, `message`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name loam (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (24, Unsplash: opening 1, services 4, wildlife 4, gardens 3, materials 5, seasons 4, voices 3): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Founding and place: "from a yard in Lewes since 2011"; East Sussex; the yard address, postcode, phone and email are placeholders (footer, contact tab).
- Numbers in the copy: "forty-one gardens" built and looked after, "23 of the 41" with hedgehogs on camera traps, "visited at least four times a year" (gardens, wildlife, opening).
- Practices claimed as policy: no peat, no plastic lawns, no chemical feeds, compost from the firm's own green waste, a water butt on every downpipe (opening, principles, materials). Never invent certifications.
- Three gardens with places, years and sizes: Ringmer 2023 (1,400 m², 11 weeks, 2,300 perennials, 140 m of hedge), Lewes 2024 (64 m², 4 weeks, 900 old bricks), Ditchling 2022 (520 m², 7 weeks) (gardens).
- Prices: builds between £18,000 and £90,000, design from £1,400 for a small garden with the fee taken off the build (FAQ).
- Service area: "within about forty minutes of our yard" (Brighton and Hove, Seaford, Uckfield, the edge of the Weald), the first visit free within twenty miles of Lewes (FAQ).
- Materials and distances: flint within 8 miles, oak within 22 miles, brick within 30 miles, hoggin and gravel within 25 miles, three compost bays at the yard (materials).
- Aftercare schedule: spring three visits, summer two, autumn two, winter one, with the tasks listed per season (seasons); "most new gardens fail in their third year" (seasons lead).
- Timing claims: borders fill out in the second summer, hedges and trees take three to five years, "gone in seven weeks" in a quote (FAQ, voices).
- People: Priya and Tom Hale (Kingston near Lewes), Margaret Ellison (Ditchling, "the same two gardeners still come every month"), Owen Ward (Seaford); the photos are stock images (voices).
- Contact promises: a designer calls "within two working days" (contact lead and the thank-you line); hours Monday to Friday, 8 to 5 (contact tab).
- Footer: "© 2026 loam garden makers Ltd · Registered in England and Wales no. 00000000": put in your legal name and company number.

## Known limits
- Without JavaScript the Menu button on phones cannot open the overlay (wide screens show the links), and the contact form does nothing: it is built with novalidate and its handler is a script.
- The contact form sends nothing: the script only checks the three required fields and prints a thank-you line, so connect a form service or CRM.
- With the scroll motion on, the services board is held by CSS sticky over a stage 430svh tall (400svh on phones) and the seasons are held for the width of their track, so the page asks for long scrolling; check both on short laptop screens.
- The opening photo and the gardens panels are large images (up to 1600 px and 1440 px wide); replace them with your own, optimised.
- Without CSS scroll-driven animation support (Firefox today) or with reduced motion on, the scroll scenes, the heading rises and the photo and sprout loops do not run and the wheel scrolls natively: the services board rests as an even two by two plot, the seasons stack as four coloured panels and the gardens follow one another. The opening load-in still plays in Firefox, not with reduced motion; the bar still hides and returns on scroll and the hover fills still run.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and loam left only in class names.
