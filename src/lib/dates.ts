import { MONTH_NAMES } from './site';

/** All date math uses UTC so a `date: 2026-01-15` frontmatter value can't shift to a
 * neighboring day/month depending on the machine's local timezone. */
export function articleYear(date: Date): number {
	return date.getUTCFullYear();
}

/** 1-indexed month (1 = January). */
export function articleMonth(date: Date): number {
	return date.getUTCMonth() + 1;
}

export function monthName(month: number): string {
	return MONTH_NAMES[month - 1];
}

export function monthSlug(month: number): string {
	return String(month).padStart(2, '0');
}

export function formatDate(date: Date): string {
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZone: 'UTC',
	});
}
