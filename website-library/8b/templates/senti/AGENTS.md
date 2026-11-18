# AGENTS.md: wellness studio website template

One-page website for an emotional fitness studio, coach or course creator who sells a group course, live sessions, team workshops and a printed journal. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/wellness-studio-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/wellness-studio-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/wellness-studio-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/wellness-studio-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:navigation`: `.nav__toggle` `.nav__overlay` `.nav__close`
  - `section-script:opening`: `.op-band`
  - `section-script:journal`: `data-add-cart` `.jr-status` `data-cart-count` `data-cart-link` `data-count` `data-label-items` `data-added-text`
  - `section-script:contact`: `.ct-form` `.ct-status` `data-sent-text`
  - `scene-script:opening`: `.op-band` `.op-band__track`
  - `scene-script:fine`: `.wd-wall` `.wd-cell` `data-face`
  - `scene-script:ledger`: `.cr-ledger` `.cr-row`
  - `scene-script:circle`: `.tm-photo` `.tm-offer`
- `style="--len:N"` = characters in that display line, spaces included: `Motivation` is 10, `Fine` is 4, `Together` is 8, `SENTI` is 5.
- The giant words carry style="--len:N" (Motivation 10, Fine 4, Together 8, wordmark 5) that sizes them to the width. When you change a word, set --len to its number of characters.
- The words wall is built for 24 cells (6 by 4 on desktop, 2 columns on phones) and the scene adds a "fine" face to each cell; keep the count or check the wall again. The calendar, the ledger and the quote band read their rows from the HTML; the ledger arm measures each row, so weeks can be added or removed.
- The numerals 1., 2. and 3. are the three steps of joining (free, course, team) and sit in black columns coloured by --color-2; recolour them through the variables in :root.
- The asterisk after a giant word points to a footnote line in the same section, and hovered links get a small asterisk. Keep the footnote text in step with the word.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #ece9e4 (page ground, nav bar, button and card fills, text on black columns), `--color-2` #1c1a18 (text, hairlines, borders, black numbered columns, filled buttons), `--color-3` #57534d (secondary text: captions, footnotes, labels, form labels, FAQ answers), `--color-4` #dcd8d1 (photo frame ground behind images and the hover fill of small boxed links); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, email, phone, social, form): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Book a class button in the opening: now #course; owner's target: your course booking or enrolment page, or keep #course.
- Watch live button in the opening: now #live; owner's target: your live stream or channel page, or keep #live.
- Remind me and Book a place links in the live calendar: now #contact; owner's target: a reminder sign-up, the stream page or a ticket page for each event.
- Reserve a seat links in the course footer and in the last calendar row: now #contact in the course footer, #course in the calendar row; owner's target: your checkout or enrolment page for the course group.
- Plan a session button in the teams section: now #contact; owner's target: your corporate booking page or a calendar link.
- Add to cart button in the journal section: now no checkout: a script raises the cart count in the header and shows a line of text; owner's target: your shop or payment link, or a cart script that does the real work.
- Cart icon in the header: now #journal; owner's target: your cart or shop page.
- Instagram, TikTok and YouTube icons in the left rail and the footer: now the home pages https://instagram.com/, https://tiktok.com/ and https://youtube.com/; owner's target: your own profile addresses.
- The form in `#contact` (fields `name`, `email`, `topic`, `message`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name SENTI (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (7, Unsplash: motivation 1, founder 1, live 1, teams 1, journal 3): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Course: six weeks, one evening a week, ninety minutes, a group of twelve, $240 for six evenings, the next group starting on 3 November (course, live).
- Course topics by week: Anger, Fear, Sadness, Shame, Joy, All of them, with a line of text for each (course).
- Live show: Thursday Live on Twitch, 8 pm CET, every week, free, no sign-up, recordings online for a month (opening, live, FAQ).
- Calendar: six dated events with titles, formats and prices, including two workshops at $35 and the course group 14; the dates 15 Oct to 3 Nov are demo dates (live).
- Team formats and prices: Half-day reset $1,900 for up to sixteen people, Monthly check-in $650 a month, Two-day retreat from $8,400 (teams).
- Journal: $32, 192 pages, lay-flat binding, A5 linen cover, 84 prompts, a feelings index, ships within three days, twelve weeks of daily prompts (journal).
- Founder: the name Mara Ilić, her title, ten years as a theatre coach, the story of the Thursday night class (founder). The portrait is a stock photo.
- Member quotes with first names and ages: Lea 34, Omar 41, Priya 27, Jonas 52 (opening band). They are invented and must be replaced with real, permitted quotes.
- Claims about outcomes: "thirty feeling words" after the course and "most people speak up by week three" (words footnote, FAQ).
- Qualifications and policy: "led by certified coaches", recordings of each session for the group, the drill sent by email, invoices in the company's name, learning budgets (FAQ).
- Contacts: email, phone, studio address, hours Mon to Thu 10:00 to 21:00, a reply within two working days (contact, footer).
- Free formats: Minute Drills on TikTok and Sunday Circle, an open group with one sentence a week (opening cards).
- Safety note: the footer line that the studio is training, not therapy, and to call the local emergency number in a crisis (footer, FAQ). Keep it and adapt it to your country.

## Known limits
- Without JavaScript the menu button on phones cannot open the overlay and the desktop links are hidden under 900 px. The footer repeats Course, Live, Teams and Journal, but Studio and Contact have no other link there.
- The form posts to # and the Add to cart button changes a count only: both need your own form service and shop. Without JavaScript neither shows any message.
- Without scroll-driven animation support (Firefox today) or with reduced motion on, the page shows its finished layout: no section holds, the 24 cells show their feeling words without the flip, no ledger row lights, and the quote band is a wrapped list instead of a running line. In Firefox the opening heading line and buttons still play their load-in; with reduced motion they do not.
- The journal scene addresses its three photos by CSS :nth-of-type rules; a fourth photo would stay still unless those rules get a fourth entry.
- Two sections hold while they play (the words wall and the teams photo). At 375 px the teams section is about 1,330 px tall, so the formats and the button sit below the screen until the hold ends, and their rise plays out of sight.
- At 375 px the 24-word wall becomes 12 rows of 2 columns, about 820 px with the heading, while its hold is shorter than on desktop (1.1 screens against 1.5), so the wave runs faster, and on a screen under about 820 px tall part of it plays below the edge.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and SENTI left only in class names.
