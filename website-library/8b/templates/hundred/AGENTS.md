# AGENTS.md: pilates studio website template

One-page website for a small reformer Pilates studio that teaches beginners, runners, new mothers, desk workers and people over sixty. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, Lenis 1.3.4 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/pilates-studio-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/pilates-studio-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/pilates-studio-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/pilates-studio-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits.
- Selectors the scripts use:
  - `section-script:nav`: `.nav__sheet` `.nav__menu` `.nav__close`
  - `section-script:contact`: `.co-form` `.co-status`
  - `scene-script:classes`: `.cl-wrap` `.cl-carriage` `.cl-rail`
  - `scene-script:fifty`: `.fi-stage` `.fi-track` `.fi-block` `.fi-rail` `data-from` `data-to`
  - `scene-script:bodies`: `.bo-list` `.bo-item` `.bo-frame`
- "Hundred" is both the brand and a real Pilates warm-up exercise: the h1 "Every class opens with the Hundred.", its lead paragraph and the first block of the fifty track ("The Hundred") name the exercise. When you rename the studio, change the title, meta description, wordmarks, the logo's aria-label, the email and the copyright, and keep or rewrite the exercise lines on purpose.
- Each block of the fifty track carries data-from and data-to minutes: the fifty script reads them to fill the block under the rail's dot, and the largest data-to is the length of the rail. The tick labels (0 to 50 min) are plain text: keep them, the ranges and the "Minutes ... to ..." lines in step.
- The classes script sizes its one carriage (.cl-carriage) from the first rail and relies on all rails sharing one height (grid-auto-rows: 1fr); the first rail carries .is-on in the HTML as the filled state when the scroll motion is off. Any number of rails works, but the longest text sets the height of all.
- The class glyphs (spokes, four rings, a ring with a disc, four blades) are inline SVG in currentColor, reused on the teacher cards and the fifty track; the frame, sheet and filled cards are CSS. Recolour through --color-1 to --color-4, and keep filled timetable chips (.m-surface-2) matching the line "Filled slots are Reformer classes".
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #f6f4e9 (cream sheet under the page, the fixed bar and the phone menu; text on deep coral; the cream buttons in the opening and on the middle price card), `--color-2` #ef573b (bright coral frame round the sheet; section headings, class, plan, teacher and day names, prices; card outlines, glyphs, hairlines and form underlines), `--color-3` #c3331c (deep coral opening and footer panels, the carriage and every filled card or chip, buttons, links, rule lead-ins, meta lines, form labels, the minute rail's dot and fill), `--color-4` #6b665e (warm grey body text, the six rules paragraph, the address and hours in contact, and typed form text); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, email, form, social): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Book a class button in the nav bar and in the phone menu: now #contact; owner's target: your class booking page (Mindbody, Momence, Glofox or similar), or keep #contact once the form is connected.
- Book your first class button in the opening: now #contact; owner's target: the booking page for a first class or a one-to-one intro.
- Book a place button in the timetable: now #contact; owner's target: your live timetable or class booking page.
- Book a first class, Buy ten classes and Go unlimited buttons on the three price cards: now #contact; owner's target: the checkout or booking link of each plan (a first class, a class pass, a monthly membership).
- The form in `#contact` (fields `name`, `email`, `class`, `message`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Hundred (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (21, Unsplash: opening 1, classes 4, fifty 4, teachers 4, bodies 4, studio 4): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Location: Leith, Edinburgh (page title, meta description, footer tagline), the street (meta description, studio heading, footer tagline, now Example Street) and "1 Example Street, Leith, Edinburgh EH6 0ZZ" (contact, footer); "Tall windows onto the Shore" (studio). The phone 0131 000 0000 and hello@hundred.example are placeholders.
- Prices: first class £15 and one-to-one intro £45 (opening, prices paragraph), Ten classes £180 ("£18 a class · four months to use them"), Unlimited £165 a month with "a month's notice to stop" (prices); "No joining fee and no contract to sign", grip socks lent free (prices).
- Class formats: Reformer 50 minutes, all levels, up to 8 people; Tower 50 minutes, Level 2, up to 4; Mat 45 minutes, all levels, up to 12; Ring 30 minutes, all levels, up to 10 (classes, the contact form's select).
- The room: eight reformers in two rows, two towers on the back wall, showers, lockers, towels included, buggy space by the door (studio, meta description).
- Teachers: Isla Kerr (founder, eleven years as a physiotherapist), Callum Reid (rebuilt his knee after rugby, the seven o'clock classes and the runners' block), Marisol Ortega (pre- and postnatal training in Madrid, the mothers' mornings), Tom Baird (strength coach, Ring and the Sunday release); "each trained for 450 hours on every piece of apparatus" (teachers), "physio-trained teachers" (meta description), "teachers who came from physiotherapy" (footer). The portraits are stock photos and their alt texts name them.
- Timetable: 24 classes from Monday to Sunday with times and teachers' first names, special classes Mothers (Tue 10:00), Backs (Tue 18:30), Runners (Wed 18:00), Sixty plus (Thu 10:00) and Release (Sun 11:30) (timetable, teachers' bios).
- Booking terms: book up to two weeks ahead, cancel up to twelve hours before and the place goes back on the pass (timetable); "Every class is booked by the place" (classes); a few minutes before the first class for the teacher to ask about your body, "Most people come twice a week", a twenty-minute monthly check-in with Unlimited (prices).
- Hours: Monday to Friday 06:45 to 20:30, Saturday and Sunday 08:15 to 12:45; "the front desk picks up between classes" (contact).
- The class plan: one fifty-minute arc with minute ranges 0 to 5, 5 to 12, 12 to 22, 22 to 32, 32 to 42 and 42 to 50 (fifty), "the next fifty minutes" (opening).
- Health statements the studio must stand behind: "the class we send stiff backs to first" (classes), "a safe way back to strength, with a teacher trained for both" after pregnancy, "bone strength" for over sixties (bodies).
- Service promise: "We will reply within a working day with a time for your first class" (the form's thank-you line).
- Legal: "© 2026 Hundred Pilates Ltd. Registered in Scotland." (footer) and the ® sign after the wordmark (nav, menu, footer): put in your legal name and drop the ® unless your name is a registered trade mark.

## Known limits
- Without JavaScript the Menu button (screens up to 900 px) cannot open the menu sheet. The footer repeats Classes, Timetable, Prices and Contact, but Teachers (#teachers) has no other link on those screens.
- The contact form sends nothing yet: section-script:contact checks the fields and shows the thank-you line. Without JavaScript Send posts the form to the page itself (action="#"), which a static host may refuse.
- In classes, while the carriage moves between two rails, the rail it is leaving shows its light text partly over the cream sheet for a moment.
- Without CSS scroll-driven animation support (Firefox today) or with reduced motion on, the page is static: no opening load-in, entrances, carriage or scroll effects; the first rail stays filled, the class plan is a plain grid without the minute rail, the portraits show at full height, the lanes and price cards rest in line, and scrolling is the browser's own. The hiding bar and hover fills still run.
- The price cards' start offsets are inline custom properties on each card (--prices-li-pr-plan-translate-from-2 and --prices-li-pr-plan-translate-from); a card added without them starts from a default offset.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Hundred left only in class names.
