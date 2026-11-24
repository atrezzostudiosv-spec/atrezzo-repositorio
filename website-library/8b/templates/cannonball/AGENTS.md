# AGENTS.md: water park website template

One-page website for a water park or leisure pool with rides, ticket prices, a season pass, evening sessions and a swim school. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/water-park-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/water-park-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/water-park-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/water-park-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:nav`: `.nav__menu-btn` `.menu` `.menu__close`
  - `scene-script:opening`: `.opening__word` `.opening__word-text` `data-8b-section` `.nav__logo`
  - `scene-script:zones`: `.zones__water`
  - `scene-script:band`: `.band__run` `.band__track`
  - `scene-script:lessons`: `.lessons__lane` `.lessons__swimmer` `.lessons__num`
  - `scene-script:crew`: `.crew__row` `.crew__photo`
- `style="--len:N"` = characters in that display line, spaces included: `what's in the water` is 19.
- The wordmark strap in the opening lands exactly on the nav logo tab: the scene script measures the logo's box and writes --opening-x, --opening-y, --opening-scale and --opening-inset. Keep the nav logo and the opening wordmark the same text, and update the inline --len (the character count of the word, 11 for Cannonball) on the opening and footer wordmarks when you rename the brand. The zones heading carries --len:19 for "what's in the water", and scene-script:zones writes the same --len:19 on its copy of the heading: change both if the heading changes.
- Three scenes build their moving parts in a scene script, not in the HTML: zones adds a dry copy of the heading, crew adds the walking frame, and band, lessons and opening write measured values into custom properties. Edit text in the HTML, not the scripts, and keep the heading, strap, lane and portrait structure the scenes select.
- The opening cards carry their own travel in inline custom properties (--opening-li-opening-card-translate-from-2 and --opening-figure-opening-card-in-translate-to-2); the card positions and sizes are set by nth-child rules, so keep five cards (the fifth hides on phones).
- The item order numbers (--i) are set by the inline kit from the data-8b-items groups, so the ride sheets work for any count. After Dark has timing rules per list item for four hours, and the swim lanes and the lifeguard frame have scroll ranges written for four items: changing those counts means rewriting their scene CSS. Motion is CSS scroll-driven animation plus the data-8b attributes (surface, ripple, settle) and the inline kit; there is no animation library.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #ffffff (the page ground and the white zones, prices, questions and visit sections, input fields, and text on black, blue and navy), `--color-2` #0a0a0b (black grounds of the opening, rides, season band, lifeguards and footer, the wordmark strap and button text), `--color-3` #ff4400 (the one warm accent: the opening and footer wordmarks, button fills, the header logo tab text, the season strap, After Dark times, lane numbers, rope lines and focus rings), `--color-4` #006bb8 (pool blue: the water that floods the zones heading and the swim school ground), `--color-5` #66666d (secondary text on light grounds), `--color-6` #f1f2f4 (quiet fills of the ticket card and the party form), `--color-7` #a3a3ab (secondary text on black and navy grounds), `--color-8` #0b1e3a (dusk navy where After Dark begins, darkening to black as it scrolls), `--color-9` #e2e3e7 (hairlines on light grounds), `--color-10` #29292e (hairlines on the black footer); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, social, email, phone, form): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Tickets button in the nav, Get a wristband button on the first screen, the buy a band link under Zones: now #passes; owner's target: your online ticket shop, or keep #passes if tickets are bought at the gate.
- Plan your visit link on the first screen and the plan the trip link under Zones: now #visit; owner's target: keep #visit, or a page with directions and opening times.
- Book a Friday button in the After Dark section: now #visit; owner's target: your booking page for the evening session.
- Buy online button in the Pick your band card (the same for the Day ticket and Season band tabs): now #visit; owner's target: your ticket or membership checkout, one link per tab if the shops differ.
- Call the desk link in the Pick your band card, and the phone links in the FAQ and the visit block: now a tel: link to the placeholder number; owner's target: your real desk number.
- Book a trial button in the Swim school section: now #visit; owner's target: your swim school booking page.
- Ask for a date button of the party form in the visit block: now the form posts to #; nothing receives it; owner's target: a form service or your own form handler.
- The form in `#visit` (fields `name`, `email`, `date`, `guests`) sends nothing. Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it.
- The name Cannonball (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (29, Unsplash: opening 7, rides 4, wristband 3, after-dark 4, passes 1, swim-school 4, faq 1, lifeguards 4, visit 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Opening hours, Friday late opening and the closed day (hours block, footer, menu, FAQ, After Dark)
- Prices: day ticket £24, under-12s £18, family of four £78, season band £89, under-12s £64, £12 a month, towels £1 (passes, FAQ)
- Season dates, March to the last weekend of October, and the pause allowance of eight weeks (wristband, passes, FAQ)
- Number and names of rides and slides: twenty-two slides, the big four, the zone ride lists (opening, rides, zones, passes)
- Ride specs: heights, lengths, trapdoor drop of 18 metres, waves up to 1.8 m, minimum riding heights of 1.2 m and 1.3 m (rides, FAQ)
- Staff names, roles and notes, and the figure of forty lifeguards (lifeguards)
- Water temperatures of 30 °C and 34 °C, hourly water tests and the roof opening policy (FAQ, lifeguards)
- Swim school classes, ages, class sizes, ten Saturdays and the badge (swim school)
- Address, bus route 42, parking spaces and journey time from the station (visit)
- Perks of the season band: first-in half hour, plus-one Tuesdays in term time, lockers, tap payments (wristband, passes)
- After Dark: Fridays 19:00 to 23:00, over-18s only, DJ and the hour-by-hour programme (After Dark)
- Accessibility claims: step-free route, pool hoist, changing places room, free carer entry (FAQ)
- Party packages: up to twenty guests, a cabana, an hour on the slides and pizza (visit)
- Company name "Cannonball Water Park Ltd", phone number and email (footer, visit, FAQ)

## Known limits
- Scroll-driven animation needs a browser that supports it (Chrome and Edge, recent Safari); a gate script switches the scroll scenes on only then. In Firefox today nothing moves with the scroll (the opening load-in and its two slow loops still play); with reduced motion on, those stop too: the wordmark stays on its strap, the rides still stack as sticky sheets, the strap wraps into a block of panels, After Dark lists four hours with photos, the swimmers sit at the far wall and nothing is revealed on scroll.
- The menu overlay, the Day ticket / Season band tabs and the header logo tab need JavaScript; without it the menu button does nothing, the Season band panel stays hidden and the logo tab never appears. The FAQ works without JavaScript. The party form posts to # and goes nowhere until you connect a form service.
- After Dark has CSS timing rules for exactly four hours, and the swim lanes and the lifeguard frame have scroll ranges written for four items; other counts need their scene CSS rewritten. The ride sheets take any count.
- Orange text on black is used for small labels (the After Dark times, lifeguard roles); on white grounds orange appears only as thin lines, never as text, so check contrast if you change the accent or move it onto text.
- Rides stack as full-height sheets with minimum height 560px, and the After Dark stage needs about 640px of height; on very short screens the opening and these stages run taller than the screen.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Cannonball left only in class names.
