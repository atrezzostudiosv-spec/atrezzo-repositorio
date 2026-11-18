# AGENTS.md: smart home website template

One-page website for a smart-home installation firm that designs, wires and looks after homes. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, Lenis 1.3.4 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/smart-home-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/smart-home-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/smart-home-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/smart-home-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:navigation`: `.nav__bar` `.nav__menu` `.menu__close`
  - `section-script:contact`: `.ct-form` `.ct-status`
  - `scene-script:systems`: `.sys-stage` `.sys-row` `.sys-col` `.sys-col__photo` `.sys-col__title` `.sys-col__haze` `.sys-col__text` `.sys-col__tags`
  - `scene-script:scenes`: `.sc-stage` `.sc-list` `.sc-item` `.sc-grade--` `.sc-marker`
  - `scene-script:process`: `.pr-stair` `.pr-cell`
  - `scene-script:care`: `.care-log` `.care-rail` `.care-entry`
  - `scene-script:stories`: `.st-stage` `.st-viewport` `.st-track` `.st-card` `.m-reeds` `.st-quote`
  - `scene-script:footer`: `data-8b-motion`
- `style="--len:N"` = characters in that display line, spaces included: `Kelvin_House` is 12.
- The wordmark "Kelvin_House" is one text with an underscore and style="--len:12" (the number of characters) that sizes it to fill the width. Keep the length in step with a new name.
- The five systems sit side by side through a CSS grid and the systems script reads the columns to build the pinned scene; keep the same markup if you add or remove a system, and the pin length follows the count (0.72 of the screen height each).
- The scenes script reads the four scene items and four colour layers (.sc-grade--1 to 4) over the photo; the layers are CSS backgrounds with blend modes (three gradients and one flat grey) that use the palette variables, so recolour them through the variables, not by editing the image.
- The reeded glass over the photos is a CSS layer (backdrop blur and stripes, driven by --pane), not a second image; --pane is the covered share in percent (50 by default, 0 on the opening and story photos) and CSS and the scene scripts animate it.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #ffffff (page ground, navigation bar, cards and fields, and text on the dark sections), `--color-2` #121316 (body text, full-screen menu ground, the tab strip outline and the selected tab, the arrow inside the orange lamp circles and the fill that grows down the aftercare rail), `--color-3` #f4f4f4 (pale grey ground of the houses and aftercare sections, photo placeholders and the form's thank-you line), `--color-4` #5b5d62 (secondary text, tag badges and placeholders, and the grey layer that drains colour from the scenes photo), `--color-5` #ff5a1f (orange: the fill that sweeps across buttons and tabs on hover, the lamp circles, fact squares, the marker beside the times and the aftercare rail marker), `--color-6` #e2e2e2 (hairlines, card and field borders and the aftercare rail track), `--color-7` #45464b (fill of the dark square-cornered buttons), `--color-8` #0d6a74 (teal start of the daylight gradient in the contact panel), `--color-9` #1f47a3 (blue end of that daylight gradient, a night glow in the opening and the cool morning layer on the scenes photo), `--color-10` #e6a8c6 (pink glow in the contact daylight, the haze behind system names and part of the morning layer), `--color-11` #f3b866 (amber glow for the evening and night layers on the scenes photo and in the contact daylight), `--color-12` #121630 (deep indigo ground of the scenes and stories sections and of the opening night, and the shade that falls over covered house cards), `--color-13` #57224f (plum glow in the opening night, the contact night and the evening layer on the scenes photo); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, email, form): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Book a survey button in the top bar, Book a home survey button in the opening, the plan buttons, Ask about aftercare and Book a survey in the footer: now #contact; owner's target: your booking calendar URL if you book surveys there, or keep them pointing to the survey form.
- Call Ravi button in the FAQ side card: now a tel: link to the demo phone number; owner's target: your own phone number in tel: form, and the name of the person who answers.
- Request a survey button in the contact form: now nothing is sent: the form has action="#" and a script shows the thank-you line; owner's target: your form endpoint (Formspree, Netlify Forms) or your own handler.
- The form in `#contact` (fields `name`, `email`, `phone`, `postcode`, `plan`, `message`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Kelvin House (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (28, Unsplash: opening 2, systems 5, houses 4, scenes 1, process 4, care 1, plans 3, stories 5, faq 1, contact 1, footer 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Speed and promises in the opening and process: "Wired in six to ten working days", "Ten years of aftercare, included", a survey of 90 minutes, a quote within five working days (opening, process, plans).
- Count of finished jobs: "Four of the 320" (houses).
- Plan prices: Essentials £4,800, Whole house £14,500, New build £9,200, all "from, fitted"; the time on site (three days; six to ten working days; two visits) and the payment parts (plans, FAQ).
- Aftercare terms: ten years of parts and labour, a same-week call-out, a named engineer, a nightly remote check, an annual visit, two years on Essentials, and the optional plan at £14 a month from year eleven (care, plans, FAQ).
- Houses: Mill House (Ilkley), Larch Rise (Harrogate), Cardigan Road (Headingley), The Old Dairy (Otley) with years 2023 to 2025 and the systems fitted (houses). They are invented; the photos are stock.
- Scene times and what the house does in them: 06:45, 08:30, 18:40, 23:15, heating down to seventeen at night (scenes).
- Customers: Hannah Bell, Marcus Odell, Pat and Ian Firth, Sofia Varga, Tom Reyes with districts and their claims such as "the heating bill fell by a third" and "the quote never moved" (stories); the portraits are stock photos.
- Claims in the FAQ: no chasing of walls in most homes, everything keeps working without internet, no lock-in with every password, drawing and device list handed over, own engineers and no subcontractors (process, FAQ).
- The person who answers: "Ravi" and "Ravi takes calls on weekdays from eight till six" (FAQ, contact).
- Area and hours: "anywhere in West Yorkshire", Mon-Fri 8:00-18:00, Sat by appointment, workshop "1 Example Street, Leeds LS1 0ZZ" (contact, footer).
- Survey promise: free, about 90 minutes, a call "within one working day" (contact, the form's thank-you line).
- Footer: "© 2026 Kelvin House Ltd. Smart-home installers, Leeds.": put in your legal name.

## Known limits
- Without JavaScript the Menu button cannot open the overlay and the survey form shows no thank-you line; the tab strip is hidden and all three plans show one after another, and the FAQ opens natively.
- Without scroll-driven animation support (Firefox today) the page shows its finished layout: no entrance, no pins, the house cards in normal flow and the stories as a grid; only the opening glow blobs still drift. With reduced motion on, the blobs stop too, but the bar still hides on scroll down and links keep their hover sweep.
- The house stack is built for exactly four cards: each covered card steps back on its own timeline in CSS :nth-of-type rules, so a fifth card would not stack back unless those rules get a fifth entry.
- The pinned systems scene works only from 1024 px wide; on phones it is replaced by a lighter reveal per photo.
- The colour layers over the scenes photo use mix-blend-mode and the reeded glass on the photos uses backdrop-filter blur, which can cost frames on weak phones.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Kelvin House left only in class names.
