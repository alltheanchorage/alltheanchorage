import { getCollection } from 'astro:content';
import { articleMonth, articleYear } from './dates';

export interface YearNav {
	year: number;
	months: number[];
}

/** Builds the Year → Months structure for the top nav, newest first, from published articles. */
export async function getYearMonthNav(): Promise<YearNav[]> {
	const articles = await getCollection('articles', ({ data }) => !data.draft);

	const monthsByYear = new Map<number, Set<number>>();
	for (const article of articles) {
		const year = articleYear(article.data.date);
		const month = articleMonth(article.data.date);
		if (!monthsByYear.has(year)) monthsByYear.set(year, new Set());
		monthsByYear.get(year)!.add(month);
	}

	return Array.from(monthsByYear.entries())
		.sort(([a], [b]) => b - a)
		.map(([year, months]) => ({
			year,
			months: Array.from(months).sort((a, b) => b - a),
		}));
}
