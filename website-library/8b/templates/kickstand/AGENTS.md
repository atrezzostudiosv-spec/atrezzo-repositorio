# AGENTS.md: bike rental website template

One-page website for an e-bike or bike hire business with several pick-up stands and guided rides. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, Lenis 1.3.4 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/bike-rental-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/bike-rental-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/bike-rental-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/bike-rental-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:contact`: `.contact__form` `.contact__status`
  - `section-script:nav`: `.nav__bar` `.nav__menu` `.menu` `.menu__close` `.menu__list`
  - `scene-script:fleet`: `.fleet__list` `.fleet__bike`
  - `scene-script:routes`: `.routes__stage` `.routes__row` `.routes__rail` `.routes__wheel`
  - `scene-script:rides`: `.rides__stage` `.rides__half`
- The fleet scene builds its tab strip from the h3 of each bike, so keep each bike's h3 short because it becomes a tab. The scene CSS fixes four bikes (data-8b-fixed="4", --fleet-n: 4 and :nth-of-type rules for each photo wipe, text swap and tab): a fifth bike would sit on top of the held stage without its own wipe, so change the scene CSS too if the number of bikes changes.
- The letters A to E on the stands photo and on the night photo at the end are plain static spans; if you change the number of stands, edit those letters by hand as well as the five stand rows and the collect-from options. The eight marks on the night photo (a dash, a bar, the letters and a dot) are animated by :nth-of-type rules: a ninth mark stays still.
- The routes row is as wide as its panels: the kit reads the row's overflow, so add or remove panels freely, but keep them in one row inside .routes__row.
- The brand mark (starburst in the nav, square mark with a lime plus in the headings and footer) is drawn with CSS and inline SVG: recolour it through the CSS variables.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #e1e3e2 (page ground and navigation bar; text and square marks on the dark bands and in the menu overlay), `--color-2` #0d0f0f (text, filled buttons and rules; ground of the first screen, stands, rides, footer and menu overlay), `--color-3` #d4ff1e (the only accent: last heading line of the first screen, button hover fill, round discs, progress lines, stand codes, the reviews band and the monthly pass card), `--color-4` #ffffff (button labels, text on the hire and rides bands, photo captions), `--color-5` #555c5e (small labels, bike kinds, spec terms, route facts, kit text, table heads, form labels and FAQ answers), `--color-6` #27333a (ground of the hire band, the multiply tint over night and band photos, and the placeholder behind photos), `--color-7` #a9b1b3 (grey text and rules on dark: the four first-screen facts, stand descriptions, ride dates, hire track, footer heads and legal line); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, email, form, social): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Book a bike button in the first screen, and Join a ride and Ask about a pass buttons: now #contact, the booking form; owner's target: your booking page URL (a booking tool or rental system) if you take bookings there, or keep them on the form.
- Instagram and Strava club links in the footer: now the root of each network (instagram.com, strava.com); owner's target: your own profile and club URLs.
- Newsletter link in the footer: now #contact, the booking form (the page has no newsletter form); owner's target: your newsletter sign-up URL, or remove the link.
- See the four bikes link in the first screen and the menu links: now anchors (#fleet, #stands, #routes, #hire, #rides, #prices, #contact); owner's target: keep them as anchors.
- The form in `#contact` (fields `name`, `email`, `date`, `bike`, `stand`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Kickstand (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (13, Unsplash: opening 1, fleet 4, stands 1, routes 4, kit 1, rides 1, contact 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Motor and range figures: 250 watts, assist to 15.5 mph, about 80 km on one battery, 85 Nm motor, 21 kg, 17 kg, folds to 80 × 40 cm (opening, bikes).
- Bike specs and rider heights: 150-195 cm for the Town, 60 kg on the Hauler's deck, children aged one to seven, two batteries on the Climber (bikes, questions).
- Prices: from £9, £14, £16 and £11 an hour (bikes) and the full table of hour, half day, day and week, £79 a month pass, £50 excess, £200 deposit hold (prices, questions).
- Stands: five names, addresses, hours and which bikes each holds, plus transport references such as the station and tram stops (stands).
- Routes: names, start stands, distances, climb and times for four rides (routes).
- Saturday rides: 9:30 from stand A, free with a day hire, four dated rides with distances and pace (rides).
- Hire terms: booking by slot, free cancellation up to an hour before, a photo ID at collection, sixteen or over, return at any stand, walk-up bikes kept back every morning (steps, questions).
- Included kit: three helmet sizes, a gold-rated D-lock, lights, a phone mount, 20 litres of pannier, puncture cover within the ring road within the hour (kit).
- Hours: every day 8:00 to 20:00 from March to October and 8:00 to 18:00 in winter, with shorter hours per stand (menu overlay, stands, contact).
- Trains: the Pocket travels as luggage on every train, other bikes on Northern services outside the rush hours (questions).
- Reviews: Priya, Tom, Ana and Jules and their districts and hire types (reviews).
- The response promise: confirmation "by e-mail within the hour" (contact).
- Footer: "© 2026 Kickstand Cycle Hire Ltd · registered in England" and the 16-or-over legal line: put in your legal name and rules.

## Known limits
- Without JavaScript the menu button cannot open the overlay; the eight header links stay on wide screens, but on phones they are hidden and only the footer links remain. Without the script the booking form posts to the page itself (action "#"); with it, it sends nothing.
- Without scroll-driven animation support (Firefox today) and with reduced motion, the opening load-in, the entrances, the scroll scenes and the smooth wheel are off and each section shows its finished layout: bikes and routes sit in plain grids, with the bike specs shown. The header still hides when you scroll down, and the hover transitions and the question sign's turn still run.
- The fleet stage holds the page for about 2.3 screens of scrolling (234svh with four bikes) and the routes stage for the row's whole overflow, so the page feels long on a short phone screen.
- The footer link "Newsletter" points at the booking form, since the page has no newsletter form.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Kickstand left only in class names.
