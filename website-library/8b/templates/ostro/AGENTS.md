# AGENTS.md: boutique hotel website template

One-page website for a small boutique hotel or guesthouse that shows its rooms, its day, its table and its surroundings, and takes enquiries. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/boutique-hotel-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/boutique-hotel-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/boutique-hotel-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/boutique-hotel-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:contact`: `.contact__form` `.contact__status` `data-sent`
  - `section-script:navigation`: `.nav__menu` `.menu__close`
  - `section-script:opening`: `.opening__drift` `.opening__view`
  - `section-script:footer`: `.footer__news` `.footer__sent` `data-sent`
  - `scene-script:rooms`: `.rooms__line` `.rooms__name` `.m-text-2` `.rooms__track`
  - `scene-script:harbour`: `.harbour__grid` `.harbour__tile`
  - `scene-script:guestbook`: `.guestbook__line`
- `style="--len:N"` = characters in that display line, spaces included: `Ostro` is 5.
- The rooms scene moves exactly three panels, with one name in the heading line per panel in the same order: CSS :nth-of-type rules, --rooms-n: 3 and the lit-name steps in scene-script:rooms are set for three.
- The wordmark in the footer is sized by style="--len:5", the number of letters. Change N when you rename the house.
- Each hours row carries its own --hours-ground and --hours-ink inline for the static page; the scroll scene repeats the same colours as steps in its keyframes, set for six rows, so change a row's colours in both places.
- Each guest-book line must hold two words or more, because the inline kit splits it into words (data-8b-split) and the scene slides the halves together.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #f3efea (page ground, full-screen menu, footer and the 07:00 day row), `--color-2` #191615 (text and low-opacity rules, the fill of dark buttons and of light buttons on hover, the opening's dark block, the 21:00 day row and the shade under the room names), `--color-3` #a3401a (room-kind labels, outing times, the form message, the hover fill of dark buttons and the 15:00 day row; blended into the 12:00 and 18:30 rows), `--color-4` #67625d (captions, field and fact labels, the menu head and small footer lines), `--color-5` #fbfaf7 (light buttons, the logo pill, room fact cards, outing plates, the 09:30 day row and text on dark grounds); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, email, form, social): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Book a room button in the bar, the Book a room button on the first screen, the Ask for a sea room, Ask for a harbour room and Ask for the tower links, Book a table on the mole and Ask for the harbour map buttons, and the address link in the footer: now #contact; owner's target: your booking engine or reservation page, or keep #contact once the form is connected.
- See the rooms link on the first screen: now #rooms; owner's target: keep, or a page with your room list.
- Send the request button in the stay form: now does not send anything: the form action is #, and section-script:contact checks the required fields and shows the thank-you line; owner's target: a form service (Formspree, Netlify Forms), your own endpoint, or a link to your booking engine.
- Subscribe button in the footer letter form: now does not send anything: section-script:footer checks the email and shows the thank-you line; owner's target: your newsletter service, or remove the form.
- Instagram link in the footer: now https://www.instagram.com/ (the Instagram home page); owner's target: your Instagram profile, or remove it.
- Phone and email links in the menu, the questions note, the contact lines and the footer: now tel: and mailto: placeholders; owner's target: your real phone number and email address.
- The form in `#contact` (fields `arrive`, `leave`, `guests`, `room`, `name`, `email`, `message`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The form in `#footer` (fields `email`) sends nothing; `section-script:footer` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Hotel Ostro (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (30, Unsplash: opening 1, house 3, rooms 3, table 3, sea 4, harbour 15, contact 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Rooms and prices: eleven rooms; sea rooms six, 24-30 m², from €240 a night; harbour rooms four, 22-26 m², from €190; the tower one suite, 48 m², from €420 (rooms, opening, title and meta description).
- History: a customs house of 1908, closed in 1961, restored in 2019, walls ninety centimetres thick, terracotta floors from the old roof (house).
- Location: Marina di Serra, a harbour town "four streets deep", four minutes on foot from the ferry, eight minutes from the station, the address "Example Mole 1, Marina di Serra" (opening, harbour, contact, footer).
- Season and hours: open from the middle of March to the start of November; phone any day from eight to eight; check-in from two in the afternoon (faq, footer).
- Prices outside the rooms: station car park €12 a day; dogs €20 a night in the harbour rooms (faq).
- Policies: cancellation free until fourteen days before arrival and then the first night is kept; children welcome in the harbour rooms and the tower; one step-free harbour room on the first floor with a lift (faq).
- Meals and times: breakfast 7:30 to noon, lunch from 13:00, aperitivo 18:30 on the roof, dinner 20:30 on the mole, eleven tables, one sitting, a four-course dinner (table, hours).
- Outings: the boat to the coves at 10:00 daily from May to October, the lighthouse walk at 17:00 on Tuesdays and Fridays, the market at 06:30 on Thursdays (sea).
- People and boats named on the page: Rosa Calò the cook, Davide at the desk and on the boat, Tonino with the nets, the boat Maria Grazia (hours, table, sea, harbour, faq, contact).
- Guest-book entry: the sentence and "Ines and Marco, the tower, September" (guestbook).
- Place names in the captions and alt texts: Via del Forno, Via Lunga, Arco della Dogana, the hundred steps, Monte Serra, Serra station (hours, table, harbour, contact).
- Contact placeholders: +39 0833 000 000 and stay@ostro.example; "Rosa or Davide answers within a day" and "a letter within a day" (contact, form).
- Newsletter: "four a year" and "the next letter leaves the harbour in spring" (footer).

## Known limits
- Without JavaScript the Menu button does nothing and the page has no other navigation bar: the footer repeats Rooms, A day here, The table, The harbour and Questions, but The house and From the mole have no link.
- Both forms send nothing yet; the action is # and the thank-you lines come from scripts.
- Without CSS scroll-driven animation support (Firefox today) or with reduced motion on, the page shows its finished layout with the browser's own scrolling: the opening window stays small above the dark statement screen, the three rooms follow one another as full-screen panels, each hour row keeps its own colours and the outing plates stick without shrinking. Firefox still plays the opening load-in and photo drift.
- The CSS moves exactly three room panels, six hour rows and four outing plates (the first three shrink); more need new rules in their scene styles.
- The rooms stage is held at the screen height for two screens of scroll with the three kinds, and the room names sit as one line at its bottom over a dark gradient, so a long name or a short window can crowd the text panel.
- The nav hide-on-scroll runs even with reduced motion (without its slide); the scenes do not.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Hotel Ostro left only in class names.
