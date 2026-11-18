# Free HTML trampoline park website template with scroll animations and no libraries

Trampoline park website template: a one-page site for an indoor venue that sells sessions, passes and birthday parties, with zones, a timetable, a party route, a café, a league table and a booking form. The look is cream, red and yellow with wavy edges and big condensed type. Its scroll motion runs on CSS with no JavaScript libraries, in one HTML file with an AGENTS.md, so an AI agent can adapt it to your park.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE) ![one HTML file: no build](https://img.shields.io/badge/one%20HTML%20file-no%20build-orange) ![dependencies: none](https://img.shields.io/badge/dependencies-none-brightgreen)

**[Live demo](https://8bsite.github.io/trampoline-park-website-template/)** · **[Use this template](https://github.com/new?template_name=trampoline-park-website-template&template_owner=8bsite)** · **[Download ZIP](https://github.com/8bsite/trampoline-park-website-template/archive/refs/heads/main.zip)** · **[Template page on 8b.com](https://8b.com/templates/hopla/)**

<a href="https://8bsite.github.io/trampoline-park-website-template/"><img src="previews/desktop.png" alt="Trampoline park website template: first screen on a desktop" width="76.1%"></a> <a href="https://8bsite.github.io/trampoline-park-website-template/"><img src="previews/phone.png" alt="Trampoline park website template: first screen on a phone" width="21.9%"></a>

<p align="center"><a href="https://8bsite.github.io/trampoline-park-website-template/"><img src="previews/scroll.gif" alt="Trampoline park website template: scrolling through the first sections" width="40%"></a><br><sub>Scroll animation</sub></p>

## Use it with Claude Code, Cursor or Codex

Download the four files into your project folder (`curl.exe` in Windows PowerShell):

```bash
curl -LO https://raw.githubusercontent.com/8bsite/trampoline-park-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/trampoline-park-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/trampoline-park-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/trampoline-park-website-template/main/CREDITS.md
```

Then fill in the angle brackets and give your agent this prompt:

```text
Read AGENTS.md, then edit index.html. Turn this template into the site for <my venue: city and address, zones with age limits, sessions with days and times, pass prices, the party offer, café menu, safety rules, opening hours, how guests book>. Replace the venue name, zones, sessions and passes first. Keep a --len number matching the headline word and the footer wordmark. Motion is CSS scroll-driven animation plus the inline kit: keep the gate script in the head, the section ids, the data-8b-section and data-8b-motion attributes and the classes AGENTS.md lists; add no animation library. Ask me for missing facts; never invent prices, hours, addresses, safety rules, reviews or contacts.
```

If you vibe code a trampoline park website template for Claude Code, Cursor or Codex, start with the facts only the venue can supply: name, address, opening hours, session times with age limits, pass prices, the party offer, the café menu and the safety rules. The demo's rules, waiver, parking and league times are invented. The opening fan's three card positions are set in its CSS, and the timetable's colour run reads the --color variables by name, so change their values, not their names. The league's slide from last week's order is written in its CSS row by row: when that order changes, the agent rewrites those offsets; the data-week numbers are not read by the motion.

No agent? Click **[Use this template](https://github.com/new?template_name=trampoline-park-website-template&template_owner=8bsite)**, edit `index.html` on GitHub and turn on **Settings > Pages**.

## Sections and motion

- **Navigation**: fixed top bar: wordmark, Book button, Menu button opening a full-screen link overlay with contacts.
- **Bounce at Hopla, the trampoline park in Sheffield**: first screen: one giant word with a photo of a jumper in front, wordmark, two stickers, two short texts; then a red panel with heading, button and three tilted photos. Smooth wheel scrolling with a mouse; wavy edges wobble and stickers slap on page-wide. As the red panel rises over the held first screen, the jumper lands on its edge, which sags and flings them off spinning.
- **One roof, six ways off the ground**: list of six activity zones in a zig-zag: big name, one line, age sticker, round photo (demo: trampoline zones). Tied to scroll, each round photo hops along an arc from the zone above and squashes as it lands.
- **The best bit is the middle**: full-width photo with a two-line statement held on screen while you scroll. The photo stays in place and zooms out while the two heading lines rise at different speeds, tied to scroll.
- **One shed, five crowds**: timetable of five sessions as tickets: time, name, text, ages, photo (ground turns from morning yellow to night). As you scroll the timetable, the ground shifts from morning yellow through amber and red to night black, and the Glow Night ticket lights up.
- **Birthday parties, sorted**: birthday parties: heading, text, price line, button, and a five-step route with numbered tilted photos. Tied to scroll, a red ball hops along the dashed route from photo to photo, drawing a trail; each photo bumps as it lands.
- **The Landing**: on-site café: wide photo, round coffee photo, sticker, text, short price list.
- **Ninja Wall League**: ranking table of six results on a dark field, with heading, text, entry link and photo (demo: ninja wall times). Rows start in last Sunday's order and slide into this week's ranking as you scroll the table into view.
- **House rules, short version**: red wall of five tilted rule stickers and one photo (house rules).
- **Pick a pass**: five ticket-shaped passes with name, price and one line, plus two buttons. On screens wider than 700 px the five passes start fanned in a stack like a hand of cards and deal out into place as you scroll; on phones each pass slides down off the one above.
- **Asked a lot**: questions and answers (native &lt;details&gt;) next to a heading and a phone line. A big red question mark hops down the list from question to question as you scroll, squashing on each.
- **Come and jump**: address, opening hours, phone, email, directions and a booking request form (placeholders).
- **Footer**: links, address and phone, copyright with the Design: 8B credit, a giant outlined HOPLA wordmark with three round photos. The giant outlined wordmark drops in letter by letter, squashing on landing, while three round photos bounce into place.

## Design

![#f5e3cd](https://img.shields.io/badge/-%23f5e3cd-f5e3cd?style=flat-square) cream page background  
![#e2130f](https://img.shields.io/badge/-%23e2130f-e2130f?style=flat-square) red headings, buttons and red bands  
![#1b1b1b](https://img.shields.io/badge/-%231b1b1b-1b1b1b?style=flat-square) text and the dark league band  
![#ffd750](https://img.shields.io/badge/-%23ffd750-ffd750?style=flat-square) yellow stickers and yellow bands  
![#f4a804](https://img.shields.io/badge/-%23f4a804-f4a804?style=flat-square) amber party route and timetable shade  
![#ffffff](https://img.shields.io/badge/-%23ffffff-ffffff?style=flat-square) white outlines on headings, photo frames, ticket cards and rule stickers

**Bricolage Grotesque**: headings, buttons and pass prices: condensed, extra bold, uppercase; the opening word, the zones heading and the footer wordmark are red with a white outline. **Playpen Sans**: wordmark and sticker pills: rounded and hand-drawn. **Rethink Sans**: body text, session times and labels (Google Fonts). Each band opens with a wavy edge like a slack trampoline bed and switches colour: cream, red, yellow, black. Headings are huge and several carry a white outline. Photos sit in round discs or tilted white frames, sessions and passes are cut like tickets with dashed tear lines, and pill stickers sit at an angle.

## Questions

**Does the booking form send requests?**  
No. The Ask for a slot form checks the name, email, date and number of jumpers, shows a thank-you line and clears itself, but sends nothing. Connect Formspree or Netlify Forms, or remove the form together with its script and keep the email link. AGENTS.md has the steps. Also edit the promise to reply within the hour.

**Is this trampoline park template only for trampoline parks?**  
No. The zone list, session tickets, pass cards and party route also suit a soft play centre, a ninja or climbing park or any kids' party venue. Rename the zones and sessions, change the age stickers and delete the league if you run no competitions. AGENTS.md lists what to remove with a section.

**How do I change the session times and prices?**  
Edit the plain text in index.html. Each session ticket holds days and times, a name, one line and an age group, and each pass card a name, a price and a line. The booking form has its own session list, the contact section its own opening hours, and the first screen an Open 7 days sticker, so check all three.

## Is it the right base?

Choose this template when families book time on equipment: a bounce centre, an indoor play centre, a ninja or climbing park, a venue that lives on birthday parties. This is the light build: the same look and the same bounces, with no animation library and no script from a CDN. Measured here, it downloads about 39 KB of code gzipped in one file; the GSAP version needs about 92 KB and five more requests. For one dated event with a lineup, the [festival](https://8b.com/templates/ondo/) template fits better. Booking is the weak spot: the Book buttons and the form have no live availability, payment or waiver tool behind them.

## Before you publish

- Replace what is marked `data-8b-placeholder` (social preview image, favicon, phone, email, form) and the invented demo facts; [AGENTS.md](AGENTS.md) lists them.
- The form sends nothing yet: connect it to Formspree or Netlify Forms, or remove it.

## Tech

No JavaScript libraries: CSS scroll-driven animations and a small inline motion script with its own smooth wheel scrolling, 153 KB, no build step. Chrome and Edge 111+, Safari 16.2+, Firefox 113+ (it uses color-mix(), cascade layers, small/dynamic viewport units). Without scroll-driven animations (Firefox today) the scroll motion and the smooth wheel are off and each section shows its finished layout, while any load-in or looping animation still plays; with "reduce motion" on, the page is complete and nothing moves on its own (hover effects stay).

A GSAP build of the same page is [`index.gsap.html`](index.gsap.html): GSAP 3.13.0, ScrollTrigger, SplitText, MotionPathPlugin, Lenis 1.3.27 from jsDelivr, 128 KB; its scroll motion also plays in Firefox. Use one of the two files.

## License

MIT, see [LICENSE](LICENSE). Photos, fonts and libraries keep their own licences: [CREDITS.md](CREDITS.md). More free templates: [8b.com/templates](https://8b.com/templates/) · [github.com/8bsite](https://github.com/8bsite).
