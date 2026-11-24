# AGENTS.md: it support website template

One-page website for an IT support company that looks after the computers and security of small offices. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, Lenis 1.3.4 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/it-support-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/it-support-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/it-support-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/it-support-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:nav`: `.nav__menu` `.nav__overlay` `.nav__close`
  - `section-script:plans`: `.plans-card` `.plans-count` `.plans-sum` `.plans-rate` `data-rate`
  - `section-script:contact`: `.ct-form` `.ct-status` `data-done`
  - `scene-script:inventory`: `.inv-item`
  - `scene-script:offices`: `.off-stage` `.off-grid` `.off-frame`
  - `scene-script:security`: `.sec-panel` `.sec-list`
  - `scene-script:team`: `.person` `.person-text`
- The price card reads the rate from the data-rate attribute of .plans-rate, not from its text: change both the attribute and the visible £42, and the slider's min and max if your range differs; the script writes the total itself, always in pounds (currency GBP in section-script:plans), so change that code for another currency.
- The phone number in the phone-line section has style="--len:13", the length of the number text including spaces: keep a value of the same length or update it, because it sizes the number to fill the width.
- The wordmark is split into a bold "Quiet" and a regular "systems." in the nav, the overlay and the footer; keep the same two-part structure when you rename.
- The cut-corner cards, the portrait frames and the ring behind the contact section are CSS and SVG: recolour them through the CSS variables.
- The team holds exactly five people (data-8b-fixed="5"): on wide screens the name rows and the portrait openings are CSS rules per position (:nth-child, :nth-of-type), so another count needs those rules changed.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #e3e3e7 (page background, the form fields and the compact nav bar), `--color-2` #24262c (body text, filled buttons, and the dark phone-line section, security panel, menu overlay and footer), `--color-3` #f2f2f5 (the price card and audit form, the before and after notes section, the light buttons on dark blocks, and text on the dark blocks), `--color-4` #595b63 (leads, captions, nav links, FAQ answers, the regular half of the wordmark and the grey the Before lines fade to), `--color-5` #ca350d (the only accent: focus outlines, the dot in buttons, plus marks, the slider and the arc on the contact ring), `--color-6` #c2c3ca (hairlines, field borders, empty photo frames and the contact ring outline), `--color-7` #a7a9b1 (small labels and descriptions on the dark blocks, and the regular half of the footer wordmark), `--color-8` #81838b (declared with a large muted text style that no element in the shipped markup uses); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, email, form): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Book a free audit buttons in the header, the menu overlay, the first screen, the phone line and the price card, and the Check our office button in the security section: now #contact, the audit form; owner's target: your booking page URL (Calendly, Cal.com) if you take bookings there, or keep them on the form.
- See the offices we look after link in the first screen: now #offices; owner's target: keep it as an anchor.
- The large phone number in the phone-line section and the phone links in the contact section and the footer: now tel: links to the demo number; owner's target: your own number in the tel: link and the visible text.
- The audit form: now nothing is sent; the script checks the fields and shows a thank-you line; owner's target: a form service (Formspree, Netlify Forms) or your own endpoint, in the form action.
- The form in `#contact` (fields `name`, `company`, `contact`, `size`, `message`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Quiet Systems (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (10, Unsplash: offices 5, team 5): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Founding year: "since 2014" and "with us for two years" (footer, cases).
- Size claims: "Sixty offices call us", "Five people", "one of five engineers", "each engineer looks after the same dozen offices", offices of 3 to 60 people (offices, line, team, meta description).
- Prices: £42 per person per month, the slider range of 3 to 60 people, "No contract, 30 days' notice", "Hardware at cost, never marked up" (plans, questions).
- Service promises: a person picks up within two minutes, weekdays 8:00 to 18:00, a laptop in place on someone's first morning, access closed within the hour they leave, backups restored once a month, phishing drills twice a year, someone with you by nine on Monday for a laptop that fails on a Saturday (line, inventory, security, questions).
- Coverage: "anywhere within an hour of Nottingham", "about a third of our offices are mostly Mac", Microsoft 365 or Google Workspace (questions, plans).
- Audit offer: a morning in the office, a one-page list of what to change that the client keeps, and a call back within one working day (contact).
- Client list: five invented offices with sizes and places (Fairlight Architects 9 people Hockley, Hollis Dental 14 Beeston, Marsh & Cole 6 West Bridgford, Loaf & Larder 22 across two shops, Meadows Tenants' Trust 31) and the change line of each (offices).
- Before and after notes: Hollis Dental, Fairlight Architects and Loaf & Larder with their tenure and stories (cases).
- People: Rob Stanton (founder), Hannah Price, Joel Mensah, Leila Haddad, Tomasz Wilk with their roles; the portraits are stock photos (team).
- Security claims: two-step sign-in, a password manager, encrypted laptops, tested backups, phishing drills (security).
- Hours and place: Monday to Friday 8:00 to 18:00, alerts on call around the clock, "1 Example Street, Hockley, Nottingham NG1 0ZZ" (contact, footer).
- Footer: "Quiet Systems Ltd, registered in England and Wales": put in your legal name and registration country.

## Known limits
- Without JavaScript the Menu button cannot open the overlay (the four header links stay reachable on wide screens), the headcount slider does not update the total and the audit form does nothing.
- The audit form sends nothing: it validates and shows a thank-you line only.
- The headings, hairlines and the price card are revealed once they reach the screen, so a very fast scroll past them shows them half-open for a moment.
- The offices section holds its photo stage in place (CSS sticky) for about 0.9 of a screen on wide screens and the team section holds a portrait beside five tall name rows, which feels long on a short laptop screen.
- Without CSS scroll-driven animation support (Firefox today) or with reduced motion, the scroll motion and the smooth wheel are off and every section shows its finished layout: the team is a plain grid of five portraits, and on wide screens the offices stage still stays in place for about 0.9 of a screen with nothing moving. The first screen's load-in still plays in Firefox, not with reduced motion.
- The nav hide-on-scroll and the hover effects keep running with reduced motion.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Quiet Systems left only in class names.
