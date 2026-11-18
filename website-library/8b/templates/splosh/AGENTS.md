# AGENTS.md: swimming pool website template

One-page website for an outdoor swimming pool, lido or swim club with sessions, lessons, a kiosk and ticket prices. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, Lenis 1.3.4 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/swimming-pool-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/swimming-pool-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/swimming-pool-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/swimming-pool-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits.
- Selectors the scripts use:
  - `section-script:nav`: `.nav-menu` `.nav-close`
  - `section-script:visit`: `.vs-tile--form` `.vs-status` `data-error` `data-sent`
  - `scene-script:sessions`: `.ss-pin` `.ss-lane` `.ss-track` `.ss-swimmer`
  - `scene-script:club`: `.cl-steps` `.cl-step` `.cl-photo`
  - `scene-script:deck`: `.dk-room` `.dk-stage` `.dk-letters` `.dk-window` `.c`
  - `scene-script:kiosk`: `.ks-wrap` `.ks-feature__photo` `.ks-chain`
  - `scene-script:visit`: `.vs-board` `.vs-tile`
- `style="--len:N"` = characters in that display line, spaces included: `Lounge` is 6.
- The sessions, club and kiosk motion measures the lanes, steps and chain photos from their lists, so it works with other counts, but the CSS is set for these: the club steps have nth-child heights and a 4-column grid for four, the kiosk chain items are 27% wide, sized for four photos, and the five lane paces repeat after five.
- The big LOUNGE word and the footer wordmark take their size from style="--len:6", the number of characters: update it when you change those words. The O of the footer wordmark is a CSS disc, not a letter.
- The deck section's visible title is the large word; the real h2 text sits in a visually hidden span, so change both.
- The tiles, discs and stickers are CSS: recolour them through the colour variables in :root.
- The Lounge word carries data-8b-split="chars": the inline kit splits it into letters that the deck motion lifts. Keep the attribute and keep the word plain text.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #e6e9e5 (page ground, the price pills on the session lanes and the dividers between questions), `--color-2` #ffffff (white tiles, the nav pill and logo tile, form fields, lane tracks and the rings around round photos), `--color-3` #15181b (text, the black buttons, the events section ground, the menu overlay and the footer rule), `--color-4` #84c6e8 (pool blue: the first-screen panel, the footer panel, blue tiles and the Ducklings step), `--color-5` #fcb64d (sunny yellow: tiles, the button hover fill, the nav logo disc, the question toggles and the winter sticker), `--color-6` #f6874b (orange tiles, the lane tone behind the family session, the link underline on hover and the spark beside the history photos), `--color-7` #0f5a40 (deep green: the winter panel, the tilted price stickers with yellow type and the small nav logo disc), `--color-8` #50565d (secondary grey text: lane descriptions, the kiosk note, the price footnote and the answers to questions); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, email, form): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Book a swim buttons in the nav, the phone menu, the first screen and the prices section: now #prices (the prices section's own button goes to #visit); owner's target: your online booking page for sessions.
- See today's sessions link on the first screen: now #sessions; owner's target: keep it, or a live timetable page.
- Book a trial lesson button in the swim club: now #visit; owner's target: your lesson sign-up page.
- Join the cold club button in the winter section: now #prices; owner's target: your cold club sign-up page.
- Ask about tickets links under the three evening events: now #visit; owner's target: the ticket page for each event.
- Newsletter link in the footer: now a mailto link with the subject Newsletter; owner's target: your mailing-list sign-up page.
- The form in `#visit` (fields `name`, `email`, `message`) sends nothing; `section-script:visit` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Splosh (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (25, Unsplash: opening 1, sessions 5, club 4, cold 2, deck 4, kiosk 5, story 2, nights 1, visit 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Lido profile: Hartfield Lido, Hartfield Common, "Splosh", run by the Friends of Hartfield Lido, a registered charity, with a charity number in the footer (title, meta description, story, footer).
- Heating and season: solar panels since 2019 keep the water at 24 degrees from May to September, winter water between 4 and 12 degrees (opening, cold, faq).
- Pool details: fifty metres long, dug by hand in 1936, eight lanes in three speeds, a 90 cm shallow end, a diving pit open on Saturday afternoons, lifeguards on every session (opening, meta description).
- Sessions and times: Early lengths 6:30 to 9:00, Lunch laps 12:00 to 13:30, Family splash 13:30 to 17:00, Quiet hour 17:00 to 18:30, Sunset swim 19:00 to 21:00, kiosk opens at seven (sessions).
- Prices: £4.50, £2.50 child, £3.20 concession, £12 family, £40 ten swims, £150 and £70 summer passes, £60 cold club, £8 dip and sauna, £6 sunset swim, £9 a lesson, deckchair £2, a pound for lockers (sessions, prices, cold, club, deck).
- Swim club: levels, ages, groups of six, weekend mornings, 30 minutes, a free first lesson, badges (club).
- Winter swimming: October to April, wood-fired sauna Thursday to Sunday 7:00 to 19:00 (cold).
- History: opened 1936 with a brass band, closed 1989 when the boiler failed, reopened 2004 by the Friends, solar roof 2019 (story).
- Events with dates: Lido cinema 15 August, Glow swim 28 August for 12 to 16 year olds, Full moon swim 26 September (nights).
- Kiosk menu and prices, oat milk at no extra cost, tea always a pound (kiosk).
- Policies: a third of each session kept for walk-ups, under-threes free, children alone from age eight if they can swim 25 metres, one adult for two younger children, carers swim free, concessions without proof, glass banned on the lawn (prices, faq, deck).
- Access and facilities: step-free access, a pool hoist, an accessible changing room, lockers, showers, family cubicles (faq).
- Getting here: buses 12 and 38, forty bike racks, no car park, free street parking after 10:00, the green gate opens fifteen minutes early (visit).
- Opening hours (6:30 to 21:00 summer, 7:00 to 18:00 winter, Christmas Day dip 8:00 to 11:00), the address, the phone 01632 000000 and hello@splosh.example, which are placeholders (visit, faq, footer).

## Known limits
- Without JavaScript the phone menu button cannot open the overlay, and the message form posts to the page itself (action="#"); with or without JavaScript it sends nothing.
- The six questions are native details elements and open without JavaScript.
- The sessions hold only runs on large screens (1000 px wide and 680 px tall or more); smaller screens run each lane as it scrolls by.
- Without CSS scroll-driven animation support (Firefox today), without JavaScript or with reduced motion, the scroll scenes, the entrances and the smooth wheel are off and every section shows its final state (lanes filled, steps up, kiosk chain in place, events on night ink, visit board assembled). Firefox still plays the first-screen pop on load; the nav hide-on-scroll and hover effects keep running in every case.
- The five lane photos are decorative circles with no alt text, and small stickers sit over photos, so check contrast and text size when you replace them.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Splosh left only in class names.
