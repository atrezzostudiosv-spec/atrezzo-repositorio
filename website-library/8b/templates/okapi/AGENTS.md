# AGENTS.md: bakery website template

One-page website for a neighbourhood bakery and coffee counter that sells monthly boxes by pre-order, with cakes, catering and gift cards. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/bakery-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/bakery-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/bakery-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/bakery-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:navigation`: `.nav__toggle` `.menu__close`
  - `section-script:visit`: `.vs__form` `.vs__status`
  - `section-script:footer`: `.ft__news` `.ft__status`
  - `scene-script:scissor`: `.rv__band` `.rv__track`
  - `scene-script:oven-dial`: `.ov__item`
  - `scene-script:deal`: `.st__fan` `.st__card`
  - `scene-script:stickers`: `.wy__mark` `.wy__sticker`
  - `scene-script:frame`: `.ck__frame` `.ck__fill` `.ck__card` `.ck__quote` `.ck__platter`
- `style="--len:N"` = characters in that display line, spaces included: `Okapi` is 5.
- The footer wordmark "Okapi" is sized from style="--len:5", the number of characters: update it when the name changes length.
- The reviews script clones each row once and aria-hides the clone: edit quotes in the original rows only, and keep three per row so the loop fills the ribbon.
- The colour blocks, blobs, the sun disc, the round mark and the starbursts are CSS and SVG, not images: recolour them through the colour variables in :root. The page keeps unused CSS for a box scene from a removed first screen, which does no harm.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #ffffff (page background, photo frames, form fields, white chips and cards, and the text in the violet footer), `--color-2` #0e0b16 (body text, button lids, dark badges and field borders), `--color-3` #ffd24a (the bake of the year panel, the logo tab in the nav and yellow cards), `--color-4` #faed8f (pale yellow card ground, photo frames in the bake of the year and the ground of the stickers section), `--color-5` #f9a220 (orange starbursts, the small button label and some stickers), `--color-6` #e0007a (the main button label, the favicon and the times in the morning shift cards), `--color-7` #fd48f2 (the oven list panel, the phone menu overlay and the striped box band), `--color-8` #a6f6f8 (the cyan panel of the opening screen), `--color-9` #1ce8ed (link underlines and fills, badges, one tray card, the gift section ground and the second review ribbon), `--color-10` #ffdbfd (the pre-order steps panel, the pink fill of the cake frame and the pale pink the oven list fades toward), `--color-11` #3b308f (the footer ground, most handwritten notes, the dot print and striped bands), `--color-12` #670a2e (dark wine text and ring on the sticker section and the second review ribbon), `--color-13` #a58bf0 (lavender cards in the tray, the steps fan and the stickers), `--color-14` #1b1545 (the midnight ground at the start of the morning shift section); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, email, form, social): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Pre-order a box button in the nav and the phone menu: now #october, the first block with the monthly bakes; owner's target: your online ordering page, or keep #october if the box is ordered by the form.
- Build your box button in the first block and Start a box button in the steps section: now #visit, the order form; owner's target: your box builder or ordering page, or keep #visit once the form is connected.
- Order a cake button in the cakes section: now #visit; owner's target: your cake order form or enquiry page.
- Buy a gift card button in the gift section: now #visit; owner's target: your gift card checkout page.
- Still wondering? Ask the bakers link in the FAQ: now #visit; owner's target: keep it, or point it to a chat or contact page.
- Privacy and Terms links in the footer: now #visit; owner's target: your privacy and terms pages.
- Instagram and TikTok icons in the footer: now the home pages https://www.instagram.com/ and https://www.tiktok.com/; owner's target: your own profile addresses.
- The two forms (the order form in the visit section and the email list form in the footer): now nothing is sent: a script checks the fields, shows a thank-you line and clears the form; owner's target: a form service or your own endpoint in the form action, and remove the preventDefault in the section scripts.
- The form in `#visit` (fields `name`, `email`, `what`, `note`) sends nothing. Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it.
- The form in `#footer` (fields `email`) sends nothing; `section-script:footer` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Okapi Bakehouse (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (22, Unsplash: opening 6, steps 4, bake-of-the-year 4, morning-shift 4, cakes-and-catering 2, gift-boxes 1, contact 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Prices: croissant $4.50, babka $7.00, focaccia $5.00, cinnamon swirl $4.75, tart $6.00, tartlet $5.50 (first block); cake from $48 for a six-inch and office platters from $65 (cakes).
- Ordering rules: pre-order by 8 pm the night before, collect from 7 am, "any six" with up to two of the same bake, breads count as one item (first block, steps, FAQ).
- Notice and sizes: any cake with 48 hours' notice, office platters for 10 to 80 people with a day's notice (cakes).
- Delivery: within three miles of the shop, between 7 and 10 am, free on boxes, cakes and platters (FAQ, reasons, first block).
- Allergies: a vegan bake and a gluten-free one every month, baked with nuts and wheat daily, no free-from kitchen (FAQ); diet tags on the six cards.
- Location and hours: the address in Portland, Tuesday to Friday 7 am to 3 pm, Saturday and Sunday 7:30 am to 2 pm, closed Mondays (visit, footer).
- Phone (503) 000-0000 and hello@okapi.example are placeholders (visit, footer icon, footer).
- The 4 am crew: four bakers, a deck oven, and a twelve-year-old sourdough starter called Gerald; the schedule 4:00, 5:15, 6:20, 7:00 (morning shift).
- Bake of the year: winners 2025 to 2022, the December vote and the recipe card by the till; voting for 2026 opens December 1st (bake of the year).
- Monthly list: new bakes join the counter on the 1st of every month; the New and Seasonal tags and the October wording in the first block and the meta description.
- Sourcing claims in the sticker lines: real butter, flour from one farm, never sold day-old, coffee from next door (reasons).
- Customer quotes and first names: Priya, Marcus, Dana, Theo, Lou, Ren (reviews), Jess and Omar (cakes). Replace with real, permitted quotes.
- Gift cards: delivered by email at once or in a printed sleeve from the counter, the person who gets it picks the day and the bakes (gift).
- Email list promise: the list arrives on the 1st of the month (footer form).

## Known limits
- Without JavaScript the phone Menu button cannot open the overlay. The footer repeats the main links, so every section stays reachable.
- Fixed counts: CSS rules address the four step cards by :nth-of-type, and the reviews section has two ribbons (rv__band--a and rv__band--b). The oven list carries data-8b-fixed, but its dial measures every line, so lines can be added or removed; the six reason stickers take their order from --i, so any number works.
- Without scroll-driven animation support (Firefox today) each section shows its finished layout: the step cards rest in their fan, the oven list stands at full weight, the morning shift stays on its dark night ground and the review ribbons stand still with their quotes wrapped; only the opening text still rises on load. With reduced motion on, nothing moves on load either. The text of the morning shift sits on white cards and chips, so it stays readable on the night ground.
- Both forms only simulate sending. They need a form service or an endpoint before the site can take orders.
- The Privacy and Terms links point to the order form, and the social icons point to the home pages of the networks, until you set real addresses.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Okapi Bakehouse left only in class names.
