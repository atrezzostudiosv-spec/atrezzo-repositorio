# AGENTS.md: boat tour website template

One-page website for a boat trip and charter operator that sells seats from a pier kiosk. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/boat-tour-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/boat-tour-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/boat-tour-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/boat-tour-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:navigation`: `.nav__toggle` `.nav__toggle-label` `.nav__menu` `data-close`
  - `scene-script:route`: `.route__track` `.place__lift`
  - `scene-script:onboard`: `.onboard__stage` `.onboard__window` `.onboard__line`
  - `scene-script:reviews`: `.reviews__hold` `.quote`
- `style="--len:N"` = characters in that display line, spaces included: `Pierhead` is 8.
- The wordmark in the footer sets its size from style="--len:8", the number of characters of the name. Change the number when the name changes length.
- The route section becomes a sideways strip only while scroll motion runs: CSS lays the cards out in a flex row and holds the section for 1.15 times the row's overflow, and a short script measures the overflow into --route-distance and the wave from each .place__lift. Keep each card inside its .place__lift wrapper.
- The reviews deck stacks every .quote in one grid cell, front card first from --i and --n, and adds about half a screen of scroll per card; a card more or less only changes the hold.
- The trip rows are laid out by CSS grid and their sideways spread is set per row: an inline style on each .trip holds its start offsets, and the photo pan rules are written for three rows (the second carries .trip--flip). Keep a card and its two photos as the direct children of each .trip; a fourth row needs its own offsets and pan rule.
- The charter frame wipes to photos 2 to 4 as occasions 2 to 4 reach the middle of the screen (CSS :nth-of-type rules): keep four occasions and four photos, or add matching rules.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #eef0f2 (page background, the solid nav bar and the wordmark tab, the charter photo frame backing on phones), `--color-2` #0c0d10 (text and headings on the light ground, dark button pills, the wordmark in the nav tab), `--color-3` #070a0f (background of the opening frame and of the trips, onboard, reviews, contact and footer panels, and of the phone menu overlay), `--color-4` #ffffff (text on dark panels, the white button pills, the FAQ question cards and the phone card over the FAQ photo), `--color-5` #ff8a1f (the only accent: hover fill on buttons and round icon buttons, focus outlines, the five stars in the opening), `--color-6` #545a63 (secondary text on the light ground: route, fleet and charter intros, place and crew captions, FAQ answers), `--color-7` #a1a8b2 (secondary text on dark panels: trip lines and facts, onboard notes, review captions, footer text), `--color-8` #11161e (the dark cards inside panels (trip cards, review cards) and the colour behind photos while they load); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, form, email, social): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Book a seat button in the first screen: now #trips; owner's target: your online ticket shop or booking page, or keep it on the trips section.
- Plan your trip button and the three Book links (Book the Loop, Book the Light, Book the Sail) in the trips section: now #contact; owner's target: the ticket page of each trip on your booking system, or keep them on the contact block.
- Ask about a charter button in the charter section: now #contact; owner's target: a charter enquiry form or an email link.
- Book a seat link in the menu: now #contact; owner's target: your online ticket shop.
- Gift vouchers link in the footer: now #contact; owner's target: your voucher page, or remove the link if you sell none.
- Sailing news email form in the contact block: now action="#" with method post, nothing receives the address; owner's target: your mailing list form endpoint (Mailchimp, Formspree, Netlify Forms) or remove the form.
- Privacy and terms of carriage link in the footer: now #footer (the footer itself); owner's target: your privacy policy and terms of carriage page.
- The form in `#contact` (fields `email`) sends nothing. Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it.
- The name Pierhead (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (29, Unsplash: opening 4, trips 6, route 5, fleet 3, onboard 1, crew 3, charter 4, faq 1, contact 2): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Rating and volume: "Rated 4.9 out of 5 by 3,100 passengers" (opening).
- Season and frequency: "Nine departures a day from Pier 3, April to October, and weekends through the winter" (opening, meta description; the demo timetable lists eight).
- Trips, boats and times: Harbour Loop on Marigold at 10:00, 11:30, 13:00, 14:30 and 16:00; Lighthouse & Seals on Kittiwake at 10:30 and 14:00; Sundown Sail on Hesper an hour before sunset, Thursday to Sunday (trips).
- Fares: £16 and £9 for the Loop, £32 and £18 for the Light, £38 for the Sail (twelve and over), children under four free on a lap (trips, FAQ).
- Durations and route: fifty minutes, two hours, ninety minutes; Gull Point Light "lit since 1871"; the places on the route (trips, route).
- Vessels: names, build years (1958, 1974, 1936), seats (36, 60, 12), the brass bell, heated saloon, step-free ramp and toilet, the bar on Kittiwake and Hesper (fleet, onboard).
- People: Ros Pennick (skipper since 1996), Jonah Reyes (since 2017), Tomas Kerrow (since 1981), their quotes; the portraits are stock photos (crew).
- Charter prices and capacity: up to sixty, Marigold from £420 for two hours, Kittiwake from £680, Hesper from £520 for an evening, school trips from £9 a head on weekdays (charter).
- Reviews: Hannah Lowe, Marcus Bell, Priya Nair and Tom Ashdown, described as comment cards copied as written (reviews).
- Policies: bad weather cancellation (text by eight in the morning, full refund), dogs on Marigold and Kittiwake only, free changes up to a day before, arrive a quarter of an hour early (FAQ).
- Place and hours: Pier 3, North Quay, Kelmouth, ten minutes' walk from the station, kiosk from 8:30 until the last boat is in (FAQ, contact).
- Licence and history: "licensed by the Kelmouth harbour authority and sailing since 1961", "family firm" (footer).
- Phone and email in the FAQ card and the contact block, set to placeholders here: put in your own.

## Known limits
- Without JavaScript the Menu button cannot open the overlay at 900px and narrower; the desktop bar links and the footer anchors stay reachable. The questions are native details and open without it.
- The sailing news form does not send anything: it posts to # until you connect it to a service.
- The route and reviews sections are held while you scroll: the route for about 1.15 times its overflow width and the reviews for roughly 1.65 screen heights, which feels long on short laptop screens.
- In browsers without CSS scroll-driven animations (Firefox today), with reduced motion or without JavaScript, the scroll motion and the smooth wheel are off: the route is a grid of five cards, the reviews a two-column grid, onboard shows its full picture and the charter frame its last photo. Firefox still plays the opening load-in.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Pierhead left only in class names.
