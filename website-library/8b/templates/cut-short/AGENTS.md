# AGENTS.md: film festival website template

One-page website for a short film festival, cinema season or screening series, with a programme, passes and a submissions call. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/film-festival-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/film-festival-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/film-festival-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/film-festival-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:site-nav`: `.nav__menu` `.m-btn__label` `.nav__list` `data-open-label`
  - `section-script:passes`: `.ps__switch` `data-tier` `.ps__price`
  - `scene-script:opening`: `.op__stage` `.op-window`
  - `scene-script:strands`: `.st__list` `.st__item` `.st__cut`
  - `scene-script:premiere`: `.pr__frame` `.pr__word`
  - `scene-script:venues`: `.vn__stage` `.vn__track`
- `style="--len:N"` = characters in that display line, spaces included: `Cut Short` is 9, `In competition` is 14, `The jury` is 8, `Venues` is 6, `Questions` is 9, `Passes` is 6, `Write to us` is 11.
- The page ships with no JavaScript libraries. Motion is CSS scroll-driven animations switched on by one small gate script in the head that sets data-8b-live; keep that script and the inline motion kit at the end of the body, the scene styles and the scene scripts together, since each scene reads classes and variables that its script writes (the opening window insets, the pill size of the opening night frame, the room height of the venues row).
- The strands list is built for up to eight rows: the scene CSS addresses rows 1 to 8 by position, and its script clones each name into a lower half, so keep the name inside the span with class st__cut. The venues row is three panels in a grid until the scene turns it into one row.
- The big headings set their size from style="--len:N", the number of characters of the text (Cut Short 9, In competition 14, The jury 8, Venues 6, Questions 9, Passes 6, Write to us 11). Update the number when you change a heading. The wordmark in the first screen is also split into the words "Cut" and "Short" in two spans, and the second word holds the window photo.
- Colours are variables on :root (--color-1 to --color-7); the ember --color-7 is the only colour, also used for the lit edge of the manifesto and the progress bars.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #000000 (page ground, the dark behind the title's window word, and the label colour on the white pill buttons and the ember hover fill), `--color-2` #ffffff (text, the title letters, the pill and icon buttons, and the colour the manifesto words end on), `--color-3` #0f0f0f (raised panels: the strands panel, the two ticket bodies and stubs, the contact panel, and the submissions card on the second opening screen), `--color-4` #a8a8a8 (secondary text and bracketed captions, the large strand names, the outline of the Standard and Concession switch, and the small day labels under the strands), `--color-5` #4f4f4f (the unlit manifesto words before they are reached, the slashes between strands and the dashed line above each price), `--color-6` #272727 (one-pixel rules between rows and sections and the track of the progress bars), `--color-7` #ff5b1f (the ember accent: focus outline, the progress bars under each film, step numbers, the dashes in the pass lists, the lit edge of the manifesto words and the hover fill of the white pill buttons); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, email, phone, social): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Get a pass button in the nav and Get a festival pass button on the first screen, Book opening night in the opening night section: now #passes; owner's target: your ticket shop or booking page, or keep #passes once the buy buttons are connected.
- Submit a film button in the submissions section: now a mailto link to the submissions address with the subject "Film submission"; owner's target: your submissions platform (FilmFreeway, Eventive or a form) or keep the mailto.
- Buy a festival pass and Buy a day ticket buttons in the passes section: now mailto links to the box office address with the subjects "Festival pass" and "Day ticket"; owner's target: the checkout or ticket page of each pass.
- Instagram, Letterboxd and Vimeo links in the footer: now the home pages of those sites; owner's target: the festival's own profiles.
- The name Cut Short (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (15, Unsplash: opening 1, manifesto 1, selection 4, premiere 1, jury 4, submit 1, venues 3): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Festival: "Cut Short", an international festival of films under twenty minutes, Glasgow, 11-17 Nov 2026, the 14th edition, "every November since 2013", "seven nights, three cinemas, forty-two films", twenty-six countries (title, meta description, opening, manifesto, selection, venues).
- Programme: the four featured films with directors, countries, runtimes, loglines and slots ("Wed 12 Nov · 20:15 · The Grand Hall" and the other three), and opening night "Red Hour", Tue 11 Nov, 19:30, 17 min (selection, premiere).
- Strands and their days: eight strands (International Competition Tue-Sun, Scottish Shorts, Animation, Documentary, After Dark Fri and Sat at 23:00, First Films, Music Video, Rescued Reels) (opening list, strands).
- People: festival director Ruaridh Bell, his story of a church hall and a bedsheet, and the jurors Saoirse Dunne, Tomasz Wilk, Leila Haddad and Daniel Mensah with roles, cities and quotes; the portraits are stock photos of other people and their alt texts name the demo people (manifesto, jury).
- Prize: "£5,000 and the closing-night slot" for the Cut Short Prize (selection, jury).
- Submissions: entries open on 1 March, "Submissions for 2027", films finished after 1 January 2026, free entry for students and first-time filmmakers, steps by 1 August, in August and by 15 September, two programmers watch every film, "selected filmmakers get a pass, two nights in Glasgow and a seat at the awards" (opening card, submit).
- Venues: The Grand Hall (640 red velvet seats, a painted ceiling), The Dome (a curved screen), Trongate Night Cinema (the festival bar open until two in the morning), their addresses and which strands play where, and "within a ten-minute walk" (venues; the placeholders replace the street addresses).
- Prices and concessions: Festival pass £68 (£45), Day ticket £16 (£11), what each includes, "no booking fees, ever", concessions for students, under-25s, over-65s, job seekers and carers (passes).
- Policies in the FAQ: step-free access and hearing loops, a captioned screening in every programme, relaxed Thursday matinees, ages (most 15 and over, After Dark 18 and over, Sunday morning Animation from eight), English subtitles, refunds on passes until 1 November, day tickets movable up to an hour before the first screening (faq).
- Contact: the four email addresses (tickets, submissions, press and partners, hello), the office address "1 Example Street, Glasgow G1 0ZZ" and the phone +44 141 000 0000 are placeholders; "We read everything, usually within two days" (contact, footer).
- Copyright line "© 2026 Cut Short Festival · Glasgow" and the closing line "See you in the dark." (footer).

## Known limits
- Scroll-driven animations need a browser that supports animation-timeline (Chrome, Edge and Safari today; Firefox does not yet). Elsewhere the scroll scenes, the entrance effects and the smooth wheel stay off and the page is the finished static layout; only the title's load-in and the still's slow drift play. With reduced motion those stop too, while the nav's hide on scroll and the hover fills keep running.
- Without JavaScript the phone menu button cannot open the overlay, and the Standard / Concession switch cannot change prices, so the Standard prices stay. The FAQ works without JavaScript.
- The bracketed captions (12.5 px) and the strand days (11 px) are grey #a8a8a8 on black, about 9:1 contrast; keep any replacement grey at least that light.
- The opening and the opening night screens are held for about one screen of scrolling each, and the venues row for the width of its panels; on very short screens the sticky stages may crop the text, and the first screen is built for at least 560 px of height.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Cut Short left only in class names.
