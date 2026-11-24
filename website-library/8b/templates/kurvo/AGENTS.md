# AGENTS.md: fitness app landing page template

One-page website for a fitness training app that sells adaptive plans and coaching to people who train around busy weeks. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/fitness-app-landing-page-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/fitness-app-landing-page-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/fitness-app-landing-page-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/fitness-app-landing-page-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:nav`: `.nav-menu` `.menu__close` `.op-hero`
  - `scene-script:app`: `.ap-stage` `.ap-notes` `.ap-note` `.ap-view`
  - `scene-script:challenge`: `.ch-map` `.ch-dot` `.ch-points` `.ch-route` `.ch-svg--wide` `.ch-svg--tall`
- `style="--len:N"` = characters in that display line, spaces included: `Strength` is 8, `Cycling` is 7, `HIIT` is 4, `Yoga` is 4, `Kurvo` is 5.
- The week chart is set by hand in two places: each day's bar height is its inline style="--cv-h" (minutes divided by the longest day's 75), and the line over the bars is an SVG polyline with seven points (x = 50 + 100 per day, y = 400 × (1 minus --cv-h)). Change the minutes, --cv-h and the points together; the grid has seven columns and the motion CSS computes the bars' flat start from --cv-h.
- The five challenge checkpoints are tied to the route: each label sits on it by inline --ch-x and --ch-y (percent of the 700 × 360 drawing), the dot's rest place is the route's end (.ch-dot in the CSS), and the challenge scene script lights each label where the route passes nearest to it on wide screens, and in list order on phones. A moved checkpoint needs its --ch-x and --ch-y on the path.
- The app phone holds three views and three notes stand beside it: the app scene script spaces the view wipes and lights the notes by their counts, timed for three of each, so keep three. The phone, the recovery ring, the corner tabs and the contact shade are CSS and SVG: recolour them through the variables in :root.
- The discipline names (style="--len:N") and the footer wordmark (--len:5) are sized from their character counts; the four coach portraits overlap through nth-child rules written for four items.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #232323 (charcoal frame and footer, corner tabs, dark buttons, the drawn phone, text on light panels, the line over the chart bars), `--color-2` #c5d8d8 (mint: the app and run club panels, the HIIT row, member story cards, the free plan card, the rows, ring track and coach's bubbles inside the phone), `--color-3` #f2f4f5 (off-white: the first screen, member stories and pricing panels, the Cycling row, the phone's screen, text on graphite and charcoal), `--color-4` #8d91e6 (lilac: the disciplines panel, the regular chart bars, the session card, recovery ring and your own chat bubbles in the phone, sparklines, the challenge route), `--color-5` #d8f45f (lime: today's bar, the recommended plan, the contact panel, the small filled tags (class counts, member results, Today and Ready in the phone) and the buttons on dark panels, the challenge dot and checkpoints, the active note marker), `--color-6` #444444 (graphite: the coaches, challenge and questions panels, the Strength and Yoga rows, the two-person plan, coach portrait rings, the contact shade), `--color-7` #a4c3bd (sage: the bars of the easy days in the week chart), `--color-8` #c2c2c2 (light grey: secondary text on graphite panels, the dashed ghost route, unlit checkpoints, rules between questions, footer text, and the grey the chart bars start from), `--color-9` #4f5552 (dark grey-green: day labels and caption under the chart, the rest day's dashed outline, membership lengths, meeting points, the price note); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, email, phone, social): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Get the app buttons in the top bar, the phone menu and the contact panel: now #get-app, which scrolls to the three plans in pricing; owner's target: your App Store and Google Play links, or one page that sends each phone to its store.
- Start free, Try Pro free and Try Duo free buttons on the three plans: now #get-app, the plans list they sit in, so a click does nothing visible; owner's target: your sign-up or checkout URL for each plan.
- Find my coach button in coaches: now #get-app (the plans); owner's target: your coach directory or the sign-up step where members pick a coach.
- Join the hundred button in the challenge: now #get-app (the plans); owner's target: your challenge sign-up page or an app link that opens the challenge.
- Bend my week button on the first screen and the Coaching is in every paid plan link in coaches: now #pricing; owner's target: keep it, or point it to your sign-up page.
- Write to us corner tab in contact: now a mailto to the placeholder email; owner's target: your support email or help-desk form.
- The name Kurvo (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (13, Unsplash: coaches 4, app 1, disciplines 4, member-stories 3, monthly-challenge 1, run-clubs 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Size and reach: "Two hundred certified coaches" (coaches; "200 coaches" in the meta description) and "18,000 members" (monthly-challenge).
- Product claims: the plan is reshaped every morning from sleep, soreness and the calendar (first screen, meta description, FAQ); a coach "answers within hours" (app); sessions written for any equipment, every change shown and undoable (FAQ).
- Disciplines: running, strength, cycling, HIIT and yoga in the meta description, "Five disciplines" in the lead and "all five disciplines" in Pro, but four rows (Strength, Cycling, HIIT, Yoga) and a Pilates coach; 36, 28, 40 and 22 classes a week (disciplines) and "Six classes a week" on Starter (pricing).
- The demo week: Mon Strength 40 min, Tue Easy run 30, Wed Intervals 50 (today), Thu Yoga 25, Fri Rest, Sat Ride 60, Sun Long run 75 (first screen), and the Wednesday session "6 × 800 m" with its steps (app).
- App figures in the phone: recovery 82, sleep 7 h 40, resting heart rate 52 bpm, legs fresh, and the chat with "Coach Ama" about moving a long run (app).
- Coaches: Marcus Hale (Strength, "Twelve years under the barbell"), Ama Boateng (HIIT), Lena Ortiz (Pilates), Dev Malik (Cycling); the portraits are stock photos and their alt texts name the coaches (coaches, app chat).
- Member stories: Tomás Reyes (10 km in 52:40, member for 8 months), Nadia Karim (deadlift +20 kg, 1 year, "Three kids, two jobs"), Ruth Miller (first marathon in 4:48 "At 61", 2 years); invented people with stock photos (member-stories).
- The challenge: "The October hundred", 100 km in a month, rewards at 20, 40, 60, 80 and 100 km (a finisher badge, a free live class pass, a coach's form review, 20% off running shoes, a tee posted free) (monthly-challenge). Change the month and the rewards.
- Run clubs: free Sunday group runs in London, Berlin, Lisbon, Toronto, Melbourne and Austin with real meeting points and times from 07:00 to 09:30, a coach and coffee (run-clubs; "Sunday clubs" also in the Starter and Pro rows).
- Prices: Starter $0 forever, Pro $12 a month, Duo $19 a month for two people, "Start free for 30 days on any plan", "Prices in US dollars, taxes included where required" (pricing); cancel "in two taps", access until the end of the paid month (FAQ).
- Plan contents: five rows per plan, coach chat and wearable sync only in the paid plans, "One coach for both" in Duo (pricing), "Coaching is in every paid plan" (coaches).
- Contact: hello@kurvo.example, +44 20 0000 0000 and "1 Example Street, London EC2A 0ZZ" are placeholders; "A real person answers within one working day" (contact).
- Company: "© 2026 Kurvo Labs Ltd." (footer): put in your legal name.

## Known limits
- Without JavaScript the menu button (up to 900 px, where the top links are hidden) cannot open the overlay; the footer links reach every section. The questions are native <details> and open without it, and there is no form.
- The page has no app store buttons or QR code: every Get the app, Find my coach, Join the hundred and plan button scrolls to the plans list until you add your store and sign-up links.
- The two crossed-out rows of the free plan are at 55% opacity, about 3.2:1 on the mint card.
- While the motion runs, on desktop windows shorter than about 660 px the held phone in the app section (620 px tall) does not fit, so its top slides under the window edge while it is held; on phones the held phone takes about a screen of scrolling of its own.
- Without scroll-driven animation support (Firefox today) or with reduced motion on, nothing animates on load or on scroll and each section shows its finished layout: headings at full width, chart bars at their minutes, discipline rows open, the three phone views one under another, the route drawn with every checkpoint lit, the plans in a row and the contact panel lime. The wheel scrolls natively; hover effects and the hiding nav bar stay.
- Four groups carry data-8b-fixed: the seven chart days (seven grid columns and seven line points), the four discipline rows (their scroll timing is spaced for four), the five checkpoints (placed on the route) and the three plans (a three-column row). Change those counts only with the matching CSS and drawing.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Kurvo left only in class names.
