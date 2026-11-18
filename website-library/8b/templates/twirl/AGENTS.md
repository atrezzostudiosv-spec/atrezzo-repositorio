# AGENTS.md: dance studio website template

One-page website for a dance studio or class-based school with a timetable, teachers, passes and a free first class. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, MotionPathPlugin, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/dance-studio-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/dance-studio-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/dance-studio-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/dance-studio-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:contact`: `.ct__form` `.ct__done` `.ct__error`
  - `section-script:navigation`: `.nav__menu` `.menu__close`
  - `scene-script:styles`: `.st__cast` `.st__photo`
  - `scene-script:first-class`: `.fc__map` `.fc__path` `.fc__line` `.fc__walker` `.fc__step` `.fc__num`
  - `scene-script:showcase`: `.sh__pin` `.sh__track`
  - `scene-script:pricing`: `.pr__pass`
  - `scene-script:contact`: `.ct__disc`
- `style="--len:N"` = characters in that display line, spaces included: `Twirl` is 5.
- The opening ring is built for exactly eight portraits: each figure carries its own --i (0 to 7) and sits 45 degrees apart. The styles line-up and the six styles list are matched one to one by position (the CSS times each photo from its --i), and the four first-class steps are placed along a drawn path by their --x and --y values.
- The footer wordmark is sized from style="--len:5" (the number of characters in the name): update --len when you rename. The top-bar wordmark has a fixed size.
- The hand-drawn loops, the first-class path, the discs and the plus shapes are inline SVG and CSS shapes, not images: recolour them through the colour variables in :root.
- The red dot walks the first-class path through scene-script:first-class, which samples the SVG path and finds each step's number disc on it; if you redraw the path, keep the step discs on it so each number still fills when the dot arrives.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #f4f5f7 (page background, the solid header bar once scrolled, and the step numbers in the first-class path that the red dot has not reached), `--color-2` #15161c (text, rules, form border, icon buttons, and the black showcase and footer backgrounds), `--color-3` #cfe0ea (pale blue: the first-screen band, the full-screen menu, the styles circle, some timetable cards, the discs behind the quotes and the booking heading, and the fill on button hover), `--color-4` #d03e33 (red: hand-drawn loops, the walking dot and step numbers, four timetable cards, two teacher blocks and the Ten classes pass), `--color-5` #f7d02c (yellow: plus shapes, the showcase bars, the thank-you line, two timetable cards, the First class pass and the fill on white button hover), `--color-6` #19437f (deep blue: three timetable cards including the Friday open class, the showcase info card, one teacher block and the Unlimited pass), `--color-7` #1e1f36 (ink navy: the background of the main buttons), `--color-8` #ffffff (the timetable and pricing sections, white cards and form, photo borders in the ring, and text on dark), `--color-9` #575c6b (grey for lead paragraphs, small notes and the footer rule); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, email, form): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Free first class button in the top bar, Book a free first class in the phone menu and on the first screen, Book your free first class in the first-class section, Book it on the First class pass, Book a class buttons in the timetable and on the Drop-in pass, Buy ten, Go unlimited: now #contact (the booking form); owner's target: your booking, shop or checkout pages, or keep #contact once the form is connected.
- Ask for tickets button in the showcase: now #contact; owner's target: your ticket page for the show.
- Timetable link in the top bar: now #timetable; owner's target: keep, or your online timetable and booking system.
- How a first class goes link on the first screen: now #first-class; owner's target: keep as is.
- Phone and email links in the contact section and the footer: now tel:+441130000000 and mailto:hello@twirl.example; owner's target: your studio phone and email.
- The form in `#contact` (fields `name`, `email`, `style`, `night`, `message`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Twirl (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (26, Unsplash: opening 8, styles 6, first-class 1, teachers 5, showcase 6): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Studio facts: classes of 12 to 20, ages 18 to 80, trainers and water, Leeds, "seven nights a week" in the meta description although the weekend classes run in the daytime (opening, meta description).
- Styles and times: six styles with beginners, improvers or open-level times in a week (styles, timetable).
- Timetable: thirteen entries (twelve classes and a Friday open class from 19:00 to 21:00) with times, levels and teachers; the intro says "Fourteen classes and one open night", which does not match the grid, so correct it with the real timetable (timetable).
- Closure: classes run all year except 24 December to 2 January (timetable).
- Teachers: Kofi, Marco, Ines, Tash and Dev with their backgrounds (a church hall in Chapeltown, ten years of Cuban salsa, two touring companies, music videos, lindy hop at thirty); the photos are stock photos of real people (teachers, timetable, faq).
- Show: the Summer Showcase on Saturday 13 June 2026 at 19:30, Holbeck Hall, tickets £8 with students in the show free, twice-a-year performances, captions with months and years (showcase).
- Students: Priya, Gareth and Amaka with years, and "about half of every class started with us in the last six months", "our oldest regular started swing at seventy-four" (voices, faq).
- Prices: free first class, £12 drop-in, £95 for ten classes valid for four months and shareable, £69 a month unlimited with a month's notice (pricing).
- Practical answers: the heels policy (bring a strap pair or borrow one), step-free ground floor with an accessible toilet, over 18 only, booking ahead or paying at the desk (faq).
- Studio: "Unit 1, Example Mills, Leeds LS9", opening hours Mon to Fri 17:30 to 22:00 and Sat to Sun 10:00 to 16:00, phone 0113 000 0000 and hello@twirl.example are placeholders (menu, contact, footer).
- "Mabgate, Leeds" in the meta description and the company line "Twirl Dance Studio Ltd" (meta description, footer).
- "Partners change every song" and the rotation policy: partners rotate in salsa, bachata and swing and the other styles are solo (opening, faq).

## Known limits
- Without JavaScript the menu button cannot open the overlay: from 900 px the top bar keeps its five section links, but below 900 px only the Free first class button and the footer's three links (Styles, Timetable, Prices) are left.
- The booking form only checks the name and the email and shows a message; it sends nothing until you connect a form service or remove it. Without JavaScript it posts to the page itself (action="#contact"), which a static host such as GitHub Pages rejects.
- With scroll motion on, the showcase holds the screen while its row slides sideways, which can feel long on short laptop screens.
- The scenes are written for fixed counts: eight ring portraits, six styles and photos, four first-class steps, five teachers (one rule per card) and four passes (data-8b-fixed on each group).
- Without CSS scroll-driven animations (Firefox today) or with reduced motion, the smooth wheel, the opening load-in and every scroll scene are off: each section shows its finished layout, the first-class path is drawn with every number filled and the showcase photos wrap into a grid. Hover fills, the hiding header and the FAQ icon turn still run.
- On phones the first-class path is replaced by a straight line and the styles line-up shrinks into a sticky strip above the list, so check the layout at 375 px after you change the copy.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Twirl left only in class names.
