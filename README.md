# Aaryan Kathole — personal homepage

A three-page static homepage built with vanilla HTML5, CSS3 and ES6 modules. No
frameworks, no component libraries, no build step.

**Author:** Aaryan Nilesh Kathole
**Live site:** https://Aaryan0111.github.io/project-1-my-homepage/
**Class:** CS 5610 Web Development, Northeastern University

<!-- TODO: replace the class line above with your course number and the Canvas link. -->

![The home page, showing the hero with an availability note and three highlight cards](docs/screenshots/home.png)

![A project shown as a recipe card, with ingredients, method and yield columns](docs/screenshots/recipe-card.png)

<!-- TODO: retake both screenshots in your own browser after deploying, so the web fonts render. -->

## Project objective

Build a personal homepage that works as a professional front door: somewhere a
recruiter, a hiring manager or a collaborator can land and understand within a
minute what I do, what I have shipped, and how to reach me.

The site has three pages:

| Page | File | What it is |
| --- | --- | --- |
| Home | `index.html` | Who I am, availability, three headline achievements |
| Work | `work.html` | Projects, skills, education and experience |
| More | `more.html` | Travel, films and food — **AI-generated** |

## Original component

The work page presents each project as a **recipe card**: Ingredients (the
stack), Method (what I actually did, in order) and Yield (the outcome, with the
number or registration ID behind it). A toggle switches every card between this
recipe view and a dense spec view.

Both views render from one data structure in `js/data/projects.js`, so they can
never drift apart. The recipe view is also present as plain HTML in `work.html`,
so the page stays readable with JavaScript disabled; `js/projects-view.js`
replaces it on load and enables the toggle.

## Build and run

Prerequisites: [Node.js](https://nodejs.org) 18 or newer, and Git.

```bash
git clone https://github.com/Aaryan0111/project-1-my-homepage.git
cd project-1-my-homepage
npm install
npm start
```

`npm start` serves the site at http://localhost:8080 and opens it.

There is no build step — the browser loads the ES6 modules directly. A local
server is still required, because ES6 modules do not load over the `file://`
protocol.

### Checks

```bash
npm run lint          # ESLint, should report zero problems
npm run format:check  # Prettier, should report no changes needed
npm run format        # Prettier, rewrites files in place
```

HTML is validated at https://validator.w3.org.

## Project structure

```
.
├── index.html            Home
├── work.html             Work
├── more.html           More (AI-generated)
├── css/
│   └── style.css         Single stylesheet, organised by section
├── js/
│   ├── main.js           Entry point
│   ├── nav.js            Mobile navigation
│   ├── projects-view.js  Recipe/spec rendering and toggle
│   └── data/
│       └── projects.js   Project data
├── images/               Images and favicon
├── files/                Resume PDF
├── docs/
│   ├── DESIGN.md         Design document
│   └── mockups/          Wireframes
├── package.json
├── eslint.config.js
├── .prettierrc
└── LICENSE
```

## Design document

The full design document — project description, user personas, user stories and
mockups — is at [`docs/DESIGN.md`](docs/DESIGN.md).

## Use of generative AI

This section covers **`more.html` only**. The home and work pages are written
by hand.

| | |
| --- | --- |
| **Model** | Claude Sonnet 4.5 (`claude-sonnet-4-5`), via claude.ai |
| **Date used** | September 2026 |
| **Scope** | Draft body copy for `more.html` |

### How it was used

I asked the model to draft the reading, watching, and cooking and travel sections
of the More page, given the places I have travelled, the films I watch and the food I eat. I
then reviewed every entry, removed the ones that did not reflect things I have
actually read, watched or cooked, and rewrote the notes in my own words where the
draft was generic.

The model did not write the HTML structure, the CSS or any JavaScript on this
page — those are hand-written and shared with the other two pages.

### Prompts used

1. *"Draft copy for a personal homepage page called More, with three sections:
   travel, watching, and food. Each card needs a title, a byline, and a short
   personal note. Clean, plain, no marketing voice."*
2. *"The notes read like blurbs. Rewrite them so each one says something specific
   that only someone who had actually read or watched it would say."*

### What I changed afterwards

<!-- TODO: fill this in honestly after you edit the page. Example entries: -->

- Supplied the actual content: the eight US states, the countries I have
  visited, the films I watch and the cuisines I eat. The model wrote it up.
- Cut the reading section entirely, since I do not read much.
- Reviewed every note and removed anything that did not reflect me.

## License

MIT — see [LICENSE](LICENSE).
