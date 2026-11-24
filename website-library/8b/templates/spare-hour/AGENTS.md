# AGENTS.md: nonprofit website template

One-page website for a volunteering network, charity or community group that lists open volunteer hours, takes sign-ups and asks for donations. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/nonprofit-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/nonprofit-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/nonprofit-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/nonprofit-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:site-nav`: `.nav__menu` `.menu__close`
  - `section-script:give`: `data-give-form` `data-give-message`
  - `section-script:contact`: `data-signup-form` `data-signup-message`
  - `scene-script:saturday-strip`: `.saturday__track` `.saturday__row`
  - `scene-script:streets-fill`: `.streets__names` `.street`
- `style="--len:N"` = characters in that display line, spaces included: `Spare Hour` is 10.
- The footer wordmark gets its size from style="--len:10", the number of characters in Spare Hour including the space: update it when the name changes.
- The drawer is built for six folders: each folder has its own scroll keyframes, picked by its cause class (folder--food, --reading, --river, --repairs, --company, --gardens), and the scroll run is set for five steps (--drawer-steps: 5, about 64% of a screen each). To add, remove or reorder folders, write matching keyframes and update --drawer-steps. The streets-fill script reads the neighbourhood names, so their number is free; the causes row has six cards in a stepped profile that CSS sets by position.
- The folder tabs, the colour fields and the highlighter strokes are CSS: recolour them through the colour variables in :root (each cause has its own colour variable).
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #ffffff (page ground, step cards, input fields, white neighbourhood pills, text on the dark sections), `--color-2` #121212 (text, buttons, the Saturday section and footer grounds), `--color-3` #f3c03e (yellow: opening screen and giving section grounds, Repairs colour, button hover fill, highlighter stroke), `--color-4` #5c5c5c (lead paragraphs, answers and other secondary text), `--color-5` #e4e4e4 (hairlines between rows, the nav bar's shadow line, quotation marks), `--color-6` #ff6a21 (orange: Food folders, cards and pills, and one sign-up photo card), `--color-7` #187a44 (green: Gardens folders, cards and pills, and one sign-up photo card), `--color-8` #3a96e0 (blue: Reading folders, cards and pills, and one sign-up photo card), `--color-9` #a6dcb4 (pale green: Company folders, cards and pills, the sign-up thank-you note, the groups photo ground), `--color-10` #0d5c4c (deep teal: River folders and cards, the neighbourhoods section ground, one sign-up photo card); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, email, form): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- See this week's hours button on the first screen, and the Open hours link in the nav and the footer: now #hours; owner's target: keep it, or your live opportunities page.
- See all 214 hours button and every Book this hour link on the six folders: now #contact; owner's target: the booking page for that hour (one link per folder) and your full opportunities list.
- Sign up buttons in the nav and the phone menu: now #contact; owner's target: your volunteer sign-up page.
- Post an hour button in the groups section: now mailto:groups@sparehour.example; owner's target: your form or page for groups to post an hour.
- Give now button in the donation picker: now nothing is sent: it shows a preview message; owner's target: your donation page or payment link, with the chosen amount and the monthly checkbox passed on.
- The search and gift icon buttons in the nav: now #hours and #give; owner's target: keep them or point them at your own pages.
- The form in `#give` (fields `amount`, `monthly`) sends nothing and takes no payment; `section-script:give` does not validate it: it only stops the submit and shows the preview message. Point Give now at your own donation page or payment link (pass the amount and the monthly choice), or delete the form and the script.
- The form in `#contact` (fields `name`, `email`, `neighbourhood`, `free`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Spare Hour (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (24, Unsplash: causes 6, saturday 6, voices 3, for-groups 1, give 3, contact 5): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Organisation: Spare Hour, a volunteering network in Glasgow described as "a Scottish charitable incorporated organisation" with a charity number, and its footer address (title, meta description, footer).
- Network size: 214 open hours across 38 groups this week, thirty neighbourhoods with hour counts such as "12 h" (open hours, neighbourhoods).
- The six folders: neighbourhood, cause, title, day and time, length and places left for each; all invented (open hours).
- Volunteer rules: no rota or minimum term, group leads text the door code, a third of volunteers give an hour a month or less, age 16 on their own or 12 with an adult, reading in schools for over-18s only (opening, faq).
- Background checks: a PVG check only for hours with children or vulnerable adults, arranged and paid for by the network, about two weeks (groups, faq).
- Team volunteering: teams of up to twelve, write a month ahead (faq).
- The Saturday story: the Govan larder, eight neighbours, two and a half hours, 140 bags, eleven crates, times from 09:40 to 12:10, Margaret holding the keys (saturday).
- Quotes and names: Grace O. (since 2023), Priya K. and Callum R., with their causes and neighbourhoods; the portraits are stock photos of real people (voices).
- Group offer: free for every group, three named contacts (Morag, Dev, Shona) (groups).
- Money: £180,000 a year, about £4 for every hour given, 82p of every pound spent on matching, checks and supplies, gift amounts £5, £10, £25, £50 and what each gift buys (give, faq).
- Sign-up promise: open hours near you sent every Monday, and "within a day" in the thank-you line (contact).
- Drop-in and office: the address, Wednesdays 12:00 to 14:00, phone hours Monday to Friday 9:30 to 17:00, the placeholder phone 0141 000 0000 and the placeholder emails hello@sparehour.example and groups@sparehour.example (contact, faq, footer).
- Charity registration number SC000000 and "© 2026 Spare Hour" (footer).

## Known limits
- Without JavaScript the phone menu cannot open, and the donation and sign-up forms reload the page with the answers in the address bar and send nothing; the folders show as a grid and the questions still open.
- The six questions are native details elements and open without JavaScript.
- The drawer section holds the page for about three screens of scrolling (about 64% of a screen per folder after the first), which can feel long on short phone screens.
- The handwriting face for signatures is a third font family used only there, and the small colour pills over the neighbourhood names need a contrast check if you change the colours.
- Without CSS scroll-driven animation support (Firefox today), without JavaScript or with reduced motion, the opening load-in, the scroll scenes, the entrances and the smooth wheel are off: the folders and the Saturday frames show as grids, every neighbourhood name shows its pill and the gift and portrait cards stand in place. The nav behaviour and hover effects keep running.
- The motion CSS fixes four counts (marked data-8b-fixed): three step cards in the opening, six folders in the drawer, three gift cards and five sign-up photo cards, each placed or timed by its position. Other counts need the matching CSS rules.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Spare Hour left only in class names.
