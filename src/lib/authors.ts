import { url } from './paths';

/** Authors who get their own "Articles by …" page; their bylines link to it. */
export const AUTHORS_WITH_PAGES = ['Lysander Lynx', 'Celia Lion', 'Sand H. Crane'];

/** "Sand H. Crane" → "sand-h-crane". */
export function authorSlug(name: string): string {
	return name
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}

/** The author's page, or undefined if they don't have one. */
export function authorHref(name: string): string | undefined {
	return AUTHORS_WITH_PAGES.includes(name) ? url(`/authors/${authorSlug(name)}/`) : undefined;
}
