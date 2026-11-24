# AGENTS.md: speech therapist website template

One-page website for a children's speech and language therapy practice that takes bookings by call. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.4 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/speech-therapist-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/speech-therapist-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/speech-therapist-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/speech-therapist-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:nav`: `.nav__menu-btn` `.nav__menu-close`
  - `section-script:contact`: `.contact__form` `.contact__done` `.contact__error`
  - `scene-script:visit`: `.visit__cards` `.visit__title` `.visit__track`
  - `scene-script:home`: `.home__track` `.home__list`
  - `scene-script:places`: `.places__item` `.places__name` `.places__head` `.places__pic` `.places__track`
  - `scene-script:contact`: `.contact__sky`
- The wordmark is two text parts (pipit and speech) in the nav and again in the footer; rename both places.
- The heading of the first-visit section wraps four words in spans (talk, play, plan, practise) that the scene lights one at a time, matched to the four step cards by position: keep four spans for four cards.
- The three held stages (first visit, message thread, places) work because their tracks are made taller by CSS (400 vh, 300 vh, 400 vh) and the stage inside is sticky: change those heights to lengthen or shorten the scroll. The step cards are matched by position (four, :nth-of-type rules), and the quotes stay in three columns.
- The help cards' start offsets and tilts are inline custom properties on each .help__slot (--help-div-help-card-translate-from and the rest); the CSS animates the cards' translate and rotate and the places photos' clip-path and image scale. Do not set your own translate, rotate or clip-path on .help__card, .places__pic or their images; a new help card needs its own start values.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #ffffff (page background, nav bar, cards, form fields, button labels, the footer text and the therapist's message text), `--color-2` #1d1b5e (body text and headings, and the footer background), `--color-3` #2f29a6 (buttons, the therapist's message bubbles, the avatar, tick icons, the lit heading word, the current place in the index, focus rings and the favicon), `--color-4` #c9dcf2 (top of the sky gradients (opening, menu overlay, contact panel), the button hover fill, form field borders and link underlines), `--color-5` #e6f0fb (bottom of those gradients, the first-visit panel, the parent's message bubbles, the footer base text and the tint under each therapist card), `--color-6` #f2e8e0 (the cream background of three of the six family quote cards), `--color-7` #eef1f8 (message-thread and fees panels, photo placeholders, icon buttons, weekday chips and help-card borders), `--color-8` #47457c (secondary text: leads, captions, age ranges, the speech half of the wordmark and the struck-through old words); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, email, form): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Book a free call buttons in the top bar, the menu, the first screen and the footer: now #contact, the request form; owner's target: your booking calendar or call-back page, or keep them on the form.
- The contact form (Request a call): now action="#contact"; a script checks that name and phone or email are filled, shows a thank-you line and nothing is sent; owner's target: a form endpoint (Formspree, Netlify Forms, your own) and remove the preventDefault script.
- Phone links in the top bar, menu, contact and footer: now tel: the placeholder number; owner's target: your number.
- Email links in the contact section and footer: now mailto: the placeholder address; owner's target: your address.
- The form in `#contact` (fields `name`, `reach`, `age`, `note`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Pipit (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (21, Unsplash: help 2, visit 4, play 4, team 4, places 4, stories 3): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Professional registrations: HCPC and the Royal College of Speech and Language Therapists, and the claim that the child keeps the same therapist (team, footer)
- Therapist names, roles, working days, training and languages spoken (team)
- Fees: free call, £165 assessment, £72 session, £85 visit, £120 report, £10 sibling discount, 48-hour cancellation (fees)
- Ages served for each area of help (help)
- Step timings: 15 minutes, 75 minutes, a plan within a week, 45 minute sessions, a review every six sessions (visit, fees)
- Referral and insurance claims (fees)
- Service areas: Exeter, Devon and Cornwall, nursery visits, online sessions and the posted game box (team, places)
- Clinic details: two playrooms, parking, step-free entrance (places, footer)
- Family quotes, names, children's ages and kinds of help (stories, home)
- The response promise: a call back within one working day, messages answered the same day (home, contact)
- Opening hours and Saturday arrangements (contact, footer)
- Address, phone and email (contact, footer)

## Known limits
- Without JavaScript the menu icon cannot open the overlay and the form shows no thank-you line; the desktop links, the FAQ questions and the footer links stay reachable.
- Three sections are held for 200 to 300 vh of scrolling each (first visit, message thread, places); below 900 px wide the thread section is not held and its messages simply pop in.
- The form sends nothing until you connect an endpoint; the phone or email field is plain text with no format check, and the five age options are fixed in the markup.
- Text contrast is fine (the secondary indigo is above 6:1 on every panel), but the form field borders (sky on white, about 1.4:1) and the card outlines (about 1.1:1) are very pale; darken them if the form must meet WCAG non-text contrast.
- Without CSS scroll-driven animation support (Firefox today) or with reduced motion on, the entrances, the three held stages, the drifting sky glows and the smooth wheel are off: the step cards are a list beside the heading, the thread shows all six messages, the four places sit in a grid (two columns below 1024 px), and every section shows its finished layout. The opening's load-in still plays in Firefox, not with reduced motion.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Pipit left only in class names.
