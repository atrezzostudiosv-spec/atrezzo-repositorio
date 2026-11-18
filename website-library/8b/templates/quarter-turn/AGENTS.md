# AGENTS.md: board game cafe website template

One-page website for a board game cafe and games library, with a game shelf, table guides, a weekly programme, a menu and table booking. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/board-game-cafe-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/board-game-cafe-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/board-game-cafe-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/board-game-cafe-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:navigation`: `.nav-bar` `.nav-menu` `.nav-close`
  - `section-script:visit`: `.vs-form` `.vs-status` `data-error` `data-done`
- `style="--len:N"` = characters in that display line, spaces included: `Board game café` is 15, `The library` is 11, `Table guides` is 12, `The week` is 8, `The kitchen` is 11, `Private hire` is 12, `The long table` is 14, `Prototype night` is 15, `Regulars' card` is 14, `Questions` is 9, `Visit` is 5, `Quarter Turn` is 12.
- The labels ("Board game café", "The library" and so on) are copied twice into sliced echoes by atom-script:m-echo, and carry style="--len:N", but no live CSS reads it on the labels (only rules of the removed first screen). The --len that sizes the type is on the heading "The long table" (one for the whole and one for each line) and on the footer name: update it whenever that text changes, or the line overflows or shrinks.
- The CSS animates fixed counts by class and position: four shelf cards (lb-card--1 to lb-card--4), seven days plus the booking cell in the week (wk-day--1 to wk-day--7, each with its own path) and ten cells in the regulars' card (:nth-of-type rules). Extra items do not move in step; change the scene CSS too if you change those numbers. The game lists inside the shelves and the menu items can be changed freely.
- The shapes (quarter tiles, arcs, the mark in the bar, the card cells) are CSS, not images: recolour them through the colour variables in :root. The shaped photos use data-corner to say which corner is rounded or cut.
- The 16 arc tiles in the visit section each carry a data-turn value (0 or 90), their resting angle without motion, and an inline style with the start and end angle of their turn (--visit-div-vs-field-span-rotate-from and -to); change both together. Each tile's scroll timing is an :nth-of-type rule, so keep 16 tiles.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #23264a (text on light grounds, primary button, the library, long table and visit grounds, first screen price bars, form borders, two-pixel rules and the Monday and Friday tiles), `--color-2` #05a6f7 (the week ground, the first library card, the tile beside the guides photo, the corner tiles of two menu groups, the open mark in the questions and the rule above each hours row), `--color-3` #ffab03 (the first screen ground, the loyalty section ground, the third library card, the secondary button and the Tuesday and Saturday tiles), `--color-4` #ff74a6 (the kitchen ground, button hover fill, the second library card, guide step pillars, the Wednesday and Sunday tiles and the pink arcs in the visit field), `--color-5` #ffffff (text on navy, and the fill of the form inputs), `--color-6` #e6ebf1 (the page ground, the guides, prototype night and questions sections, the fourth library card, the Thursday tile, the form panel and the footer); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, email, phone, map, form, social): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Book a table buttons in the top bar, the menu overlay and the first screen; Book a night in the week section; Ask at the counter in the regulars' section: now #visit (the Request a table form); owner's target: your booking page, or keep #visit once the form is connected.
- How the guides teach link on the first screen: now #guides; owner's target: keep.
- Ask about a date button in the long table section: now mailto:events@quarterturn.example?subject=The long table; owner's target: your events email or enquiry form.
- Send a pitch for Thursday link in the prototype night section: now mailto:playtest@quarterturn.example?subject=Prototype night; owner's target: your own email or a sign-up form.
- Get directions link in the visit section: now a Google Maps search for the city (query=Sheffield); owner's target: a map search for your address.
- Instagram link in the footer: now the home page https://www.instagram.com/; owner's target: your profile address.
- Send the request button of the table form: now the form has action="#" and method="post"; section-script:visit checks it and shows a thank-you line, nothing is sent; owner's target: your form handler (Formspree, Netlify Forms or your booking system), or remove the form and keep the phone and email.
- The form in `#visit` (fields `name`, `email`, `date`, `time`, `players`, `note`) sends nothing; `section-script:visit` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Quarter Turn (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (9, Unsplash: library 4, guides 1, kitchen 2, long-table 1, playtest 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Fees: "£6 a head, all day", under-12s £3, the table fee covers teaching and the whole day, big groups asked to keep to four hours on busy evenings (opening, FAQ).
- Library: "seven hundred games", four shelves, 20 named games with player counts and times (these are real published games: replace them with your own library); "every game is counted back after it's played" (library).
- Opening hours: Tuesday to Sunday 11:00 to 23:00, Monday closed, kitchen until 22:00, Saturday family morning 11:00 to 13:00, Sunday 11:00 to 20:00 (visit, week, footer).
- The weekly programme: Tuesday learn-to-play 18:00 to 23:00, Wednesday league from 19:00 (eight weeks), Thursday prototype night from 18:30, Friday big box from 17:00, Saturday and Sunday sessions (week).
- Menu: sixteen items and their prices, beer names such as "Sheffield pale ale", gluten-free bread and vegan cheese (kitchen, FAQ).
- Long table hire: seats 24, from £180 for an evening, £14 a head set menu, two guides on hand (long table).
- Prototype night: four games each Thursday, first come first served, pitch emailed by Monday, a free coffee for the designer (playtest).
- Regulars' card: £35 a year, every tenth visit free, half-price table fee on Tuesdays, 10% off the kitchen and bar, two guest passes in the birthday month (regulars).
- Booking rules: walk-ins on weekdays, booking for Friday and Saturday evenings and groups of six or more, Friday tables go by Wednesday, confirmation by email "within the hour" (FAQ, week, form status).
- Location and access: Sheffield, the address; ground floor, toilets and the long table room step-free, the quiet room upstairs reached by stairs (title, meta description, visit, FAQ, library); the phone 0114 000 0000 and the emails are placeholders.
- Company: "Quarter Turn Games Café Ltd" and the year 2026 (footer).
- Staff claims: "a guide in every room", guides have played everything on the shelves at least twice (guides).

## Known limits
- Without JavaScript the menu button cannot open the overlay, and below 861 px the five bar links are hidden. The footer repeats Library, Guides, The week, Kitchen, Long table and Regulars' card, but Questions (#faq) has no other link; the Book a table button stays in the bar. The labels also lose their sliced copies.
- The table form sends nothing: it has action="#", and the script only checks it and shows the status line. Connect it to a handler or a booking system before launch.
- The library section grows to 330vh on desktop windows at least 720 px tall, and the week to 300vh on desktops at least 680 px tall and phones at least 740 px tall, so each holds its board for over two screens of scrolling. On shorter windows the week stays in order, and on wide short windows the library is not held: its cards swing in as the section passes.
- Without scroll-driven animation support (Firefox today) and with reduced motion, all motion but the hover fills and the bar's hide on scroll is off: no first screen load-in, no label slices, no smooth wheel; the shelves, the week, the long table heading and the loyalty card show their finished layout.
- Times and notes are small text on saturated coloured tiles; check their contrast again after recolouring.
- Photos are lazy-loaded from Unsplash, including the first ones below the first screen; self-host them before launch.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Quarter Turn left only in class names.
