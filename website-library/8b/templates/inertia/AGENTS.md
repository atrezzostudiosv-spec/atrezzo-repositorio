# AGENTS.md: motion design studio website template

One-page website for a motion design studio that sells films, motion systems and social content to brands. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/motion-design-studio-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/motion-design-studio-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/motion-design-studio-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/motion-design-studio-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:site-nav`: `.nav__menu` `.nav__close`
  - `section-script:contact`: `.ct-form` `.ct-status`
  - `scene-script:practice-deal`: `.pr-card`
  - `scene-script:work-index`: `.wk-title`
  - `scene-script:method-timeline`: `.mt-step`
  - `scene-script:studio-register`: `.st-room`
- `style="--len:N"` = characters in that display line, spaces included: `inertia` is 7.
- The brand name appears as a wordmark in the footer: "inertia" in .ft-word with style="--len:7", the number of characters, which sizes the word to the full width. Set --len to the length of your name.
- Headings, quote cards, the quote's picture pill and the photos carry data-8b-motion values (brake, streak, drift); the motion CSS and the kit find elements by these attributes, and the scene CSS and scripts by classes such as .pr-card, .wk-row, .wk-title, .wk-shot, .mt-step, .en-plan and .en-runner. Keep them when you add or remove items.
- The method steps must stay .mt-step items inside .mt-track (any number works); the scene measures their positions and sets --mt-run on the section itself. The engagement rows read data-pace: sprint crosses early and waits, season follows the scroll evenly and laps runs three laps; the engage scene CSS has a rule for each of these three values only, so a runner with any other value stays at rest.
- The logo, the starburst, the orange dots, the runners and the plus signs are CSS or inline SVG, not images: recolour them through the CSS variables (--color-5 is the orange). The orange light streaks in the statement pills, the buttons and the contact band are photos.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #f4f4f5 (page ground, and the nav bar once you scroll (at 90%)), `--color-2` #e3e3e5 (the two light cards (practice and quotes), contact section ground, photo placeholders and the footer wordmark), `--color-3` #0c0c0d (text, dark cards, the tempo, lab and footer bands, the menu overlay and hairlines), `--color-4` #5f5f64 (small secondary text, such as card notes, step texts and contact details), `--color-5` #ff4d1a (the accent: dots, starburst, runners, method playhead, live step number, link hover and the outlined buttons' dot), `--color-6` #ffffff (the white pill button and text on dark surfaces), `--color-7` #7b7b80 (the quiet half of the opening statement and of the main quote), `--color-8` #a3a3a8 (small text on black cards, the dark bands and the footer); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, email, phone, form, social): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Start a project button in the opening: now #contact; owner's target: your booking page (Calendly, Cal.com) or keep it on the brief form.
- See the work link in the opening: now #work; owner's target: keep it, or point it to your showreel or portfolio page.
- Get in touch button in the header: now #contact; owner's target: keep it, or your booking page.
- Book a sprint, Plan a season and Start a retainer links in the engagement plans: now #contact for all three; owner's target: a booking page per plan, or keep them on the brief form.
- Send the brief button in the contact form: now the form has action="#"; the script validates it, shows the thank-you line and sends nothing; owner's target: your form service (Formspree, Netlify Forms) or your own endpoint, with the thank-you line kept.
- Instagram, Vimeo and LinkedIn links in the footer: now the home pages instagram.com, vimeo.com and linkedin.com; owner's target: your own profile addresses.
- The form in `#contact` (fields `name`, `email`, `message`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Inertia (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (26, Unsplash: opening 2, contact 1, practice 2, work 5, method 4, voices 3, studio 5, lab 6): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Studio profile: "Rotterdam, since 2017" (footer), "Fourteen designers, animators and editors in one Rotterdam room" (opening note), "Four of the fourteen who will work on yours" (studio).
- Services: motion systems, launch films, social content and the "one room" claim (practice cards, FAQ "What is a motion system?"), and the three tempos Glide, Snap and Pulse (tempo).
- Clients and projects: Kestrel Rail, Sable Audio, Offgrid Skate Co., Lumen Dance Company and Harbor & Vale Law with their project names, kinds and years 2025 and 2026 (work); the photos are stock images, not their work.
- Method and timing: "about six weeks for a launch film", two workshops, storyboards and motion tests, weekly reviews, masters, cutdowns and motion rules (method).
- Prices and durations: Sprint two weeks from €12,000, Season twelve weeks from €48,000, Always on from €9,500 a month (engage).
- Start times: "A sprint usually starts within three weeks of the first call, a season within six" (FAQ).
- Ownership and reach: files are yours "from the final invoice on"; most clients are elsewhere in Europe and in North America; workshops in person or remote, reviews always remote (FAQ).
- Team: Noor Visser, Joris de Wit, Lena Okafor and Tomas Brandt with their roles; the portraits are stock photos (studio).
- Reviews: Mara Lindqvist, brand director at Kestrel Rail; Ilse Brouwer, Sable Audio; Ruben Hale, Offgrid Skate Co. and the quotes themselves (voices).
- Lab: the six experiments and their claims, such as "forty seconds of shutter" and "Tail lights at a hundred and twenty" (lab).
- Reply time: "We reply within two working days" (thank-you line of the form).
- Contact: email, phone, street address and postcode in Rotterdam (contact, after the replacements).
- Legal: "© 2026 Inertia Studio B.V." and the company number "KvK 00000000" (footer): put in your legal name and registration number.
- Social profiles: Instagram, Vimeo and LinkedIn point to the networks' home pages (footer).

## Known limits
- Without JavaScript the Menu button on phones cannot open the overlay and the header links are hidden up to 860 px wide; the section links in the footer stay reachable.
- The contact form is a placeholder: with JavaScript it validates and shows a thank-you line but sends nothing until you connect a service; without JavaScript a submit posts to action="#", the same page.
- Without CSS scroll-driven animation support (Firefox today) every section shows its finished layout with ordinary scrolling: the opening statement, pills and starburst stand still, the method steps form a two-column grid without the playhead, and the runners of the plans rest at the end of their lines; only the opening buttons' rise and the tempo loops still play. With reduced motion on, those stop too; the bar still hides on scroll.
- Counts are fixed in the scene CSS: four practice cards and their dots, five work rows, four team portraits and the four crew columns (nth-of-type rules); an extra item stays still unless its rules are added.
- The method section is a sticky full-screen stage; on very short screens the photos and text of a step can be cropped by the stage.
- Fonts load from Google Fonts and all photos are hotlinked from Unsplash; swap in your own images for production.
- The quiet half of the opening statement and of the main quote use #7b7b80 (about 3.8:1 on the page ground), fine for large display text only; do not reuse it for small text.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Inertia left only in class names.
