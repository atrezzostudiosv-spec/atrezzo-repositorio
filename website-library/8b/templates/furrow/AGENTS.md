# AGENTS.md: farm delivery website template

One-page website for an organic veg box or farm delivery scheme that serves local postcodes. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.4 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/farm-delivery-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/farm-delivery-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/farm-delivery-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/farm-delivery-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:nav`: `.nav__menu` `.menu__close`
  - `section-script:boxes`: `.bo-slip` `.bo-price` `.bo-when` `.bo-fit` `data-price` `data-label` `data-fit`
  - `section-script:contact`: `.ct-form` `data-state` `.ct-areas` `data-prefix` `data-slot` `data-day`
  - `scene-script:day-track`: `.dy-track`
  - `scene-script:promises-dial`: `.pr-list`
  - `scene-script:recipes-deal`: `.rc-grid` `.rc-card`
  - `scene-script:contact-open`: `.ct-slip` `.ct-slip__ground`
- `style="--len:N"` = characters in that display line, spaces included: `FURROW` is 6.
- The postcode check is a script that takes the first one or two letters of what is typed and looks for a row in the area list with the same data-prefix; the day shown comes from its data-day. Add or change areas by editing those rows; a prefix is one or two letters, such as SE or BN.
- The box builder reads data-price, data-fit and data-label on its inputs, so a new size or extra needs those attributes and a matching price in the visible label.
- The six promises pair with the six arms of the asterisk by order: the CSS gives each promise its own view timeline and each arm its own animation by :nth-of-type (data-8b-fixed="6"), so keep six promises and six arms.
- The four grower cards are timed one by one in the CSS (data-8b-fixed="4"): each card shrinks and darkens on the timeline of the card after it.
- The asterisk, the dot grids and the star on buttons are inline SVG and CSS, not images: recolour them through the colour variables in :root (lime is --color-1, near-black --color-2).
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #c9e36b (nav bar and menu overlay, growers and promises grounds, the lime cards (opening, box builder, contact), the footer button and wordmark, the star on near-black buttons), `--color-2` #131512 (text, rules, the near-black buttons, grower and returns panels, recipes and footer grounds, selected choices, the last colour of the day section), `--color-3` #ffffff (box, boxes and questions grounds, the day and recipe cards, the promises asterisk, text on near-black), `--color-4` #c4c7be (secondary text and rules on dark grounds, footer headings and small print, the returns and footer dot grids), `--color-5` #5c6257 (secondary text on white: leads, farm lines in the box rows, notes, times, recipe meta, answers, the field placeholder); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, form, email, phone): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Start a box button in the top bar, the menu and the footer: now #boxes (the box builder); owner's target: your sign-up or checkout URL.
- Build your box button in the opening: now #boxes; owner's target: your sign-up or checkout URL, or keep it on the builder.
- Check my postcode button under the box builder: now #contact (the postcode check); owner's target: your checkout with the chosen size and extras, or keep it on the postcode check.
- How returns work link in the returns section: now #faq; owner's target: your returns page, or keep it on the FAQ.
- The postcode check (Check button and the six area rows): now a script that reads the first letters of the postcode against six areas and shows a day or a no; owner's target: your own delivery areas and days (change each row's data-prefix and data-day), or a call to your delivery-area service.
- The form in `#boxes` (fields `size`, `often`, `extra`) sends nothing; `section-script:boxes` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The form in `#contact` (fields `postcode`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Furrow (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (23, Unsplash: opening 1, box 7, growers 4, day 5, returns 1, recipes 4, contact 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Farms and growers: Hollow Lane Farm (Cranbrook), Wickham Fields (Rye), Ashdown Growers (Forest Row), Little Hoath (Ticehurst); Maya Okafor (twelve acres of heavy clay), Tom Ashby (four unheated tunnels), Ruth Penfold, Gerald Hayes ("forty-one harvests"); their quotes; the portraits are stock photos (box, growers).
- Scale and radius: "Twenty-seven growers", "within forty miles of the packhouse", "certified organic", "six electric vans" (growers, promises, day).
- This week's box: seven vegetables with varieties, farms and cut days (box); "The list changes every Friday", swaps of up to three things, order by Sunday midnight (box, footer, FAQ).
- Prices: Small £17 (one or two people), Medium £23 (three or four), Large £30 (five or more); fruit bag £6, six eggs £3.50, sourdough loaf £4.20; "Prices include delivery and the crate" (boxes).
- Delivery: one delivery day a week, Tuesday to Friday, vans between three and seven in the evening, the six area prefixes with their days, "By 19:00" at your door (day, FAQ, contact).
- The day's timetable: 05:00 cut, 09:00 washed, 12:00 packed, 15:00 on the road (day).
- Crates: "about forty trips" and what happens when one goes missing (returns, FAQ).
- Promises: no air freight, no gas heating, no plastic, growers set the price, picked the day it travels, "No contract and no minimum" (promises, FAQ).
- Certification: "Every farm we buy from is certified" and a licence number printed on the recipe card; "Certified organic produce from certified farms" (FAQ, footer). Put in your certifier and numbers.
- Recipes: four dishes with times of 20 to 50 minutes (recipes).
- Contact: email, phone, "1 Example Street, Cranbrook TN17 0ZZ", phones answered Monday to Friday 8 to 5 (contact, footer).
- Footer: "© 2026 Furrow Growers Ltd. Registered in England."; put in your legal name and registration.

## Known limits
- Without JavaScript the menu button cannot open the overlay, the box builder total stays at the starting £23.00, and the postcode Check button reloads the page without an answer.
- The postcode check and the box builder are demo scripts and send nothing; connect them to your own checkout and delivery data.
- The top bar hides while you scroll down and returns on scroll up, also with reduced motion on and in Firefox.
- The day section holds the screen (CSS sticky) for as far as the track overflows the screen width, which feels long on a phone.
- The CSS has rules for four grower cards and six promises only: under a fifth card the fourth would not shrink and darken, and a seventh promise would have no arm and stay dimmed while read.
- Section links jump straight to the section with no offset for the fixed top bar, so after a jump upward the bar can cover the top of the section.
- Without CSS scroll-driven animation support (Firefox today) or with reduced motion on, the scroll animations and the smooth wheel are off: the day steps sit in a grid, grower cards stack plainly, the asterisk shows all six arms with every promise at full strength, and the recipe cards sit in their grid. In Firefox the opening still loads in.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Furrow left only in class names.
