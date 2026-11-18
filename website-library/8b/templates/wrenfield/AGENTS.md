# AGENTS.md: museum website template

One-page website for a museum with free halls, a main exhibition, collection tours, learning sessions and membership. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, Lenis 1.3.4 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/museum-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/museum-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/museum-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/museum-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits.
- Selectors the scripts use:
  - `section-script:navigation`: `.nav__bar` `.nav__overlay` `.nav__menu-btn` `.nav__close`
  - `section-script:contact`: `.ct-status` `data-sent` `data-missing`
  - `scene-script:halls`: `.hl-stage` `.hl-track` `.hl-hall` `.hl-plate`
- `style="--len:N"` = characters in that display line, spaces included: `Flight` is 6, `Insects` is 7, `Deep time` is 9, `Tide line` is 9, `Plants` is 6, `Mammals` is 7, `The Colour` is 10, `of Flight` is 9, `Learn` is 5, `Lates` is 5, `Wrenfield` is 9.
- The big hall names, the two exhibition title lines, the Learn heading, the Lates word and the footer wordmark use style="--len:N" (the number of characters) to size the type. Update it when you rename a hall, the exhibition or the museum: each has its own.
- The opening shows one plate twice, as the ink layer and again inside the amber colour layer that covers it; both use the same photo address. If you change the plate, change both, and keep the alt text only on the first.
- The exhibition plate is one photo shown four times (three colour-filtered copies and the true image); the filters are SVG matrices defined at the top of the section. Use the same photo address in all four.
- The yellow strokes are empty spans coloured by --color-4, and the two glyphs in the field section are text characters (+ and ≈) in --color-3; recolour them through the palette variables.
- The learn cards, the contact columns and the two field glyphs carry their scattered start positions as style variables on each element (for example --learn-article-ln-card-rotate-from); a card or column you add copies a neighbour's variables or starts from the CSS default. The glyphs' data-rate attribute is no longer read.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #5995a8 (teal page ground of the halls, sessions and contact sections, the solid nav bar and the frame under the two lens photos), `--color-2` #ffffff (the large uppercase words and text on the deep teal blocks, the exhibition print sheet), `--color-3` #0d1f2b (body text, the nav, the menu overlay and the ground of the exhibition, Lates, FAQ and footer), `--color-4` #eab12f (yellow accent: filled buttons, grown underlines, nav hover bar, Lates glow, FAQ plus marks), `--color-5` #f6d97c (pale yellow ground of the field section and the lens discs, and the fill that floods outlined buttons on hover), `--color-6` #c97f1c (amber ground of the membership section and of the whole opening, where it tints the plate, and the opening panel on phones), `--color-7` #e9f2f4 (pale ice ground of the drawers and visit sections, session cards, membership labels and specimen label); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, social, map, form, phone, email): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Plan your visit button in the opening and the Book a free ticket icon in the top bar: now #visit; owner's target: your ticketing page (Eventbrite, Ticketsolve) or keep it on the visit section.
- Book the exhibition, Book a drawer tour, Book a free ticket, the Tickets links of the Lates, the four session links (Book a place, Apply for a term, Plan a class visit), and the Join and Adopt buttons: now #visit or #contact on the page; owner's target: the booking, ticket or donation page for each (a ticketing tool, a membership form, a payment link).
- Instagram and YouTube icons in the top bar, and the Instagram link in the footer: now the home pages instagram.com and youtube.com; owner's target: your museum's profile and channel.
- Open the map button in the visit section: now the OpenStreetMap home page; owner's target: the map link of your building.
- Send and Subscribe buttons in the contact forms: now nothing is sent: both forms have action="#contact" and a script shows the status line; owner's target: your form endpoint (Formspree, Netlify Forms) and your newsletter service.
- The Volunteer link in the footer: now #contact; owner's target: your volunteering page or email.
- The form in `#contact` (fields `name`, `email`, `message`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The form in `#contact` (fields `newsletter`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Wrenfield Museum of Natural History (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (20, Unsplash: opening 1, halls 6, exhibition 1, drawers 4, field 1, learn 4, lates 1, support 1, visit 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Founding and size: "Since 1868", "4.2 million specimens", "41,000 drawers", lending to "thirty countries", "38 scientists", three per cent on show (opening, drawers, field, support).
- Hall contents and places: Flight (nine thousand birds), Insects (2.1 million), Deep time, Tide line (a living tank), Plants (three hundred thousand pressed sheets), Mammals, with floors and wings (halls).
- The exhibition: "The Colour of Flight", a hundred and twenty plates from 1790 to 1890 lent by eight libraries, dates 14 November 2026 to 26 April 2027, Hall of Prints, £9 (exhibition).
- Tours and prices: drawer tours £8, Saturdays at 11:00 and 14:00; Lates £12, first Friday of the month 18:30 to 22:00; members free (drawers, lates, visit).
- Late dates and titles: 6 November, 4 December, 8 January, 5 February (lates).
- Sessions: Tiny Naturalists, Specimen Detectives, Young Curators with ages, days and times, and free school visits (learn).
- Membership prices and perks: Friend £40 or £60 for two, Fellow £90, Patron £250, Adopt a specimen £30, ten per cent in the shop (support).
- Opening times, last entry, closures, admission, bus numbers, station walk, access and quiet mornings (visit, menu).
- FAQ promises: free entry every open day, step-free halls with lifts, wheelchairs to borrow, photography without flash, the identification desk on the first Saturday of the month, the café, how to donate a specimen (faq).
- Research projects and places: River Wend, Kingsbridge Bay, Hartmoor, with years and the 1931 and 1912 surveys (field).
- Contact: phone with hours and the group extension, email, address, "reply within two working days", the monthly newsletter promise (contact, forms).
- Registered charity number: "registered charity 0000000" (footer): put in your own, or remove the line.
- The specimen label and plates: "Purple jackdaw", "Plate 14" and the bird, animal and plant pictures are stock illustrations; replace them with your own collection items.

## Known limits
- Without JavaScript the phone menu button cannot open the overlay (the footer still links Halls, Exhibition, Collections and Learn, and the ticket icon goes to Visit), and both forms reload the page with the fields in the address instead of showing the status line; the five links stay in the top bar on desktop and the FAQ opens natively.
- Without scroll-driven animation support (Firefox today) and with reduced motion, the scroll scenes and the smooth wheel are off and every section shows its finished layout, the halls as a grid of two columns (one on phones). The opening load-in still plays in Firefox and stops with reduced motion; the bar still hides on scroll down in both.
- On phones the hall panels keep a contained plate size, which leaves empty space between each plate and its text.
- Both forms only validate and show a status line; they need a real endpoint before launch.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Wrenfield Museum of Natural History left only in class names.
