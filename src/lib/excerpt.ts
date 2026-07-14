/** Falls back to a plain-text teaser sliced from the article body when no explicit excerpt is set. */
export function makeExcerpt(body: string | undefined, explicit: string | undefined, maxLen = 260): string {
	if (explicit) return explicit;
	if (!body) return '';

	const plain = body
		.replace(/!\[[^\]]*\]\([^)]*\)/g, '')
		.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
		.replace(/[#>*_`~]/g, '')
		.replace(/\s+/g, ' ')
		.trim();

	if (plain.length <= maxLen) return plain;
	return `${plain.slice(0, maxLen).replace(/\s+\S*$/, '')}…`;
}
