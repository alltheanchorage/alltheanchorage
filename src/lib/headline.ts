import type { CollectionEntry } from 'astro:content';

/** An article's headline as displayed: cartoon captions are wrapped in quote marks. */
export function headlineText(article: CollectionEntry<'articles'>): string {
	const { title, cartoon } = article.data;
	return cartoon ? `“${title}”` : title;
}
