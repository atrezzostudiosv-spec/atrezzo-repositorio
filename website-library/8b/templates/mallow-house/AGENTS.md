# AGENTS.md: daycare website template

One-page website for a day nursery that takes children from one to five years old. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/daycare-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/daycare-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/daycare-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/daycare-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:navigation`: `.nav__menu` `.menu__close` `.nav__link`
  - `section-script:visit`: `.vi-form` `.vi-done`
  - `scene-script:making`: `.mk-table` `.mk-item`
  - `scene-script:kitchen`: `.kt-slab` `.kt-day` `.kt-bowl`
  - `scene-script:fees`: `.fe-row` `.fe-plan`
- `style="--len:N"` = characters in that display line, spaces included: `Mallow House` is 12.
- The rooms rise in height through four nth-child rules in the section CSS (76%, 84%, 92%, 100%) and each room has its own ground class (m-surface-6, -4, -3, -5); a fifth room also needs a fifth column in the four-column grid (.rm-list), a fifth height and width rule and a fifth --rm-i delay rule in the rooms section CSS.
- The settling scene is written for four steps and three portraits: the parent and key person positions are keyframes in the scene CSS, the lilac step fill is timed for four steps, and the stage lines are SVG elements with their own coordinates. Edit the scene CSS if you change the step count.
- The wordmark uses style="--len:12" (the number of characters) to fill the width; update it when you rename the nursery.
- The kitchen script rolls each .kt-bowl using half its width as the radius, and the settling scene moves and scales the .st-person wrappers around the round .st-face portraits; keep the bowls and portraits square. The garden slab swells from its lower left corner, set in the CSS; its data-swell-origin attribute is no longer read.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #f6eada (page ground), `--color-2` #fdf8f1 (cards: settling steps, question items, lunch days and fee plans, form fields and date pills, the floating nav bar, the round icon buttons and the menu links), `--color-3` #4a2a1f (text, focus outlines and the favicon ground), `--color-4` #e2588b (second dot of the logo mark and the low wash under the text links that fills on hover), `--color-5` #ae9aea (lilac: the Buds room ground, the fee tray, the full-screen menu, the footer ground, the first logo dot, the plus discs in the questions, the settling step fill and the nav link pill on hover and for the section in view), `--color-6` #7a5bd0 (violet: the main buttons and the chosen Saturday pill), `--color-7` #bfe6b0 (mint: the Blooms room ground, the garden slab, the booking form, the six craft photo labels and the nut-free badge), `--color-9` #f6d167 (butter yellow: the Meadow room ground, the lunch slab, the small badges and the fourth logo dot), `--color-10` #f8c8d9 (pale pink: the Shoots room ground, the making-table slab and the settling stage), `--color-11` #ffffff (text on violet and pink buttons, the arrow discs, the rings round the bowls and portraits, and the highlight in the inner shadows), `--color-12` #c93a72 (deep pink: the Book a visit button in the nav bar and in the menu), `--color-13` #7b5c4f (softer brown for the dish lines, the price units and the contact facts), `--color-14` #a6d996 (light green, used only for the third dot of the logo mark); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, email, form): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Book a visit buttons in the top bar, the menu and the rooms intro: now #visit; owner's target: your booking page, or keep them pointing to the open-morning form.
- Fees and funded hours link in the rooms intro and the Ask about your hours button in the fees section: now #fees and #visit; owner's target: keep them, or point the button at your enquiry page.
- Book my place button in the visit form: now nothing is sent: the form has action="#visit" and a script shows the thank-you line; owner's target: your form endpoint (Formspree, Netlify Forms) or your booking system.
- The form in `#visit` (fields `name`, `email`, `age`, `morning`, `notes`) sends nothing; `section-script:visit` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Mallow House (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (21, Unsplash: rooms 4, making 6, garden 2, settling 3, kitchen 5, visit 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Ages and rooms: from twelve months to school age, four rooms with age ranges and adult-to-child ratios (1 to 3, 1 to 4, 1 to 6, 1 to 8) (rooms, FAQ). Check ratios against your regulator's rules.
- Staff names: "Jess" (key person), "Rosa" (cook), and the key person for every child (settling, kitchen, FAQ, meta description).
- Fees: Mornings £44 a session, School day £56 a session, Full day £72 a day, meals, snacks, nappies and trips included (fees).
- Funded hours: "15 and 30 funded hours", from nine months old in the fees note, "every age we care for" in the FAQ and "Funded hours begin" in the Blooms room (3 to 4 years), taken off the bill (fees, FAQ, rooms). Check the eligibility rules of your country.
- Opening: Monday to Friday, 7:30 to 18:00, 51 weeks a year, closed between Christmas and New Year (visit, footer, FAQ).
- The two-week settling plan: days, durations (an hour, twenty minutes) and who stays (settling).
- The week's menu for "the week of 12 October" with five dishes and puddings, and the nut-free kitchen claim (kitchen, FAQ).
- The garden claims: walled garden, out twice a day, the five features (garden).
- Open mornings: Saturday mornings in October from ten till twelve, with the three dates 10, 17 and 24 October (visit); update them.
- Waiting list: "For Buds there often is" (FAQ).
- Reply promise: "within one working day" (visit form and thank-you line).
- Footer: "© 2026 Mallow House Nursery Ltd. Ofsted registered.": put in your legal name and your regulator, or remove the registration claim.

## Known limits
- Without JavaScript the menu button cannot open the overlay and the visit form shows no thank-you line; the FAQ opens natively.
- Without scroll-driven animation support (Firefox today) and with reduced motion, the scroll scenes, the press and swell arrivals and the smooth wheel are off and every section shows its finished layout. The first screen load-in and the icon-button squash still play in Firefox and stop with reduced motion; the bar still hides on scroll down in both.
- The CSS animates fixed counts, each group marked data-8b-fixed: four rooms, four settling steps, five lunch days and three fee cards. A different count needs the matching scene CSS changed, or the extra item moves out of step.
- The open-morning dates, the menu week and the funded-hours rules are for one place and one year and will read as out of date if left.
- The squash and roll scenes move many rounded photos at once, which can feel heavy on weak phones.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Mallow House left only in class names.
