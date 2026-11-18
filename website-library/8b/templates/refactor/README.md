# Free HTML coding school website template with scroll animations and no libraries

Coding school website template: a free HTML file for a part-time school that retrains adults, with before-and-after careers, a five-module course, a weekly timetable, mentors, taster evenings and three fee plans. The look is flat colour planes in orange, plum and ice, moved by CSS scroll animation with no libraries. AGENTS.md lets Claude Code, Cursor or Codex adapt it.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE) ![one HTML file: no build](https://img.shields.io/badge/one%20HTML%20file-no%20build-orange) ![dependencies: none](https://img.shields.io/badge/dependencies-none-brightgreen)

**[Live demo](https://8bsite.github.io/coding-school-website-template/)** · **[Use this template](https://github.com/new?template_name=coding-school-website-template&template_owner=8bsite)** · **[Download ZIP](https://github.com/8bsite/coding-school-website-template/archive/refs/heads/main.zip)** · **[Template page on 8b.com](https://8b.com/templates/refactor/)**

<a href="https://8bsite.github.io/coding-school-website-template/"><img src="previews/desktop.png" alt="Coding school website template: first screen on a desktop" width="76.1%"></a> <a href="https://8bsite.github.io/coding-school-website-template/"><img src="previews/phone.png" alt="Coding school website template: first screen on a phone" width="21.9%"></a>

<p align="center"><a href="https://8bsite.github.io/coding-school-website-template/"><img src="previews/scroll.gif" alt="Coding school website template: scrolling through the first sections" width="40%"></a><br><sub>Scroll animation</sub></p>

## Use it with Claude Code, Cursor or Codex

Download the four files into your project folder (`curl.exe` in Windows PowerShell):

```bash
curl -LO https://raw.githubusercontent.com/8bsite/coding-school-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/coding-school-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/coding-school-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/coding-school-website-template/main/CREDITS.md
```

Then fill in the angle brackets and give your agent this prompt:

```text
Read AGENTS.md, then edit index.html. Make this the site for <my school: name, city, course length and modules, weekly timetable, fees and funding, next start date, mentors, graduate stories, employer names, how people book a taster>. Motion is CSS scroll-driven animation plus the inline motion kit: keep the gate script, the section ids, the data-8b-* attributes, the classes AGENTS.md lists, four mentors, three capstones and the five i elements in each pixel glyph; add no animation library. Never invent outcomes, employers, quotes, prices, dates or contacts; ask me.
```

Vibe coding with Claude Code, Cursor or Codex starts with facts only the school has: course length, modules, timetable, fees, funding rules and start date. Ask the agent to replace the school name in the menu, footer and legal line, then the career rows, mentors, capstone clients and employer names. Graduate quotes, ages, outcomes and the employers in the opening band are invented; the owner supplies real ones or deletes them.

No agent? Click **[Use this template](https://github.com/new?template_name=coding-school-website-template&template_owner=8bsite)**, edit `index.html` on GitHub and turn on **Settings > Pages**.

## Sections and motion

- **Navigation**: logo glyph and word, four links, an Apply now button and a Menu button; full-screen menu. Mouse-wheel scrolling is smoothed; the bar turns solid after 24 px of scroll and slides away on the way down, returning when you scroll up.
- **Keep what works. Rewrite the rest.**: one screen: a panel of colour planes with a photo, the h1, a paragraph, a taster button and a row of employers. On load the panel and then the heading, paragraph and button lift into place; the colour planes themselves stay still.
- **Your first career isn't dead code.**: six rows of old job to new job, each with what carried over. Each of the six rows is tied to scroll: the old job is struck through and greyed, the new job wipes in from the left, then the Kept line fades up.
- **Twenty-four weeks. Five modules. One real product.**: a pinned horizontal track of five course modules with a strip of 24 week squares that fill in. Held on a sticky stage: the five module panels slide sideways while 24 week squares fill in order and each module's planes turn level as it arrives.
- **Built around the job you still have.**: three fixed weekly sessions with a photo each. The heading and lead rise out of a clip, and each of the three photos settles from a tilt, once, as they near the screen.
- **Mentors who made the same jump.**: a sticky portrait window that changes as four mentor stories scroll past. The portrait window is sticky; as each mentor card nears the middle, the next portrait wipes in on a slant and settles from a slight zoom.
- **Capstones that are still running.**: three project cards that stack as you scroll. The three project cards stick near the top and stack; the card underneath tilts, shrinks to 88% and darkens as the next slides over.
- **What changed, in their words.**: one large quote and four shorter ones with name and former job. The heading, the lead quote and four shorter quotes rise into view, and the heading's pixel glyph assembles from scattered squares.
- **Not sure yet? Sit in on a real class first.**: a red disc that grows into a panel listing four taster evenings. The red panel starts as a small disc with an arrow and grows on scroll until it fills its box, then the four dates rise inside.
- **One fee. Three ways to carry it.**: three fee plans dealt out from one stack. The three fee cards start stacked and slightly turned on one card, then are dealt into their columns as the section scrolls up.
- **Questions adults actually ask.**: six questions and answers (native details) beside a sticky heading. The heading rises and its glyph assembles; the six answers open and close natively, without JavaScript.
- **Book a taster, or just ask.**: colour planes falling into bands behind a contact form and details. Three colour planes behind the form fall from a tilted heap into bands, and the four detail rows fade up.
- **Footer**: wordmark, short description, six links and the address.

## Design

![#f5f5f7](https://img.shields.io/badge/-%23f5f5f7-f5f5f7?style=flat-square) page ground, the solid bar after scrolling, the form field backgrounds  
![#1e2130](https://img.shields.io/badge/-%231e2130-1e2130?style=flat-square) body text and headings, the dark employer marks, text on the light planes  
![#5e606b](https://img.shields.io/badge/-%235e606b-5e606b?style=flat-square) lead paragraphs, nav links, struck-through old jobs, notes under fees  
![#c93418](https://img.shields.io/badge/-%23c93418-c93418?style=flat-square) the red accent: buttons, focus outline, the strike line, the taster panel, the last module and weeks 20 to 24, the labels of the contact details  
![#f29a1f](https://img.shields.io/badge/-%23f29a1f-f29a1f?style=flat-square) orange plane in the first screen, first module and weeks 1 to 5, first project and fee gradients, pixel glyph  
![#ec6a52](https://img.shields.io/badge/-%23ec6a52-ec6a52?style=flat-square) coral: the tint behind old jobs, second module and weeks 6 to 10, gradient ends, minus signs  
![#4a3a5f](https://img.shields.io/badge/-%234a3a5f-4a3a5f?style=flat-square) plum: the graduates and footer sections, the full-screen menu, the second project and fee cards, mentor labels, FAQ icons  
![#2a2137](https://img.shields.io/badge/-%232a2137-2a2137?style=flat-square) deep plum: the course section background, button hover wipe, gradient ends, the favicon square  
![#8a90a3](https://img.shields.io/badge/-%238a90a3-8a90a3?style=flat-square) slate: fourth module and weeks 16 to 19, gradient ends, field hover border  
![#dde8ea](https://img.shields.io/badge/-%23dde8ea-dde8ea?style=flat-square) ice: the mentors and questions sections, new-job rows, third module and weeks 11 to 15, lead text on dark sections  
![#ffffff](https://img.shields.io/badge/-%23ffffff-ffffff?style=flat-square) fee cards and the form surface, text on dark planes, button labels  
![#dcdde3](https://img.shields.io/badge/-%23dcdde3-dcdde3?style=flat-square) hairline rules, form field borders and the bar's shadow line

**Matangi**: headings, module and mentor names, fee prices, the menu links and the wordmark: weight 500, uppercase, slightly tracked. **Asta Sans**: body text, buttons, form fields and small tracked uppercase labels: weights 400 to 600 (Google Fonts). A 1440 px column with side gutters of 20 to 64 px. Most section heads split in two: an uppercase heading on the left, a lead paragraph on the right, aligned at the bottom. Hairline rules separate the career rows, timetable slots and contact details. A five-square pixel glyph repeats in the top bar, the careers, graduates and questions headings and the footer. Below 900 px the columns stack and a Menu button replaces the links.

## Questions

**What shows in Firefox or with reduced motion?**  
The same content, at rest. Without CSS scroll-driven animations (Firefox today) or with reduced motion, the page shows its finished layout: careers already rewritten, all 24 week squares filled, the taster panel as a plain red block, fees in their columns. The course track becomes a strip you scroll sideways, and the mentors window shows only the first portrait.

**Does the contact form send applications?**  
No. As shipped it checks the fields, shows a thank-you line and disables the button, and sends nothing. Connect Formspree, Netlify Forms or your own endpoint and remove the script that stops the submit. The Apply buttons and the Book buttons beside the taster dates only jump to the form.

**Can I get a school site like this without editing code?**  
Yes, with a different tool. [8B's AI website builder](https://8b.com/) designs a new site from a sentence, and its own design is not this template. Designing and restyling are free; publishing with hosting and SSL, full HTML export and AI edits are on Pro at $9 a month billed yearly. It also runs inside Claude and ChatGPT.

## Is it the right base?

Choose this for a cohort course with fixed sessions, a fee page and a taster evening. This build looks and moves like the GSAP version with no animation library and no script from a CDN: about 42 KB of code gzipped against about 87 KB and three extra requests. For single instruments or private lessons, the [lesson studio](https://8b.com/templates/overtone/) template fits better. The weak spot is booking: Apply and Book only jump to the form, and taster dates are fixed text.

## Before you publish

- Replace what is marked `data-8b-placeholder` (social preview image, favicon, phone, email, form) and the invented demo facts; [AGENTS.md](AGENTS.md) lists them.
- The form sends nothing yet: connect it to Formspree or Netlify Forms, or remove it.

## Tech

No JavaScript libraries: CSS scroll-driven animations and a small inline motion script with its own smooth wheel scrolling, 169 KB, no build step. Chrome and Edge 111+, Safari 16.2+, Firefox 113+ (it uses color-mix(), container query units, cascade layers, small/dynamic viewport units). Without scroll-driven animations (Firefox today) the scroll motion and the smooth wheel are off and each section shows its finished layout (a load-in or a loop may still play); with "reduce motion" on, the page is complete and nothing moves on its own (hover effects stay).

A GSAP build of the same page is [`index.gsap.html`](index.gsap.html): GSAP 3.13.0, ScrollTrigger, Lenis 1.3.27 from jsDelivr, 160 KB; its scroll motion also plays in Firefox. Use one of the two files.

## License

MIT, see [LICENSE](LICENSE). Photos, fonts and libraries keep their own licences: [CREDITS.md](CREDITS.md). More free templates: [8b.com/templates](https://8b.com/templates/) · [github.com/8bsite](https://github.com/8bsite).
