# AGENTS.md: lighting store website template

One-page website for a lighting shop and showroom that sells lamps, draws lighting plans and repairs old lamps. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, Lenis 1.3.4 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/lighting-store-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/lighting-store-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/lighting-store-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/lighting-store-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:navigation`: `.nav-toggle` `.nav-menu` `.nav-close`
  - `section-script:contact`: `.ct-form` `.ct-status` `data-sent` `data-invalid`
  - `scene-script:rooms`: `.rm-track` `.rm-room` `.rm-room__squiggle`
  - `scene-script:makers`: `.mk-name`
  - `scene-script:repairs`: `.rp-frame` `.rp-line`
- `style="--len:N"` = characters in that display line, spaces included: `Glim.` is 5.
- The wordmark in the footer takes its size from style="--len:5", the number of characters in "Glim." (the full stop counts); change it with the name. The wordmark in the nav bar is plain text.
- The yellow glows, strips, rings, squiggles and rules are CSS and SVG, not images: recolour them through --color-4 and the other colour variables in :root. The first screen's rules and the glow are drawn by CSS only.
- The rooms scene measures the .rm-room columns (the track width and how long the section is held), so rooms can be added or removed. The lamp list is fixed at six rows: on desktop the CSS raises each next photo into the frame through :nth-of-type rules for rows 2 to 6, so a seventh row needs its own rule. The first screen's three service columns and the three loan days sit on three-column grids, so changing their number means changing the grid.
- The repairs photo is used twice (a grey copy and a colour copy), so change both.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #ececec (page background and the text colour of links on their hover fill), `--color-2` #121212 (text, hairline rules, outlines, the dark first screen, the late-opening section, the footer and the menu overlay), `--color-3` #ffffff (top bar, makers section background and text on the dark sections), `--color-4` #ffd000 (the light: glows, photo strips, lit lamp-list lines, makers row rules, repair line and step bars, loan day bars, button hover fill, footer wordmark), `--color-5` #555555 (notes, price lines, the product line under each workshop's city, unlit repair steps and photo placeholders), `--color-6` #a3a3a3 (body text on the dark sections, the first screen rules, the late-opening rings and the footer's resting wordmark); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, email, form): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Shop lamps button on the first screen: now #collection (the lamp types section, there is no online shop); owner's target: your online shop or product catalogue.
- Browse the lamps, Start a plan and Book a repair links under the three services on the first screen: now #collection, #plans and #repairs; owner's target: keep as anchors, or point them at your shop category, plan request and repair booking pages.
- Kitchen pendants, Bathroom wall lights, Bedside lights, Floor and table lamps, Desk lamps and Wall lights links in the six room columns: now #collection; owner's target: the matching category pages of your shop.
- Start a plan button in the last room column and in the lighting plans section: now #plans in the room column, #contact in the plans section; owner's target: your lighting plan request form or booking page.
- Ask about pendants, table lamps, floor lamps, wall lights, outdoor lights and bulbs links in the lamp list: now #contact; owner's target: the product category pages, or keep #contact for enquiries.
- Borrow a lamp button in the weekend loan section: now #contact; owner's target: your loan request form or booking page.
- Book a repair button in the repairs section: now #contact; owner's target: your repair booking page, or keep #contact.
- Plan a Thursday visit link in the late opening section: now #contact; owner's target: your visit booking page, or keep #contact.
- Send button of the contact form: now the form has action="#" and method="post"; the script only checks the required fields and shows the thank-you line, nothing is sent; owner's target: your form handler (Formspree, Netlify Forms or your own endpoint), or remove the form and keep the phone and email.
- The form in `#contact` (fields `name`, `email`, `topic`, `message`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Glim (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (17, Unsplash: opening 1, rooms 6, collection 6, plans 1, try 1, repairs 1, thursdays 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Prices: lamp types "From £85", £64, £140, £58, £72, £6 (lamp list); lighting plan free with orders over £600, otherwise £90 taken off lamps bought from it within a year (plans, FAQ); rewiring from £45 (repairs); fitting from £65 a visit (FAQ); £20 loan deposit (try).
- Stock and range: "around six hundred lamps from small studios" and "fewer than a hundred lamps a year" per workshop (lamp list, makers).
- The ten workshops with their cities and products (Atelier Vass in Porto, Halden Works in Bergen, Morrow & Pike in Leeds, Studio Kiln in Stoke-on-Trent, Oro Lume in Milan, Fenwick Glass in Edinburgh, Tallow in Copenhagen, Ninefold in Lisbon, Brae Metalworks in Dundee, Kasa Lab in Rotterdam): demo names, replace with the real suppliers (makers).
- Location and hours: Glasgow, the address, Tuesday to Saturday 10:00 to 18:00, Thursday until 21:00, Sunday 12:00 to 17:00, Monday closed, "Thursdays 17:00 to 21:00" (contact, footer, late opening, menu overlay).
- Contact details: the phone 0141 000 0000 and hello@glim.example are placeholders (menu overlay, contact, footer).
- Company: "Glim Lighting Ltd" and the year 2026 (footer copyright), "Glim Lighting" (contact address block).
- Service times: lighting plan drawn "within a week", repairs "usually within ten days", fitted "in a day", made-to-order shades "in three weeks" (first screen, plans, repairs, lamp list).
- Delivery: UK in three to five working days, Glasgow orders over £150 in the shop's own van, often the next day (FAQ).
- Returns: thirty days, unused and in the box; made-to-order shades and repaired lamps cannot be returned (FAQ).
- Loan terms: one lamp at a time per household, Glasgow addresses only, Friday to Monday, deposit returned or taken off the price (try).
- Staff and service claims: "our planners", "our electrician", "a lighting planner on the floor" on Thursdays, tea on the counter, "a person in the shop answers within one working day" (plans, FAQ, late opening, contact, thank-you line).
- Repair promises: a safety test and a dated label, earthing where the metal needs it, a fused plug (repairs).

## Known limits
- Without JavaScript the menu button cannot open the overlay, and below 900 px the five bar links are hidden. The footer repeats The lamps, Light by room, Lighting plans, Borrow a lamp and Repairs, and the page's buttons lead to the contact section, but Late Thursdays is linked only from the overlay and no link leads to the questions, so on a phone those two are reached only by scrolling. The contact form also shows no thank-you line.
- The rooms track is held for about 2100 px of scrolling on a 1440 px screen and about 1900 px on a 375 px phone, and each room column is the screen height while held, so long texts can run under the photo on short windows.
- Without scroll-driven animation support (Firefox today) the page shows its finished layout: the rooms wrap into a grid of columns, each lamp row keeps its own photo, the repair photo is in colour with all steps lit, the bar stays in place and the wheel scrolls natively; only the first screen's load-in plays. With reduced motion on, nothing moves except hover effects.
- The photos below the first screen are lazy-loaded (the first-screen photo loads with high priority), and they come from Unsplash at the sizes in the URLs; self-host them before launch.
- Several small texts (13 px) carry the prices and notes; the prices in the lamp list are in the small size.
- There is no online shop or basket: every button goes to an anchor on the page, so a real shop needs its own links.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Glim left only in class names.
