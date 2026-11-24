# AGENTS.md: restaurant website template

Restaurant website for a brasserie, bistro or bar, with a menu, opening hours and table booking. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.11 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/restaurant-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/restaurant-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/restaurant-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/restaurant-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:nav`: `.nav__toggle` `.nav__menu` `.nav__close`
  - `section-script:opening`: `.op__hero`
  - `section-script:contact`: `.ct__form` `.ct__done`
  - `scene-script:day`: `.dy__pin` `.dy__track`
  - `scene-script:market`: `.mk__spread` `.mk__print`
  - `scene-script:footer`: `.ft__mark`
- `style="--len:N"` = characters in that display line, spaces included: `Ombrelle` is 8, `Two menus` is 9, `Ombrelle moments` is 16, `Noon to midnight` is 16, `The brasserie card` is 18, `This morning` is 12, `After five` is 10, `Book a table` is 12.
- The plan of the house in terrace is HTML and CSS (circles and outlines), not an image: change the number of parasols in the markup; the grid holds four per row and they open one after another in markup order.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #f8f7f3 (page background), `--color-2` #141412 (text, buttons, rules), `--color-3` #999b69 (olive: story field, aperitivo panel, phone menu), `--color-4` #1c1d15 (night: bar, footer, the day track's end), `--color-5` #5c5e33 (dark olive parasol stripes), `--color-6` #5b5b55 (warm grey descriptions and captions), `--color-7` #2c3019 (parasol shadow over photos), `--color-8` #f0a64a (amber light warming the hero photo); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, social, phone, email, form): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Book a table buttons and links in the hero, the nav, the footer and "Ask about the back room" in terrace: now #contact; owner's target: your booking page (OpenTable, Resy, TheFork, SevenRooms), or keep the on-page form.
- "Explore the menus" in the opening and the Menu links in the nav and footer: now #carte; owner's target: a menu PDF or menu page if you publish one, or keep the on-page menu.
- The form in `#contact` (fields `name`, `contact`, `date`, `time`, `guests`, `area`, `note`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Ombrelle (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (23, Unsplash: opening 3, moments 6, day 5, carte 1, market 5, bar 2, terrace 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Name and place: "14 Linden Square" (opening, phone menu, contact, footer, page title and meta description); Linden Square also in the about text.
- Opening hours: "noon to midnight, daily" / "12:00-00:00" (opening, phone menu, day, contact, footer, page title and meta description); kitchen 12:00-15:00 and 19:30-23:00, bar 17:00-00:00 (opening captions, carte note, contact); the five service times in day (12:00-15:00, 15:00-17:00, 17:00-19:30, 19:30-23:00, 23:00-00:00); "Last orders at the bar 23:45" (footer); the booking time slots in the form.
- Prices: every dish and drink price in carte (7-36) and bar (5-14), and "Prices in euros, service included" (carte note).
- The menu itself: dish names and ingredients in carte, bar and day (e.g. Oysters No. 3, sole meunière, Ombrelle spritz), and the allergens note.
- Seating: twelve parasols, terrace 48 seats April to October, room 60 seats, counter 14 stools without booking, back room up to 20 guests (terrace); "Tables for up to eight", half the terrace and the counter kept for walk-ins (contact); guests 1-8 in the form.
- Suppliers and sourcing: deliveries "before seven", night boats from the harbour, a farm forty minutes inland, a lemon grove on the coast, the bakery two streets away, clams raked on the bay (market); "the fish that came in at dawn" (opening).
- History: "began as six tables and two parasols on Linden Square" (about); "a regular since the first summer" (reviews).
- Reviews: Marta, Jonas, Clara and their quotes (reviews) are invented.
- Service promise: "We confirm every booking by phone or email within the hour" (contact hint and the thank-you message).
- Contacts replaced with placeholders: table@ombrelle.example and +44 20 0000 0000 (contact, footer).
- Copyright "© 2026 Ombrelle Brasserie & Bar" (footer).

## Known limits
- Without JavaScript the phone menu button cannot open the overlay; on phones the footer still links Menu, the day, Terrace and Book a table, but not Home or About.
- The day track pins the section and scrolls sideways only in browsers with CSS scroll-driven animations and with motion allowed; elsewhere (Firefox today, or reduced motion) the five services sit in a static strip.
- Some counts are fixed in the CSS: the two lines of "Two menus" and the two photos under it in opening, and the three heading lines in about, each have their own rule, so an added line or photo stays still; the colour stops of the day ground are set for five services.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Ombrelle left only in class names.
