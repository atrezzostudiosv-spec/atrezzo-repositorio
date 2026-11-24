# AGENTS.md: movie theater website template

One-page website for an independent cinema, film club or small screening venue that wants a weekly programme, a bar and a membership. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, Lenis 1.3.4 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/movie-theater-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/movie-theater-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/movie-theater-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/movie-theater-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:site-nav`: `.nav__menu` `.nav__close`
  - `section-script:visit`: `.visit__form` `.visit__status`
  - `scene-script:programme`: `.programme__days` `.programme__day` `.programme__still` `.programme__pane`
  - `scene-script:picks`: `.picks__notes` `.picks__note`
  - `scene-script:seasons`: `.seasons__pin` `.seasons__track` `.m-window__pane`
- `style="--len:N"` = characters in that display line, spaces included: `Halide` is 6.
- The programme scene pairs the six day tiles with the six stills by position; add or remove a day and a still together.
- The booth gate is written for four frames (data-8b-fixed="4"): the keyframes of scene:booth step the strip, the sprocket columns and the shutter in three moves. A fifth frame needs new keyframes.
- The footer wordmark gets its size from style="--len:6", the number of characters in Halide: update it when the name changes.
- The perforation strips, sprocket columns, tilted windows and the gate frame are CSS: recolour them through the variables in :root (the strips and the gate use --color-1, --color-2 and --color-5).
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #121214 (page ground, text on white, mint and lavender tiles, label on the lavender buttons, the phone menu ground and the shutter flash over the booth frames), `--color-2` #ffffff (nav bar, white tiles and question tiles, text on the dark ground, the visit section once it has brightened, the lit programme day), `--color-3` #b8a4f7 (main buttons, lavender tiles (the Book a seat tile, the second programmer, the membership stub, the visit form, one season panel), focus outline, hover tint on programme rows, the open-question marker), `--color-4` #8cf2e6 (mint tiles: the doors tile on the first screen, the first programmer, the questions heading tile and one season panel), `--color-5` #222226 (the film gate frame in the booth, the perforation strips in the rooms section and the footer, the background behind photos while they load), `--color-6` #a9a9b3 (secondary text on the dark ground: section intro lines, room descriptions, programme notes, bar note, footer address, text inside the dark visit tiles), `--color-7` #55555e (secondary text on white, mint and lavender tiles: first-screen captions, question answers, the visit intro line after it brightens); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, email, map, phone, form, social): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Book tickets buttons in the nav and the phone menu, and the Book a seat button on the first screen: now #programme; owner's target: your ticketing page or booking widget.
- Every film time link in the six-day programme: now #visit; owner's target: the booking page for that screening (one link per showing).
- Join Halide button in the membership ticket: now #visit; owner's target: your membership sign-up page.
- Open the map link in the visit section: now an OpenStreetMap search for Leith Edinburgh; owner's target: a map link to your venue.
- Newsletter link in the footer pill row, and the Send me the monthly programme checkbox in the form: now #visit (the link); the checkbox is sent with the form, which sends nothing yet; owner's target: your mailing-list sign-up page, and a form service for the checkbox.
- The form in `#visit` (fields `name`, `email`, `message`, `newsletter`) sends nothing; `section-script:visit` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Halide (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (22, Unsplash: opening 1, programme 6, booth 4, rooms 2, picks 2, bar 2, seasons 4, visit 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Cinema profile: a two-screen independent cinema in Leith, Edinburgh, "an independent cinema since 1938", 35mm prints, a programme chosen by hand (title, meta description, booth, footer).
- Screening data: tonight's film, its director, year, running time and rating ("Ines Halloran, 2025", 98 min, 12A, French with subtitles), doors 19:00, film at 19:30, "no adverts first" (opening).
- The weekly programme: six days of films with times, screens and notes (35mm, Q&A, captioned, relaxed, under-tens, Late Double), all invented titles (programme, picks).
- Prices: ticket £11, members £6, a friend £4 on Tuesdays, membership £9 a month or £96 a year, £6 a month for students and over-65s, children £3 and grown-ups £4 at Small Screenings (opening, membership, seasons).
- Equipment and building: two projectors built in 1979 and serviced every spring, five reels a feature, a 1938 hall restored in 2019 with a nine-metre screen, 140 seats and 48 seats, a balcony, sofas (booth, rooms).
- People: Mara Lindqvist (programmer since 2016, a former projectionist), Teo Okafor (since 2021), pianist Ruth Ferrier; about forty films watched a month to choose nine (picks, seasons).
- Bar menu and prices: Leith pale ale £5.80, natural wine £7.50, espresso tonic £4.20, toastie £6.50, popcorn £3.00; opens at 17:00, from 10:30 at weekends (bar).
- Regular nights: Sunday Reels Sundays at 15:00, Late Doubles Fridays from 22:15, Silent + Piano on the first Wednesday at 19:30, Small Screenings Saturdays at 11:00 (seasons).
- Membership terms: a free ticket every month, booking a week early, a vote on one film each season, ten per cent off at the bar (membership).
- Policies: one short film before the feature and quiet seating for latecomers, drinks from the bar only, refunds up to two hours before and swaps until doors open for members, screen hire on weekday mornings and Mondays (faq).
- Access: step-free access, wheelchair spaces and a hearing loop in both screens, captioned Wednesday evenings, relaxed Wednesday afternoons (faq, programme).
- Address, opening hours (Tuesday to Friday 17:00 to 23:30, weekends 10:30 to 23:30, closed Mondays), the walk from the Shore and the tram, the phone +44 131 000 0000 and hello@halide.example, which are placeholders (visit, footer, faq).
- Company line "Halide Picturehouse Ltd" and the "© 2026" copyright (footer).

## Known limits
- Without JavaScript the phone menu button cannot open the overlay (the Book tickets button and the six footer links still work), and the message form submits to the page itself; with or without JavaScript it sends nothing until a form service is connected.
- The six questions are native details elements and open without JavaScript.
- The booth gate holds the page for about two screens of scroll and the seasons track for about two and a half at 1440 by 900 (a little over one on a phone).
- Without scroll-driven animation support (Firefox today) and with reduced motion, the scroll motion and the smooth wheel are off: the programme screen keeps its first still with no day lit, the gate shows its four captioned frames in a column, the notes sit in their grid, the ticket rests torn, the seasons form a grid of panels (one column below 1100 px) and the visit section is white. The opening load-in still plays in Firefox and stops with reduced motion; the nav hide-on-scroll and the hover effects keep running.
- The CSS turns every photo greyscale (filter: grayscale(1)), so colour photos also show in black and white; remove the filter to show colour. The booth captions sit on white plates, so they stay readable over any photo.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Halide left only in class names.
