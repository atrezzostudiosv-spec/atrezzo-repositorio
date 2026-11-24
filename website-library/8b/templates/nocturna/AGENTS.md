# AGENTS.md: art gallery website template

One-page website for an art gallery or kunsthalle with night hours, a season programme, a screening hall, passes and a visit form. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/art-gallery-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/art-gallery-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/art-gallery-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/art-gallery-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:nav`: `.nav-bar` `.nav-menu` `.nav-overlay` `.nav-close`
  - `section-script:contact`: `.ct-form` `.ct-status` `data-sent`
  - `scene-script:rooms`: `.rm-plan` `.rm-lamp` `.rm-room`
  - `scene-script:screening`: `.sc-stage` `.sc-cell` `data-area` `.sc-title`
  - `scene-script:pass`: `.ps-card`
- `style="--len:N"` = characters in that display line, spaces included: `Art after dark` is 14, `Ines Varga` is 10, `Tomas Reyl` is 10, `Oumar Diallo` is 12, `Lev Aranda` is 10, `Ruben Hale` is 10, `Before you come` is 15.
- The wordmarks (the footer "Noct" + "urna", the rails "Art after dark" and "Before you come") and the five artist names are sized by style="--len:N" set to their character count: if you rename the brand, the rail phrases or an artist, change N to the new length.
- The relay row has exactly eight cities, the rooms plan four rooms and the pass row three cards; the grid columns and the motion timings are built for those counts. The programme has six rows and six arch photos, one per row: the motion CSS times photos two to six by their :nth-of-type position, and the screening grid's eight credit cells the same way.
- The arch shapes, stars, discs, the glow and the dot are CSS and SVG, not images: recolour them through the colour variables in :root. The two-weight headings use a variable font (weight 200 to 900); the artists motion animates the weight itself.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #ffffff (page ground of the light sections, text on the dark screens and footer, the Buy a ticket card), `--color-2` #101014 (text and hairlines on light sections, the dark night screens, the footer and filled buttons), `--color-3` #c6ddf7 (the light-blue journal section, the dawn disc behind the contact form, the round Get a pass button and the Patron card), `--color-4` #f0654a (coral accent: the glow, the dot, the room lamp, the relay line, button hover fills and the Night Pass card), `--color-5` #5a5b64 (secondary body text and captions on light sections), `--color-6` #a9abb6 (small secondary text on the dark screens, the menu overlay and the footer: room captions, the screening synopsis, the footer columns); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, email, phone, form, social): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Get a pass button in the opening: now #pass; owner's target: your ticket or membership shop, or keep #pass.
- See the season link in the opening: now #programme; owner's target: keep it, or your full programme page.
- Details link in the first programme row, and the Book a seat button in the screening: now #screening and #pass; owner's target: your event page and your ticket page for the screening.
- Book links in the other five programme rows: now #pass; owner's target: the ticket page of each event.
- Plan a visit button in the rooms section: now #contact; owner's target: your visitor information page, or keep #contact.
- Buy a ticket, Join and Become a patron buttons on the three pass cards: now #contact; owner's target: your ticket shop, membership signup and patron signup pages.
- Ask for the note and Ask for it links in the journal: now #contact; owner's target: the article pages, or keep #contact if the notes are sent on request.
- Instagram link in the footer: now https://www.instagram.com/ (the Instagram home page); owner's target: your Instagram profile.
- Newsletter link in the footer: now a mailto: link to the contact email with the subject Newsletter; owner's target: your newsletter signup page.
- The form in `#contact` (fields `name`, `email`, `message`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Nocturna (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (19, Unsplash: programme 6, rooms 4, artists 5, screening 1, journal 3): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Opening hours: Thursday to Sunday, 21:00 to 02:00, last entry 01:30, garden bar closing ten minutes earlier (opening, nav overlay, FAQ, contact, footer).
- Free entry before 22:00, children only before 22:00 with an adult, 16 and over after that (opening, FAQ).
- The building: a former printing house, four rooms, a projection hall and a walled garden; step-free access with a lift to the first floor (rooms, FAQ).
- Programme: six events with dates, times, titles, formats and rooms, from 16 October to 11 December 2026 (programme).
- Resident artists: five names with disciplines and the events they run (artists).
- The screening: film title, director, year, 92 minutes, doors 23:30, film at 00:00, the synopsis, a hall of ninety seats, reservations until Thursday noon (screening, FAQ).
- The relay: eight partner cities and time zones, the last Friday of each month, the next date and the 11:00 Rotterdam start time (relay).
- Prices: €14 a visit, €12 a month, €40 a month, €9 at the door, what each pass includes (pass, screening, FAQ).
- Photography rules: no flash, no photographs in the Red Room during its installation (FAQ).
- Journal notes: three titles, an 8 minute read and a curator (journal).
- Address, email, phone and the Instagram profile (contact, nav overlay, footer).
- "© 2026 Nocturna Kunsthalle" and "A kunsthalle with night hours" (footer).

## Known limits
- Without JavaScript the Menu button cannot open the overlay, and the overlay is the only place the "Residents" and "Midnight screening" links exist on phones. The bar links are hidden under 900 px.
- The contact form does not send anything: it only shows the thank-you line. Connect Formspree, Netlify Forms or your own endpoint, or replace it with a link.
- The rooms and screening sections stick in place for the length of their scroll; on short screens or in landscape on phones the room captions and the credits grid are tight.
- The relay city text passes through a mid-grey for a moment while the night fills its cell.
- Without scroll-driven animation support (Firefox today) or with reduced motion on, the scroll motion and the smooth wheel are off and the page shows its finished layout: no sticky stages, all four rooms lit, the film still inside its middle cell, the relay cells light, the pass cards in their row. In Firefox the opening glow and stars still move; with reduced motion they stay still.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Nocturna left only in class names.
