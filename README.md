# All The Anchorage

Satirical news, Anchorage-style. Built with [Astro](https://astro.build), deployed to GitHub Pages.

## Commands

| Command           | Action                                       |
| :----------------- | :-------------------------------------------- |
| `npm install`       | Install dependencies                          |
| `npm run dev`       | Start the local dev server at `localhost:4321`|
| `npm run build`     | Build the production site to `./dist/`        |
| `npm run preview`   | Preview the production build locally          |

## Writing an article

Each article is a folder under `src/content/articles/<year>_<month>/`, named with a
short slug — that slug becomes the article's URL. A folder needs an `index.md` with
frontmatter, and optionally an image sitting right next to it.

```
src/content/articles/2026_07/moose-toll-booth/
├── index.md
└── cover.svg   (or .jpg / .png / .webp — optional)
```

The `2026_07`-style folder (year `_` month) is purely for keeping things tidy as more
articles pile up — it has no effect on the article's URL, sort order, or which nav
tab it appears under (those are all driven by the `date` field below). Add new
month folders (`2026_08`, `2026_09`, ...) as needed. Because the URL is just the
article's own folder name, **slugs must stay unique across every month folder**, not
just within one.

`index.md` frontmatter fields:

| Field          | Required | Notes                                                                 |
| :------------- | :------- | :--------------------------------------------------------------------|
| `title`        | yes      | The headline.                                                        |
| `date`         | yes      | `YYYY-MM-DD`. Controls sort order and which Year/Month nav tab it's under. |
| `category`     | no       | Section tag shown above the headline, e.g. `Science` or `Business`. Defaults to `Satire`. |
| `excerpt`      | no       | Teaser shown on the home page and archive pages. If omitted, one is auto-generated from the start of the body. |
| `image`        | no       | Path to an image file next to this `index.md`, e.g. `./cover.jpg`.   |
| `imageAlt`     | no       | Alt text for the image. Falls back to the title.                    |
| `imageCaption` | no       | Caption shown under the image on the article page.                   |
| `author`       | no       | Byline.                                                               |
| `draft`        | no       | Set to `true` to keep an article out of all listings until you're ready. Defaults to `false`. |
| `main`         | no       | Set to `true` to feature this article in the centered hero slot on the home page (for whichever month it belongs to) and pin it to the top of archive listings. If more than one article in the same month is marked `main`, the one with the highest `order` (then most recent date) wins. Defaults to `false`. |
| `order`        | no       | Breaks ties among articles in the same year+month — higher numbers sort higher on the page. Has no effect across different months. Defaults to `0`. |

Everything after the frontmatter (`---`) is the article body, written in Markdown.

Example:

```md
---
title: "Moose Spotted Obeying Traffic Laws, City Council Alarmed"
date: 2026-03-01
excerpt: "Officials say the moose have gotten 'suspiciously good' at crosswalks."
image: ./cover.jpg
imageCaption: "The moose in question, appearing to check for oncoming traffic."
author: Field Correspondent
---

The body of the article goes here, in regular Markdown paragraphs.
```

Look at the existing folders under `src/content/articles/2026_07/` for more working
examples.

The home page shows only the most recent month that has any published articles —
its `main: true` article (if any) as a centered hero, and the rest below as cards
with headline, image, and excerpt. Each links to a full article page at
`/articles/<slug>/`. Every article ever published stays browsable by year and month
via the top nav and at `/archive/<year>/` and `/archive/<year>/<month>/`.

The **About** and **Suggestions** pages are `src/pages/about.astro` and
`src/pages/suggestions.astro` — edit the placeholder text in each whenever you're ready.

## Design

Shared layout, header/footer, and page styles live in `src/layouts/Layout.astro`,
`src/components/`, and `src/styles/global.css`. The site name and tagline are set in
`src/lib/site.ts`.

## Deploying

A GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys the site
to GitHub Pages on every push to `main`. One-time setup in the repo on GitHub:

1. Go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.

After that, pushing to `main` publishes automatically at
`https://alltheanchorage.github.io/alltheanchorage/`.

If you later move to a custom domain or rename the repo to `alltheanchorage.github.io`,
update `site` and `base` in `astro.config.mjs` to match (see the comment there).
