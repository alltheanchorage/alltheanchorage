import { getCollection, type CollectionEntry } from 'astro:content';
import { GOATCOUNTER_CODE } from './site';

interface HitsResponse {
	hits: { path: string; count: number }[];
}

async function fetchHits(api: URL, token: string): Promise<HitsResponse['hits']> {
	const response = await fetch(api, {
		headers: { Authorization: `Bearer ${token}` },
		signal: AbortSignal.timeout(15_000),
	});
	if (!response.ok) {
		// Error pages are full HTML; the message is in the first <p>.
		const body = await response.text();
		const message = body.match(/<p>([^<]*)<\/p>/)?.[1] ?? body.slice(0, 200);
		throw new Error(`HTTP ${response.status}: ${message}`);
	}
	return ((await response.json()) as HitsResponse).hits ?? [];
}

/**
 * The articles with the most visitors over the past `days`, according to
 * GoatCounter, fetched when the site is built. Needs a read-statistics API key
 * in the GOATCOUNTER_TOKEN environment variable (a GitHub Actions secret).
 * Returns an empty list instead of failing the build when there's no key
 * (e.g. building locally) or the stats can't be fetched.
 */
export async function getMostReadArticles(count = 5, days = 7): Promise<CollectionEntry<'articles'>[]> {
	const token = process.env.GOATCOUNTER_TOKEN;
	if (!token) return [];

	// GoatCounter wants the start rounded to the hour.
	const hour = 60 * 60 * 1000;
	const start = new Date(Math.floor((Date.now() - days * 24 * hour) / hour) * hour);
	const api = new URL(`https://${GOATCOUNTER_CODE}.goatcounter.com/api/v0/stats/hits`);
	api.searchParams.set('start', start.toISOString().replace(/\.\d+Z$/, 'Z'));
	api.searchParams.set('limit', '100');

	// GoatCounter occasionally errors for no lasting reason, so try twice
	// before giving up on the box until the next build.
	let hits: HitsResponse['hits'] | undefined;
	for (let attempt = 1; !hits; attempt++) {
		try {
			hits = await fetchHits(api, token);
		} catch (error) {
			if (attempt < 2) {
				console.warn(`[most read] Couldn't fetch GoatCounter stats, retrying: ${error}`);
				await new Promise((resolve) => setTimeout(resolve, 5_000));
			} else {
				console.warn(`[most read] Couldn't fetch GoatCounter stats, leaving the box out: ${error}`);
				return [];
			}
		}
	}

	// Tally visitors per article; "/articles/x" and "/articles/x/" both count.
	const visitors = new Map<string, number>();
	for (const { path, count } of hits) {
		const id = path.match(/^\/articles\/([^/?#]+)\/?$/)?.[1];
		if (id) visitors.set(id, (visitors.get(id) ?? 0) + count);
	}

	const articles = await getCollection('articles', ({ data }) => !data.draft);
	return articles
		.filter((article) => visitors.has(article.id))
		.sort((a, b) => visitors.get(b.id)! - visitors.get(a.id)!)
		.slice(0, count);
}
