# AGENTS.md: coding school website template

One-page website for a part-time coding school that retrains adults for tech jobs. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/coding-school-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/coding-school-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/coding-school-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/coding-school-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:nav`: `.nav__menu` `.menu__close`
  - `section-script:contact`: `.contact__form` `.contact__done`
  - `scene-script:course`: `.course__stage` `.course__track` `.mod__planes` `.mod`
  - `scene-script:fees`: `.plan`
- The pixel glyph in the nav, the careers heading, the graduates heading, the FAQ heading and the footer is five empty i elements styled in CSS, and the week strip is 24 empty list items in a 24-column grid that the course scene fills one by one: keep all five and all 24.
- The opening and the contact backdrop are .plane elements whose heap position comes from custom properties (--tx, --ty, --r, --s) scaled by the heap-to-order value --k: --k is fixed at 1 in the opening, and the contact scene animates it from 0 to 1 through the registered property --contact-k. Each module panel has two .mod__plane spans with their own CSS rotation. Recolour all of them in the plane rules or the colour variables, not with images.
- The track in the curriculum section is as wide as its five panels; the motion kit measures it, so adding or removing a module changes the scroll distance on its own, but the week strip stays at 24 squares.
- Counts the CSS fixes: the mentors scene swaps portraits 2 to 4 as mentor cards 2 to 4 arrive (:nth-of-type), the capstone stacking reads the classes .proj--1 to .proj--3, and the contact scene raises the first four detail rows. Keep four mentors, three capstones and four detail rows, or add matching rules. Each fee card's starting tilt is its style="--fees-article-m-surface-rotate-from" value.
- The brand word appears in the nav and the footer as lowercase text in a styled span and in the menu overlay's top line; rename all three, the logo aria-labels and the legal line.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #f5f5f7 (page ground, the solid bar after scrolling, the form field backgrounds), `--color-2` #1e2130 (body text and headings, the dark employer marks, text on the light planes), `--color-3` #5e606b (lead paragraphs, nav links, struck-through old jobs, notes under fees), `--color-4` #c93418 (the red accent: buttons, focus outline, the strike line, the taster panel, the last module and weeks 20 to 24, the labels of the contact details), `--color-5` #f29a1f (orange plane in the first screen, first module and weeks 1 to 5, first project and fee gradients, pixel glyph), `--color-6` #ec6a52 (coral: the tint behind old jobs, second module and weeks 6 to 10, gradient ends, minus signs), `--color-7` #4a3a5f (plum: the graduates and footer sections, the full-screen menu, the second project and fee cards, mentor labels, FAQ icons), `--color-8` #2a2137 (deep plum: the course section background, button hover wipe, gradient ends, the favicon square), `--color-9` #8a90a3 (slate: fourth module and weeks 16 to 19, gradient ends, field hover border), `--color-10` #dde8ea (ice: the mentors and questions sections, new-job rows, third module and weeks 11 to 15, lead text on dark sections), `--color-11` #ffffff (fee cards and the form surface, text on dark planes, button labels), `--color-12` #dcdde3 (hairline rules, form field borders and the bar's shadow line); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, email, form): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Book a free taster button in the first screen: now #taster; owner's target: your booking page or form for taster evenings, or keep it on the dates section.
- See the course round link in the first screen: now #course; owner's target: keep it, or point it to a syllabus PDF or a course page.
- Book buttons next to the four taster dates: now #contact, the contact form; owner's target: a booking link for each date (Eventbrite, Cal.com, a form), or keep them on the form.
- Apply and Check eligibility buttons on the three fee plans: now #contact, the contact form; owner's target: your application form or funding checker, or keep them on the form.
- Apply now button in the top bar and in the menu: now #contact; owner's target: your application page if you have one.
- The contact form: now action="#"; a small script stops the submit and shows a thank-you line, nothing is sent; owner's target: a form endpoint (Formspree, Netlify Forms, your own) and remove the preventDefault script.
- The form in `#contact` (fields `name`, `email`, `phone`, `topic`, `message`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Refactor (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (16, Unsplash: opening 1, curriculum 5, schedule 3, mentors 4, capstones 3): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Course length and structure: 24 weeks, five modules with week ranges (course heading, module badges, week strip labels, schedule lead, meta description)
- Weekly timetable: days, times and what each session is (schedule section, FAQ, contact hours)
- Fees: £7,200 full fee, £6,480 upfront, £300 a month for 24 months, the £720 saving, the refund window and the pause rule (pricing, FAQ)
- Next cohort start date: Tuesday 12 January 2027 (pricing lead)
- Taster evening dates, times, places and who teaches them (taster)
- Mentor names, former jobs, current employers and stories (mentors, taster dates)
- Graduate names, former jobs, current roles and quotes (careers, graduates)
- Employer names in the band at the foot of the opening, also named in the mentor and graduate lines (opening, mentors, graduates)
- Capstone clients, their results and numbers: 140 volunteers, 200 households, sold-out concerts (capstones)
- Funding claims: regional skills funding or employer payment, a twenty-minute eligibility call (pricing)
- Class size of twelve, loan laptops, recorded sessions, lunch and the quiet room for children (schedule, pricing, FAQ)
- Support claims: a year of careers help, catch-up Saturdays, one free pause, the two working day call-back (pricing, FAQ, contact)
- Age and background claims: the oldest graduate, the average age of the room (FAQ)
- Address, phone, email and opening hours (contact, footer, FAQ)

## Known limits
- Without JavaScript the Menu button cannot open the overlay and the contact form does not show its thank-you line; the footer links stay reachable and the FAQ opens natively.
- Without CSS scroll-driven animation support (Firefox today), without JavaScript or with reduced motion, the scroll motion and the smooth wheel are off and every section shows its finished layout: the course track becomes a strip you scroll sideways by hand, the mentors window shows only the first portrait for all four mentors, the taster panel is a plain red block and the capstone cards stick without shrinking. Firefox still plays the first screen's panel lift on load.
- The course section holds the screen for 1.15 times the track overflow: about 4,240 px of scroll at 1440 px wide (nearly five screens), about 1,550 px on a 390 px phone; more modules lengthen it. The mentors portrait window, the stacked capstone cards and the growing taster panel are CSS sticky and need enough screen height.
- The employer band in the opening is one row of five names on desktop and wraps to two rows on phones, inside a band 20 to 22% of the panel high; check both widths when you change the names or their number.
- The contact form does not send anything until you connect an endpoint, and the taster dates are fixed text, not a calendar.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Refactor left only in class names.
