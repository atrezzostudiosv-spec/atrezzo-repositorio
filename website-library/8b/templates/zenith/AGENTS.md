# AGENTS.md: planetarium website template

One-page website for a planetarium or observatory with a live-narrated show programme. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, Lenis 1.3.4 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/planetarium-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/planetarium-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/planetarium-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/planetarium-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits.
- Selectors the scripts use:
  - `section-script:navigation`: `.nav__toggle` `.nav__overlay` `.nav__close`
  - `section-script:contact`: `.ct__form` `.ct__status`
  - `scene-script:journey`: `.jr__pin` `.jr__track` `.jr__line` `.jr__stop`
- `style="--len:N"` = characters in that display line, spaces included: `Zenith` is 6.
- The wordmark in the footer sets its size from style="--len:6", the number of characters of the name. Change it with the name.
- The colour bands of the show rows come from classes sh__band--1 to sh__band--5, so a sixth show needs its own band rule. The time buttons sit in a group labelled for screen readers.
- The dome section's 230vh height and sticky stage are CSS rules that apply only while scroll motion runs; the heading parts and two paragraphs are placed on a twelve-column grid by name (dm__w1 to dm__w3, dm__p1, dm__p2).
- The presenter quote is five word spans, lv__w1 to lv__w5, each with its own start offset in the live styles; keep five spans when the quote changes, or add matching rules. The roof heading is two halves, rf__half--l and rf__half--r, that slide with their panels.
- The journey strip is measured by a short script (its overflow, the runner's run and each photo's drift range), so stops can be added or removed; the five dots on the progress line are placed by CSS at 0, 25, 50, 75 and 100 percent.
- The opening ring, rays, night and sky layers are empty divs drawn with CSS gradients and borders: recolour them through the CSS variables.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #eb5d16 (flat orange ground of the shows section and the footer, and the warm end of the contact gradient), `--color-2` #140a31 (main night ground: body, first screen, journey, nights, the logo's pill once you scroll and the start of the live and contact gradients), `--color-3` #4c27b8 (blue-violet ground of the dome and schools sections and of the full-screen phone menu), `--color-4` #ee55b6 (magenta: the roof's right panel, the journey runner, the event dots, text selection and the glow in the live and contact gradients), `--color-5` #ffffff (type on dark grounds, the white nav pill, filled buttons, the question section ground and the stars), `--color-6` #0f0822 (type on orange, white and magenta grounds, button text, dark buttons and the rules in the shows list and questions), `--color-7` #ffc9ee (pale pink for captions, stop distances, event dates and meta lines, contact labels and the thank-you line), `--color-8` #a3300c (rust: the roof's left panel and the colour bands of the first and fifth shows); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, email, form, social): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Book seats button in the header: now #shows; owner's target: your online ticket shop, or keep it on the programme.
- See tonight’s shows button in the first screen: now #shows; owner's target: your ticketing or programme page, or keep it on the programme.
- The ten time buttons in the shows list (12:00, 16:30, 20:30 and so on): now #contact; owner's target: the booking page for that show and time on your ticket system.
- Plan a class visit button in the schools section: now #contact; owner's target: your school booking form or an email link.
- Send to the box office button of the contact form: now action="#" with method post; a script checks the fields, clears the form and shows the thank-you line, nothing is sent; owner's target: your form endpoint (Formspree, Netlify Forms) or your own handler; drop the preventDefault in section-script:contact when you do.
- Monthly sky notes and Private hire links in the footer: now mailto links with a subject; owner's target: your newsletter sign-up page and private hire page, or keep the mailto.
- The form in `#contact` (fields `name`, `email`, `message`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Zenith Planetarium (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (13, Unsplash: journey 5, dome 1, live 1, roof 1, schools 1, nights 4): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Opening hours: Tuesday to Sunday 10:00 to 22:00, Fridays and Saturdays until 23:30, closed Mondays (menu, contact).
- Dome specifications: twenty-three metres across, tilted fifteen degrees, 212 seats leaning back thirty degrees, two laser projectors, nine thousand stars, six wheelchair spaces, a hearing loop (opening, dome, FAQ).
- Shows: names, lengths, age limits and the ten times in the programme, plus "narrated live" and "doors open twenty minutes before" (shows).
- Prices: adults £14, under-16s £9, a family of four £40, members free, school rates £6, £7 and £9 a pupil, event tickets £12, £22, £45 and £16 (shows, schools, nights).
- Show content claims: the distances in the flagship journey and the eclipse of 2 August 2027 (journey, shows).
- People: Dr Ines Okafor, head of the dome, and the roster Ines Okafor, Tomás Reyes, Hana Mori, Callum Reid, Priya Nair and Sofia Lindqvist (live).
- Rooftop telescope: 40 centimetres, clear Fridays and Saturdays 21:00 to 23:30, free with an evening ticket, decision at 18:00 (roof, FAQ).
- Events: four dated evenings in October and November 2026 with prices (nights); the dates also sit in datetime attributes.
- Policies: doors close when the lights go down and late guests move to the next show, babies in arms at Small Sky only, a relaxed show on the first Sunday of each month, roof pass valid for the next clear night (FAQ).
- Getting here: five minutes from Partick station, buses 6, 7 and 17, bicycle racks under the east tower (contact).
- Legal line: "a registered Scottish charity" (footer): change it to your own status.
- Address, phone and email placeholders in the contact block and footer: put in your own.
- Photos: the presenter portrait and the audience images are stock photos shown as the venue’s people and events (live, nights).

## Known limits
- Without JavaScript the Menu button cannot open the overlay on phones; the footer links stay reachable. The questions are native details and open without it.
- The contact form is a demo: with JavaScript it only clears itself and shows the thank-you line; without it the form posts to #.
- The journey section is held for the width the five stops overflow, which is long on wide screens, and the dome holds for about 1.3 screens.
- In browsers without CSS scroll-driven animations (Firefox today), with reduced motion or without JavaScript, the scroll motion, the ring's circling dot and the smooth wheel are off: the journey is a grid of five stops, the dome one screen with the full sky, and nothing is held. Firefox still plays the opening load-in.
- Small pale pink text (stop distances, school prices, event dates and meta lines, contact labels) sits on night and violet grounds; check its contrast after changing colours.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Zenith Planetarium left only in class names.
