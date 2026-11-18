# Free HTML swimming pool website template with scroll animations and no libraries

Swimming pool website template: one free HTML file for an outdoor pool, lido or swim club with timed sessions, swim lessons, a kiosk menu and ticket prices. Saturated rounded tiles sit on a pale grey ground, with round photo windows and tilted price stickers. The scroll motion is CSS, with no JavaScript libraries, ready for Claude Code or Cursor.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE) ![one HTML file: no build](https://img.shields.io/badge/one%20HTML%20file-no%20build-orange) ![dependencies: none](https://img.shields.io/badge/dependencies-none-brightgreen)

**[Live demo](https://8bsite.github.io/swimming-pool-website-template/)** · **[Use this template](https://github.com/new?template_name=swimming-pool-website-template&template_owner=8bsite)** · **[Download ZIP](https://github.com/8bsite/swimming-pool-website-template/archive/refs/heads/main.zip)** · **[Template page on 8b.com](https://8b.com/templates/splosh/)**

<a href="https://8bsite.github.io/swimming-pool-website-template/"><img src="previews/desktop.png" alt="Swimming pool website template: first screen on a desktop" width="76.1%"></a> <a href="https://8bsite.github.io/swimming-pool-website-template/"><img src="previews/phone.png" alt="Swimming pool website template: first screen on a phone" width="21.9%"></a>

<p align="center"><a href="https://8bsite.github.io/swimming-pool-website-template/"><img src="previews/scroll.gif" alt="Swimming pool website template: scrolling through the first sections" width="40%"></a><br><sub>Scroll animation</sub></p>

## Use it with Claude Code, Cursor or Codex

Download the four files into your project folder (`curl.exe` in Windows PowerShell):

```bash
curl -LO https://raw.githubusercontent.com/8bsite/swimming-pool-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/swimming-pool-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/swimming-pool-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/swimming-pool-website-template/main/CREDITS.md
```

Then fill in the angle brackets and give your agent this prompt:

```text
Read AGENTS.md, then edit index.html. Make this the site for <my pool: name, address, session times and prices, lesson levels with fees, ticket and pass prices, kiosk menu, event dates, opening hours, charity number>. Replace first the pool name, demo history, prices and photos. Motion is CSS scroll-driven animation plus the inline motion kit: keep the gate script, section ids, data-8b attributes and listed classes; add no library. Set --len on the big word and footer wordmark. Never invent prices, hours, dates, safety rules or contacts.
```

Give Claude Code, Cursor or Codex the facts only the pool has: the session timetable, ticket and pass prices, lesson ages and fees, kiosk menu, event dates, opening hours and the charity or company number. The demo invents all of them, including the history. Replace the name, then update --len on the big word and the footer wordmark. The deck section's real heading sits in a hidden span, so change both. The agent should ask about safety rules and leave [the scroll-driven motion](https://8b.com/templates/animated/) as built.

No agent? Click **[Use this template](https://github.com/new?template_name=swimming-pool-website-template&template_owner=8bsite)**, edit `index.html` on GitHub and turn on **Settings > Pages**.

## Sections and motion

- **Navigation**: fixed bar: logo tile, white pill with six links, Book a swim button; hides on scroll down; phone menu overlay. The fixed bar hides when you scroll down and returns when you scroll up; on phones a menu button opens a full-screen overlay.
- **Fifty metres of open sky**: one blue screen: headline "Fifty metres of open sky", a paragraph, two buttons, four facts and an aerial photo with a 24 degree sticker. On load the heading lines, text, buttons, list and photo pop up in a short CSS stagger, and the heated sticker lands like a stamp as it comes into view.
- **A day in the water**: "A day in the water": five lanes, one per session, each with time, name, line and price, and a round swimmer photo on its lane. On screens at least 1000 by 680 px the section holds for about one and a tenth screens while each lane's round photo swims across it and a colour fill follows, each lane at its own pace; smaller screens run each lane as it passes.
- **Swim club**: "Swim club": four level tiles of rising height with a round photo each, a handwritten note with an arrow and a trial lesson button. As you scroll, the four steps rise from below one after another, each round photo hops in an arc to its step and the handwritten arrow draws itself.
- **The water doesn't close for winter**: "The water doesn't close for winter": green ground, a swimmer photo, a sauna photo, a short list of seasons and prices and a join button. The heading and paragraph rise, the sticker stamps in and a small spark draws its three strokes.
- **Lounge on the lawn**: "Lounge on the lawn": the giant word LOUNGE with a round deckchair photo, then three tiles with photos. The section holds for one screen while a round photo travels through the word Lounge, lifting and tilting the letters it passes, and comes to rest after the last letter.
- **The kiosk**: "The kiosk": a hot chocolate feature tile with a price sticker, a chain of four round photos and a six-line price list. Four round photos start piled on the hot chocolate photo and roll out into an overlapping chain; the price sticker stamps in and a spark draws beside the photo.
- **Since 1936**: "( Since 1936 )": a short history in a paragraph and four dated lines beside two archive photos. The heading, first line and both archive photos rise, and a spark draws beside the photos.
- **The lights go on underwater**: "The lights go on underwater": dusk ground, a glowing pool photo and three dated event tiles. The section ground runs from pool blue through deep green to night ink as it arrives, the type turns white and the photo brightens from near dark.
- **Pay as you swim, or swim all summer**: "Pay as you swim, or swim all summer": four ticket tiles with price stickers and a Book a swim button. The heading and paragraph rise, and each of the four price stickers stamps in.
- **Through the green gate**: "Through the green gate": a board of tiles (address, photo, getting here, opening hours, phone and email) and a message form. The tiles arrive scattered and tilted around the board's centre and gather into the board as it comes into view.
- **Good to know**: "Good to know": six questions as native details elements beside a heading and the phone number. The heading and the line under it rise on arrival.
- **Footer**: pool-blue footer: the wordmark with a disc for the O, brand line, eight links, address and phone, charity line with the Design: 8B credit.

## Design

![#e6e9e5](https://img.shields.io/badge/-%23e6e9e5-e6e9e5?style=flat-square) page ground, the price pills on the session lanes and the dividers between questions  
![#ffffff](https://img.shields.io/badge/-%23ffffff-ffffff?style=flat-square) white tiles, the nav pill and logo tile, form fields, lane tracks and the rings around round photos  
![#15181b](https://img.shields.io/badge/-%2315181b-15181b?style=flat-square) text, the black buttons, the events section ground, the menu overlay and the footer rule  
![#84c6e8](https://img.shields.io/badge/-%2384c6e8-84c6e8?style=flat-square) pool blue: the first-screen panel, the footer panel, blue tiles and the Ducklings step  
![#fcb64d](https://img.shields.io/badge/-%23fcb64d-fcb64d?style=flat-square) sunny yellow: tiles, the button hover fill, the nav logo disc, the question toggles and the winter sticker  
![#f6874b](https://img.shields.io/badge/-%23f6874b-f6874b?style=flat-square) orange tiles, the lane tone behind the family session, the link underline on hover and the spark beside the history photos  
![#0f5a40](https://img.shields.io/badge/-%230f5a40-0f5a40?style=flat-square) deep green: the winter panel, the tilted price stickers with yellow type and the small nav logo disc  
![#50565d](https://img.shields.io/badge/-%2350565d-50565d?style=flat-square) secondary grey text: lane descriptions, the kiosk note, the price footnote and the answers to questions

**Savate**: weight 900 in capitals: section headings, card titles, the big Lounge word, the footer wordmark and the stickers. **Google Sans**: body text, buttons, times, prices and form labels, in weights 400 to 700. **Playpen Sans**: weight 600, used once, for the handwritten note beside the trial lesson button (Google Fonts). A pale grey ground carries tiles with 30px corners in white, pool blue, yellow, orange and deep green. The first screen is one large blue panel on a 12-column grid: heading, text, buttons and a four-point list beside an aerial photo. Later sections use two-column heads, five horizontal lane bands, club steps that rise in height, a ticket row with every second ticket pushed down and a tile board with a form.

## Questions

**Is this a free swimming pool website template I can use for a club?**  
Yes. It is one index.html under the MIT license, so a lido, a swim club or a freelancer can use it at no cost. There are no JavaScript libraries, no script from a CDN and no build step; photos are Unsplash images and the fonts are under the Open Font License. CREDITS.md lists them.

**Do the Book a swim buttons and the message form work?**  
Not yet. Book a swim only scrolls to the prices or visit section, and the form checks its fields, shows a thank-you line and sends nothing. Point the buttons at your booking page and connect Formspree or Netlify Forms, or delete the form. Also edit the thank-you line, which promises an answer within two days.

**Can I get a site like this without editing code?**  
Yes, in a different way. [8B's AI website builder](https://8b.com/) designs a new site from a sentence describing the pool, and it will not be this template. Designing and restyling are free. Publishing with hosting and SSL, full HTML export and AI edits in chat need Pro at $9 a month billed yearly. It also runs inside Claude and ChatGPT.

## Is it the right base?

This is the right base for one venue that sells time slots and a few tickets at its own gate. A [training club](https://8b.com/templates/arcline/) with coaches and membership plans suits a template built around a weekly schedule. The motion needs no animation library: about 33 KB of code gzipped against 76 KB and three requests for the GSAP version. The weak spots: Book a swim buttons only jump to another section, there is no live availability, and the site is one long scroll.

## Before you publish

- Replace what is marked `data-8b-placeholder` (social preview image, favicon, phone, email, form) and the invented demo facts; [AGENTS.md](AGENTS.md) lists them.
- The form sends nothing yet: connect it to Formspree or Netlify Forms, or remove it.

## Tech

No JavaScript libraries: CSS scroll-driven animations and a small inline motion script with its own smooth wheel scrolling, 125 KB, no build step. Chrome and Edge 111+, Safari 16.2+, Firefox 113+ (it uses color-mix(), container query units, cascade layers, small/dynamic viewport units). Without scroll-driven animations (Firefox today) the scroll motion and the smooth wheel are off and each section shows its finished layout (a load-in or a loop may still play); with "reduce motion" on, the page is complete and nothing moves on its own (hover effects stay).

A GSAP build of the same page is [`index.gsap.html`](index.gsap.html): GSAP 3.13.0, ScrollTrigger, Lenis 1.3.4 from jsDelivr, 116 KB; its scroll motion also plays in Firefox. Use one of the two files.

## License

MIT, see [LICENSE](LICENSE). Photos, fonts and libraries keep their own licences: [CREDITS.md](CREDITS.md). More free templates: [8b.com/templates](https://8b.com/templates/) · [github.com/8bsite](https://github.com/8bsite).
