# AGENTS.md: electric moped website template

One-page website for an electric moped maker or dealer selling three models, with buy or monthly plans, kerbside service and a test ride form. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, SplitText, MotionPathPlugin, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/electric-moped-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/electric-moped-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/electric-moped-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/electric-moped-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:nav`: `.nav__menu` `.nav__close`
  - `section-script:contact`: `.ct__form` `.ct__done` `.ct__error`
  - `scene-script:details`: `.de__strips` `.de__cap` `.de__stage`
  - `scene-script:routes`: `.ro__map` `.ro__route` `.ro__rider` `.ro__dot` `.ro__stop` `.ro__stage`
  - `scene-script:reviews`: `.rv__grid`
  - `scene-script:footer`: `.ft__mark` `.c`
- `style="--len:N"` = characters in that display line, spaces included: `Hear the city,` is 14, `not the engine.` is 15, `Arco.` is 5.
- The two headline lines in the first screen and the footer wordmark use style="--len:N" (their character count) to fit the width: change N whenever you change the words.
- The models motion is written in CSS for exactly three models (the rows #mo-uno, #mo-nero, #mo-argento and three thumbnails), and the routes motion pairs five stops with five day dots; the map labels are placed by percentage to match the SVG circles, so move a stop and its label together.
- The battery, the street map, the charge bar and the logo mark are CSS or SVG, not images: recolour them through the colour variables in :root, which keep the single red accent.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #e9eaec (page ground, the nav bar and the phone menu overlay), `--color-2` #d4d6d8 (grey panels and photo placeholders, the Own it plan, model badges, river and street lines on the map), `--color-3` #ffffff (pill cards, the Ride monthly plan, question rows, the street map ground, the second-style buttons), `--color-4` #121316 (text, the main buttons, the battery section ground, the route line, map labels), `--color-5` #555960 (secondary text: leads, descriptions, captions, field labels), `--color-6` #cc2c24 (the only accent: button icon discs, charge segments, route rider, review stars, list markers, the wordmark full stop), `--color-7` #a2a6ad (paragraph text and the slot label on the dark battery section), `--color-8` #24262b (battery cell, handle and slot, and the time rules on the dark section), `--color-9` #b9bdc3 (hairlines between specs, plan items and footer, and form field borders); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, form, email): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Book a ride button in the nav, Book a test ride in the phone menu, in the first screen, in the Own it plan and in the footer, Start monthly in the Ride monthly plan: now #contact; owner's target: your online test ride booking page, or keep #contact once the form is connected.
- Ride an Uno, Ride a Nero and Ride an Argento buttons in the models section: now #contact (the form's Model select is not preselected); owner's target: a booking page per model, or keep #contact and preselect the model in the form.
- Call us button in the nav, the phone link in the phone menu, the Still unsure? caption in the questions, the Call pill in the contact section and the footer phone link: now tel: link to the placeholder number; owner's target: your real phone number in tel: form (+44...) and the visible form.
- Write pill in the contact section and the email in the footer: now mailto: link to the placeholder address; owner's target: your real sales or booking email.
- Contact form (Book my ride): now action="#" with nothing sent; the script only checks name, phone and email and shows the thank-you line; owner's target: a form service endpoint (Formspree, Netlify Forms) or your booking system.
- The form in `#contact` (fields `name`, `phone`, `email`, `model`, `day`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Arco (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (15, Unsplash: opening 1, models 3, workshop 1, details 3, service 2, faq 1, reviews 4, contact 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Prices: Uno £2,490 (or £69 a month), Nero £2,890 (£79 a month), Argento £2,690 (£74 a month), "Own it" £2,490 once, "Ride monthly" £69 a month, "spread it over twelve months at no interest" (opening, models, plans).
- Specs: top speed 45 km/h on every model; range 80, 90 and 70 km; weight 78, 82 and 74 kg; two seats; "a car licence is all you need"; a nine kilo battery with a handle; a charge in three and a half hours (opening, models, battery).
- Licence rules: "A full car licence lets you ride any Arco", a CBT certificate from the age of sixteen, and the shop booking the course (faq).
- Winter range: "about a fifth of their range" lost in the cold, sixty kilometres on a frosty week, a spare battery that doubles the range (faq, reviews).
- Charging times: 19:00, 20:45 and 22:30, "full before the evening is over" (battery); a week of rides of 14, 9, 12, 19 and 8 km, sixty-two kilometres in all, "a fifth left on Friday night" (routes).
- Manufacturing: "two thousand" parts in a petrol moped against "two hundred and forty" in an Arco, the works at Harbourside, frames welded and painted there, a test loop of the docks (workshop, footer).
- Plan terms: a two-year warranty on frame, motor and battery, a free first service, a helmet and a disc lock in the box, insurance, servicing and tyres included, a swap once a year, a replacement within a day, hand back with a month's notice (plans, faq).
- Service promises: a technician rides to your kerb, forty minutes, brakes, tyres, lights and software, example slots such as Tue 18:30, the report by email, nothing extra for monthly riders (service).
- Security and weather claims: a tracker and an alarm in the app, it will not start without the phone or key card nearby, sealed motor and battery, "a Bristol downpour is no trouble" (faq).
- Reviews: 4.8 out of 5, "more than twelve thousand reviews", the six named riders with districts, quotes and the model they ride; the portraits are stock photos of real people (reviews).
- Details: a lamp that sees sixty metres, twelve-inch wheels, heated grips, a USB-C port in the Nero glovebox, a top box and pillion seat standard on the Uno (details, models).
- Test ride offer: thirty minutes on a quiet loop of the harbour, no deposit, helmets provided, a text "within the hour" to confirm (contact).
- Place and company: Bristol, the shop address, the phone, the email, the company name "Arco Electric Ltd, registered in England" and the copyright year (contact, footer).

## Known limits
- Without JavaScript the phone menu button cannot open the overlay; the footer repeats Models, Plans, Battery, Range, Service and Questions, so phones can still reach them. The contact form cannot show its thank-you line.
- The nav links on desktop leave out Plans and Questions; they are reachable in the phone overlay and in the footer.
- Four sticky sections (models, details, routes, service) hold the screen for about two screens of scrolling each; there are no rules for short landscape screens.
- Counts are fixed in the CSS: three models (timed per model id and by :nth-of-type on the thumbnails), ten battery segments, three charging times, three close-ups, five days on the map and four service steps; another count needs new CSS rules.
- Without scroll-driven animation support (Firefox today) the page shows its finished layout: the models, close-ups and service steps stand one under another or in a grid, the battery shows full and the map the whole route; only the opening load-in and the phone photo drift still play. With reduced motion on, nothing moves on its own; the top bar still hides on scroll down.
- The same moped photo is used for the first screen, the thumbnail stack and the Uno row, so changing the first model means changing three images.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Arco left only in class names.
