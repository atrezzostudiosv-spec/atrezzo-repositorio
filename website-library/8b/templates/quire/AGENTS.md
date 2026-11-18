# AGENTS.md: stationery shop website template

One-page website for a stationery shop or paper studio, for customers who browse, join a subscription and book workshops. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.4 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/stationery-shop-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/stationery-shop-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/stationery-shop-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/stationery-shop-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:navigation`: `.nav__menu` `.menu` `.menu__close`
  - `section-script:paper`: `.pa-tab` `.pa-detail` `.pa-stack`
  - `section-script:visit`: `.vi-form` `.vi-status`
  - `scene-script:shelves`: `.sh-row`
  - `scene-script:press`: `.pr-stage` `.pr-row` `.pr-step`
  - `scene-script:visit`: `.vi-mark`
- `style="--len:N"` = characters in that display line, spaces included: `27 Ash Row,` is 11, `Edinburgh.` is 10, `Quire` is 5.
- The address heading in the visit section is two spans with style="--len:N" (11 and 10 characters), and the footer wordmark has style="--len:5": update the numbers when the text changes.
- The paper library tabs and panels are linked by ids (pa-tab-1 to pa-panel-1, and so on) and by order to the four photos in the stack; keep the four in step when adding or removing a paper.
- When motion is on, scene-script:visit builds the lilac twin by copying the heading, so any change to the heading is copied too; do not add a second copy by hand.
- The shelves section pairs the five rows with the five photos by position, and the CSS animates rows and photos two to five by :nth-of-type: keep five of each, or add matching rules.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #ffffff (page background, text on the ink panels and on hovered buttons, the selected paper tab), `--color-2` #151515 (text, the ink panels (paper library, subscription, footer), button fill on hover, the Desk button), `--color-3` #6b6b6b (secondary text: leads, notes, makers' places, answers, shelf titles before they become current), `--color-4` #f3f3f3 (grey surfaces: nav pill, paper tab list, evening cards, enquiry form, alternate maker tiles, printing step cards, question icons), `--color-5` #d7a6e5 (the only accent: opening panel, button fills, the Most chosen mark, the Desk tier, the thank-you line, the address copy, focus rings on ink panels), `--color-6` #242424 (tier cards inside the subscription panel and the paper photo frame), `--color-7` #e2e2e2 (hairlines above shelf rows, card footers, question rows and maker tile borders), `--color-8` #a8a8a8 (muted text on the ink panels: leads, spec labels, tier descriptions, footer labels); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, email, form): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Visit the shop button in the nav: now #visit; owner's target: keep, or your shop or directions page.
- See the shelves button and the Thursday evenings at the shop link in the opening: now #shelves and #evenings; owner's target: keep, or your online shop and your events page.
- Ask us to hold one button in New on the shelves: now #visit, the contact form; owner's target: your product or reservation page.
- Start a print order button in the printing section: now #visit; owner's target: your print order form or page.
- Choose Pocket, Choose Desk and Choose Studio buttons in the club section: now #visit; owner's target: your subscription checkout links, one per tier.
- Book a place links on the three evening cards: now #visit; owner's target: your booking or ticket page for each workshop.
- Phone and email links in the questions, visit and footer sections: now a tel: link and a mailto: link with placeholder numbers; owner's target: your real phone number and email address.
- The form in `#visit` (fields `name`, `email`, `topic`, `message`) sends nothing; `section-script:visit` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Quire (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (22, Unsplash: opening 1, shelves 5, paper 4, arrivals 4, press 4, evenings 3, visit 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Founding and place: "began in 2014" on Leith Walk, "since 2014", the shop on Ash Row, Edinburgh EH7 0AA, "five minutes from the top of Leith Walk" (opening, visit, footer, title and meta description).
- Contacts and hours: phone 0131 000 0000, hello@quire.example, Tuesday to Saturday 10 to 6, Sunday 11 to 4, closed Mondays (visit, faq, menu, footer).
- Papers in the library: forty papers, four types with sizes, weights and prices (£2.40 a sheet, 60p a sheet and £9 a roll, £9 a sheet, from £6 a sheet), a Somerset mill, Florence marbling (paper).
- Shelf claims: forty bottled inks, card from 120 to 600 gsm, the paper in a drawer behind the counter (shelves, paper).
- New arrivals: four products with prices, makers, cities and "In since" dates in September and October (arrivals).
- Makers: "thirty-one makers" and ten named makers with places and crafts, such as Hollin Bindery in Sheffield and Okabe Shiki in Kyoto (makers, arrivals).
- Printing: a 1960s platen press, runs from fifty sheets, a proof within three working days, posting anywhere in the UK, most wedding orders between eighty and two hundred (press, faq).
- Subscription: Pocket £12, Desk £24, Studio £45 a month, parcel posted on the first Friday, pause or cancel before the last Monday of the month, 10% off in the shop, a letterpress print each season (club, faq).
- Workshops: three dated Thursday evenings at 6.30 pm with prices £35, £48 and £40, eight places, every material included, one evening a quarter for Studio members (evenings, club, faq).
- Service promises: a tester for every pen, nib adjustment while you wait, a restorer in York, UK post in two to three working days and Europe in about a week, a reply within one working day (faq, visit).
- Company: "© 2026 Quire Stationers Ltd" (footer).

## Known limits
- Without JavaScript the menu button does nothing and all four paper panels show under the tabs; the FAQ rows open natively. The enquiry form is a placeholder either way: it sends nothing (with JavaScript it resets and shows a thank-you line) until you connect a form service.
- Without scroll-driven animation support (Firefox today) and with reduced motion on, the page shows its finished layout with ordinary scrolling: the shelves plate shows only its last photo (Paint & drawing) whichever row is in view and the shelf titles stay grey, the printing steps sit in a two-column grid (one column on phones) and the tiers lie flat. The nav hiding, the paper tabs and the hover fills still work, and in Firefox the opening still rises in on load.
- Counts fixed in CSS by :nth-of-type rules: five shelf rows with five photos and three evening cards (the second and third start lower); a sixth shelf or a fourth card would not move unless those rules get a new entry.
- The workshop cards show fixed dates in October 2026, already past; the arrival dates are fixed text too.
- The printing row is held on screen and slides sideways on all screen sizes, which feels long on a phone because the row is wide.
- Light grey text on white and the lilac accent on pale panels should be checked for contrast after any recolouring.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Quire left only in class names.
