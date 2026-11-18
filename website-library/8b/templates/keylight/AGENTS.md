# AGENTS.md: mortgage broker website template

One-page website for a mortgage broker or adviser who compares the whole market and books free calls. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/mortgage-broker-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/mortgage-broker-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/mortgage-broker-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/mortgage-broker-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:navigation`: `.nav__menu` `.menu__close`
  - `section-script:market`: `.market__field` `.market__lines` `.market__count` `.market__chart` `data-bank`
  - `section-script:contact`: `.contact__form` `.contact__status`
  - `scene-script:switch`: `.switch__track`
- The market chart counts its lines from the value of the data element in the lead paragraph (94; section-script:market then sets --market-count, whose inline value draws the plain stripes shown before the script runs). The bank's dark line is the position in data-bank (31) on the field, and the label follows the inline --market-bank on the chart: keep the two equal and below the count. The 94 also appears as text in the opening card, the method step and chip, the ledger and the offer checks: change them all together.
- The growth of the chart lines is timed in scene:market by :nth-child rules written for exactly 94 lines spreading out from the 32nd (data-bank 31). With another count or bank position, rewrite those rules, or lines past the 94th stand still and the spread starts from the wrong line.
- The method scene is CSS written for four steps (:nth-of-type rules for the photos, the index dots and the step timelines), so keep four steps with four photos and four dots, or add the rules with them.
- The switch section turns into a sideways strip only while the motion is on: scene:switch makes the section one screen plus --switch-distance high (scene-script:switch measures it) with a sticky flex strip. Each new panel needs a dot with the class switch__dot; the dots are timed from their position in the list, so the number of panels can change.
- The line chart in the offer panel draws with stroke-dashoffset from 1 to 0 on a polyline with pathLength="1"; keep that attribute if you redraw the line.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #ffffff (page ground, the nav bar, the footer card and the call-back form card, text on the dark sections), `--color-2` #18181b (body text, the dark buttons, the advisers section ground, the bank's line in the chart, the switch dots and fill line), `--color-3` #62626b (secondary small text and the descriptions in the fee ledger), `--color-4` #f4f4f5 (alternate ledger rows, the FAQ section ground, the form fields), `--color-5` #ffb547 (amber: the middle of the glow gradient, the switch section's final ground, adviser specialities, the method index dots, the line in the offer panel's chart), `--color-6` #fc5f2b (ember: the chart lines other than the bank's, bullets and step markers, the round badge icon behind the white tick, the link underline on hover, the end of the glow), `--color-7` #120d0a (warm near black: the contact section and footer ground, the backing of the photo frames, the dark photo chips and the offer panel), `--color-8` #a1a1aa (muted small text, such as the one-line adviser notes and the photo chip subtitles), `--color-9` #e4e4e7 (hairlines, field borders, the pale start of the chart lines and the dimmed ledger and FAQ rows before they light up), `--color-10` #ffe3b3 (the cream centre of every glow: the first screen, the button hover, the logo mark and the contact disc); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, email, form): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Book a free call buttons (header, menu, first screen, included, offer and footer): now #contact; owner's target: your booking calendar URL (Calendly, Cal.com) if you take bookings there, or keep them on the call-back form.
- Call link in the header, menu, FAQ, contact block and footer: now a tel: link to the office phone; owner's target: your own number.
- Request a call button of the call-back form: now action="#contact" with method post; a script checks required fields, clears the form and shows a thank-you line, nothing is sent; owner's target: your form endpoint (Formspree, Netlify Forms) or your own handler; replace section-script:contact when you do, since it resets the fields inside the submit handler and a plain post without its preventDefault would send them empty.
- Privacy and Complaints links in the footer legal line: now /privacy and /complaints on your own domain, which do not exist yet; owner's target: your privacy notice and complaints procedure pages.
- See how it works link in the first screen: now #method; owner's target: keep it.
- The form in `#contact` (fields `name`, `phone`, `email`, `plan`, `time`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Keylight Mortgages (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (13, Unsplash: method 4, advisers 4, stories 3, offer 1, contact 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Fee model: "Brokers can charge up to £995. Our fee is £0", the lender-paid fee of 0.35% to 0.45% of the loan, and a £495 fee for complex cases (included, offer, FAQ).
- Regulation: "authorised and regulated by the Financial Conduct Authority", the repossession warning and the buy-to-let note (footer): the wording must be true for your firm and no firm reference number is on the page.
- Market claims: 94 lenders, 41 of 94 who would say yes, 3 deals out of 94 (opening, market, method, included, offer); the chart count also sits in a data element and inline variables.
- Example figures: borrowing up to £312,500, deposit £35,000 at 10%, a 30 year term, £1,486 a month at 4.29% fixed, valid until 14 January 2027, a couple earning £68,000 (opening card); £1,286 against £1,412 a month (offer); 4.29% and 3.94% fixed rates, a fix ending 31 March 2031, 7.49% standard variable (switch); a valuation on Thursday 10:30 and keys released at 12:04 (method chips).
- Service promises: a 20-minute call, a written figure within a day, an agreement in principle the same week, a soft search with no footprint, a call six months before a deal ends, offers in two to four weeks (opening, included, FAQ).
- Hours: calls from 8am to 8pm on weekdays and 10 to 4 on Saturdays (included, offer, contact).
- People: Hannah Moorcroft, Daniel Okafor, Raj Mistry and Ellie Varga, their specialities, 900 first-time buyers, twenty-two years and "61 years" between them; the portraits are stock photos (advisers).
- Client stories: Amira and Tom of Chapel Allerton, Jess of Kirkstall and Mei of Roundhay, the £38,000 and £212 a month results and their quotes (stories).
- Reviews: "Rated 4.9 out of 5 across 1,240 reviews" (stories).
- Advice claims in the FAQ: deposit levels of 5%, 10% and 15%, two years of accounts for the self-employed (FAQ): check them against your lender panel.
- Address, phone and email placeholders in the contact block, footer and FAQ; the city name Leeds in the tagline and contact: put in your own.
- Legal line: "Keylight Mortgages Ltd" with the copyright in the footer: put in your legal name.

## Known limits
- Without JavaScript the Menu button cannot open the overlay; the header links on wide screens and the footer links stay reachable. The market chart then shows 94 even ember stripes drawn by CSS, with no dark bank line. The questions are native details and open without it.
- The call-back form is a demo: with JavaScript it only checks the required fields, clears itself and shows the thank-you line; without it the form posts to #contact.
- The switch section holds the screen for the whole sideways run of its panels: about 1,300 px of scrolling at 1440 px wide and 1,270 on a 375 px phone.
- The footer links to /privacy and /complaints do not exist on a static copy: point them to real pages.
- The CSS animates fixed counts: 94 chart lines around the 32nd and four method steps. Another lender count or a fifth step needs matching rules in scene:market or scene:method.
- Without scroll-driven animation support (Firefox today) and with reduced motion, the scroll motion and the smooth wheel are off: the chart stands lit with its dark bank line, the held method frame keeps its first photo with all four index dots lit, the ledger and FAQ rows are lit, and the switch panels sit in a grid (one column at 960 px and below) on the amber ground. The opening load-in still plays in Firefox and stops with reduced motion; the nav bar still hides on scroll.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Keylight Mortgages left only in class names.
