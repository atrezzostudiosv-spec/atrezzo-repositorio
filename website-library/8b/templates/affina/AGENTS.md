# AGENTS.md: cheese shop website template

One-page website for a cheese shop with its own maturing cellar, with a counter list, tastings, a monthly club and a visit form. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/cheese-shop-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/cheese-shop-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/cheese-shop-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/cheese-shop-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:navigation`: `.nav__menu-btn` `.nav__close` `.nav__overlay`
  - `section-script:visit`: `.visit__form` `.visit__status` `data-sent` `data-invalid`
  - `scene-script:cellar`: `.cellar__photo` `.cellar__step`
  - `scene-script:farms`: `.farms__stage` `.farms__track` `.farms__photo`
- `style="--len:N"` = characters in that display line, spaces included: `Cow` is 3, `Ewe` is 3, `Goat` is 4, `Affina.` is 7.
- The wordmark in the footer is sized by style="--len:7", the number of characters including the full stop, and the three giant milk words by --len:3, --len:3 and --len:4. Change N when you change a word.
- The counter panels get their height from inline --h (the stepped skyline on wide screens) and their width on phones from inline --w; give a new cheese a pair of its own.
- The cellar holds exactly five steps and five photos in the frame, one per step in the same order (data-8b-fixed="5"): its quarter turns and photo fades are CSS keyframes for five, so another count leaves the frame out of step with the list.
- The milk bands and the club parcels are fixed at three (data-8b-fixed): the CSS motion picks each band's sweep and each parcel's timing by its :nth-of-type position.
- The visit photo is the same image three times (two hidden from screen readers), shown as three columns; change the photo in all three.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #f3f3f3 (page ground of the first screen, counter, milk, cut, tastings, questions and footer sections, and the bar once scrolled), `--color-2` #0e0e0e (text and button borders on light grounds, and the ground of the second screen, cellar, farms, club, visit and the labels), `--color-3` #5c5c5c (intro paragraphs, tasting descriptions, seats, cut tip terms, answers and the footer base line on light grounds), `--color-4` #d3d3d3 (hairlines on light grounds, the outlined ghost word and the grid rules of the first screen), `--color-5` #ffffff (text and outline buttons on black grounds, the label text, and the visit form's inputs), `--color-6` #a5a5a5 (small text on black: label meta, step numbers, paragraphs on black, form labels and the milk cheese lists), `--color-7` #2e2e2e (rules on black, the ground of club parcels and the cellar frame, and the placeholder behind photos); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, email, form): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Visit the shop button on the first screen and the Order for collection link in the counter section: now #visit; owner's target: your shop's order page or phone number, or keep #visit once the form is connected.
- This week's wheels and How the cellar works links on the first screen: now #counter and #cellar; owner's target: keep.
- Book a seat links in the tastings list: now mailto: links to the shop's email with the tasting's name and date in the subject; owner's target: your ticket or booking page for each tasting.
- Join with Pair, Join with Board and Join with Cellar buttons in the club: now mailto: links to the shop's email with the plan in the subject; owner's target: your subscription checkout for each plan.
- Send to the shop button in the visit form: now does not send anything: the form action is #, and section-script:visit checks the name and email and shows the thank-you or error line; owner's target: a form service (Formspree, Netlify Forms) or your own endpoint.
- Phone and email links in the menu, the visit section and the footer: now tel: and mailto: placeholders; owner's target: your real phone number and email address.
- The form in `#visit` (fields `name`, `email`, `message`) sends nothing; `section-script:visit` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Affina (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (28, Unsplash: opening 2, counter 5, cellar 5, milks 3, cut 1, farms 7, tastings 1, club 3, visit 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Cheese prices: £38.40, £34.00, £42.00 and £44.00 per kilo, £4.20 each for a crottin (counter, opening label).
- Cheese details: milk, raw or pasteurised, ageing times (3 weeks to 24 months) and cheese names such as Fossdyke Cloth Cheddar, Hartside Blue, Comté (counter, milks).
- Cellar facts: 11 °C all year, 92 per cent humidity, wheels turned every Thursday by hand, forty steps below the shop (opening, cellar).
- Farms: seven named farms with places in Yorkshire, Durham, Somerset and the Jura, and the claim that every farm is visited at least once a year (farms).
- Tastings: dates 5 Nov, 3 Dec, 7 Jan and 4 Feb, themes, 14 seats each, prices £34 to £38, bread, pickles and a matched glass included, monthly on a Thursday (tastings; the dates are also in datetime attributes).
- Club: Pair £24, Board £39, Cellar £62 a month, first Friday of every month, pause or cancel any month, free delivery in York and £6.50 by courier elsewhere in mainland UK (club).
- Posting: Tuesday to Thursday by next-day courier, none on Fridays, two weeks' notice for big wheels, vegetarian rennet on about half the counter (faq).
- Quantities and keeping: 100 g a person for a board, 150 g as a main, two to three weeks for hard cheese, about a week for soft (cut, faq).
- Hours: Tuesday to Friday 9.30-18.00, Saturday 9.00-17.30, Sunday 10.00-16.00, closed Monday; cellar open for a look on Saturdays (visit, footer).
- Address and contact: "1 Example Street, York YO1 0ZZ", 01904 000 000 and hello@affina.example are placeholders (menu, visit, footer, title and meta description).
- Company: "Affina Cheese Ltd" in the footer; "seven makers in Yorkshire, Somerset and the Jura" in the first screen (the farms also list County Durham) and "seven makers" in the meta description.
- Replies: "We'll reply within a day, usually before the shop opens" (visit form).

## Known limits
- Without JavaScript the menu button does nothing: on phones the bar shows only the wordmark and the button, and Three milks and Our farms are linked only from the menu; the footer links to Cheeses, Cellar, Cellar club, Visit, Tastings and Questions.
- The visit form sends nothing yet: the action is # and the thank-you line comes from a script.
- The tasting and club buttons open a mail program, not a checkout, until you replace the links.
- Without CSS scroll-driven animation support (Firefox today) or with reduced motion on, the scroll scenes do not run and the wheel scrolls natively: the first screen keeps its small black block, the cellar frame stays square on the first of its five photos, the farms are a plain grid and the club parcels sit in their row. The opening load-in and the two slow loops still play in Firefox, not with reduced motion.
- The nav hide-on-scroll and hover transitions keep running with reduced motion.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Affina left only in class names.
