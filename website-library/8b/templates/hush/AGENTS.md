# AGENTS.md: electric scooter website template

One-page website for an electric moped or scooter maker, with models, colours, ownership plans, home servicing and test rides. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/electric-scooter-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/electric-scooter-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/electric-scooter-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/electric-scooter-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:nav`: `.nav__menu` `.menu__close`
  - `section-script:battery`: `.bt-note`
  - `section-script:contact`: `.cn-form` `.cn-status` `data-ok` `data-error`
  - `scene-script:details`: `.dt-mosaic` `.dt-tile` `.dt-tile--text`
  - `scene-script:reviews`: `.rv-wall` `.rv-card`
- `style="--len:N"` = characters in that display line, spaces included: `Lido` is 4, `Harbour` is 7, `Mustard` is 7, `Postbox` is 7, `Hush.` is 5.
- The wordmarks and the giant colour names are sized from style="--len:N" (the number of characters): the footer word has --len:5 and each paint name its own length, so update them when you rename.
- The counts the CSS motion fixes are marked with data-8b-fixed: three model cards and three frame photos, four paint fields, three service steps, six details tiles, two plan cards and six reviews. The model notch steps by card height and the paint track slides by quarters, so another count needs those scenes rewritten.
- The notched panels are CSS clip-path shapes driven by custom properties (--n and --nd): change the sizes there, not with extra wrappers.
- Each model photo appears twice in the lineup, in its card and in the frame; change both.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #e7e8ea (page background, form field fill and the nav bar once scrolled), `--color-2` #121315 (text, the opening's black field, round and pill buttons, the monthly plan card, the menu overlay and the footer), `--color-3` #cdd0d4 (hairlines in steps and plan lists, form field borders, the FAQ rules, and the greyed model cards and service step numbers before they light up), `--color-4` #ffffff (cards and surfaces, the Own it plan card, light buttons, text on dark panels and captions on photos), `--color-5` #d23624 (the accent: the logo mark, button hover fill, the charging figure, list dots, the footer wordmark's full stop and the Postbox red paint field), `--color-6` #4d5158 (secondary text, labels, specs and descriptions on light grounds), `--color-8` #a2a7ae (secondary text on dark grounds: the menu footer, the footer columns, the plan card and the middle fact card in the opening), `--color-9` #23746c (the Lido green paint field), `--color-10` #22477f (the Harbour blue paint field), `--color-11` #e2ac2a (the Mustard paint field, whose text switches to the near-black); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, email, form): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Test ride button in the top bar, Book a test ride on the first screen, Order in Lido, Harbour, Mustard and Postbox in the paint section, Order yours and Start riding monthly in the ownership section, Test ride in the menu, Test ride and Book a ride in the footer: now #contact (the test-ride form); owner's target: your booking or order page, or keep #contact once the form is connected.
- Order button in the top bar: now #ownership (the buy or subscribe plans); owner's target: your shop or checkout page.
- How the battery works button on the first screen: now #battery; owner's target: keep, or a page about the battery.
- Phone icon in the top bar, phone links in the menu, the questions, the contact section and the footer: now tel:+442000000000; owner's target: your showroom phone number.
- The form in `#contact` (fields `name`, `email`, `model`, `day`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Hush (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (29, Unsplash: models 3, battery 1, paint 4, details 5, city 8, service 1, reviews 6, contact 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Product claims: a hub motor, a top speed of 45 km/h, a nine kilo battery that lifts out, three hours for a full charge and thirty minutes for the school run, brakes that recharge the battery (opening, battery, faq).
- Models and prices: H1 Classic from £3,190, H2 Panther from £3,490, H3 Courier from £3,890, ranges of 80 and 160 km, two seats, one seat and a 40 litre box (models, faq).
- Four paint names and descriptions: Lido green, Harbour blue, Mustard, Postbox red, and "mixed in Hackney" (paint).
- Ownership terms: £3,190 or 36 months at 0%, a two-year warranty, five years on the battery cells, a free first service, £79 a month with insurance, servicing and theft cover, a spare battery, model swaps and a month's notice (ownership, faq).
- Where it is made: "made in London" (title and meta description), a saddle "stitched in Walthamstow", paint "mixed in Hackney" (details, paint).
- Licence and legal: a one-day CBT, riding straight away with a car licence issued before 2001, the age of sixteen, a tracker and immobiliser (city, faq).
- Servicing: a visit to the door at £59 after the free first service, 45 minutes, a battery health report by email, slots booked online with a text the day before (service, faq).
- Test rides: an hour for free from the Hackney showroom or delivered inside zone 2, and a reply within a working day (faq, contact).
- Reviews: six quotes with first names, models and districts, and "Twelve thousand riders across London" (reviews).
- Showroom: "Hush showroom, 1 Example Street, London E8 0AA", Tuesday to Sunday 10:00 to 19:00, phone 020 0000 0000 and ride@hush.example are placeholders (menu, contact, footer).
- Company line "Hush Electric Ltd, registered in England and Wales." and "Prices include VAT. Range figures are measured in town riding." (footer).
- Details captions: folding mirrors, a sprung saddle, a spare-wheel bracket that doubles as a rack, a round dial, an LED lamp (details).

## Known limits
- Without JavaScript the menu button cannot open the overlay; above 900 px the top bar keeps four links, on phones only the footer links remain.
- The test-ride form only checks name and email and shows a message; it sends nothing until you connect a form service or remove it.
- The model, paint and service sections hold the screen for two, three and about 1.6 screens of scrolling, phones included; on short screens this can feel long.
- The notched panels use the CSS shape() function in clip-path, which older browsers do not support: the black field behind the opening then shows as a plain rectangle.
- Without CSS scroll-driven animation support (Firefox today), with reduced motion on or without JavaScript, nothing moves on scroll or on load and the wheel scrolls natively: nothing holds the screen, the paint fields stack and the model frame shows only the first model's photo, so the other two models appear only as card thumbnails. The top bar still hides on scroll and buttons still fill on hover.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Hush left only in class names.
