# AGENTS.md: driving school website template

One-page website for a driving school that teaches first-time and nervous learners. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/driving-school-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/driving-school-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/driving-school-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/driving-school-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:navigation`: `.nav__menu` `.nav__sheet` `.nav__close`
  - `section-script:passed`: `.passed__reel` `.passed__track`
  - `section-script:prices`: `.prices__card` `.prices__hours` `.prices__cells`
  - `section-script:contact`: `.contact__form` `.contact__status` `data-sent` `data-missing`
  - `scene-script:unpack`: `.included__main` `.included__unit`
  - `scene-script:coverage`: `.areas__cell`
  - `scene-script:plain`: `.method__row` `.method__jargon` `.method__plain` `.method__term`
  - `scene-script:hours`: `.prices__card` `.prices__cell`
  - `scene-script:footer-cells`: `.footer__cell`
- `style="--len:N"` = characters in that display line, spaces included: `Nervous?` is 8, `Good.` is 5, `Let’s go.` is 9, `merge.` is 6.
- The three big words in the nervous panels and the footer wordmark each have style="--len:N" equal to their character count; CSS sizes the type from it, so update N when you change the words.
- Each price card's data value (10, 20, 30 hours) is what section-script:prices reads to draw the squares; change the number there as well as in the visible text.
- The district board is a grid of 24 cells in three zones: the coverage script reads each cell's position and its zone class (north, east, south) and one cell per zone carries the centre class. Keep that pattern when you change areas.
- The tunnel's cell positions are inline custom properties on each cell (--fleet-near, --fleet-len and left, top, width, height in percent); move or add cells by editing those values.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #eef0f3 (pale grey page ground, the navigation bar and the tunnel board), `--color-2` #0e0e10 (text, solid buttons, the dark booking card, hairlines and the centre cells of the district board), `--color-3` #ffffff (form fields, jargon cells, text on the dark booking card, the hover fill of the purple buttons and the focus halo), `--color-4` #ffb300 (amber: button hover fill, the areas card, the amber nervous panel, one stage, one package card and one nav tile), `--color-5` #ff5b37 (orange: the all-inclusive price card, one nav tile, one pass quote and one footer cell), `--color-6` #ec3b41 (red: the first stage, the red nervous panel, the strike-through on jargon terms and one footer cell), `--color-7` #22c35d (green: the hours tile, the south zone of the district board, the green nervous panel and the contact info card), `--color-8` #3d84f7 (blue: the north zone of the district board, one nav tile, one instructor card and one package card), `--color-9` #a15cf6 (purple: the Book a lesson buttons and the Send request button, the last lesson stage, one instructor card, the east zone of the district board and one package card), `--color-10` #cdb4fa (light lilac: the Theory, sorted tile, one pass quote and one jargon translation cell), `--color-11` #575a62 (grey for intro paragraphs, jargon terms and the legal line); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, form, email): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Book a lesson buttons in the nav (top bar, phone menu, side rail) and "Book a first lesson" under the headline: now #contact; owner's target: your online booking page, or keep #contact once the form is connected.
- "See prices" button under the headline: now #prices; owner's target: keep as is, or a page with full price details.
- "Choose your car" button in the cars section: now #contact; owner's target: a booking page with a car or gearbox choice, or keep #contact.
- "Choose First ten", "Choose Test ready" and "Choose the intensive" buttons on the three package cards: now #contact; owner's target: a checkout or booking link for each package, or keep #contact.
- Phone links in the nav, the phone menu and the contact card: now tel: with a placeholder number; owner's target: your real number in tel: form.
- Booking form in the contact section: now action="#": nothing is sent, the script only shows a thank-you line; owner's target: a form service address (Formspree, Netlify Forms) or a link to your booking system.
- The form in `#contact` (fields `name`, `phone`, `postcode`, `gearbox`, `message`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name merge (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (17, Unsplash: included 1, fleet 4, instructors 4, passed 8): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Prices: £42 an hour pay as you go (prices); First ten £395, saves £25; Test ready £760, saves £80; Two-week intensive £1,150 (prices).
- What the price covers: dual-control car, fuel, insurance, pick-up and drop-off, theory app; no booking fee or test-day surcharge (included, prices).
- Lesson stages and typical hours: 4-6, 8-12, 6-10, 2-4 and 2 hours (opening).
- Fleet: six hatchbacks, manual and automatic, two electric, with dual pedals and parking sensors (fleet).
- Instructors: Ravi Mistry (former examiner, Gujarati), Jess Okafor (nine years, never raised her voice), Tom Brennan (fifteen years on a city bus), Ola Nowak (intensive courses, Polish), their next-free slots, and "all approved by the DVSA" (instructors, footer). The portraits are stock photos of real people and their alt texts name them.
- Pass figures: eighty-one passed this year, fifty-eight first time (passed); three learner quotes with names and months, one mentioning a roundabout at Cheetham Hill (passed).
- Area: twenty-four named Manchester districts and three test centres (Cheetham Hill, Openshaw, West Didsbury), the colour zone of each (areas).
- Hours: lessons 7am to 9pm every day, free changes up to 24 hours before, one, two or three-hour lessons (included); office Monday to Saturday 9:00-18:00 (contact).
- Intensive terms: ten weekdays, three hours a day, practical test booked at the end of the fortnight (prices).
- Pick-up: any address inside the zone; theory app free for learners with every official practice question (included).
- Promise: a call back within one working day (contact, form thank-you line).
- Company: "merge. Driving School Ltd", the Manchester address, the phone and email, which are placeholders (footer, contact, nav).

## Known limits
- Without JavaScript the phone menu button cannot open the sheet and the hour squares on the price cards are not drawn; the photo reel does not loop.
- The booking form has action="#" and nothing is sent; without JavaScript, submitting posts back to the page itself (some static hosts answer with an error). Connect a form service first.
- On phones the four-section navigation is only in the menu sheet; the top bar shows the wordmark, the Book a lesson button and the menu button. On wide screens the side rail slides out of view while you scroll down and returns on a move up.
- The nervous panels hold a sticky stage inside a 330svh track; on short landscape screens the panels' text has little room.
- With reduced motion the photo reel does not move but stays clipped, so only the photos that fit the width show (one or two on a phone, three or four on a wide screen) and the rest cannot be scrolled to.
- Without scroll-driven animation support (Firefox today) and with reduced motion on, the page shows its finished tiles: no load-in on the opening, the bento and tunnel at rest, every district coloured, the nervous panels as three stacked cards, the jargon struck through, the hour squares filled. Firefox still loops the photo reel; in both cases the bar still hides on scroll down and the hover wipes stay.
- The district board is laid out for 24 cells (four columns from 760 px, three below) and the packages for three cards in a row (data-8b-fixed); other counts leave gaps in the grid, while the colour spread and the hour squares still work.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and merge left only in class names.
