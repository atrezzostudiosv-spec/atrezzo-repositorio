# AGENTS.md: car detailing website template

One-page website for a car detailing studio that offers paint correction, ceramic coating and interior care to car owners. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/car-detailing-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/car-detailing-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/car-detailing-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/car-detailing-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:nav`: `.nav__toggle` `.nav__overlay` `.nav__close`
  - `section-script:opening`: `.opening__word` `.opening__shine-text` `.opening__mark-box`
  - `section-script:measure`: `.measure__row`
  - `section-script:contact`: `.contact__form` `.contact__status` `data-sent` `data-error`
  - `scene-script:opening-assembly`: `.opening__frame` `.opening__img`
  - `scene-script:treatments-focus`: `.treat__name`
  - `scene-script:measure-scan`: `.measure__rows`
  - `scene-script:process-week`: `.process__days` `.process__day` `.process__shot`
  - `scene-script:reviews-stair`: `.reviews__stage` `.reviews__track` `.reviews__card`
  - `scene-script:footer-mark`: `.footer__mark`
- `style="--len:N"` = characters in that display line, spaces included: `Vernis` is 6, `Paint correction` is 16, `Ceramic coating` is 15, `Interior care` is 13.
- The wordmark and the three treatment names are sized by style="--len:N", the number of characters with spaces included (6 for Vernis in the opening and the footer, 16, 15 and 13 for the treatment names). Change N when you change a name.
- The sheen on the opening wordmark is a copy of the word that section-script:opening fills from the wordmark's text, so change the wordmark in one place only.
- The measure bars are drawn from each row's --measure-v and the 240 µm scale (value / 240) in two CSS rules, #measure .measure__fill and the measure-span-measure-fill-scale keyframes; section-script:measure copies each row's data value into --measure-v, and the row also carries the same number as style="--measure-v:N", which draws the bar without JavaScript. Keep the data value, --measure-v and the visible figure in step when you edit a row.
- The process grid is CSS with five columns, and the reviews and treatments are lists the scenes read item by item; the process layout is drawn for exactly five days.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #0f0f0f (page ground of the opening, treatments, work, process, questions, contact and footer; text on the buttons and the pale review cards), `--color-2` #ededed (body and heading text, button fill, the footer wordmark, the sheen on the opening wordmark, reading bars and focus outlines), `--color-3` #a9aea8 (the opening wordmark, paragraphs under headings, spec labels and the muted lines in the footer), `--color-4` #2f382f (deep green ground of the paint readings and studio sections and the starting ground of the reviews), `--color-5` #545e54 (sage ground of the aftercare section, the button hover wipe, form underlines, question rules and the flagged resprayed row), `--color-6` #d4cccc (the six review cards), `--color-7` #1d1f1d (tag ground, photo placeholders, bar tracks and hairlines between treatment rows and in the footer), `--color-8` #59523f (the olive-brown the reviews ground reaches at the end of its sideways track); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, form, email): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Book buttons and links in the nav, the phone menu, the footer and the Book a slot, Book an inspection and Book a maintenance wash links: now #contact; owner's target: your online booking page, or keep #contact once the form is connected.
- See the work link on the first screen: now #work; owner's target: keep, or point to your gallery or Instagram.
- Request an inspection button in the form: now does not send anything: the form action is #, and section-script:contact checks name plus phone or email and shows the thank-you line; owner's target: a form service (Formspree, Netlify Forms) or your own endpoint, or a link to your booking system.
- Phone and email links in the contact details, the footer and the phone menu: now tel: and mailto: placeholders; owner's target: your real phone number and email address.
- The form in `#contact` (fields `name`, `phone`, `email`, `car`, `treatment`, `when`, `notes`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Vernis (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (16, Unsplash: opening 1, treatments 3, work 5, studio 1, process 5, aftercare 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Prices and times: Paint correction 2-3 days from £680, Ceramic coating 1-2 days from £890, Interior care 1 day from £240 (treatments); maintenance wash £95 every six to eight weeks (aftercare).
- Warranty and terms: a five-year coating warranty with a free yearly check, "a price that does not move once the car is in", inspection free and about forty minutes (opening, treatments, faq, contact).
- Studio: one car at a time, daylight lamps on three sides, coatings cured at 20 °C, a filtered-air bay with a heated floor, the Ancoats, Manchester location (studio, contact, footer, title and meta description).
- Collection: a covered trailer within thirty miles of Manchester, free with any five-day treatment (faq, studio).
- Hours: Monday to Friday 8:00-18:00, Saturday by appointment; "we will call within one working day" (contact, footer).
- Paint readings: twelve panels from 98 to 214 µm, the factory range 95-130 µm, and the resprayed rear left door (measure).
- The five-day week: Monday inspect, Tuesday wash, Wednesday correct, Thursday coat, Friday hand over; a photo and the readings at the end of each day (process).
- Recent cars: 1973 911 T, 2023 coupé, 1966 convertible, 1952 roadster, 1979 911 SC with micron figures such as "eighteen microns taken off at most" and "three hundred miles" (work).
- Owner reviews: six named people with their cars, and statements such as "two years on, the coating still beads" (reviews).
- Company: "Vernis Detail Studio Ltd" and the registration line (footer); the phone 0161 000 0000 and studio@vernis.example are placeholders.
- Policies: avoid brush car washes, touchless jet wash is fine in a pinch, a scratch through to colour is not erased, the yearly check (faq, aftercare).
- Photos are stock images of real cars; their alt texts name models and years that must match your own work.

## Known limits
- Without JavaScript the Menu button on phones does nothing and the nav links are hidden below 900px width; the footer repeats Treatments, Process and Book only.
- The form does not send anything yet: the action is # and the thank-you line comes from a script.
- Without scroll-driven animation support (Firefox today) the scroll scenes, the caption and photo effects and the smooth wheel are off and each section shows its finished layout: the opening photo whole, every bar at its value, the week as five columns, the reviews as an even row that scrolls sideways with snap; the opening load-in and the wordmark sheen still play. With reduced motion those stop too.
- The reviews and process stages are held with CSS sticky inside tall tracks (320vh and 250vh), so on short landscape windows the cards and columns can be tight.
- The readings scene is timed for twelve rows with the flagged panel eighth (data-8b-fixed="12"): with more or fewer rows, or the flag moved, the bars and the flag ground no longer meet the scan line. The five cars (data-8b-fixed="5") carry their drift offsets inline on each card, and the zoom inside the frame is set on the third card by :nth-of-type; an added car without them settles down from above like the first.
- Nav hide-on-scroll, the sheen loop and hover transitions are separate from the scenes: the hide-on-scroll and hover effects keep running with reduced motion.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Vernis left only in class names.
