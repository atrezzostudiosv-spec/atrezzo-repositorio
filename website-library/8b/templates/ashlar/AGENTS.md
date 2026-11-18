# AGENTS.md: construction company website template

One-page website for a construction company: a home renovation and extension contractor. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/construction-company-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/construction-company-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/construction-company-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/construction-company-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:nav`: `.nav__bar` `.nav__num` `.nav__label` `.index` `.nav__index` `.index__close` `data-8b-section` `.chapter` `.chapter__num` `.chapter__label` `data-step`
  - `section-script:opening`: `.wall`
  - `section-script:crew`: `.crew__shuffle` `.crew__status` `data-message`
  - `section-script:contact`: `.contact__form` `.contact__status`
  - `scene-script:process-courses`: `.process__wall` `.step`
  - `scene-script:materials-fan`: `.materials__strips` `.mat`
  - `scene-script:work-gather`: `.work__sheet` `.work__item`
  - `scene-script:services-index`: `.services__frame` `.services__list` `.svc`
  - `scene-script:promise-stack`: `.promise__type`
  - `scene-script:opening`: `.opening__ground` `.wall` `.wall__course` `.wall__block`
- `style="--len:N"` = characters in that display line, spaces included: `Fixed` is 5.
- Chapter numbers and labels are written in each section's intro ("02 ( Services )"), in the Index list and in the footer's "Back to 01 Practice ↑" link; the top bar reads them from the sections. When you add, remove or rename a section, update all three.
- The wall of blocks on the first screen and the process blocks are HTML and CSS, not images: restyle them through the colour variables.
- Red (--color-7) is used only for measuring marks, link hover lines and focus outlines; keep it off large areas and body text.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #ffffff (white page background), `--color-2` #0c0c0c (black text, buttons, gallery and footer), `--color-3` #f2f2f2 (light grey panels and form sheet), `--color-4` #dcdcdc (pale grey hairlines and blocks), `--color-5` #444444 (dark grey blocks and button hover), `--color-6` #2a2a2a (charcoal cards and blocks), `--color-7` #d4351c (red measuring marks, link hover lines and focus outlines), `--color-8` #6b6b6b (grey small labels); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, email, form, social): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- "Book a visit" (nav) and "Book a site visit" (first screen): now #contact; owner's target: your booking or calendar URL if you use one (or keep the anchor to the form).
- The form in `#contact` (fields `name`, `phone`, `email`, `address`, `job`, `message`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Ashlar Build (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (30, Unsplash: opening 1, services 5, survey 1, work 12, materials 5, crew 5, contact 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Company history and size: "since 2009" (opening lead and facts), "Fourteen builders" (opening statement) and "Fourteen of us, all on payroll" (crew), own carpenters, electricians and plumbers on payroll (opening), cabinetry made "in our own shop in Gowanus" (services).
- Licence and insurance: "Licensed home improvement contractor, New York City" (opening), "NYC license 0000000. Insured to $2,000,000." (footer; the licence number was replaced with zeros).
- Place: Brooklyn, NY (index overlay, opening, title and meta description), the office "100 Example Street, Brooklyn, NY 11217" (contact, footer; replaced), "Based in Brooklyn since 2009" (opening), service area Brooklyn, western Queens, Manhattan and Jersey City (FAQ "Where do you work?").
- Phone (718) 000-0000 and email hello@ashlarbuild.example (index overlay, contact, footer; replaced) and office hours "Monday to Friday, 7:30-17:00. Saturdays by appointment." (contact).
- Durations and prices per service: Kitchens 8-12 weeks, from $68,000; Bathrooms 4-6 weeks, from $34,000; Lofts 10-14 weeks, from $95,000; Rear extensions 16-24 weeks, from $180,000; Restoration priced per room (services). "Most jobs between six and twenty weeks" (opening).
- Survey terms: half a day on site, drawings "to the quarter inch", a quote "valid for sixty days", the survey costs $450 and comes off the job (survey, contact form labels); the dimensions "Width 15′ 10″" / "Height 9′ 8″" and the caption "Parlour floor, Clinton Hill" (survey).
- Finished work: "Twelve rooms from the last eighteen months" and twelve captions with Brooklyn neighbourhoods (work). The photos are stock photos, not the company's projects: replace them with your own work before publishing.
- Schedule: Week 0, Week 1, Weeks 2-5, Weeks 4-7, Weeks 7-12 and "photos every Friday" (process); surveys within two weeks of a call, building six to ten weeks after signing (FAQ).
- Guarantees: fixed price, a handover date with "$250 for every working day" if missed, and a ten-year guarantee on structure and waterproofing that moves with the house (promise).
- Payment: "A ten percent deposit, then a payment as each stage passes inspection" (FAQ); smallest job a single bathroom, no repairs or handyman work (FAQ); permits handled by an expediter (FAQ); heated floors as standard in bathrooms (services).
- People: Joe Brennan (site lead, 16 years), Ines Varga (surveyor and estimator, 9 years), Kwame Asante (electrician, 12 years), Rafael Ortiz (plumber, 8 years), Mehmet Kaya (plasterer, 22 years) (crew). The portraits are stock photos of other people: use photos of your own team.
- Reviews: Priya and Sam Okafor (rear extension, Ditmas Park, 2025), Hannah Lowe (kitchen, Park Slope, 2024; mentions "Joe"), Daniel Reyes (restoration, Crown Heights, 2024; mentions an 1890 stair), Margaret Chen (two bathrooms, Cobble Hill, 2025), and "Four clients from the last two years" (reviews). Use only real reviews you have permission to publish.
- Response time: "we will call within one working day" (contact text and the #contact-ok message).
- "© 2026 Ashlar Build LLC" (footer).

## Known limits
- The order-of-work wall is laid out for exactly five stages; a sixth needs its own place in the grid.
- Shuffle re-orders the crew in the browser only; the order in the file is the order on load.
- From 900 px wide, with scroll-driven animations and motion allowed, the process section is held on screen and shows only its heading for the first part of its scroll, until the first block lands (intended: the empty site before the first course).
- Some counts are fixed in the CSS: the reviews stack chains its four cards through their four surface classes (m-surface to m-surface-4), so a fifth card neither shrinks nor dims; the services frame changes through five shapes set for five rows; the Fixed word has four hidden copies, each with its own rule.
- Without JavaScript the Index button and the chapter arrows do nothing. The footer links only Services, Work, Order of work and Questions (plus Back to 01 Practice); Survey, Materials, Promise, Crew and Reviews have no other link, and Contact is reached through the first-screen Book a site visit button.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Ashlar Build left only in class names.
