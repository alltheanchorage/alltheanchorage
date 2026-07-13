import type { CollectionEntry } from 'astro:content';
import { articleMonth, articleYear } from './dates';

/**
 * Sorts articles for display: newest month first, then within a month by
 * `main` (always on top), then `order` (higher first), then `date`, then
 * `id` as a final deterministic tiebreaker.
 */
export function sortArticlesForDisplay(
	articles: CollectionEntry<'articles'>[],
): CollectionEntry<'articles'>[] {
	return [...articles].sort((a, b) => {
		const yearDiff = articleYear(b.data.date) - articleYear(a.data.date);
		if (yearDiff !== 0) return yearDiff;

		const monthDiff = articleMonth(b.data.date) - articleMonth(a.data.date);
		if (monthDiff !== 0) return monthDiff;

		if (a.data.main !== b.data.main) return a.data.main ? -1 : 1;

		const orderDiff = b.data.order - a.data.order;
		if (orderDiff !== 0) return orderDiff;

		const dateDiff = b.data.date.valueOf() - a.data.date.valueOf();
		if (dateDiff !== 0) return dateDiff;

		return a.id.localeCompare(b.id);
	});
}
