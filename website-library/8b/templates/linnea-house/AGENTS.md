# AGENTS.md: birth center website template

One-page website for a midwife-led birth center that shows its birth rooms, midwives and classes. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, Lenis 1.3.4 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/birth-center-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/birth-center-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/birth-center-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/birth-center-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:nav`: `.nav__menu` `.menu__close`
  - `section-script:opening`: `data-loop`
  - `section-script:visit`: `.visit__form` `.visit__status`
  - `scene-script:opening`: `.opening__field` `.opening__in`
  - `scene-script:rooms`: `.rooms__bands` `.rooms__band` `.rooms__every` `.rooms__photo` `.rooms__strip`
  - `scene-script:team`: `.team__field` `.team__pill`
  - `scene-script:rhythm`: `.rhythm__phases` `.rhythm__phase` `.rhythm__label`
  - `scene-script:classes`: `.classes__stage` `.classes__track` `.classes__tile` `.classes__blur` `.classes__veil`
- `style="--len:N"` = characters in that display line, spaces included: `Linnea` is 6.
- The logo mark, the two dials (the visits dial in the opening and the phase dial in the rhythm section) and the room band colours are CSS and SVG: recolour them through the CSS variables, not with images. The dial arcs use a registered custom property that scroll-driven animation fills.
- The brand word "Linnea" in the closing tile carries style="--len:6", the number of characters; update it to your name's length so the word sizes to the tile.
- The room links in the opening (#room-milk, #room-blush, and so on) target the band ids; the team pills read their start offsets from a script and the class tiles from the track width, so add or remove items in the same markup pattern and the scenes pick them up. The rooms scene reads the number of bands and the stories cards use --stories-i for their sticky offset.
- The motion is CSS scroll-driven animation plus a small inline kit; the gate script in the head sets data-8b-live on the page only when the browser supports animation-timeline and reduced motion is off. Keep the gate and the data-8b-section, data-8b-motion, data-8b-enter, data-8b-items and data-8b-part attributes in place (the kit numbers the data-8b-items groups into --i, which staggers the room swatches).
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #141016 (near-black: the page ground that frames the tiles, and the text on light tiles), `--color-2` #2c2431 (aubergine: dark tiles, the second button, the full-screen menu and the nav bar once you scroll, and the Plum room band), `--color-3` #fbf4dc (cream: text on dark tiles, light tiles, the main button and the Milk room band), `--color-4` #f3cbd5 (pale pink: pink tiles, pills, chips and the Blush room band), `--color-5` #ec8667 (coral: the Coral room band and the warm middle of the tick dials), `--color-6` #c73a22 (red: the Ember room band, the end of the tick dials, warm pill text and the second button's hover fill), `--color-7` #8ea8dd (periwinkle: the Cornflower room band, the blurred fields behind the dial and the closing word, and the start of the tick dials), `--color-8` #f5eeb8 (butter: two pills in the opening values tile, the Team Alder pill, the third story tile and one class veil); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, form, email): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Book a visit button in the navigation bar and the first screen: now #visit, the tour form at the end of the page; owner's target: your booking page or tour calendar URL if tours are booked elsewhere, or keep it on the form.
- Request a place button in the tour form: now a script checks the required fields and shows the thank-you line; the form sends nothing and has action="#visit"; owner's target: your form endpoint (Formspree, Netlify Forms) or your own handler, and a thank-you line that matches.
- Refer yourself button in the pregnancy section: now #visit; owner's target: your self-referral form or phone line, if it is separate from the tour form.
- Six room links under the opening statement: now anchors #room-milk, #room-blush, #room-coral, #room-ember, #room-cornflower, #room-plum in the rooms section; owner's target: keep them, or rename them with the room ids when you rename the rooms.
- Phone links in the menu, the tour section and the footer: now tel: links to two placeholder numbers (labour line and weekday office); owner's target: your real labour line and office numbers, in the tel: target and the visible text.
- The form in `#visit` (fields `name`, `email`, `due`, `tour`, `message`) sends nothing; `section-script:visit` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Linnea Birth House (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (24, Unsplash: opening 4, visit 1, rooms 6, team 1, rhythm 1, after 1, house 3, classes 5, stories 3): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Place and brand: "Leith, Edinburgh", the stone house "on the Water of Leith", the placeholder address "1 Example Walk, EH6 0ZZ", buses 16 and 22 (opening, house, visit, footer).
- Care model: twelve midwives in three teams of four (Rowan, Alder, Hazel), "you get four of them", teams chosen by the area you live in, "12 visits", a second midwife at the birth (opening, team, rooms, rhythm).
- Who can book and when: "booked from eight weeks", no doctor's letter, singleton baby head down between 37 and 42 weeks, "straightforward pregnancy" (opening, pregnancy, FAQ).
- Cost: "Care at Linnea is free for families in north Edinburgh, funded like any other maternity service"; only baby massage has a fee of £25 for the course (FAQ, classes).
- Medical claims: pain relief offered (warm water, massage, TENS, gas and air), the obstetric unit "ten minutes away", "about one in five first labours here move across", discharge "four to six hours after the birth" (rooms, FAQ). Replace with your own protocols and statistics.
- Rooms: six rooms named Milk, Blush, Coral, Ember, Cornflower, Plum, their features (pools, deep baths, double beds, a fold-out bed in Ember, garden doors in Cornflower, blackout blinds in Plum) and "choose one at your 34-week visit" (rooms, FAQ).
- Visit schedule: booking visit at 10 weeks, four checks between 16 and 31 weeks, birth-plan evening at 34 weeks, labour line from 37 weeks (pregnancy).
- Aftercare: home visits on days 1, 3 and 5, a heel-prick test on day 10, the six-week goodbye and a handover to the health visitor (after).
- Classes and times: yoga Mondays 6.30pm from 20 weeks, partners' evening first Wednesday 7pm, pool evening Fridays 7pm, feeding café Thursdays 10am, baby massage four Tuesday mornings (classes, after).
- Tours: Tuesday 6pm and Saturday 10am, "about forty minutes" (visit form, options); "we will call you within a day to confirm your place" (thank-you line).
- House features: family kitchen, walled garden, siblings' room, step-free access, two parking spaces (house).
- People: the midwives' first names, Ama's quote about Sorcha, the three family stories with names, room names and a hospital transfer (team, stories); the portraits are stock photos.
- Contacts: labour line and weekday office numbers ("weekdays 9 to 5"), email address, postal address (visit, menu, footer).

## Known limits
- Where the browser has no scroll-driven animation support (Firefox at the time of writing) or the visitor asks for reduced motion, the scenes do not run: the rooms are a plain stack of six bands, the five classes a 3 + 2 grid, the dials show a full arc and "Five phases", every phase is bright and the stories are plain cards. The content stays readable. In Firefox the opening still plays its load-in and its drifting and bobbing CSS loops; with reduced motion those stop too, while the nav still hides on scroll and the hover fills still run.
- Without JavaScript the Menu button cannot open the overlay (on screens up to 960px the header links are hidden, so only the footer links remain), the tour form submits to its own page address with no thank-you line (the browser still checks the required fields), and the active phase in the rhythm section is not tracked. The FAQ opens without JavaScript.
- The sticky stages (the rhythm card, the classes track, the stacked stories) are tall by design and need a normal screen height; on very short landscape phones they take more scrolling.
- Some decorative pill text sits on tinted tiles at moderate contrast; check the colours if you change the palette.
- The page carries a smooth wheel module for mouse wheels that eases scrolling on desktop; touch scrolling is left to the browser.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Linnea Birth House left only in class names.
