# Free HTML bowling alley website template with scroll animations and no libraries

Bowling alley website template: a free HTML file for a venue with a kitchen and bar, three leagues, Friday glow nights, a weekly leaderboard and four party packages. The look is loud: a near-black ground with yellow, orange, lilac and sky-blue panels. Scroll motion runs on CSS with no libraries; AGENTS.md lets Claude Code, Cursor or Codex adapt it.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE) ![one HTML file: no build](https://img.shields.io/badge/one%20HTML%20file-no%20build-orange) ![dependencies: none](https://img.shields.io/badge/dependencies-none-brightgreen)

**[Live demo](https://8bsite.github.io/bowling-alley-website-template/)** · **[Use this template](https://github.com/new?template_name=bowling-alley-website-template&template_owner=8bsite)** · **[Download ZIP](https://github.com/8bsite/bowling-alley-website-template/archive/refs/heads/main.zip)** · **[Template page on 8b.com](https://8b.com/templates/pinfall/)**

<a href="https://8bsite.github.io/bowling-alley-website-template/"><img src="previews/desktop.png" alt="Bowling alley website template: first screen on a desktop" width="76.1%"></a> <a href="https://8bsite.github.io/bowling-alley-website-template/"><img src="previews/phone.png" alt="Bowling alley website template: first screen on a phone" width="21.9%"></a>

<p align="center"><a href="https://8bsite.github.io/bowling-alley-website-template/"><img src="previews/scroll.gif" alt="Bowling alley website template: scrolling through the first sections" width="40%"></a><br><sub>Scroll animation</sub></p>

## Use it with Claude Code, Cursor or Codex

Download the four files into your project folder (`curl.exe` in Windows PowerShell):

```bash
curl -LO https://raw.githubusercontent.com/8bsite/bowling-alley-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/bowling-alley-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/bowling-alley-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/bowling-alley-website-template/main/CREDITS.md
```

Then fill in the angle brackets and give your agent this prompt:

```text
Read AGENTS.md, then edit index.html. Make this the site for <my venue: name, lane count and game prices, kitchen and bar hours, league nights and captains, menu with prices, party packages, beginners' hour, address and how guests book>. Motion is CSS scroll-driven animation plus the inline motion kit: keep the gate script in the head, the ids, the data-8b-section, data-8b-motion, data-8b-items and data-8b-part attributes, the classes AGENTS.md lists and the wordmark's len value; add no animation library. Never invent prices, hours, scores or contacts; ask me.
```

Vibe coding this bowling alley website template for Claude Code or Cursor goes fastest when the agent gets the facts only the venue has: lane count, game prices, kitchen and bar hours, league nights, menu prices, party packages and the booking route. The demo invents all of them. It also prints two sets of opening hours that disagree, so make them match. Keep the ids and the data-8b-section, data-8b-motion and data-8b-part attributes.

No agent? Click **[Use this template](https://github.com/new?template_name=bowling-alley-website-template&template_owner=8bsite)**, edit `index.html` on GitHub and turn on **Settings > Pages**.

## Sections and motion

- **Navigation**: two-line wordmark, a Gift cards button, a Book a lane button and a menu icon; the menu opens a full-screen overlay with five links. Mouse-wheel scrolling is smoothed; the bar tightens after 40 px of scroll, slides out of view when you scroll down past 120 px and returns on scroll up.
- **Under one roof**: big "Under one roof" headline, a lead line with a button, and three tiles for lanes, kitchen and bar. On load the lead and button lift in, the heading lifts out of a clip with a slight tilt, and each tile word lands oversized and turned before pressing flat.
- **Meet the leagues**: three league captains as duotone portrait cards with colour washes that sweep through them. Colour bands slide sideways behind each greyscale portrait as you scroll, one card a beat behind the last, and settle on purple, green and blue.
- **Lane-side kitchen**: a round photo stage where four dish photos roll in one after another, beside the menu in four groups. The burger photo sits in a sticky round stage, and the fries, shake and cocktail photos roll in over it from the left, turning as they travel, as each later menu group scrolls up.
- **Lights out at nine**: "Lights out at nine": the yellow ground dims to black, the heading turns neon and colour pools fade in. As the section scrolls in, one value runs the ground from yellow to black, the heading turns lilac with a purple glow, two colour pools fade in and the photo regains its colour.
- **Wall of fame**: wall of fame: the six best games of the week, sorted by sliding rows past each other. Tied to scroll, the six rows start in the order the games were bowled and slide past each other into rank order with a small sideways nudge.
- **Throw a party at the lanes**: four party packages as panels that ride in from the right while the section is held. The section holds the screen while the intro and the four panels move left, then releases; with motion off the panels wrap into a grid.
- **Never bowled? Good.**: a beginners' hour: a photo, three numbered tips and a booking button. Only the heading lifts out of a clip on arrival.
- **Before you roll up**: six questions and answers (native &lt;details&gt;) on a panel with two balls and two brush scribbles. Two yellow balls roll in from opposite edges, turning as they travel, and two brush scribbles draw themselves.
- **Grab a lane**: "Grab a lane" with email and phone tiles, an enquiry form and a photo with the address and opening hours. The heading lifts out of a clip on arrival.
- **Footer**: the wordmark across the width, a Book now stamp, five links and the credit line. The wordmark splits into letters that stand up one after another as the footer arrives, and the Book now stamp lands oversized and turns flat.

## Design

![#15130c](https://img.shields.io/badge/-%2315130c-15130c?style=flat-square) page ground, header bar, default button fill, text on the yellow and sky-blue panels, and the black the glow section dims to  
![#ffd23f](https://img.shields.io/badge/-%23ffd23f-ffd23f?style=flat-square) menu and questions panels, contact form, top leaderboard row, yellow buttons, footer wordmark and links, the two balls, focus rings  
![#c8381f](https://img.shields.io/badge/-%23c8381f-c8381f?style=flat-square) the red sweep that fills buttons on hover, the Book now stamp, the Bar tile word  
![#fffdf5](https://img.shields.io/badge/-%23fffdf5-fffdf5?style=flat-square) cream text on the dark ground, the league pills and the text of the party price pills, the stamp label  
![#b9a2f5](https://img.shields.io/badge/-%23b9a2f5-b9a2f5?style=flat-square) Lanes tile word, Office socials panel, Call tile, the glow heading at night  
![#8ccbe6](https://img.shields.io/badge/-%238ccbe6-8ccbe6?style=flat-square) beginners' hour panel and the Lane takeover party panel  
![#f28a2e](https://img.shields.io/badge/-%23f28a2e-f28a2e?style=flat-square) Kitchen tile word, Kids' parties panel, Email tile, the warm edge of the balls  
![#8a55e0](https://img.shields.io/badge/-%238a55e0-8a55e0?style=flat-square) purple colour band over the first portrait and one of the two glow pools  
![#23a26b](https://img.shields.io/badge/-%2323a26b-23a26b?style=flat-square) green colour band over the second portrait  
![#3d7be0](https://img.shields.io/badge/-%233d7be0-3d7be0?style=flat-square) blue colour band over the third portrait and the second glow pool  
![#211e15](https://img.shields.io/badge/-%23211e15-211e15?style=flat-square) surfaces of the three tiles, the leaderboard and the footer panel  
![#3d3828](https://img.shields.io/badge/-%233d3828-3d3828?style=flat-square) hairline borders of the tiles and the leaderboard

**Bricolage Grotesque**: headings, names, prices, ranks and scores, footer wordmark and links, stamp label: only weight 800 at 75% width loads, set in capitals with a line height of about 0.9. **Radio Canada Big**: body text at weight 400, uppercase lead lines at 500, buttons and small labels at 600, pills at 700 (Google Fonts). A fixed header bar with a two-line wordmark, two buttons and a menu icon sits over a near-black page. The first screen pairs a large two-line heading with a lead and button on the right, above three tiles for lanes, kitchen and bar. Portrait cards then run edge to edge, followed by large rounded colour panels, a sideways row of party panels, and a contact mosaic of two coloured tiles, a form and a photo.

## Questions

**Does the Book a lane button take bookings?**  
Not by itself. Every Book a lane button jumps to the enquiry form, which requires a name and an email, shows a thank-you line and sends nothing. Point the buttons at your booking page, or connect the form to Formspree or Netlify Forms with the steps in AGENTS.md.

**Where is the bowling alley website design prompt, and how do I use it?**  
Below the short prompt sits a longer bowling alley website design prompt for any AI tool. With the template, put index.html and AGENTS.md in an empty folder using its curl lines, and tell the agent to read AGENTS.md first. Give it the files, not the page address. Codex reads [AGENTS.md from the folder](https://8b.com/templates/for-codex/) on its own.

**Can I get a site like this without editing code?**  
Yes, in a different way. [8B's AI website builder](https://8b.com/) designs a new site from a sentence about your venue, not this template. Designing and restyling are free; publishing with hosting and SSL, full HTML export and AI edits in chat are on Pro at $9 a month billed yearly. It also runs inside Claude and ChatGPT.

## Is it the right base?

This is the right base for a venue that sells an evening: lanes, food, drinks, leagues and parties on one loud page. It runs with no animation library and no script from a CDN: about 24 KB of code gzipped, where the GSAP version needs about 70 KB and three extra requests. A venue run on weekly skating sessions suits the [weekly-session](https://8b.com/templates/spinway/) template better. The weak spot is booking: Book a lane jumps to the form, with no lane calendar or payment.

## Before you publish

- Replace what is marked `data-8b-placeholder` (social preview image, favicon, email, phone, form) and the invented demo facts; [AGENTS.md](AGENTS.md) lists them.
- The form sends nothing yet: connect it to Formspree or Netlify Forms, or remove it.

## Tech

No JavaScript libraries: CSS scroll-driven animations and a small inline motion script with its own smooth wheel scrolling, 93 KB, no build step. Chrome and Edge 111+, Safari 16.2+, Firefox 113+ (it uses color-mix(), cascade layers, small/dynamic viewport units). Without scroll-driven animations (Firefox today) the scroll motion and the smooth wheel are off and each section shows its finished layout (a load-in or a loop may still play); with "reduce motion" on, the page is complete and nothing moves on its own (hover effects stay).

A GSAP build of the same page is [`index.gsap.html`](index.gsap.html): GSAP 3.13.0, ScrollTrigger, Lenis 1.3.27 from jsDelivr, 81 KB; its scroll motion also plays in Firefox. Use one of the two files.

## License

MIT, see [LICENSE](LICENSE). Photos, fonts and libraries keep their own licences: [CREDITS.md](CREDITS.md). More free templates: [8b.com/templates](https://8b.com/templates/) · [github.com/8bsite](https://github.com/8bsite).
