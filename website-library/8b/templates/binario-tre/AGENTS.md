# AGENTS.md: travel agency website template

One-page website for a small group tour operator that sells fixed-date journeys with local hosts. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/travel-agency-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/travel-agency-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/travel-agency-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/travel-agency-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:contact`: `.ct__form` `.ct__status` `data-sent`
  - `section-script:nav`: `.nav__menu` `.nav__panel` `.nav__close`
  - `section-script:opening`: `.op__band`
  - `scene-script:opening`: `.op__view` `.op__photo` `.op__still` `.op__two`
  - `scene-script:route`: `.rt__stops` `.rt__stop` `.rt__line` `.rt__marker`
  - `scene-script:journeys`: `.jr__table` `.jr__ticket`
  - `scene-script:included`: `.in__main` `.in__stub`
  - `scene-script:private`: `.pv__band` `.pv__ribbon`
- `style="--len:N"` = characters in that display line, spaces included: `Binario Tre` is 11.
- The h1 is sized from style="--len:12" and the footer wordmark from style="--len:11", the number of characters of the longer title line ("Slow trains." and "Three stops." are 12 each) and of "Binario Tre"; update them when the words change, or the type overflows or leaves gaps.
- The opening photo exists twice, once full-bleed and once in the carriage window; the opening script clips the full-bleed layer to the window photo's moving box, so change both images together and keep the window photo's box and rounded corners in the CSS.
- Counts the CSS times by position: three stops on the route (each gets eight slats; the stop grid is also repeat(3, ...), so a fourth stop wraps under the rail), exactly four journey tickets, three entries and three window photos in the day section, and the first six holes on the included ticket. Another count needs new CSS rules. The day ground runs from --color-1 through --color-5 to --color-3.
- The departures table is a real table with header cells and a visually hidden caption; keep that markup when adding rows.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #465016 (olive: page ground, nav bar, opening plate, route, hosts, what-is-included section, private hire and footer grounds, and the first ground of the day section), `--color-2` #e6dcbf (cream: body text on dark grounds, ticket and form surfaces, the filled part of the route rail, cream sleeper bars), `--color-3` #1d2209 (near-black: journeys and FAQ grounds, text on cream tickets, dark buttons, hard offset shadows, the last ground of the day section), `--color-4` #5f6834 (lighter olive: route rail, FAQ dividers, and sleeper bars), `--color-5` #4a2f14 (brown: carriage screen, departures and contact grounds, and the middle ground of the day section), `--color-6` #d49a3a (amber: filled buttons, window frames, the route marker, entry times in the day section, rules, focus outlines); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, email, form): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Ask for a seat button in the nav, the link in the first screen and the Contact link in the menu: now #contact; owner's target: your booking or enquiry page, or keep #contact once the form is connected.
- See the 2027 lines button in the first screen: now #journeys; owner's target: keep, or point to your full tour catalogue.
- Dates buttons on the four journey tickets: now #departures; owner's target: the journey's own page or its booking page.
- Reserve links in the departures table (seven rows): now #contact; owner's target: a booking link per departure.
- Plan a private line button in the private hire section: now #contact; owner's target: your group enquiry page.
- Booking terms link in the footer: now #faq; owner's target: your booking terms page.
- Send the enquiry button in the contact form: now no submission; a script shows a thank-you line; owner's target: your form service (Formspree, Netlify Forms) or your booking system.
- The form in `#contact` (fields `name`, `email`, `line`, `month`, `travellers`, `message`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Binario Tre (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (16, Unsplash: opening 1, route 3, journeys 4, hosts 3, day 3, private 1, contact 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Company: "Binario Tre Viaggi S.r.l.", Florence, "Licensed tour operator, Regione Toscana" and a VAT number (footer).
- Journeys: four lines for 2027 with their towns, studios and per-person prices from €2,390 to €2,720 (journeys, departures, included).
- Itinerary details: stop times, the 1890 mill, forty thousand swatches, a jeep to the quarry, twenty pairs of shoes a year (opening, route, hosts).
- Hosts: Elena Mati, Marco Bertozzi and Giulia Ferro with roles, towns and quotes; photos show hands only (hosts).
- Group and format: twelve seats, one host, three studios, a Monday to Friday programme from Florence, regional trains, four nights (opening, journeys, included).
- Departures: seven dates in 2027 with seats left out of twelve (departures).
- Price terms: single room +€340, a 20% deposit, the balance sixty days before departure, a full refund on cancellation until then, groups of eight or more on their own dates (departures, included, faq, private).
- What is covered: trains, rooms, studio mornings, eight meals with wine (four lunches, four dinners), luggage by van; what is not: getting to Florence, insurance, two free evenings (included).
- Daily programme: 07:52 platform three, 10:00 studio, 20:30 dinner, three hours at the bench, a trattoria known for twenty years (day).
- FAQ promises: walks under five kilometres a day, one case each, about half of travellers come alone, no pairing of strangers, a minibus on call for strike days, two of three studios step-free (faq).
- Private hire: eight to twenty people on chosen dates (private).
- Office: address, hours Monday to Friday, phone and email, and "We answer within one working day" (contact, footer).

## Known limits
- Without JavaScript the menu button cannot open the panel (on wide screens the nav links are visible), the enquiry form reloads the page instead of showing the thank-you line, and the day section shows only its first photo.
- The enquiry form sends nothing: connect a form service or your booking system before publishing.
- The opening clips a full-screen layer on every scroll update to land on the window photo; it is the heaviest effect on the page.
- Without scroll-driven animation support (Firefox today) the page shows its finished layout: the tickets in place, the stops open, the day section olive on its first photo; only the opening load-in, the landscape drift and the sleeper-bar loop still play. With reduced motion on, nothing moves on its own; the nav still hides on scroll down.
- The seats-left column is plain text; it does not update from a booking system.
- The opening photo is one 1600 px wide image with no srcset, used for both the full-bleed layer and the window, so phones load the large file.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Binario Tre left only in class names.
