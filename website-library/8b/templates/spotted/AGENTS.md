# AGENTS.md: modeling agency website template

One-page website for a model scouting and development agency that runs a weekly open call for new faces. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/modeling-agency-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/modeling-agency-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/modeling-agency-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/modeling-agency-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:site-nav`: `.nv-menu` `.nv-close`
  - `section-script:contact`: `.ct-form` `.ct-status` `data-sent` `data-missing`
  - `scene-script:board`: `.bd-names` `.bd-item` `.bd-photo`
  - `scene-script:develop`: `.dv-sheet` `.dv-frame`
  - `scene-script:shows`: `.sh-pin` `.sh-view` `.sh-track` `.m-card`
  - `scene-script:network`: `.nw-row` `.nw-city` `.nw-tag`
- `style="--len:N"` = characters in that display line, spaces included: `SpottedMGMT` is 11.
- The board pairs the nth name with the nth portrait: the scene reads both lists, so keep them in the same order and length when you add or remove a face.
- The method CSS places exactly four steps along the line (four grid rows and an offset per nth-child) and the develop sheet is a three by three grid of nine frames; the frame 07 mark is an SVG inside the seventh frame (the CSS lifts that frame above the rest) and the note names it, so move both together. The contact flag wave has one timing rule per square in the contact scene CSS, written for its 45 squares in fifteen columns.
- The footer wordmark size comes from style="--len:11", the character count of the wordmark: update it when you rename. The wordmark also appears in the nav and the phone overlay.
- The yellow glow behind the open-call photo, the checker flag, the spots and the diagonal line are CSS and SVG, not images: recolour them through the colour variables in :root.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #ebebeb (page ground, and the board, found-places, shows, questions and contact sections), `--color-2` #121212 (text, buttons, and the black open-call screen, contact-sheet section, cities section, phone menu and footer), `--color-3` #f6cc48 (the accent: dots, halo, yellow buttons, city tags, checker flag and the whole promise panel), `--color-4` #ffffff (nav panel, method section ground, the contact sheet itself, form panel and button text), `--color-5` #575757 (paragraphs beside headings, meta lines, board names not yet reached, form status line), `--color-6` #fae49c (the paler squares of the checker flag), `--color-7` #a6a6a6 (muted text and hairlines on black: open-call labels, contact-sheet section text, footer headings), `--color-8` #d6d6d6 (fill of the photo cards and frames behind the images); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, social, phone, email, form): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Book a Thursday slot button in the open-call screen: now #contact; owner's target: your booking page for open-call slots, or keep #contact once the application form is connected.
- Apply to join the board link in the new board section: now #contact; owner's target: your application page, or keep #contact.
- YouTube, TikTok and Instagram pills in the nav, the phone menu and the footer: now the home pages youtube.com, tiktok.com and instagram.com; owner's target: your own profile addresses, or remove the pills you do not use.
- Send application button in the contact form: now does not send anything: the form has action="#"; the script checks that name, age and email are filled in, shows a thank-you line and clears the form; owner's target: your form service (Formspree, Netlify Forms or your own endpoint), or remove the form and keep the phone and email.
- The form in `#contact` (fields `name`, `age`, `city`, `email`, `photos`, `guardian`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Spotted (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (25, Unsplash: opening 1, board 6, spotted 4, develop 9, shows 5): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Founding and company: "London, since 2016" and "Spotted Management Ltd. Registered in England" (footer).
- Open call: Thursdays, 2 to 6 pm, no appointment needed, a parent if under 18; about twenty minutes (opening, contact, faq).
- Address, phone and email: Studio 4 address, phone and scouting email (opening, contact, footer); all are placeholders.
- Zero fees and commission: "nothing to pay at any point", "a commission on bookings, and nothing before them", free coaching (method, promise).
- The crossed-out charges: portfolio shoot £450, registration fee £120, website listing £25 a month, a compulsory posing course (promise).
- Timing promises: about two months to a first booking, six weeks of development, a reply within ten working days (method, faq, contact).
- Age and height rules: people from 14 upwards, height mattering for runway only (faq); the form's age field has min 14 and max 99, which are not enforced (the form uses novalidate and the script only checks that it is filled).
- The six people on the board with heights, towns and where they were spotted (board); the four stories of Rae, Maren, Noor and Kai (spotted); all are invented.
- Show and campaign claims: Maren's London debut, Kai in Milan, Noor closing a Paris show three months after the bus stop, an outerwear campaign, Joy's beauty story (shows, spotted).
- Frame 07 note: Ines's first test and a Paris lookbook booking three weeks later; the test-shoot names Hana, Ama, Luc, Ines and Vera (develop).
- The partner network: five cities with the work type and the year each partnership began, 2019 to 2025 (network).
- Studio services: a free half-day test with a photographer, a booker on set for the first job, and the claim that the agency sends new faces to clients who book them (method, develop).
- Mother agency terms: "We stay your mother agency" and placement abroad only when the person is ready (network, faq).
- Photos: the portraits are stock photos; their alt texts and captions name the invented people (board, spotted, develop, shows).

## Known limits
- Without JavaScript the Menu button on phones does nothing, so the phone nav links are not reachable there; the footer repeats About, Our faces, Shows, Questions, Apply, the contacts and the social pills.
- The application form has no backend and does not send anything until you connect one.
- Without CSS scroll-driven animation support (Firefox today) every section shows its finished layout with ordinary scrolling: the board and the show cards stand as grids, the test shoots sit in their sheet and the photos keep their colour; the opening's load-in still plays, without the glow's breathing loop. With reduced motion on, the load-in stops too; the nav still hides on scroll down.
- Counts are fixed in CSS: four method steps, nine test frames, five show cards (the third and fifth are wider) and 45 flag squares; an extra item sits outside the motion or the layout unless its rules are added.
- The board and test-shoot stages stick to the screen and the shows track holds while it runs sideways: on short screens the sticky frames leave little room, check them at 375 px and on a laptop.
- Fonts load from Google Fonts and photos from Unsplash, so a first visit needs a network connection.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Spotted left only in class names.
