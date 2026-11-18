# AGENTS.md: roller rink website template

One-page website for a roller rink or skating venue that runs weekly sessions, lessons, parties and a record booth. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/roller-rink-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/roller-rink-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/roller-rink-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/roller-rink-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:nav`: `.nav__toggle` `.menu__close`
  - `section-script:booth`: `.bo-form` `.bo-msg` `.bo-ok` `.bo-empty`
  - `scene-script:sessions`: `.ss-list` `.ss-row` `.ss-day` `.ss-time` `.m-badge` `.ss-head` `.ss-foot`
  - `scene-script:seasons`: `.se-track` `.se-viewport`
- `style="--len:N"` = characters in that display line, spaces included: `Spinway` is 7.
- The wordmark in the footer takes its size from style="--len:7", the number of characters of "Spinway"; update it with the new name. The nav and menu wordmarks and the map label are plain text.
- The lessons grid has four columns and each step carries style="--ls-n:N" (1 to 4) for its stepped height: keep four steps or change the grid and the numbers together. The five session rows are measured by scene-script:sessions, so keep each row's day, time and price elements.
- The wheel circles, the stripes, the map and the record rings are CSS and SVG, not images: recolour them through the colour variables in :root.
- The seasons track is measured from its width, so any number of years works, but each item keeps the year, title, text and photo order.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #0b5f7f (teal ground of the lessons and booth sections, the Saturday session row and the teal wheel in the rental rows), `--color-2` #3b2e47 (aubergine ground of the first screen, phone menu, rental and contact sections), `--color-3` #f3e6cf (cream text, photo frames, rules, outlines and the cream bars between stripes), `--color-4` #f5a524 (yellow ground of the floor and questions sections, primary buttons, the first session row and the footer wordmark), `--color-5` #ee5a2a (orange ground of the seasons section, button hover, the second session row and the map route), `--color-6` #b8301a (red in the stripes, the red wheel, the third lesson step and the largest party panel), `--color-7` #271e30 (ink page ground for sessions, parties and footer, and dark text on the yellow and orange sections); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, email, form, phone, social): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Book a party button in the nav, the first link of the phone menu and the first screen's secondary button: now #parties; owner's target: your party booking page, or keep #parties and connect the Ask for a date button.
- Ask for a date button in the parties section: now a mailto link to the parties email address; owner's target: your party enquiry form or booking page, or your real parties email.
- This week’s sessions button on the first screen: now #sessions; owner's target: keep it, or link to an online ticket page for the week.
- Plan your visit button in the sessions section: now #contact; owner's target: your directions or ticket page, or keep #contact.
- Join the next course button in the lessons section: now #contact; owner's target: your lesson sign-up page or form.
- Phone and email links in the Call or write block: now a tel link and a mailto link with placeholder details; owner's target: your real phone number and email address.
- Send to the booth button (record request form): now nothing is sent: a script shows a thank-you line on the page; owner's target: a form endpoint (Formspree, Netlify Forms or your own) or remove the form.
- The form in `#booth` (fields `request`) sends nothing; `section-script:booth` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Spinway Roller Rink (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (16, Unsplash: opening 2, floor 1, lessons 1, skates 2, seasons 8, parties 1, booth 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- History: opened in the spring of 1976 on the first warm Friday in May, sixteen hundred maple boards, a mirror ball from 1979, "season fifty" and an opening night on 1 May 2026 (title, meta description, opening, floor, seasons).
- Sessions: five a week with days, times and prices: Tuesday 8 to 11 pm $14, Wednesday 5 to 7 pm $12, Friday 8 pm to midnight $16, Saturday 1 to 4 pm $12, Sunday 11 am to 2 pm $10 (sessions, contact).
- Ticket terms: rental included, tickets at the door by cash or card, last entry an hour before close, under-sevens free with an adult on Sunday, adults-only Tuesdays at eighteen and over (sessions, faq).
- Lessons: eight Wednesdays, groups of eight, ages six and up, $96 with rental, the next course starting Wednesday 3 June (lessons, faq).
- Rental and shop: two hundred and forty pairs, sizes from kids' 10 to adult 14, wheel colours by size, and the pro shop prices ($64, $18, $38, $6, a free wheel check) (skates).
- Floor and closure: northern hard maple, sprung timber frame, sealed with seven coats, closed from 4 to 18 August (floor, contact).
- Party packages: names, guest counts, durations, inclusions and prices ($180, $320, from $1,400), a $50 deposit and weekend dates about six weeks ahead (parties).
- Staff and booth: the DJ's name and the year she started (1988), four crates of records, the Friday vinyl-only rule and requests read out at ten (booth).
- Timeline: eight dated stories, including four hundred skaters in 1976, the 2008 roof, six hundred regulars buying the building in 2014 and the 2020 closure (seasons).
- Contact: the address 100 Example Avenue, Bellmont, OR 97000, the phone (555) 000-0000, hello@ and parties@ emails (all placeholders), the bus route 14 at Larkspur and Third and free parking after six (contact, footer).
- Hours: the box office opens thirty minutes before each session and is closed Mondays (contact).
- Safety rules: helmets required for under-twelves and lent free, no metal toe stops, no street shoes on the floor (faq, floor).
- Social profiles: the Instagram and Facebook links point to the networks' home pages (footer).

## Known limits
- Without JavaScript the phone menu button cannot open the overlay, and the record form shows no confirmation. The five main sections stay reachable through the footer links and fifty seasons through the first screen's link; the record booth has no other link on phones.
- On phones the sessions scene runs unpinned and the per-row descriptions are hidden under 900 px; only day, time, price and the title show.
- The seasons and booth stages are held with CSS sticky for several screens of scroll (the sessions for one extra screen on desktop), which feels long on short phone screens.
- Without scroll-driven animation support (Firefox today), and with reduced motion on, the page shows its finished layout with ordinary scrolling: the sessions as plain rows, the years as a wrapping grid, the record sleeves as a 2 by 2 grid (one column on phones), the map straight with its route drawn; the opening load-in, the diagonal entrances and the stripe draws do not play. The top bar still hides on scroll down.
- The motion is timed for fixed counts (data-8b-fixed): five session rows (their scroll ranges come from their order), four lesson steps and four record sleeves. The sleeves flip and the lesson steps slide in on phones by their colour classes m-surface, m-surface-2, m-surface-3 and m-surface-5, so an added sleeve or step stays still unless the scene CSS gets a rule for it.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Spinway Roller Rink left only in class names.
