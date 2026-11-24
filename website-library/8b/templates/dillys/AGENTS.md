# AGENTS.md: burger restaurant website template

One-page website for a burger bar or casual diner that wants a loud, friendly look. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/burger-restaurant-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/burger-restaurant-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/burger-restaurant-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/burger-restaurant-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:nav`: `.nav__more` `.nav__close`
  - `section-script:opening`: `.op-photo--b` `.op-photo__img`
  - `section-script:visit`: `.vs-form__status` `data-error` `data-sent`
  - `scene-script:smash`: `.sm-stage` `.sm-photo`
  - `scene-script:rules`: `.ru-wrap` `.ru-list`
- The scalloped stickers, the check strip in the footer and the check reveal are CSS shapes, gradients and masks, not images: recolour them through the colour variables.
- The menu board is a two-column CSS grid of six cells with alternate rows reversed by :nth-child rules. Each cell carries its slide-in start in an inline style (-50% and 11% in rows that slide from the left, 50% and -11% in rows from the right), so add or remove burgers in pairs and copy the style of the row they join.
- The griddle photo is set to 400% height inside a clipped frame and squeezed by CSS with a factor the inline motion kit measures, so keep the photo's wrapper and the image structure when you swap the picture.
- The rules section builds its black band from a copy of the list, so keep each rule as one list item with a text paragraph and a note paragraph; the copy is made on load.
- The room holds exactly three stories (data-8b-fixed="3"): on wide screens the held photo column is a CSS grid of three rows, so another count needs that rule changed.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #d7f36b (navigation bar, the lime menu cells, the pickles, rules and booking grounds, headings on dark bands, two of the six quote cards, footer check strip), `--color-2` #131510 (text, the thin rules between rows, the griddle and nights bands, the footer, the black band that crosses the house rules), `--color-3` #12801f (filled buttons, round icon buttons and the plus icons on the questions), `--color-4` #0b3a17 (the opening's text panel, every second menu cell, the quotes band and the hard shadows under buttons, cards and stickers), `--color-5` #ffffff (menu, room and questions grounds, sticker faces, four of the quote cards and the booking form, text on the dark bands), `--color-6` #e2382a (only the small diamond above the text on each sticker); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, map, email, form, social): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Book a booth (6+) link in the top bar and the Book a booth button in the phone menu: now #book, the booking form near the end of the page; owner's target: your booking page (OpenTable, SevenRooms, Resy) if you use one, or keep #book once the form is connected.
- Map pin button in the top bar: now #visit, the visit section; owner's target: keep it, or point it at your Google Maps listing.
- Phone buttons and links (top bar, questions, visit section, footer): now a tel: link to the demo number; owner's target: your bar's phone number as tel:+44....
- Open in maps link in the visit section: now a Google Maps search for Glasgow; owner's target: the Google Maps link of your bar.
- See the menu button in the opening: now #menu; owner's target: keep it, or link a PDF or online ordering page.
- Request the booth button in the booking form: now submits the form to nothing; a script shows the thank-you line and resets the fields; owner's target: a form service (Formspree, Netlify Forms) or your booking system.
- The form in `#visit` (fields `name`, `phone`, `date`, `time`, `party`, `note`) sends nothing; `section-script:visit` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Dilly's (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (14, Unsplash: opening 1, menu 6, smash 1, pickles 1, room 3, nights 1, visit 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Place and contact: 1 Example Street, Merchant City, Glasgow G1, the phone 0141 000 0000 and hello@dillys.example are placeholders (visit, FAQ, nav, room, quotes, footer, title and meta description); put in the real ones.
- Seating: "Forty seats", twelve counter stools, booths for six (room, rules).
- Hours: Mon to Thu 12:00 to 22:00, Fri and Sat 12:00 to 00:00, Sun 12:00 to 21:00; "Open till midnight on Fridays and Saturdays", the street window open till one on Fridays, "Open every day from noon" (visit, room, nights, footer).
- Prices: all six burgers (£7.50 to £11) and six sides and drinks (£3.50 to £6), the jar price £6 (menu, pickles).
- Offers: Two Little Smashes for £12 from five on Wednesdays, kids eat free with a grown-up burger on Sundays from noon till six, Monday Pickle Club tasting and vote (nights).
- Sourcing claims: beef from one Ayrshire farm, potato buns baked in Partick, seventy grams of chuck and brisket, pickles cured upstairs at seven (opening, smash, pickles).
- Staff: Ruth fills the jars every morning (pickles).
- Booking policy: bookings for six or more, booths seat six, the form is for six to twelve people, confirmation by text within the hour (FAQ, rules, visit).
- Diet and allergens: a vegetarian Green Room, vegan bun and cheese on request, gluten-free buns with shared griddle and fryer, allergen card at the counter (menu, FAQ).
- Other policies: dogs welcome in the back booths with a water bowl, no delivery, collection from the street window in ten minutes (FAQ).
- Reviews: six quotes with first names and Glasgow areas (Ailsa, Tom, Priya, Callum, Mairi, Jonah), invented for the demo (talk).
- Social profiles: Instagram and TikTok links (footer) now point to example handles.
- Footer: "© 2026 Dilly's Burger Bar, 1 Example Street, Glasgow. Open every day from noon." and the tagline naming Example Street; put in your legal name and street.

## Known limits
- Without JavaScript the phone menu button cannot open its sheet (the sheet is hidden by an attribute the script removes), and the booking form cannot show its thank-you line; the FAQ answers still open and the footer links stay reachable.
- The booking form sends nothing: the button only shows the thank-you line, so connect a form service or your booking system before publishing.
- On screens under 900 px wide or 640 px tall the griddle scene, and under 900 px wide the room scene, switch to lighter versions without the held stage.
- The stylesheet still carries rules for a lime hero with a band and a sticker that no markup uses; they can be deleted.
- Without CSS scroll-driven animation support (Firefox today) or with reduced motion, the scroll motion and the smooth wheel are off and each section shows its finished layout: the griddle is not held, the room shows each photo beside its story, the house rules are a plain list without the black band, and the opening photo does not drift. The opening's load-in still plays in Firefox, not with reduced motion.
- The nav hide-on-scroll and the hover transitions keep running with reduced motion.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Dilly's left only in class names.
