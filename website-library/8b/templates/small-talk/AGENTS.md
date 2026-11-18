# AGENTS.md: language course website template

One-page website for a language school or course provider that teaches adults in small evening groups. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.4 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/language-course-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/language-course-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/language-course-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/language-course-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:navigation`: `.nav__bar` `.nav__menu-btn` `.menu__close` `.menu__link`
  - `section-script:level`: `.le__q` `.le__answer` `.le__wait` `aria-pressed` `.le__reply` `data-score` `data-from` `data-to`
  - `section-script:contact`: `.co__form` `.co__thanks`
  - `scene-script:opening`: `.op__head` `.op__bubble` `.op__statement`
  - `scene-script:voices`: `.vo__board` `.vo__pad` `.vo__note`
  - `scene-script:trips`: `.tr__stage` `.tr__track` `.tr__trip` `.tr__stamp`
- `style="--len:N"` = characters in that display line, spaces included: `Small Talk` is 10.
- The wordmark in the first screen is sized from style="--len:10", the number of characters of "Small Talk"; update it when you rename the brand, or the wordmark overflows or leaves a gap.
- The torn edges are SVG paths in the hidden defs block (tear-1 to tear-4, lid, base, note) used as rims and clip paths; recolour the page through the variables in :root and keep the ids, since stickers and the quote notes reference them.
- Counts the CSS and scripts depend on: eight greeting bubbles in the opening (their places are nth-child rules), six cards in the syllabus (each card's starting scatter is an inline style on its li; a new card without one starts from the default place), four teachers in a 4 column grid, exactly four student notes (the CSS times each note and rotates it by nth-child), and exactly three questions in the level finder (the result ranges add up to a score of 0 to 6). The trips track measures its width, so cards can be added or removed.
- The level finder, the form message and the menu are driven by section scripts that read class names (le__q, le__reply, le__answer, co__thanks, menu__link); keep those classes when editing.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #1d2440 (navy ground of the opening, syllabus, languages, voices, level and contact sections, and the dark text on pink and cream), `--color-2` #f9fcf4 (body text on navy, the fees ground, sticker rims, quote notes, cream buttons and the second kind of bubble), `--color-3` #ff9bb4 (the accent: wordmark, heading accent words, bubbles, badge, trips ground, teacher name bars, club dates, the small-print note, button sweep and focus ring), `--color-4` #2b2b2b (charcoal ground of the teachers and after-class sections), `--color-5` #a7b0d6 (lead paragraphs, captions, teacher bios and club texts on navy or charcoal), `--color-6` #6f7ba9 (hairlines between rows, form field borders, menu and footer link dividers, the peeled corner's shade), `--color-7` #151b33 (deep navy of the full-screen menu, the contact form panel, field fills and the footer); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, form, email): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Free trial button in the nav, Book a free trial in the first screen and in fees, Book that trial in the level finder: now #contact; owner's target: your trial booking page, or keep #contact once the form is connected.
- See the courses button in the first screen and the Pick your language link under the syllabus: now #languages and #languages; owner's target: keep, or point to your full course catalogue.
- Book my free lesson button in the contact form: now submits the form to the same page; nothing is sent, a script shows the thank-you line; owner's target: your form service (Formspree, Netlify Forms) or your booking system.
- Phone and email links in the menu, contact and footer: now tel: and mailto: placeholders; owner's target: your real phone number and address.
- Privacy link in the footer: now #contact; owner's target: your privacy policy page.
- The form in `#level` is the level finder, not a contact form: it has no fields and sends nothing. `section-script:level` reads the `data-score` of the pressed reply in each `.le__q` and shows the `.le__answer` whose `data-from`/`data-to` range holds the sum. Keep it as it is, change the questions and groups, or delete the section and the script; it needs no form service.
- The form in `#contact` (fields `name`, `email`, `language`, `when`, `note`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Small Talk (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (18, Unsplash: opening 2, syllabus 6, teachers 4, trips 4, contact 1, footer 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- School and place: "Small Talk Language School", Chicago, an address with a second floor and a ZIP, the phone and email (page title, meta description, menu, contact, footer).
- Courses: six languages with levels (A1 to C1, A1 to B2, A1 to B1) and lesson days and times, ten weeks, two hours a week, eight people at most (languages, fees).
- Term: "Spring term", "Starts March 9 · evenings and Saturdays" (opening tape).
- Syllabus: the twelve-week claim and the six situations with phrases; the closing line naming the doctor, the landlord, a first date, a job interview, a polite complaint and a wedding toast (syllabus).
- Prices: $420 a term, $690 a term for two, $68 an hour; "Your first lesson is free" (fees).
- Small print: books and audio included, join another group when a class is missed, three instalments, a full refund before week two (fees).
- Teachers: Mateo Ruiz, Amara Diallo, Rosa Bellini, Rafael Costa with home cities and bios, plus Jonas and Emi; the portraits are stock photos of real people (teachers).
- Events: four dated clubs with venue names and times, the entry price "five dollars for friends", "free for students" (clubs).
- Trips: Lisbon, Lyon, Osaka and Oaxaca with durations, months and prices from $1,180 to $2,650, "twice a year" (trips).
- Student quotes with names and levels, including a move to Lisbon and a grandmother in Italian (voices).
- Level finder: the group suggestions (A1 Tuesdays 6:30 pm, A2 Thursdays 6:30 pm, B2 Saturdays 10 am) and "we place everyone in ten minutes" (level).
- Office hours: Mon to Thu 4 to 9 pm, Sat 9 am to 2 pm, and the promise "We will call you within a day" (contact).

## Known limits
- Without JavaScript the menu button cannot open the overlay and the level finder does nothing. The footer links cover Syllabus, Languages, Teachers, Trips, Fees and the form, but After class has no other link, and the student quotes are in neither the menu nor the footer.
- The form does not send anything: it posts to the same page, and without JavaScript submitting reloads at #contact. Connect a form service before publishing.
- The voices and trips sections hold the screen (CSS sticky) while they play; on a short screen the stage is tight and the notes or the postcards sit close to the heading.
- Without scroll-driven animation support (Firefox today) the page shows its finished layout: voices and trips stand as plain grids and the bubbles, photos and notes sit in place; only the opening load-in, the cap's jiggle and the bubble's bob still play. With reduced motion on, nothing moves on its own; the bar still hides on scroll down.
- The big wordmark and the torn top depend on the first screen being tall; on very wide, short windows the portrait and the intro sit close together.
- The syllabus promises twelve weeks (six cards plus six situations in its closing line) while the languages lead and the group fee say ten-week courses: reconcile them with your real course.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Small Talk left only in class names.
