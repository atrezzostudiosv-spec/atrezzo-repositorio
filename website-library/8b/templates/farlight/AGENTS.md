# AGENTS.md: glamping website template

One-page website for a glamping or remote cabin business that rents a handful of stays on a few sites. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.4 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/glamping-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/glamping-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/glamping-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/glamping-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:navigation`: `.nav__bar` `.nav__menu` `.nav__overlay` `.nav__close`
  - `section-script:opening`: `.op__search` `.op__stage`
  - `section-script:contact`: `.contact__form` `.contact__status` `data-sent` `data-missing`
  - `scene-script:opening`: `.op__fg` `.op__drift` `.op__title` `.op__title-wrap`
  - `scene-script:ridges`: `.ridges__stage`
  - `scene-script:stays`: `.stay` `.stay__card`
  - `scene-script:night`: `.night__ground` `.moment`
- `style="--len:N"` = characters in that display line, spaces included: `Farlight` is 8.
- The heading in the first screen sets behind a cut-out copy of the cabin photo: the polygon points in scene-script:opening (the shape array, fractions of the photo) outline the cabin and the snowfield, and both image copies share the same src and width and height attributes. A new hero photo needs its own points and both copies updated, or the heading sinks behind the wrong silhouette.
- The footer wordmark is sized from style="--len:8", the number of characters of the name; set it to the length of the new name.
- The scroll scenes take their colours from the CSS variables on :root (the pledge from --color-5, --color-7 and --color-3, the contact section from --color-4, --color-8, --color-2 and --color-3), and scene-script:night reads the background and text colour of each of the five moments at run time: recolour the page through these, not through the scripts.
- The stay finder in the first screen and the booking form share the same options; keep the option lists identical, since section-script:opening copies the chosen values into the selects #contact-ridge, #contact-stay and #contact-nights, and a value missing from the form's list leaves that select empty.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #eef0f7 (page ground of the first screen, ridges, stays, supper, getting-there, guestbook and questions sections, and the fill of the form fields), `--color-2` #211c55 (body text, filled buttons, the rail icons, step discs, the Firelight moment ground and the text on the rose contact ground), `--color-3` #ffffff (photo frame borders, white cards, the pill buttons, the current rail mark, the hosts section ground and text on dark grounds), `--color-4` #0d0b27 (the second screen, menu panel, pledge and footer grounds, the Starlight moment and the start of the contact ground), `--color-5` #f2783f (the only accent: round button discs, the top of the logo mark, arrow strokes, the open question sign and the pledge lines while they burn), `--color-6` #57547a (lead paragraphs, field labels, captions and secondary card text), `--color-7` #b8c1ee (periwinkle for pledge lines after they switch off, the footer wordmark, the shuttle note band, the status line and muted text on dark grounds), `--color-8` #e7b6cb (dawn rose for the Last light and First light moments, the contact ground and the pink glow over the first photo), `--color-9` #323d80 (the Blue hour moment ground and the base behind the first photo window); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, form, email): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Check dates button in the stay finder of the first screen: now does not search: a script copies the chosen ridge, stay and nights into the booking form and scrolls to #contact; owner's target: your booking engine or availability page (pass the three choices as parameters), or keep it as a shortcut to the request form.
- Book a stay buttons in the header and the menu: now #contact; owner's target: your booking page URL if you take bookings elsewhere, or keep it on the request form.
- Ask for dates buttons under each of the four stays: now #contact; owner's target: a booking link for that stay, or keep them on the request form.
- Add supper to a stay button in the supper section: now #contact; owner's target: your supper add-on or extras page, or keep it on the request form.
- Book a seat button under the route in the getting-there section: now #contact; owner's target: your shuttle booking page, or keep it on the request form.
- Send request button of the booking form: now a script checks name and email and shows a thank-you line; nothing is sent (the form has action="#"); owner's target: a form service (Formspree, Netlify Forms) or your booking system, or remove the form and keep the phone and email.
- Phone links in the menu, the questions section, the contact section and the footer; email links in the contact section and the footer: now tel: links and mailto: links; owner's target: your own phone and email.
- The form in `#opening` (fields `ridge`, `stay`, `nights`) sends nothing; `section-script:opening` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The form in `#contact` (fields `name`, `email`, `ridge`, `stay`, `arrival`, `nights`, `message`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Farlight (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (23, Unsplash: opening 6, hosts 4, faq 1, stays 4, ridges 4, night 5, table 3, arrival 1, notes 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Number of stays and layout: "38 stays on four ridges" (opening), "Six to twelve stays a ridge, never more" (ridges, with 12, 8, 10 and 8 stays), "400 metres from the next" (opening).
- Ridge names, places, altitudes and drive times: Snowline 2,450 m, 3 h 40 from Reno; Red Bench 1,900 m, 2 h 50 from St. George; Salt Rim 1,700 m, 3 h from Las Vegas; Juniper Mesa 2,100 m, 1 h 30 from Flagstaff (ridges, getting there).
- Nightly prices: Rim Cabin $310, Glass Dome $260, Shell Pod $240, Canvas Suite $190 (stays); supper box "For two, with the wood $64" (supper); dogs "$30 a night" (FAQ).
- Stay specs: sizes in square metres, sleeps 2 or 4, wood stove, deep bath, telescope, 180 degree window, terrace, two rooms (opening card, stays).
- Operating details: arrival "around four", lamps off "at ten", breakfast "at eight", supper delivered at "6 pm" (one night, supper), "no streetlights for forty miles" (opening).
- Host names and ridges: Mara Quint, Eli Navarro, Walt Brennan, June Okafor, and "Mara answers the phone from eight to eight" (hosts, FAQ, menu).
- Policies: cancellation "up to fourteen days before arrival for a full refund" then one free date move within twelve months; the free night after a cloudy stay, usable "within a year"; "Nothing is charged until you confirm the dates" (FAQ, contact).
- Facilities and rules: wifi only in the gate cabin and a landline, stoves and heating per stay type, children only in the canvas suites at Juniper Mesa, dogs only in the Rim Cabins at Snowline, water from the ridge's own well, four-wheel drive "only from December to March" (FAQ, getting there).
- Shuttle: "leaves the last town at 2 pm on Fridays and Sundays" and the gravel distance "six miles" (getting there).
- Guest notes: six quotes with invented names, ridges and months (notes); never present them as real reviews.
- Dark-sky pledge: five rules and the claim that they are "written into our leases with the land" (pledge).
- Seasonal claims: skis by the door "from December to April" at Snowline, "the darkest sky of the four" at Red Bench, "the mildest winters" at Juniper Mesa (ridges).
- Contact details: phone (menu, questions, contact, footer), email and the office "1 Example Street, Bishop, California" (contact, footer), and the company name in the copyright line "Farlight Camps".

## Known limits
- Without JavaScript the menu button cannot open the panel; the links stay reachable in the footer and the rail. The booking form does nothing useful: it has no sending code, and the stay finder only jumps to the form without carrying the choices.
- The cut-out copy of the cabin photo shows only while scroll motion is on, so in Firefox, with reduced motion or without JavaScript the heading sits plainly over the photo.
- On phones the white "Find Your Own Ridge" card is hidden under 720 px, the section rail only appears from 1024 px, and on phones shorter than 700 px the first-screen paragraph is hidden too.
- The ridges scene is written for four windows (data-8b-fixed="4" on the list): the sticky stage is held for a fixed 285vh of scroll, so a fifth ridge needs a longer hold in scene:ridges.
- Without CSS scroll-driven animations (Firefox today) or with reduced motion, the smooth wheel, the entrances and the scroll scenes are off: the ridges stand as four windows in a column, each night moment keeps its own ground, the pledge lines rest in periwinkle, the guest cards sit still over the photo and the contact ground is dawn rose. Firefox still plays the opening load-in, the photo drift and the glow loop.
- The three 46 px round thumbnails in the first screen carry a srcset of 1020 and 1290 px images, and three stay photos repeat their src attribute: trim both when you swap photos.
- The opening stage is sticky for one screen in every browser, so the night screen slides over the first photo; on short or landscape screens of under 560 px the first screen packs its windows tightly.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Farlight left only in class names.
