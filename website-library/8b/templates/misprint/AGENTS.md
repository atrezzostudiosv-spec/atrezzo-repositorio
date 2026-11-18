# AGENTS.md: graphic design studio website template

One-page website for a graphic design studio with its own risograph print room. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/graphic-design-studio-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/graphic-design-studio-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/graphic-design-studio-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/graphic-design-studio-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits.
- Selectors the scripts use:
  - `section-script:nav`: `.nav__menu` `.nav__close`
  - `section-script:contact`: `.contact__form` `.contact__status` `data-sent`
  - `scene-script:opening`: `.opening__stage` `.opening__face` `data-focus`
  - `scene-script:work`: `.work__track` `.work__pin` `.work__item`
  - `scene-script:process`: `.process__list` `.process__step`
  - `scene-script:studio`: `.studio__table` `.studio__proof`
- `style="--len:N"` = characters in that display line, spaces included: `oops` is 4, `identities` is 10, `posters` is 7, `books` is 5, `packaging` is 9, `signage` is 7, `hello@misprint.example` is 22, `misprint` is 8.
- The giant words ("oops", the question mark, "misprint") are SVG text with eight stacked copies for the extruded depth; change the word in the text element, keep the eight stacked <use> copies, and set --len to the new letter count where the markup carries it. The opening scene measures the counter of the character whose index data-focus gives, counted from 0 (data-focus="1" is the second letter, the second "o" of "oops"), so a new word needs a round letter with a counter at that index, or a new data-focus value.
- The second ink, the plates behind the prints and the discs are CSS, not images: recolour them through the --color variables in :root. The work row, the rates table rows and the studio cards are laid out by CSS grid, flex and the scene scripts that measure them, so adding a card works; the discipline words in "what leaves the room" need a --len equal to their letter count.
- Motion needs the inline motion kit and the data-8b-live attribute that the gate script in the head sets; keep the gate and the kit together. The page's own wheel smoothing pauses while the phone menu is open.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #f2d27c (the paper: page ground, nav pills, the secondary button, the sheet over the opening, text on the pine menu overlay), `--color-2` #17423a (the first ink: all text, the 2px rules, outlines, primary buttons, the menu overlay and the dark second screen when scroll motion is off), `--color-3` #5b9a7e (the second ink: the giant word faces, plates behind photos, heading shadows, one ink disc, the hard shadow of primary buttons and the open question sign), `--color-4` #ebc568 (deeper paper: alternate rate rows, the process sheet, portrait proofs and the contact form fill); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, email, phone, form): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Start a project buttons in the nav bar, the opening and the phone menu list (Contact): now #contact; owner's target: keep #contact once the form is connected, or your brief or booking page.
- See the work button in the opening: now #work; owner's target: keep #work, or your portfolio or case-study index.
- Ask for the archive button at the end of the work row: now #contact; owner's target: a link to your archive, a PDF portfolio, or a mailto for archive requests.
- Book a slot button in the print room section: now #contact; owner's target: your print-room booking page or calendar, or keep #contact.
- Write to us link in the hiring line of the studio section: now #contact; owner's target: a mailto for jobs or your careers page.
- How we print link in the second screen of the opening: now #method; owner's target: keep #method, or a page about your print process.
- The form in `#contact` (fields `name`, `email`, `message`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Misprint (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (12, Unsplash: opening 1, work 5, method 1, print-room 1, studio 4): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Studio: Rotterdam, "since 2014", "seven people" (four shown), a bookbinder by training among them (opening, studio, footer, title and meta description).
- Work shown: low tide jazz, harbour bakery, atlas of small rivers, vintage row, coastline cards with years 2023 to 2025, "book, 240 pages", "forty more jobs" in the archive (work).
- Process and timing: "two inks, one paper", "eight to twelve weeks" for an identity plus a week for proofs and the run, posters "around a week of work", identities "around two months" (method, faq, process).
- Pricing terms: "a fixed quote on one page, no hourly surprises" after the first conversation (faq).
- Print room rates: A4 one ink €40, A3 one ink €65, each extra ink €15, paper from €0.20 a sheet, an hour with a printer €35, up to 100 sheets per run (print-room).
- Print room rules and hours: open Tuesday to Saturday, ten to six; files as PDF, one layer per ink; two drums booked by the hour; students, artists and other studios welcome (print-room, contact, navigation overlay).
- Team: Ilse Vermeer, Tomás Okafor, June Park, Ruben de Klerk with their roles; the portraits are stock photos of real people and their alt texts name them (studio).
- Hiring: a junior designer wanted (studio).
- Clients and quotes: Mara Lind of Harbour Bakery, Sem Achterberg of Low Tide Jazz, Noor Haddad of Atlas of Small Rivers and the quotes themselves (voices; the clients also appear as jobs in work).
- Service promises: replies "within two working days" (the form's thank-you line); working with clients abroad by video and post (faq); "posters went missing from bus shelters within a week" (voices).
- Location and contacts: the address Example Street 1, Rotterdam, the phone +31 10 000 0000 and hello@misprint.example are placeholders to replace with real ones (contact).
- "© 2025 Misprint" (update the year) and "Printed two inks at a time" (footer).

## Known limits
- Without scroll-driven animation support (Firefox today) or with reduced motion the page stays in its static layout: the opening is two plain screens and the studio photo inside the giant word does not show, the work row is an ordinary sideways-scrolling strip, the sheet, the words and the portraits sit in place, no process step is marked and scrolling is the browser's own. The headline intro and the looping outline, tag and arrows mark are CSS keyframes that play whenever reduced motion is off, Firefox included; the nav bar still hides on scroll and buttons still move on hover with reduced motion.
- Without JavaScript the phone menu button cannot open the overlay and the form does not send; the nav links remain in the footer. The FAQ opens without JavaScript.
- The giant second-ink type and the thin extruded layers are decorative; the offset ink is lower contrast against the yellow and should not carry small text.
- The pinned work row lasts as long as the track overflows the screen width (five cards, the heading and the closing note), so on a phone, where cards are 76% of the screen wide, it is shorter in pixels but still a long horizontal pass.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Misprint left only in class names.
