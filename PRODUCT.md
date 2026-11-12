# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro, static output, deployed to GitHub Pages through the existing Actions workflow (replacing VitePress). Content that changes every season (teams, schedule, sponsors, links, dates) lives in data files the volunteer team can edit without touching layout code.

## Users

- **FTC teams deciding whether to apply, then preparing to compete**: students, coaches, and mentors, mostly Pacific Northwest, some traveling from other states and countries. Before acceptance they want to know what the event is and how to apply. After acceptance they come back for logistics: schedule, load-in, pit rules, payment, the team packet, quick links on event day.
- **Volunteers** signing up and preparing for their roles.
- **Sponsors** evaluating whether to back the event.
- **Families and fans** looking for the livestream, the schedule, and the venue.

## Product Purpose

West Coast Invitational (WCI) is an annual offseason FIRST Tech Challenge competition. It exists to let teams show their full potential and what they built this season, at a fun but competitive event. The site has to make WCI feel like the event of the summer, get the right teams to apply, and carry every logistics detail so organizers aren't answering the same questions over Discord.

## Positioning

An offseason invitational run by the community, styled after the big international FTC offseason events (Canadian events, FTC Premier Event EU, Bordie Blast): a countdown, a festival-scale feel, and extras (socials, workshops, theme days, photo booth) that a regular league meet doesn't have.

## Operating Context

- 2027 event: **July 10–11, 2027**, Foss High School, 2112 S Tyler St, Tacoma, WA 98405.
- Season: 2026–27 FTC game **BIOBUZZ**. Standard season format: qualification matches, alliance selection, double-elimination playoffs, awards. One competition field plus a practice field.
- Rolling applications through a Google Form. Accepted teams pay $50 by email invoice through a secure processor; extra robots are $35 each, if space allows. WCI never asks for card details over Discord, email, or phone.
- All matches are livestreamed on the WCI YouTube channel.
- Existing redirect routes are linked externally and must keep working: `/apply`, `/volunteer`, `/board`, `/discord`, `/stream` (driven by `public/constants.js`).

## Capabilities and Constraints

- Static site only, no backend. Forms are Google Forms; payment goes through an external processor.
- Required information architecture comes from the "[2027] Website Must Haves" doc: Overview (about, sponsors, countdown), Event Details, Team Info, Volunteers, Sponsors, Travel, Extras, Meet the Teams, Contact.
- Undecided or not-yet-available (show as "announcing soon", never invent): application deadline, refund policy details, sponsors, food trucks and pizza pre-orders, hotels and attractions, workshops, team and volunteer info packets, competition manual, judging and match schedules, merch, Google Voice number, the 2027 team list, special awards.

## Brand Commitments

- Name: West Coast Invitational, short form WCI.
- Logo: use the WCI '27 logo (`site/src/assets/wci-27-white.svg`, white wordmark for dark backgrounds; `wci-27.svg` is the black original). Don't redraw it or change the sunset colors.
- Voice: friendly, a little hype, community-run. Copyright line credits "the WCI team".
- Contact: westcoastinvitationalftc@gmail.com · YouTube @WestCoastInvitational · Instagram @west.coast.invitational · Discord.

## Evidence on Hand

- ~105 photos from WCI '25 (Hazen High School, INTO THE DEEP season) in Google Drive: wide gym shots of the field, emcees on mic, robots with team numbers up close, crowds in the pits. These are from a different venue than 2027.
- 2026 team list with logos (`root/teamlist.md`, `root/public/assets/logos/`).
- Tentative 2027 schedule, format, payment, and awards copy (`root/about.md`, `root/awards.md`).
- Nearest ER: MultiCare Allenmore Hospital, 1901 S Union Ave, Tacoma, WA 98405. Nearest urgent care: Franciscan Urgent Care at St. Joseph, 1812 S J St Suite 120, Tacoma, WA 98405.
- No testimonials, attendance numbers, or sponsor list exist. Do not invent them.

## Product Principles

1. **Hype up front, answers underneath.** The first viewport sells the event; every logistics answer is two clicks away at most.
2. **Real over invented.** Unknown details say "announcing soon". Never fill a gap with a made-up sponsor, hotel, or number.
3. **Editable by whoever runs it next year.** Season facts live in data, not markup.
4. **Event day on a phone.** Quick links, schedule, and venue maps have to work one-handed in a loud gym.

## Accessibility & Inclusion

WCAG 2.2 AA. Many visitors are students on phones; international teams may be reading in a second language, so keep copy plain. Respect reduced-motion preferences on any festival-scale animation.
