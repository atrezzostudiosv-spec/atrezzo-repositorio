# AGENTS.md: running race website template

One-page website for a mountain trail race or other yearly outdoor sports event, with the course, race categories, entry rules and results history. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/running-race-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/running-race-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/running-race-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/running-race-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:navigation`: `.nav__bar` `.nav__overlay` `.nav__menu` `.nav__close`
  - `scene-script:course-climb`: `.course__track` `.course__part` `.part__alt`
  - `scene-script:races-deal`: `.races__deck` `.race`
  - `scene-script:kit-zoom`: `.kit__list`
  - `scene-script:editions-sky`: `.editions__sky` `.ed__layer` `.ed__word` `.ed__year` `.ed__table` `.ed__day` `data-sky`
  - `scene-script:trailday-stretch`: `.td__line`
- `style="--len:N"` = characters in that display line, spaces included: `First light` is 11, `to last light` is 13, `Long` is 4, `Half` is 4, `Vertical` is 8, `Clear` is 5, `One` is 3, `day` is 3, `Solsta` is 6.
- Headings with a character count in style="--len:N" must be updated when the words change: the two headline lines on the first screen, the race names, the two words "One day" and the footer wordmark. The editions scene rewrites its own word's --len.
- The course scene reads the altitude from the value attribute of each data element with the class part__alt (a plain number of metres), not from the visible text; keep both in step. It measures the part tiles, so tiles can be added or removed (no CSS rule counts them).
- Each table row in the editions section has a data-sky value (clear, fog, snow, wind, heat, none or storm) that must match one of the seven sky layers in the held tile; the scene copies the weather word and the year from the row.
- The three race cards sit on a three-column grid, and the sky tiles of the first screen, the race cards and the contact tile take their colours from their own --hour value (the contact scene animates it from .6 to .78; the editions tile is covered by its data-sky layers); the kit scene reads its list items, so items can be added.
- The night photo in the finish village section is six tiles of one image, each placed by its --c and --r values; the motion CSS times them in pairs by :nth-of-type, so keep six tiles.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #111111 (page ground, text on lime buttons and badges, borders and the hard shadows), `--color-2` #ececea (body text on the black ground, the light cards (entry board, trail day card, race office cards) and part of the fog, storm and not-run skies), `--color-3` #ff4a14 (orange: the light that crosses photos, the button sweep, the heat sky and the glow behind the contact cards), `--color-4` #c2f47c (lime: buttons, badges, link underlines, course part numbers, kit boxes, focus outline and hover colour), `--color-5` #8e6cf5 (violet: the ends of the sky gradient and the snow, wind and storm skies), `--color-6` #f6b5e3 (pink in the sky gradient and the wind and storm skies), `--color-7` #c9f2e3 (mint: base of the sky tiles and the clear and snow skies), `--color-8` #ffc58c (peach in the sky gradient and the clear and heat skies), `--color-9` #a3a3a3 (grey for labels, course facts, table heads, hairlines and the quote credit), `--color-10` #ffffff (white in the sky gradient and skies, and the form field background), `--color-11` #241a4a (deep violet of the night that closes over the contact tile), `--color-12` #1d1d1d (dark card surfaces: course cards, question boxes, the quote card, photo backing, the current table row and table hairlines); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, email, phone, form, social): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Enter the ballot buttons in the top bar, the menu overlay and the first screen: now #entry (the Getting a place section); owner's target: your registration or ballot page.
- See how the course spends them link on the first screen: now #course; owner's target: keep, or point at a course page.
- Download the GPX of the Long link in the course section: now solsta-2027-long.gpx (the file is not in the package; the link has the download attribute); owner's target: your own GPX file, or remove the link.
- Volunteer in 2027 link in the crew section: now #contact; owner's target: your volunteer sign-up page.
- Get the ballot reminder button in the entry section: now #contact; owner's target: your reminder or mailing-list sign-up.
- Ask the office link in the questions section: now #contact; owner's target: keep, or your contact page.
- Send to the office button of the race office form: now the form posts to a mailto: address as plain text; it opens the visitor's mail program and does nothing in a browser without one; owner's target: your form handler (Formspree, Netlify Forms or your own endpoint), or remove the form and keep the email and phone.
- Instagram, YouTube and Strava club links in the footer: now the home pages https://www.instagram.com/, https://www.youtube.com/ and https://www.strava.com/; owner's target: your own profile and club addresses.
- Race rules and Privacy links in the footer: now #contact; owner's target: your rules and privacy pages.
- The form in `#contact` (fields `name`, `email`, `topic`, `message`) sends nothing. Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it.
- The name SOLSTA (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (13, Unsplash: course 5, crew 4, kit 1, orvalle 1, trailday 2): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Date and daylight: Saturday 19 June 2027, first light 04:50, last light 21:40, "sixteen hours and fifty minutes" of sun, the page title and meta description (opening, races, FAQ).
- Course: 58 km, five parts with distances, climbs and altitudes (1,310, 1,890, 2,610, 2,742 and 1,040 m), eleven tops above 2,400 m, 3,900 m up, 2,700 m down, the place names Orvalle, Pra Bas, Sella, Kessel Tor, Kessel Hut (course, races, FAQ).
- Races: Long 58 km, Half 27 km, Vertical 6 km, start times 04:50, 09:30, 17:40, and 900, 700 and 300 places (races, entry).
- Fees and what they include: €145, €95, €45, the bus at 03:30, aid stations, a seat at the long table, dinner at Kessel Hut (entry).
- Dates of the ballot: 11 to 31 January, the draw on 8 February, pay by 1 March, book the trail day by 15 April, transfers until 1 May (entry, FAQ).
- Rules and cut-offs: no qualifying race but a 40 km mountain race asked of Long runners, poles allowed, cut-offs at the col 12:30, Kessel Tor 15:40, finish 21:40, Half 14:00 and 19:30, Vertical 20:10, the 2,000 m lower route, the 03:00 forecast (FAQ).
- Results history: ten editions from 2017 to 2026 with weather notes, fastest names and times, finisher counts, the cancelled 2020 and the stopped 2019 (editions).
- Crew: "212 people", six aid stations, two radio posts, a kitchen at 2,100 m, four named volunteers and the quote by Marta Albi (crew).
- Kit list: ten required items, the 1.4 kg total, "one litre of water", a blanket of at least 1.4 × 2 metres, aid stations up to 9 km apart (kit).
- The village: 640 people, 1,900 seats, long table from 19:00, band until 01:00, 300 beds, school gym at €18 with breakfast at 03:30, train and post bus of 40 minutes (finish village, FAQ).
- Trail day: one day of trail work in May per place, 07:30 to 15:30, any Saturday in May or two weekday mornings, a stone numbered with the bib instead of a medal (entry, trail day).
- Contact: the address, hours (Monday to Friday 09:00 to 12:00, race week 07:00 to 21:40), answers within two working days or within the hour in race week; the email, phone and the footer social profiles are placeholders (contact, footer).
- Organisation: "SOLSTA Mountain Race Association" and the year 2027 (footer), the first edition in 2017 with 212 starters, nine editions run and one cancelled (editions).

## Known limits
- Without JavaScript the menu button cannot open the overlay, and below 1081 px the seven top-bar links are hidden; the footer links and the Enter the ballot button remain. The page still reads in full: the course row is a plain grid and every box in the kit list is ticked.
- The race office form posts to a mailto: address as plain text. It opens the visitor's mail program and does nothing on devices without one; replace it with a form service before launch.
- The Download the GPX link points at a file that is not in the package, so it fails until you add the file.
- The course is held while its row slides sideways, about one and a half to two screens of scroll on a laptop or a phone, and its tiles are lifted by up to 30% of the screen height, so on short windows the highest tiles can reach the top edge and be cut off.
- Without scroll-driven animation support (Firefox today) the page shows its finished layout: the course row is a plain grid, the race cards sit in their row, every kit box is ticked, the night photo is whole, the editions tile keeps its first sky and the wheel scrolls natively; only the first screen load-in plays. With reduced motion on, that stops too; hovers and the top bar sliding away on scroll still run.
- The fonts are variable (TikTok Sans for display and Google Sans for text) loaded from Google; the widening words depend on the display font having a width axis, and a fallback font will not widen.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and SOLSTA left only in class names.
