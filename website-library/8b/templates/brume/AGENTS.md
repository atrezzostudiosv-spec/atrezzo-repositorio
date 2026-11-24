# AGENTS.md: sauna website template

One-page website for a sauna and bathing house or day spa with a lake, timed passes and a booking request form. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/sauna-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/sauna-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/sauna-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/sauna-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:header`: `.hd-menu` `.mn-close`
  - `section-script:arrival`: `.op-veil`
  - `section-script:saunas`: `.sa-row`
  - `section-script:passes`: `.ps-pass` `data-from` `data-to`
  - `section-script:visit`: `.vs-form` `.vs-status` `data-ok` `data-error`
  - `scene-script:arrival`: `.op-first`
  - `scene-script:day-light`: `.dy-hours`
  - `scene-script:house-slats`: `.m-photo`
  - `scene-script:passes-hours`: `.ps-board` `.ps-axis` `.ps-pass` `data-from` `data-to`
- `style="--len:N"` = characters in that display line, spaces included: `Water on the stones.` is 20, `A breath of heat` is 16, `rolls off the ceiling` is 21, `and the room` is 12, `goes quiet.` is 11, `Brume` is 5.
- Each sauna row's line has two lengths: at rest it comes from the temperature's data value (value as a percent of the track, set by section-script:saunas), and while the motion plays the line runs to the row's inline --saunas-span-sa-line-clippath-to-2, which is 100 minus that value in percent. Change both, keep values between 0 and 100, and keep the visible text in step.
- The five statement lines each carry style="--len:N", the number of characters with spaces and punctuation, which sets the font size so the line fits the width. Change N when you change a line.
- The passes read data-from and data-to (hours on a 24-hour clock, axis 08 to 22) for their bands and for the marker scene. The axis labels are separate text.
- The rest, round and day photos are stacked layers (heat over cold over rest; morning under night) moved by their scenes, so replace them with photos of the same shape and keep the order. The three small photos on the second screen rise by distances written in the scene:arrival keyframes; their data-depth attributes are not read.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #0b0906 (page ground, the menu overlay, the solid header, text on a filled button when hovered), `--color-2` #dcd8d1 (body and heading text, button borders and hover fills, focus outlines, fog patches), `--color-3` #9a948a (section rails, field labels, captions, small notes, form field underlines), `--color-4` #2b2620 (hairlines between steps, dishes, questions and passes; borders of the form panel and menu button), `--color-5` #d0703f (copper for heat: hot readings and temperatures, step meta, line ends, the lit hour, open pass bands, the pass marker, the statement glow), `--color-6` #8fb2b8 (lake blue for cold: cold readings and temperatures, the start of the temperature lines, the cold and dawn tints, one fog patch), `--color-7` #15120e (the request form panel, photo placeholders and the dropdown option backgrounds), `--color-8` #091114 (cold end of the sauna section's ground, a blue-black), `--color-9` #1b0d07 (hot end of the sauna section's ground, a brown-black); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, email, form, social): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Book a day buttons in the bar, the opening and the footer, the Come and see it link in the house section, and the pass links Book a morning, Book a full day and Book an evening: now the #visit anchor (the request form); owner's target: your online booking page, or keep #visit once the form is connected.
- Send request button in the form: now does not send anything: the form action is #, and section-script:visit checks the required fields, shows the thank-you or error line and resets the form; owner's target: a form service (Formspree, Netlify Forms), your own endpoint, or a link to your booking system.
- Instagram link in the footer: now https://instagram.com/ (the Instagram home page); owner's target: your Instagram profile, or remove it.
- Phone and email links in the contact details and the footer: now tel: and mailto: placeholders; owner's target: your real phone number and email address.
- The form in `#visit` (fields `date`, `guests`, `pass`, `name`, `email`, `note`) sends nothing. Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it.
- The name Brume (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (20, Unsplash: opening 5, ritual 3, rooms 4, statement 1, lake 1, schedule 2, kitchen 3, house 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Passes and prices: Morning 08:00-12:00 £38, Full day 08:00-22:00 £64 including lunch, Evening 17:00-22:00 £42 (passes, form options); every pass includes a robe, towels, all four saunas, the lake and tea.
- Menu prices: soup £9, smoked trout £14, rye and butter £5, birch-leaf tea £3, sea-buckthorn tonic £4 (kitchen).
- Temperatures and capacities: lake 4-16 °C, herb steam 48 °C with 10 seats, window sauna 80 °C with 14 seats, smoke sauna 95 °C with 8 seats; the readings Sauna 86° and Lake 7° (opening, footer, rooms). The hero and the passes say four saunas, while the rooms list three heated rooms and the jetty: make them agree.
- Hours and closures: daily 08:00-22:00, smoke sauna Thursday to Sunday from 15:00 heated for six hours, closed 24-25 December; the day's timetable (opening, rooms, schedule, contact, footer).
- The lake: Ellery Water, springs-fed, ladder depth 3.5 m, a 64-metre boardwalk, an ice channel from December to March, a lifeguard at weekends (rooms, lake).
- Getting there: forty minutes by train from the city to Holm, a shuttle of six minutes or a shore path of twenty-five, parking for twelve cars (contact, footer).
- Address: "Example Lane 1, Holm, on Ellery Water" (contact, footer, menu overlay); the phone +44 20 0000 0000 and hello@brume.example are placeholders.
- Rules and policies: no phones past the changing room, mixed bathing except women-only Tuesday evenings, under-16s free with an adult on weekend mornings, gift cards valid for a year (opening, faq, passes).
- Hosted rounds: a host walks first-timers through the round at ten and at three; the sauna masters pour every twenty minutes with birch, mint or tar (faq, statement, schedule).
- Health advice: pregnancy and heart conditions should ask a doctor first (faq).
- Company facts: "Ten years on", the Brume Baths name in the copyright, and charred larch, alder and aspen, wood from the owner's forest (opening, house, footer).
- Food sources: a smokehouse, a baker in the village who sends bread at seven, pickles from the cellar (kitchen, schedule).

## Known limits
- Without JavaScript the menu button does nothing and the five top links are hidden on narrow screens; the footer repeats The round, Saunas, A day, Passes and Questions. Without JavaScript the temperature lines also stay empty and all three pass bands span the whole 08 to 22 axis.
- The form does not send anything yet: the action is # and the thank-you line comes from a script.
- While the motion runs, the opening, the round and the day use held stages (CSS sticky) with layers tied to the scroll (fog, photos, tints) and a 100vh stage, so on very short windows the held frame can crop its photo.
- Without scroll-driven animation support (Firefox today) the scroll scenes, the reveals and the smooth wheel are off and each section shows its finished layout: the round as a triptych, the morning lake behind the six hours, the lines at their temperatures, no pass lit, the closing name as one word. The opening load-in and the fog drift are plain CSS and still play. With reduced motion on, nothing moves on its own; the header hide-on-scroll and the hover states keep working.
- Counts fixed in CSS: the round has three steps and three photos (data-8b-fixed), the passes board three passes (data-8b-fixed), and the statement's five lines are each timed by their own :nth-of-type rule in scene:steam-wave, so a sixth line would not swell.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Brume left only in class names.
