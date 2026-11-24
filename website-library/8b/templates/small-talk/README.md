# Free HTML language course website template with scroll animations and no libraries

This language course website template is a free one-page HTML site for a school that teaches adults in small evening groups: six syllabus cards, six languages with times, four teachers, a level finder, three fees and a trial form, in navy and pink with torn-paper photo stickers. Its scroll motion is CSS, with no JavaScript library.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE) ![one HTML file: no build](https://img.shields.io/badge/one%20HTML%20file-no%20build-orange) ![dependencies: none](https://img.shields.io/badge/dependencies-none-brightgreen)

**[Live demo](https://8bsite.github.io/language-course-website-template/)** · **[Use this template](https://github.com/new?template_name=language-course-website-template&template_owner=8bsite)** · **[Download ZIP](https://github.com/8bsite/language-course-website-template/archive/refs/heads/main.zip)** · **[Template page on 8b.com](https://8b.com/templates/small-talk/)**

<a href="https://8bsite.github.io/language-course-website-template/"><img src="previews/desktop.png" alt="Language course website template: first screen on a desktop" width="76.1%"></a> <a href="https://8bsite.github.io/language-course-website-template/"><img src="previews/phone.png" alt="Language course website template: first screen on a phone" width="21.9%"></a>

<p align="center"><a href="https://8bsite.github.io/language-course-website-template/"><img src="previews/scroll.gif" alt="Language course website template: scrolling through the first sections" width="40%"></a><br><sub>Scroll animation</sub></p>

## Use it with Claude Code, Cursor or Codex

Download the four files into your project folder (`curl.exe` in Windows PowerShell):

```bash
curl -LO https://raw.githubusercontent.com/8bsite/language-course-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/language-course-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/language-course-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/language-course-website-template/main/CREDITS.md
```

Then fill in the angle brackets and give your agent this prompt:

```text
Read AGENTS.md, then edit index.html. Turn it into the site for <my school: name, city and address, languages or subjects, levels, lesson days and times, term dates, teachers, clubs or trips, fees and refund terms, how people book a trial>. Replace the brand name with its --len, the languages, times, fees and teachers first. Keep the gate script in the head, the data-8b-section, data-8b-motion and data-8b-items attributes, four student notes and three level questions; add no animation library. Never invent prices, dates, teacher bios, refunds or contacts; ask me.
```

Start with the six languages and their times, the three fees, the four teachers, the clubs, the trips and the contact block. Rename the brand and update the wordmark's --len, which sizes the first-screen wordmark. As a language course website template for Claude Code, Cursor or Codex, vibe coding goes fastest when you supply refund terms, hours and teacher bios yourself, then [start Claude Code in the folder](https://8b.com/templates/for-claude-code/). Replace the stock teacher portraits with your own staff.

No agent? Click **[Use this template](https://github.com/new?template_name=language-course-website-template&template_owner=8bsite)**, edit `index.html` on GitHub and turn on **Settings > Pages**.

## Sections and motion

- **Navigation**: fixed bar: pink wordmark, Free trial button and a menu button; full-screen menu with seven links, address and phone; hides on scroll down. The bar slides up out of view while you scroll down and returns on the way up, and the full-screen menu opens from a button and closes on Escape while the smooth wheel scrolling pauses.
- **Small Talk**: two screens: giant wordmark, a torn portrait sticker with a bubble, a term tape and intro with two buttons; then a statement surrounded by eight greeting bubbles. On load the wordmark rises, the portrait lands and the tape and intro slide in, then scrolling lifts the torn cap off the portrait, tilts the portrait and bursts eight bubbles around the statement, whose words light up one by one.
- **The syllabus is your Tuesday**: six week cards with a photo, week badge, situation and a phrase in the language, on a 3 by 2 plan. As the plan scrolls in, six photos fly from scattered sizes and turns onto their slots with corners pressed flat, and the heading lines rise.
- **Six languages around one table**: six large language names, each with a greeting bubble, levels and lesson times. A divider is drawn across each row and each greeting bubble is slapped on with a turn when it arrives.
- **Who’s talking? Our teachers**: four teacher stickers behind name bars, each with a hello bubble and a short bio. Each teacher pops up out of the name bar turning upright, one after another, and the hello bubble pops in after them.
- **After class Where’s everyone?**: four dated event rows: supper club, film night, market walk, pub quiz. The heading lines rise and a hairline is drawn across each of the four event rows.
- **Overheard in class**: four student quotes on torn notes, ripped off a pad one after another (pinned screen). The screen pins for about two and a half screens of scroll while four notes are ripped off a pink pad, lifted with a turn and set in their places.
- **Weekends abroad Say it where they say it**: four postcards (Lisbon, Lyon, Osaka, Oaxaca) that travel sideways on a pinned pink screen, each stamped with a greeting. The screen pins while the four postcards travel sideways for as far as the track overflows, and each postmark is stamped on as its card comes into view.
- **Not sure where to start?**: a three-question chat with reply buttons that suggests a group. Each reply you click sets a score, and the sum of three answers decides which group bubble shows; the question bubbles are slapped on as they arrive.
- **Fees with no small print**: three plans and a note called The small print, at full size. The small print starts as a tiny turned scrap and grows to a readable note as it scrolls in, and each price is slapped on with a turn.
- **Say hello in any language**: address, hours, phone, email, a room photo and a free-trial booking form. The heading lines rise and the room photo is slapped on with a turn.
- **Footer**: a grinning face peeking in with a bubble, six links, copyright with the Design: 8B credit, phone, email, Privacy. The face rises into the footer turning, then its bubble pops in.

## Design

![#1d2440](https://img.shields.io/badge/-%231d2440-1d2440?style=flat-square) navy ground of the opening, syllabus, languages, voices, level and contact sections, and the dark text on pink and cream  
![#f9fcf4](https://img.shields.io/badge/-%23f9fcf4-f9fcf4?style=flat-square) body text on navy, the fees ground, sticker rims, quote notes, cream buttons and the second kind of bubble  
![#ff9bb4](https://img.shields.io/badge/-%23ff9bb4-ff9bb4?style=flat-square) the accent: wordmark, heading accent words, bubbles, badge, trips ground, teacher name bars, club dates, the small-print note, button sweep and focus ring  
![#2b2b2b](https://img.shields.io/badge/-%232b2b2b-2b2b2b?style=flat-square) charcoal ground of the teachers and after-class sections  
![#a7b0d6](https://img.shields.io/badge/-%23a7b0d6-a7b0d6?style=flat-square) lead paragraphs, captions, teacher bios and club texts on navy or charcoal  
![#6f7ba9](https://img.shields.io/badge/-%236f7ba9-6f7ba9?style=flat-square) hairlines between rows, form field borders, menu and footer link dividers, the peeled corner's shade  
![#151b33](https://img.shields.io/badge/-%23151b33-151b33?style=flat-square) deep navy of the full-screen menu, the contact form panel, field fills and the footer

**Schibsted Grotesk**: the only typeface, as a variable font from 400 to 800: weight 800 with tight tracking for the wordmark, headings and prices, 700 for statements and titles, 500 to 600 for leads and bubbles, 400 for body text (Google Fonts). A giant wordmark fills the width of the first screen, with a tilted tape, a torn portrait sticker and the intro around it. Several sections pair a heavy heading on the left with a short lead on the right, then a list: cards, rows with hairline rules, name bars or plans. Photos get torn edges or a peeled corner, bubbles carry greetings in six languages, and the ground shifts from navy to charcoal, pink and cream.

## Questions

**Is this a language school website template free for commercial use?**  
Yes. It is a single index.html, a [whole school on one scroll](https://8b.com/templates/one-page/), under the MIT license, so a school, a freelancer or an agency can use it at no cost. It needs no GSAP, Lenis or other library and no build step. The photos come from Unsplash and the typeface, Schibsted Grotesk, is under the Open Font License.

**Can students book a trial lesson on the page?**  
Not yet. Every trial button jumps to the contact form, which requires a name and an email, shows a thank-you line and clears itself without sending anything. Connect Formspree or Netlify Forms with the steps in AGENTS.md, or point the buttons at your booking system, and rewrite the thank-you line, which promises a call within a day.

**Can I get a language school site like this without editing code?**  
Yes, with [8B's AI website builder](https://8b.com/): describe your school in a sentence and its engine designs a new site, not this template. Designing and restyling are free. Publishing with hosting and SSL, full HTML export and AI edits in chat are on Pro, $9 a month billed yearly. It also runs inside Claude and ChatGPT through the 8B connector.

## Is it the right base?

Choose it for a school with groups, terms and a talkative brand. This build moves on CSS with no animation library and no script from a CDN: about 30 KB of code gzipped in one file, against 76 KB and four extra requests for the GSAP version. A plainer site is closer in the [white template with coloured panels](https://8b.com/templates/saylo/). Weak spots: one page, no course catalogue or student login, a form that sends nothing yet, and a twelve-week syllabus beside ten-week courses.

## Before you publish

- Replace what is marked `data-8b-placeholder` (social preview image, favicon, phone, form, email) and the invented demo facts; [AGENTS.md](AGENTS.md) lists them.
- The form sends nothing yet: connect it to Formspree or Netlify Forms, or remove it.

## Tech

No JavaScript libraries: CSS scroll-driven animations and a small inline motion script with its own smooth wheel scrolling, 114 KB, no build step. Chrome and Edge 111+, Safari 16.2+, Firefox 113+ (it uses color-mix(), container query units, cascade layers, small/dynamic viewport units). Without scroll-driven animations (Firefox today) the scroll motion and the smooth wheel are off and each section shows its finished layout (a load-in or a loop may still play); with "reduce motion" on, the page is complete and nothing moves on its own (hover effects stay).

A GSAP build of the same page is [`index.gsap.html`](index.gsap.html): GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.4 from jsDelivr, 99 KB; its scroll motion also plays in Firefox. Use one of the two files.

## License

MIT, see [LICENSE](LICENSE). Photos, fonts and libraries keep their own licences: [CREDITS.md](CREDITS.md). More free templates: [8b.com/templates](https://8b.com/templates/) · [github.com/8bsite](https://github.com/8bsite).
