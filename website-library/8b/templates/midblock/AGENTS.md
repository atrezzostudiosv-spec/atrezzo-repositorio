# AGENTS.md: architecture website template

Website for an architecture office, with projects, method, team and an enquiry form. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/architecture-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/architecture-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/architecture-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/architecture-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:navigation`: `.nav__toggle` `.nav__menu` `.nav__close`
  - `section-script:contact`: `.ct__form` `.ct__status` `data-sent-text` `data-error-text`
  - `scene-script:buildings`: `.bl__pin` `.bl__track` `.bl__item` `.bl__shift` `.bl__img`
  - `scene-script:scan`: `.sc__frame` `.sc__line` `.sc__steps` `.sc__step` `.sc__tick`
  - `scene-script:floors`: `.fl__frame` `.fl__list` `.fl__slice` `.fl__floor`
- `style="--len:N"` = characters in that display line, spaces included: `Midblock` is 8.
- The smeared slabs in the opening and contact are one street photo stretched sideways with CSS: to change it, replace the same URL in all eight opening layers and both contact slabs. The floors section uses one photo for all seven slices, the scan section one photo twice.
- Project card widths and heights come from the inline style="--plot: N; --h: N" on each building: --plot is the plot width in metres, used as a relative width.
- The scroll motion (the `scene:<id>` styles and `scene-script:<id>` scripts) reads these classes, so keep them on the same elements: opening `.op__stage` `.op__slab` `.op__slab--gap` `.op__floor` `.op__img` `.op__copy` `.op__block` `.op__hold`; buildings `.bl__pin` `.bl__track` `.bl__item` `.bl__shift` `.bl__img` `.bl__pavement`; scan `.sc__frame` `.sc__smear` `.sc__line` `.sc__steps` `.sc__step` `.sc__tick`; colours `.co__bands` `.co__fill` `.co__label`; floors `.fl__frame` `.fl__slice` `.fl__list` `.fl__floor`; studio `.st__row` and the `.m-photo` in each portrait; contact `.ct__stage` `.ct__slab--l` `.ct__slab--r`. The scan and floors scripts mark the step and floor being read with `data-lit` and `data-active`, which the CSS styles.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #d9e4f0 (page background, pale sky), `--color-2` #1a2430 (text, buttons, dark sections), `--color-3` #f3eeed (cream blocks: the headline block, two of the three facts, the first quote, the form panel), `--color-4` #b9471f (brick red stripes, hovers), `--color-5` #e7a36a (sand: third block on the first screen, labels on navy, one colour band), `--color-6` #3f6964 (door green: badge markers and one colour band), `--color-7` #26419b (tram blue band), `--color-8` #d22630 (red scan line and thin red bands), `--color-9` #ffffff (register and team sections, text on navy), `--color-10` #475463 (muted grey-blue for small labels, table headings, notes and rules on navy), `--color-11` #a9c1dd (upper end of the sky gradient behind the first screen), `--color-12` #e6dad8 (plaster pink blocks and one colour band); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, form, phone, email): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Bring us a plot (nav, first screen, footer) and Add a plot (register): now #contact; owner's target: your booking or enquiry URL, or leave them on the form.
- The form in `#contact` (fields `name`, `email`, `plot`, `width`, `role`, `message`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Midblock (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (14, Unsplash: opening 1, contact 1, buildings 5, scan 1, neighbours 1, floors 1, studio 5): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- The offer "plots under ten metres wide" (opening, register, footer, meta description) and the city: Bristol (contact, footer).
- The studio address "Ropewalk Yard 9, Bristol BS1 6XN" (contact, footer); the phone was replaced with +44 117 000 0000 and the email is studio@midblock.example (contact, footer).
- Hours: "Monday to Friday, 9:00-18:00. Site walks on Thursdays." (contact).
- Company facts: "Since 2014", "Eleven buildings", "Forty-one gaps mapped across the city", narrowest plot "2.9 metres at 9 Ropewalk" (opening, floors, FAQ) and "© 2026 Midblock Architects Ltd. Registered in England." (footer).
- Five projects with invented addresses, plot widths, floors and years: 11 Kerr Lane (4.1 m, 5 floors, 2023, gap "open since 1941"), 4 Saltmarket Row (6.2 m, 4 floors, 2021), Quay 27 (7.8 m, 3 floors, 2022), Mill & Ash corner (5.5 m, 2 floors, 2019, 38 m²), 18 Weir Road (9 m, 4 floors, 2024, timber from the old tannery roof) (buildings; the names also appear in colours).
- 9 Ropewalk details: between a garage and a print shop, seven floors, a bike workshop, a roof garden with a river view, a 28 m² studio, a flat let at a fixed rent (opening, floors).
- The method: filming the street with a slit camera from first light to midnight, times 05:40, 12:10, 19:30, 23:55, "one contractor" and a street that stays open (opening manifesto, scan).
- The register: eight plots with addresses, widths, depths, orientations and statuses, "updated every month", listed "with their owners' agreement" (register, FAQ).
- Colour stories with dates: a render "painted in 1932 and repainted four times", a door "painted in 1958", a tram shelter (colours).
- Testimonials from invented people: Ines Calder (florist, Ropewalk), Tom Abara (9 Kerr Lane), Margit Holm (Weir Road), with "seven months" of building and "forty years" of nettles (neighbours).
- Team names and roles: Owen Marsh, Hana Okafor, Leo Varga, Mei Lindqvist, Jun Park (studio); the portraits are stock photos of other people.
- FAQ answers: built on 2.9 m, about 2.4 m minimum, a free first visit, buildings within an hour of the studio and "one plot further away each year", plot owners ("the council and two housing associations"), about two years from scan to keys (three months design, nine to twelve months planning, seven to ten months on site) (FAQ).
- Service: "We reply within a week" (contact text and the data-sent-text message).

## Known limits
- Without JavaScript the phone menu button cannot open the overlay, and the top links are hidden at 900 px and below; on phones the first screen still links See the buildings and Bring us a plot, and Method, Register and Studio are reachable only from the footer.
- Without scroll-driven animation support (Firefox today) or with reduced motion on, the page shows its still layout: the first screen keeps its slabs as smeared streaks over the sky, the five buildings wrap onto rows instead of walking sideways, the method photo stays sharp with no scan, and the floor slices, portraits, colour bands and contact slabs rest in place.
- The opening's six side slabs, the seven floor slices and the five portrait heights are set one by one in CSS :nth rules; an extra slab, slice or portrait needs its own rule, or it gets no position, height or motion.
- On phones the opening's second screen (manifesto and facts) is taller than the viewport, so the climbing bands are mostly seen behind and around it, and just before the buildings walk starts the top of its frame is empty for a moment.
- The floors photo has a white sky: when the slices slide apart, their white ends read as white blocks on the navy ground.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Midblock left only in class names.
