import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
	loader: glob({
		pattern: '**/*.md',
		base: './src/content/articles',
		// Each article lives in its own folder (e.g.
		// articles/2026_07/some-headline/index.md, grouped by year_month purely
		// for author-side tidiness, with any image alongside it). The id/slug is
		// just the article's own folder name — the year_month grouping folder is
		// never part of the public URL.
		generateId: ({ entry }) => {
			const withoutExt = entry.replace(/\.md$/, '');
			const withoutIndex = withoutExt.endsWith('/index')
				? withoutExt.slice(0, -'/index'.length)
				: withoutExt;
			const segments = withoutIndex.split('/');
			return segments[segments.length - 1];
		},
	}),
	schema: ({ image }) =>
		z.object({
			// Headline shown on the home page, archive pages, and the article page.
			title: z.string(),
			// Section tag shown above the headline, e.g. "Science" or "Business".
			category: z.string().default('Satire'),
			// Publication date. Drives sort order and which Year/Month nav tab the article appears under.
			date: z.date(),
			// Short teaser shown on the home page and archive pages. Falls back to the
			// start of the article body if omitted.
			excerpt: z.string().optional(),
			// Optional lead image, resolved relative to this article's file.
			image: image().optional(),
			imageAlt: z.string().optional(),
			imageCaption: z.string().optional(),
			// Byline, e.g. "Staff Writer" or a fictional reporter name.
			author: z.string().optional(),
			// Set true to keep working on an article without publishing it.
			draft: z.boolean().default(false),
			// Feature this article in the centered hero slot on the home page, for
			// whichever month it belongs to. If more than one article in the same
			// month is marked main, the one with the highest `order` (then most
			// recent date) is featured; the rest render as normal cards.
			main: z.boolean().default(false),
			// Breaks ties among articles in the same year+month — higher numbers sort
			// higher on the page. Has no effect across different months (chronological
			// month grouping always wins). Ties fall back to date, then id.
			order: z.number().default(0),
		}),
});

export const collections = { articles };
