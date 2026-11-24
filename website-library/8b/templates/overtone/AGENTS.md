# AGENTS.md: music school website template

One-page website for an online music school or lesson studio, with instrument programs, mentors, masterclasses, a sheet-music shop, plans and a free-lesson booking form. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.11 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/music-school-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/music-school-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/music-school-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/music-school-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:site-nav`: `.nav__menu-btn` `.nav__close`
  - `section-script:contact`: `.contact__form` `.form-status`
  - `scene-script:programs-deal`: `.deck` `.program`
  - `scene-script:masterclass-zoom`: `.mc__hold` `.mc__stage` `.ticket--featured` `.ticket__photo`
  - `scene-script:covers-iris`: `.track`
  - `scene-script:path-hop`: `.stair__slot` `.path__marker`
  - `scene-script:pricing-bridges`: `.plans` `.plan`
  - `scene-script:contact-fold`: `.contact__cascade` `.contact__sq`
- `style="--len:N"` = characters in that display line, spaces included: `Overtone` is 8.
- The footer wordmark size comes from style="--len:8", the number of characters in "Overtone". After a rename set --len to the new length. The name also appears in the nav logo, the phone overlay, the footer brand block and the copyright.
- The three-square logo, the cascade of squares, the disc's orange backdrop and centre hole, the barcode, the diamonds and the bridges are CSS and SVG, not images: recolour them through the colour variables in :root (--color-4 is the orange accent, --color-5 the pale yellow).
- Each cover appears twice, as a small image in its row and as a layer of the big disc; replace both with the same photo.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #ffffff (page background, nav pill, the odd program cards, the outer plan cards, the outer review cards and text on the dark lesson panel), `--color-2` #131313 (text, all outlines, primary buttons, the dark lesson panel, the mobile menu overlay, the active covers row), `--color-3` #e5dcd2 (beige cards: the two small tickets, middle plan, contact card, even program cards, the middle review card, alternate FAQ rows and the path band), `--color-4` #ff5714 (the accent: diamonds, the disc backdrop in the covers shop and the favicon tile), `--color-5` #f4f0a1 (pale yellow fill of the small buttons, discount badges and round icon buttons, plus the colour of a program card or small ticket while its button is hovered), `--color-6` #57524c (struck-through old prices and the mentors' one-line bios); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, form, email, phone): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Sign up buttons in the nav and the phone menu, and the Log in links in the nav and the footer: now #contact (the booking form); there is no account area; owner's target: your sign-up and login pages, or keep #contact and remove Log in if you have no accounts.
- Book a free lesson button and Choose an instrument link on the first screen: now #contact and #programs; owner's target: your booking page for the trial lesson; keep #programs for the link.
- The round arrow button on each of the five program cards: now #contact; owner's target: the booking page of that instrument, or a page about the program.
- Book a seat buttons on the three masterclass tickets and Get a seat in the stage nights card: now #contact; owner's target: your ticket or event page for that date.
- Add buttons on the six rows of the covers shop: now #contact; there is no cart; owner's target: your shop or checkout link for each arrangement.
- Start monthly, Start a term and Start family buttons in the plans: now #contact; owner's target: your checkout or subscription link for each plan.
- Ask a mentor link beside the FAQ heading: now #contact; owner's target: a support email or chat link.
- Book a free lesson submit button in the contact form: now no request: a script checks the required fields and shows the thank-you line; owner's target: your form service (the form action is #contact with method post).
- The form in `#contact` (fields `name`, `email`, `instrument`, `message`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Overtone (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (21, Unsplash: opening 1, programs 5, mentors 5, masterclasses 3, covers 6, stage 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Prices: $120 a month Monthly, $102 a month billed per term, $190 a month Family (pricing); masterclass $17 (struck $20) and $20 (masterclasses); covers $4, $5, $4, $5, $6 and $9 (covers).
- Lesson lengths and ages: 45, 45, 30, 45 and 60 minutes; ages 6+, 8+, 10+, 8+ and 13+ (programs); "Fifty minutes, one mentor" (opening); "Four 45-minute lessons" (pricing); the free lesson is "thirty minutes" (path, faq, contact).
- Mentors: Arjun Mehta, Daniel Asfaw, Lena Brandt, Ama Mensah, Jonah Reyes with their instruments and bios ("plays on about forty records a year", "leads a sixty-voice city choir"); the portraits are stock photos of real people and their alt texts name them (mentors, masterclasses, reviews).
- Mentor rules: "teaches no more than twenty students", "Every mentor gigs, records or tours" (mentors); "a mentor answers, usually the same day" (faq); "within a day" (contact thank-you line).
- Masterclasses: titles, hosts, dates (12 and 13 Nov, 26 and 27 Nov, 10 and 11 Dec), times (19:00, 18:30), "90 min each", "12 seats", "groups of twelve", "keep the recording" (masterclasses).
- Stage night: "Next: 14 December, live in Lisbon and online", a sound engineer and real lights, "partner venues" (stage, path).
- Numbers and reviews: "4.9 from 2,140 students", the quote by Mara Lindqvist, the three reviews by Priya, Tom and Yuki (reviews).
- Policies: "The first lesson is free", "no card is needed", "pause or cancel any month; unused lessons move to the next one", "Pause for up to two months a year", switching mentors "at any time", switching instrument "any month", "Younger children are welcome in a trial lesson" (pricing, faq, programs).
- Plan contents: "One masterclass seat each term", "A slot at the stage night", "Shared covers shop credit", "A duet slot", recordings of each lesson (pricing).
- Covers shop: arrangement titles (Slow Sunday Morning, Neon Rain, Paper Lanterns, Backbeat Theory, Last Train Home, Orange Hour), levels and what each includes (covers).
- Online setup: "Your instrument, a laptop or tablet with a camera, and headphones", "a five-minute setup guide", "Low-latency audio" (opening, faq).
- Languages and hours: "Lessons in English, Spanish and Portuguese" (footer); "Lessons every day, 7:00 to 22:00 in your time zone" (contact).
- Contacts: hello@overtone.example and +1 415 000 0000 are placeholders (contact, footer); "© 2026 Overtone School" (footer).

## Known limits
- Without JavaScript the Menu button on phones cannot open the overlay. The footer repeats the section links, so every section stays reachable.
- Fixed counts: the CSS scenes animate items by :nth-of-type, so keep five program cards, four path steps, three plans with two bridge drawings between them, six covers rows with six disc layers in the same order, and six squares in the contact cascade. A different number needs matching rules in the scene CSS.
- The contact form posts to #contact and sends nothing; the thank-you line appears only through the small script. Connect a form service before publishing.
- Without scroll-driven animation support (Firefox today) or with reduced motion on, the page shows its finished layout: the dark opening panel appears without its load-in, the programs and masterclass sections are not held, no covers row turns black and the disc shows the last cover. The nav bar still hides on scroll down and the hover effects stay.
- The reviews quote begins in a pale grey while it inks in; with the scene running the words are pale until they pass the middle of the screen.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Overtone left only in class names.
