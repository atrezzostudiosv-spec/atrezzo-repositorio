# AGENTS.md: arcade bar website template

One-page website for an arcade bar or game venue that runs league nights and private hire. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/arcade-bar-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/arcade-bar-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/arcade-bar-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/arcade-bar-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:nav`: `.nav__menu-btn` `.nav__menu-close` `.nav__menu`
  - `section-script:footer`: `data-form` `.footer__status` `data-done` `data-error`
  - `section-script:play`: `.play__wall` `.play__word` `.play__card` `data-copy`
  - `section-script:visit`: `data-form` `.visit__status` `data-done` `data-error`
  - `scene-script:floor-stack`: `.floor__stack` `.floor__item`
  - `scene-script:league-sort`: `.league__board` `.league__row` `.league__rows`
  - `scene-script:play-wall`: `.play__wall` `.play__row`
  - `scene-script:menu-track`: `.menu__viewport` `.menu__track`
  - `scene-script:footer-mark`: `.footer__mark` `.m-mark__o`
- The two O letters of the wordmark (nav and footer) are .m-mark__o discs coloured in CSS, and the footer scene rolls them in by name; keep both spans if you rename the venue, and update style="--len:12" on the footer mark to the number of characters of the new name.
- The Insert coin wall is built by section-script:play from a single .play__word: change that one phrase and the script fills the rows to the width; the copies are removed and rebuilt on resize.
- The floor cards stack because each .floor__item is position sticky in the CSS (in every browser and with reduced motion too); the scene only adds a 26 px step to their top offsets and shrinks and dims each covered card. Keep one card per list item and change the count freely, but the section height follows the card count.
- The league board sorts by starting the first row at the bottom and letting it climb back to the top: keep the rows in rank order in the source, with the champion first. The menu track travels only by the amount the row of cards is wider than the screen; if the cards fit, the row stays still.
- The scene CSS animates fixed counts by position: three small prints in the owners' block (data-8b-fixed="3") and three coloured bands behind the floor cards (:nth-of-type rules). A fourth print or band stays still; change the scene CSS too if you change those numbers.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #fefaed (page and bar ground, text on charcoal blocks, button text on charcoal buttons, form field ground), `--color-2` #211e1c (text, the first-screen panel, league board, ways-to-play card, footer card, main buttons, charcoal photo frames, focus outline), `--color-3` #f5a8c6 (pink photo frames, the Insert coin wall, the league badge, the first O disc, button hover fills, event row hover), `--color-4` #a9c1ff (blue photo frames, the menu overlay, the owners' panel, the visit info panel, the newsletter block, the Book a booth button in the bar, the second O disc), `--color-5` #f5e63d (yellow photo frames, the menu button, the champion row, prices on the dark card, focus outline on dark blocks), `--color-6` #5a544f (secondary text: intros, small labels, game names, the booking form's status line), `--color-7` #d3ccc0 (secondary text on charcoal: the first-screen intro, option text, the board note, footer headings and base line), `--color-8` #ffffff (white photo frames, event rows, board rows, the booking form, the newsletter input, small prints, secondary buttons); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, social, phone, email, form): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Book a booth buttons in the header, the menu overlay, the first section and the ways-to-play card: now #visit, the booking form near the end of the page; owner's target: your booking page URL (a booking tool or ticketing link) if you take bookings there, or keep it on the form.
- Book for a night button in the events section, and the three event rows: now #visit; owner's target: the event or ticket page of each night, or keep them on the form.
- Instagram, TikTok and YouTube links in the owners block and the footer: now the root of each network (instagram.com, tiktok.com, youtube.com); owner's target: your own profile URLs.
- Email the bar button in the footer: now a mailto link to the demo address; owner's target: your enquiries address.
- Hire the arches, Our house rule, Join on Thursday and Ask about a date buttons: now #hire, #rules, #visit and #visit; owner's target: keep them as anchors, or point them at your own hire or sign-up page.
- The form in `#visit` (fields `name`, `email`, `date`, `party`, `note`) sends nothing. Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it.
- The form in `#footer` (fields `email`) sends nothing; `section-script:footer` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Quarter Moon (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (23, Unsplash: features 4, events 4, about 4, league 1, quote 1, private-hire 1, menu 6, contact 1, footer 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Founding and size: "opened in 2019", "eleven machines", "the floor holds forty-two", "two railway arches" (about, meta description).
- Floor counts: thirty uprights from 1979 to 1999, twelve pinball tables levelled every Monday, fourteen metres of bar (floor cards).
- Opening hours: Monday to Wednesday 5pm to midnight, Thursday 5pm to 2am, Friday and Saturday 2pm to 2am, Sunday 2pm to 11pm with families till 7; "Open tonight · 5pm till 2am" (contact, menu overlay).
- League rules and board: Thursdays from eight, five machines, three tries each, top six stay up, champion drinks free for a month; "House record since 2021"; six sets of initials, games and scores; "Round three closes at 11pm tonight" (league, events).
- Prices: coin cup £5 for twenty coins, free-play band £15 a night (ten till close, Thursday to Saturday), league pass £8 (pricing).
- Private hire: booth for eight from £120 (two hours), back arch up to forty guests from £650, whole floor up to 160 guests from £2,400 (private hire).
- Drinks and food with prices from £5 to £18 (Extra Life £9, Green Screen £9.50, Bonus Round £18, flight £10, Midnight dog £8, Square slice £5) and the "brewery round the corner" (menu).
- Events and dates: Tonight from 8pm, Fri 9 Oct, Sat 10 Oct, Sun 11 Oct, with their datetime attributes, and "walk-ins sign up at the bar until 7.45" (events).
- People: Ailsa and Dev, the story of the kitchen table in Partick, the regulars Priya, Tom and Morag and their reviews (about, reviews, quote).
- Place: "Five minutes from Partick station", "follow the green glow under the railway", the green-lit arches (contact).
- Policies: "We hold booths for twenty minutes past the time", "Over-18s after 7pm", booking confirmed "within a day", "One email a month" (contact, footer).
- Footer: "© 2026 Quarter Moon Arcade Bar Ltd": put in your legal name.

## Known limits
- Without JavaScript the menu button cannot open the overlay, and below 900 px the header links are hidden, so phone visitors get no navigation beyond the Book a booth button. The Insert coin wall shows a single phrase until the script builds the rows.
- Without scroll-driven animation support (Firefox today) and with reduced motion, the smooth wheel, the tab drops, the row slides and every scroll scene are off and each section shows its finished layout: the floor cards still stack (CSS sticky) without shrinking, the board stands in rank order and the menu is a native sideways scroller. The header still hides on scroll down and the hovers still animate; the first panel's rise-in still plays in Firefox and stops with reduced motion.
- The floor section holds roughly five screens of scrolling for four photos, and the menu section holds the screen while its row slides; both feel long on short phone screens.
- The booking and newsletter forms are placeholders: they only validate and show a message, nothing is sent. Without JavaScript a submit reloads the page with the entries in the address bar.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Quarter Moon left only in class names.
