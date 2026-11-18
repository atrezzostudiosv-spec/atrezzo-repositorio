# AGENTS.md: bowling alley website template

One-page website for a bowling alley or entertainment venue with leagues, a kitchen and bar, glow nights and party bookings. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/bowling-alley-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/bowling-alley-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/bowling-alley-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/bowling-alley-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:nav`: `.nv-bar` `.nv-menu` `.nv-close`
  - `section-script:contact`: `.ct-form` `.ct-status`
  - `scene-script:parties`: `.pt-track`
  - `scene-script:footer`: `.ft-word`
- `style="--len:N"` = characters in that display line, spaces included: `Pinfall` is 7.
- The footer wordmark is split into one span per letter by the footer scene, which reads the text of .ft-word at run time, so change the word in the HTML and the letters follow; its style="--len:7" is the character count and sizes it to fill the width.
- The leaderboard's sort is fixed in CSS keyframes for six rows of the current height (scene:fame, by :nth-of-type): each row's starting offset is written in pixels, and this file does not read the rows' data-day values (index.gsap.html does). Changing names and scores is safe; a seventh row or a different starting order needs new keyframes.
- The kitchen scene pairs photos 2 to 4 with menu groups 2 to 4 through CSS :nth-of-type rules (photo 1 shows from the start); keep four .kt-photo images and four .kt-group blocks, or add matching rules. The last photo in the HTML sits on top when the motion is off.
- The glow section is driven by one registered custom property, --gl-night, and every colour in it derives from it; the balls, stamp, icons, brush scribbles (SVG filter #brush, paths with pathLength 1), the dashed ring round the dish photos and the colour washes are CSS and SVG, not images: recolour them through the variables in :root and keep the filter and pathLength.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #15130c (page ground, header bar, default button fill, text on the yellow and sky-blue panels, and the black the glow section dims to), `--color-2` #ffd23f (menu and questions panels, contact form, top leaderboard row, yellow buttons, footer wordmark and links, the two balls, focus rings), `--color-3` #c8381f (the red sweep that fills buttons on hover, the Book now stamp, the Bar tile word), `--color-4` #fffdf5 (cream text on the dark ground, the league pills and the text of the party price pills, the stamp label), `--color-5` #b9a2f5 (Lanes tile word, Office socials panel, Call tile, the glow heading at night), `--color-6` #8ccbe6 (beginners' hour panel and the Lane takeover party panel), `--color-7` #f28a2e (Kitchen tile word, Kids' parties panel, Email tile, the warm edge of the balls), `--color-8` #8a55e0 (purple colour band over the first portrait and one of the two glow pools), `--color-9` #23a26b (green colour band over the second portrait), `--color-10` #3d7be0 (blue colour band over the third portrait and the second glow pool), `--color-11` #211e15 (surfaces of the three tiles, the leaderboard and the footer panel), `--color-12` #3d3828 (hairline borders of the tiles and the leaderboard); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, email, phone, form): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Book a lane button in the top bar and the opening, and the Book a lane link in the menu overlay: now #contact (the contact section and form); owner's target: your online lane booking URL, or keep it on the contact form.
- Gift cards button in the top bar: now #contact; owner's target: your gift card shop URL.
- Join a league button in the leagues section: now #contact; owner's target: your league sign-up page, or keep it on the form.
- Plan a party button in the parties section: now #contact; owner's target: your party enquiry or booking page.
- Book a glow lane button in the glow section: now #contact; owner's target: your booking page for Friday glow lanes.
- Book rookie hour button in the beginners' section: now #contact; owner's target: your booking page for the beginners' hour, or keep it on the form.
- The Book now stamp in the footer: now #contact; owner's target: your booking URL.
- Menu items (the lane-side kitchen): now text only, no links; owner's target: your menu PDF or ordering page, if you want to link one.
- The form in `#contact` (fields `name`, `email`, `date`, `group`, `message`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Pinfall Lanes (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (14, Unsplash: leagues 3, menu 4, glow 1, parties 4, lessons 1, contact 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Venue size and prices: "Sixteen lanes, eight with bumpers", "From £6.50 a game, shoes included", Glow Fridays "£9 a game" (opening, glow).
- Opening hours: the kitchen "until 11pm, every day" and the bar "until 1am Friday and Saturday" in the opening tiles, against Monday to Thursday 12 to 11pm, Friday and Saturday 11am to 1am, Sunday 11am to 10pm in the contact section (opening, contact).
- Leagues: Monday Rookies (Amara Okoye, Mondays at 7pm), Wednesday Hooks (Callum Reid, Wednesdays at 8pm, teams of four), Saturday Juniors (Frank Mallory, Saturdays at 10am, ages 8 to 16); the portraits are stock photos (leagues).
- Menu: twelve dishes with names, prices and notes, "Furnace pale ale" from "the brewery two streets away", and ordering from the lane screen (menu).
- Glow Fridays: 9pm to 1am, DJ Kwame, over-18s (glow, FAQ, footer).
- Leaderboard: six names, scores, lanes and days, "Bowl a perfect 300 and your name goes up for good, with a free lane on every birthday after" (leaderboard).
- Party packages: Kids' parties from £14.50 a child (ages 5 to 12), Office socials from £28 a head (up to 60 people), Big birthdays from £24 a head, Lane takeover from £1,900 a night (parties).
- Rookie hour: Sundays at 11am, forty minutes with a coach, two games, £8 with shoes (lessons).
- FAQ promises: shoes from kids' size 10 to adult 15 in the lane price, under-18s until 9pm with an adult, locker £30 a season, step-free access with an accessible toilet and two lanes kept clear for wheelchair ramps (FAQ).
- Booking terms: "We hold every booked lane for fifteen minutes" and "The desk replies within a day" (contact).
- Contact: email, phone, "1 Example Street, Sheffield S1 0ZZ" (contact).
- Footer: "© 2026 Pinfall Lanes"; put in your legal name.

## Known limits
- Without JavaScript the burger button cannot open the overlay, the footer wordmark stays whole, and the contact form still requires a name and email but then reloads the page with no thank-you line.
- Without CSS scroll-driven animation support (Firefox today) and with reduced motion, nothing animates and smooth wheel scrolling is off: headings and tile words show at rest, the glow section stays dark, the leaderboard shows rank order and the party panels sit in a grid. The top bar still hides on scroll down, and hover fills still run.
- The four dish photos are stacked in one disc, so whenever the motion is off only the cocktail shows and the burger, fries and shake are never seen.
- The contact form is a demo and sends nothing; connect it to Formspree, Netlify Forms or your own endpoint.
- The parties section holds the screen for as far as its row of panels overflows the screen width, which feels long on a phone.
- The opening hours in the tiles and in the contact section do not agree (kitchen until 11pm every day against Sunday closing at 10pm); make them match your times.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Pinfall Lanes left only in class names.
