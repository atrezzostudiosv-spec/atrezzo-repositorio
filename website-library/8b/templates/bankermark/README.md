# Free HTML stonemason website template with scroll animations and no libraries

This stonemason website template is one free HTML file for a masonry yard that does repairs, new stonework and lettering: trade panels, a stone list, a team of seven, four recent jobs, lettering prices and an enquiry form on a near-black page with light-grey panels. Its scroll motion is CSS with no JavaScript library; AGENTS.md guides Claude Code or Cursor.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE) ![one HTML file: no build](https://img.shields.io/badge/one%20HTML%20file-no%20build-orange) ![dependencies: none](https://img.shields.io/badge/dependencies-none-brightgreen)

**[Live demo](https://8bsite.github.io/stonemason-website-template/)** · **[Use this template](https://github.com/new?template_name=stonemason-website-template&template_owner=8bsite)** · **[Download ZIP](https://github.com/8bsite/stonemason-website-template/archive/refs/heads/main.zip)** · **[Template page on 8b.com](https://8b.com/templates/bankermark/)**

<a href="https://8bsite.github.io/stonemason-website-template/"><img src="previews/desktop.png" alt="Stonemason website template: first screen on a desktop" width="76.1%"></a> <a href="https://8bsite.github.io/stonemason-website-template/"><img src="previews/phone.png" alt="Stonemason website template: first screen on a phone" width="21.9%"></a>

<p align="center"><a href="https://8bsite.github.io/stonemason-website-template/"><img src="previews/scroll.gif" alt="Stonemason website template: scrolling through the first sections" width="40%"></a><br><sub>Scroll animation</sub></p>

## Use it with Claude Code, Cursor or Codex

Download the four files into your project folder (`curl.exe` in Windows PowerShell):

```bash
curl -LO https://raw.githubusercontent.com/8bsite/stonemason-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/stonemason-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/stonemason-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/stonemason-website-template/main/CREDITS.md
```

Then fill in the angle brackets and give your agent this prompt:

```text
Read AGENTS.md, then edit index.html. Make this the site for <my stonemasonry yard: name, town, trades, stones cut, how a job runs, team and roles, recent jobs, lettering prices, area covered, hours, phone, email, company number>. Replace first the name, Corsham details, stones, masons, jobs, prices and client quotes. Keep the ids and classes AGENTS.md lists, the gate script, the data-8b attributes, three trade panels, the SVG mark paths and the footer wordmark's len; add no animation library. Never invent prices, licences, quotes or contacts; ask me.
```

Give the agent the facts only the yard has: stones, areas covered, prices, hours, team names, jobs, company number and client quotes. It should replace the name in the bar, the footer wordmark and the copyright line, change both wordmark halves together with the len number, and swap the 17 stock photos. Each mason mark is an SVG path drawn on scroll, so it stays a path. Vibe coding with Claude Code or Cursor suits a single file.

No agent? Click **[Use this template](https://github.com/new?template_name=stonemason-website-template&template_owner=8bsite)**, edit `index.html` on GitHub and turn on **Settings > Pages**.

## Sections and motion

- **Navigation**: floating bar: mark and wordmark, a Menu button, a Book a site visit button and a Call the yard link; a full-screen menu of ten numbered links. The bar hides when you scroll down past 140 px and returns on scroll up; the full-screen menu pauses the smooth wheel while open.
- **Stone is cut once. We take our time over the cut.**: first screen: h1, intro, two actions, three facts with icons, and a photo of a squared stone slab. On load the heading rises out of a clip, the text blocks fade up in turn and the slab photo settles; nothing moves on scroll.
- **Three trades at one banker**: three trade panels that stack like blocks, each with a photo, a badge, a title, a paragraph, four jobs and a link (demo: repair and repointing, ashlar and steps, lettering and ornament). Each panel sticks and the next slides over it, while the covered card shrinks to 90% and darkens and the arriving photo settles from a closer crop.
- **Five stones on the banker this year**: five stones as courses of a wall: photo, name, origin and a line (demo: Bath stone, Portland, York stone, Ham stone, Welsh slate) and a note on other stones. Each row slides in as it crosses the screen, the photo and the card from opposite sides, and the photo shrinks from a larger scale.
- **From the bed to the wall**: a photo of rough stone blocks whose frame is cut step by step, beside four numbered process steps (demo: survey, sawing, working, signing and setting). As the four steps are read, the photo's frame goes from a rough outline to a sawn square, a moulded profile and the full block, and the mark draws stroke by stroke at the end.
- **Seven masons, seven marks**: seven masons as rows with a drawn mark, name, role and a line (demo: Tom Hearn, Ellie Pratt, Dan Okafor, Martha Vowles, Sam Beddoe, Ruth Allard, Josh Tanner). Each mason's mark draws stroke by stroke as its row arrives.
- **Recent work**: horizontal track, held on screen, of four jobs with photo, badge, title, a paragraph and a year, stone and client line (demo: a Georgian terrace, a church tower, a garden arch, a boundary wall). The stage is held on screen (CSS sticky) while the four job cards slide sideways, each photo opening from a cropped frame to its full size.
- **Letters cut by hand**: an inscription held on screen, of three lines cut line by line, then a heading, a paragraph, three prices and a button (demo: house names from £380, memorials from £1,450, inscriptions by the letter). The three-line inscription is held on screen while ruled guides cross each line and its letters go from thin and pale to heavy and green.
- **Lime, never cement**: a photo of hands with lime powder beside a heading, a paragraph, a lime versus cement comparison and a closing paragraph. The photo drops in with a slight turn and settles when it arrives.
- **What clients say once the scaffold comes down**: three client quotes on glass panes over a photo of an old stone wall. The wall photo drifts and zooms out while each quote pane climbs at its own speed and turns level.
- **Asked on site**: six questions and answers as native &lt;details&gt; rows with a plus icon (demo: listed buildings, travel, matching stone, memorial timing, cement, site visit cost). Each question row drops in and settles when it arrives; the plus turns to a cross when a row opens.
- **Bring us the stone, or the problem.**: a two-line heading, yard details (address, phone, email, hours) and an enquiry form over a quarry photo. The two heading lines slide in from opposite sides and the quarry photo behind the form climbs and settles.
- **Footer**: large split wordmark, a drawn mark, a short description, the yard details, contacts, page links and the copyright line with the company number. The footer mark draws stroke by stroke when it arrives.

## Design

![#e7e7e5](https://img.shields.io/badge/-%23e7e7e5-e7e7e5?style=flat-square) light panels (trades, process, recent work, lime, questions, footer), text on the dark sections, the logo and call pills, the stone cards  
![#151614](https://img.shields.io/badge/-%23151614-151614?style=flat-square) text on light panels, the dark buttons, the pill around Menu and Book a site visit  
![#0e100e](https://img.shields.io/badge/-%230e100e-0e100e?style=flat-square) page background, the opening, the full-screen menu and the shade over the clients photo  
![#d9dcc4](https://img.shields.io/badge/-%23d9dcc4-d9dcc4?style=flat-square) pale stone green: the filled buttons, the Menu button, the mason marks, the lettering prices and inscription, the second contact heading line, button hover fills  
![#555753](https://img.shields.io/badge/-%23555753-555753?style=flat-square) grey text on light panels: leads, labels, step text, job detail lines  
![#a2a69d](https://img.shields.io/badge/-%23a2a69d-a2a69d?style=flat-square) muted text and hairlines on the dark sections, the scratched colour of the inscription before it is cut  
![#fafaf8](https://img.shields.io/badge/-%23fafaf8-fafaf8?style=flat-square) trade cards, badges, the frosted quote panes and form, the lime comparison card, the hover fill of the filled button  
![#b39a7f](https://img.shields.io/badge/-%23b39a7f-b39a7f?style=flat-square) tan: the three small icons under the opening text and the mark on the process photo

**Host Grotesk**: headings (medium weight, tight tracking), body text, labels, buttons and the footer wordmark; one variable font from Google Fonts. **Source Serif 4**: serif for the three-line lettering inscription (uppercase, wide tracking, weight animated on scroll) and the three client quotes; one variable font from Google Fonts (Google Fonts). A near-black ground with large light-grey panels, 28px corners and a 10px gap, alternating light panels (trades, process, recent work, lime, questions, footer) with open dark sections (opening, stones, masons, lettering, clients, contact). Headings are huge, tight grotesk. Most sections split into two columns. Stones are courses of a wall: a photo and a light card whose widths change from row to row. Masons are ruled rows, each with a drawn mark. A wordmark fills the footer.

## Questions

**Does the enquiry form send anything?**  
No. It checks the required fields, clears itself and shows a thank-you line, but sends nothing until you connect Formspree or Netlify Forms, or delete the form and its script. The phone and email links hold placeholder numbers. The Book a site visit buttons only jump to the form.

**Can I get a site like this without editing code?**  
Yes, with [8B's AI website builder](https://8b.com/). You describe the site in a sentence and it designs a new one, not this template. Designing and restyling are free. Publishing with hosting and SSL, full HTML export and AI edits in chat are on Pro at $9 a month billed yearly. It also runs inside Claude and ChatGPT through the 8B connector.

**What does it show in Firefox or with reduced motion?**  
It reads in full. Without CSS scroll-driven animations (Firefox today) or with reduced motion, the trade panels follow one another, the opening and the inscription appear finished, marks are already drawn, recent work is a sideways-scrolling row and the wheel scrolls natively. The bar still hides on scroll. Without JavaScript the Menu button does nothing and the form sends nothing.

## Is it the right base?

This is the right base for a yard with several trades, a named team and a record of finished jobs. A general builder who mostly quotes extensions will find the [renovation contractor](https://8b.com/templates/ashlar/) template closer. This build keeps the look and scroll behaviour with no animation library or script from a CDN: 28 KB of code gzipped against 76 KB and four more requests for the GSAP version. The weak spot is the recent work track, held for over a screen of scrolling on a phone.

## Before you publish

- Replace what is marked `data-8b-placeholder` (social preview image, favicon, phone, email, form) and the invented demo facts; [AGENTS.md](AGENTS.md) lists them.
- The form sends nothing yet: connect it to Formspree or Netlify Forms, or remove it.

## Tech

No JavaScript libraries: CSS scroll-driven animations and a small inline motion script with its own smooth wheel scrolling, 114 KB, no build step. Chrome and Edge 111+, Safari 16.2+, Firefox 113+ (it uses color-mix(), cascade layers, small/dynamic viewport units). Without scroll-driven animations (Firefox today) the scroll motion and the smooth wheel are off and each section shows its finished layout (a load-in or a loop may still play); with "reduce motion" on, the page is complete and nothing moves on its own (hover effects stay).

A GSAP build of the same page is [`index.gsap.html`](index.gsap.html): GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.27 from jsDelivr, 100 KB; its scroll motion also plays in Firefox. Use one of the two files.

## License

MIT, see [LICENSE](LICENSE). Photos, fonts and libraries keep their own licences: [CREDITS.md](CREDITS.md). More free templates: [8b.com/templates](https://8b.com/templates/) · [github.com/8bsite](https://github.com/8bsite).
