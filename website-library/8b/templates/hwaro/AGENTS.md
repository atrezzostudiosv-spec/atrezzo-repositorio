# AGENTS.md: korean restaurant website template

One-page website for a Korean charcoal barbecue restaurant where guests grill at their own table. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, Lenis 1.3.4 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/korean-restaurant-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/korean-restaurant-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/korean-restaurant-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/korean-restaurant-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:nav`: `.nv` `.nv-toggle` `.nv-close`
  - `section-script:contact`: `.ct-form` `.ct-status` `data-done`
  - `scene-script:grill`: `.gr-nav` `.gr-index__mark` `.gr-row`
  - `scene-script:night`: `.nt-sticky` `.nt-cell--main` `.nt-cell`
  - `scene-script:table`: `.tb-stage` `.tb-sticky` `.tb-steps`
  - `scene-script:journey`: `.jr-track` `.jr-rail` `.jr-ph`
  - `scene-script:contact`: `.ct-title`
- `style="--len:N"` = characters in that display line, spaces included: `The rooms.` is 10, `Book a grill.` is 13, `hwaro` is 5.
- "The rooms." (style="--len:10"), "Book a grill." (style="--len:13") and the footer wordmark "hwaro" (style="--len:5") are sized by --len, the number of characters including spaces and the full stop, so they fill the grid on one line (white-space: nowrap). Change N with the text, or the line overflows or falls short.
- Fixed counts the CSS scenes are built on (marked data-8b-fixed): nine night cells with the 21:00 cell (.nt-cell--main) in the middle, since the scene shrinks it and pulls the other eight in from their grid places; four grilling steps, since the dark card's clockwise path and the lit thresholds are made for a 2×2 grid; four grill rows, each with its own scroll timeline by id (#grill-beef, #grill-pork, #grill-ssam, #grill-stew), paired with the index links by order; four rooms and three guest quotes, targeted by position, with one portrait per quote in .st-strip in the same order; three set cards with one .ss-card--hot.
- Each room uses its photo twice, the sharp .rm-photo image and the blurred .rm-glow copy behind it: change both src.
- Drawn in CSS, recoloured through the --color-* variables: the visible column rules on every section (.l-rules), the logo mark, the red corner marks on the form fields, the set menu check boxes, the red squares on the history rule and the button heat fills. The ember colours come from --ember-ink, --ember-ash and --ember-hot, set on the opening h1, the guest quotes and the banchan statement.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #ffffff (white bar, grill, guest and question grounds, set cards, text on dark grounds, the form's submit button), `--color-2` #0b0b0b (text on light grounds, night and footer grounds, menu overlay, black buttons, the dark card of the grilling guide, the Most booked badge, the ink end of the burning words), `--color-3` #f1f1f1 (page ground: opening, grilling guide, banchan and set menu sections; the thin gaps between set cards), `--color-4` #1a1a1a (charcoal ground of the rooms, history and booking sections; the frames behind most photos; form dropdown options), `--color-5` #f2364b (the only accent: badge, logo bar, grill index marker, night times, lit step numbers, burning words, the most booked set card, history rule and squares, form field corners, button and link hovers, question plus, footer handwriting), `--color-6` #626262 (secondary text on light grounds: signature roles, grill note, index links out of view, unlit step texts, guest visits, banchan lines, set labels and times), `--color-7` #9c9c9c (secondary text on dark grounds: room intro, captions and seat labels, night and history lines, booking line, form labels and placeholders, footer headings and legal line, menu overlay details); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, email, form): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Book a table link in the top bar, the Book a table button under the opening text, and the Book a grill links in the menu overlay and the footer: now #contact; owner's target: your online booking page (OpenTable, ResDiary, SevenRooms or similar), or keep #contact once the form is connected.
- Book this set buttons on the three set menu cards: now #contact (the form has no field for the set); owner's target: the booking page for each set, or keep #contact and add a set field to the form.
- Allergens link in the footer: now #faq (the allergens answer); owner's target: your allergen menu or allergen page, if you have one.
- Private hire link in the footer: now #contact; owner's target: a private hire page or enquiry form, or keep #contact.
- The form in `#contact` (fields `name`, `phone`, `email`, `date`, `time`, `guests`, `room`, `message`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Hwaro (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (32, Unsplash: opening 2, grill 8, rooms 4, night 9, stories 3, banchan 2, journey 4): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Size: "62 covers · 14 grills" (opening), "62 covers on a busy night" (journey 2024); seats per room: 56 at 14 tables, 10 stools, 24 standing, up to 20 upstairs (rooms), "The back room seats twenty" (FAQ), "fourteen tables" (rooms, journey).
- Place: Ancoats, Manchester (page title, meta description, h1, journey), the address "1 Example Street, Ancoats, Manchester M4 0ZZ" (menu overlay, contact) and Blossom Street named in the history (journey line and the 2018 title).
- History: "Charcoal since 2016" (nav badge), "Est. 2016" and "© 2016-2026" (footer), "since the car-park days" (opening signature); 2016 a grill behind a tyre shop, 2018 a former print shop with six tables, 2021 the ageing room and a butcher, 2024 the upstairs room and the bar (journey).
- Hours, which disagree in the demo: "Daily 17:00-01:00" (menu overlay), "Mon-Thu 17:00-00:00, Fri-Sun 12:00-01:00" (contact), rooms from 17:00, the bar from 19:00 and upstairs from 12:00 at weekends (rooms), "Until 01:00" (soju bar), "17:00 to 01:00" (night), "Last coals 01:00" (footer), calls from 15:00 and children until eight (FAQ). Make them one set.
- Prices: from £19 a plate (beef), £15 (pork), £6 a basket (ssam), £9 a pot (stews) (grill); sets £58 for two, £84 for two, £39 a head from six guests (sets); "Service 10%" (sets note); a £10 deposit a head for the back room (rooms, FAQ).
- Menu: the 20 cut and dish tags (grill), the set contents (sets), the eight banchan with Hangul names (banchan), "Twelve soju, three makgeolli on tap" (rooms), "Whole-animal Fridays" (grill) and the garden set of king oyster mushrooms, tofu and rice cakes (sets note, FAQ).
- Kitchen claims: galbi marinated for two days, sirloin dry-aged 28 days in a glass room (grill, rooms, sets), kimchi three weeks in the crock and banchan made every morning (banchan), charcoal lit in the yard for forty minutes (table), a grill and an extraction hood at every seat and a coat bag at the door (rooms, FAQ).
- Allergens: "Soy, sesame, wheat and fish sauce run through most marinades" and plates marked for the table (FAQ): write your own allergen facts, never keep the demo ones.
- Staff: Min-ji Seo, head of grill (opening) and Dae-ho Park, head butcher (table quote).
- Reviews: "4.9/5 · 1,280 reviews" and three quotes by Hana Kim, Tom Avery and Priya Shah with their visits (stories); the portraits are stock photos and their alt texts name the guests.
- Booking rules: tables held for fifteen minutes, the bar and the ageing counter walk-in only, "usually a seat after ten", children until eight, groups of twelve in the back room (FAQ); tables open six weeks ahead, seven or more by phone (contact); form times 17:00 to 22:00, guests 1 to 6, rooms (contact form); confirmation by text "within the hour" (contact, thank-you line).
- "Next free table · tonight 21:30" (contact) and "A Friday in March" with nine times (night) are invented: change or remove them.
- Footer: "© 2016-2026 Hwaro Ltd. All rights reserved.": put in your legal name.

## Known limits
- Without JavaScript the menu button cannot open the overlay; under 860 px the bar's links are hidden, so only the footer links remain, and One night (#night) has no link there.
- The booking form sends nothing: section-script:contact only checks the fields and shows the thank-you line, and without JavaScript the browser posts it back to the page. The next free table line is static text, not live availability.
- Where the motion runs, words the ember effect has not burnt yet are pale ash grey (about 1.4:1 on their ground): a guest quote or the banchan statement read low on the screen looks faint until it scrolls up.
- The night grid and the history track hold on stages at least 560 px tall: on a landscape phone or a short window they crop at the bottom. On phones the night captions wrap to two lines and cover part of each small photo.
- Without CSS scroll-driven animation support (Firefox today) or with reduced motion on, the scroll scenes do not run and the wheel scrolls natively: words stay ink, the night grid and the four years sit as plain grids, the guide shows its first step lit, the grill index stays ink with its red mark on the first group and the most booked card is red with every box checked. The opening's lift-in still plays in Firefox, not with reduced motion.
- The Hangul names bring 94 @font-face rules of Asta Sans's Korean slices into the inlined font CSS (about 57 KB of the file; only the slices the page uses download). The handwriting face is now used only for the footer line.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Hwaro left only in class names.
