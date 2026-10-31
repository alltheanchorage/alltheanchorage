import type { ImageMetadata } from 'astro';
import bellUga from '../assets/authors/bell_uga.png';
import celiaLion from '../assets/authors/celia_lion.png';
import lysanderLynx from '../assets/authors/lysander_lynx.png';
import marbMurrelet from '../assets/authors/marb_murrelet.png';
import mooooose from '../assets/authors/mooooose.png';
import mrGriz from '../assets/authors/mr_griz.png';
import professorPuffin from '../assets/authors/professor_puffin.png';
import sirSalmon from '../assets/authors/sir_salmon.png';
import steveMarten from '../assets/authors/steve_marten.png';
import bellUgaFull from '../assets/authors/full/bell_uga.jpg';
import celiaLionFull from '../assets/authors/full/celia_lion.jpg';
import lysanderLynxFull from '../assets/authors/full/lysander_lynx.jpg';
import marbMurreletFull from '../assets/authors/full/marb_murrelet.jpg';
import moooooseFull from '../assets/authors/full/mooooose.jpg';
import mrGrizFull from '../assets/authors/full/mr_griz.jpg';
import professorPuffinFull from '../assets/authors/full/professor_puffin.jpg';
import sirSalmonFull from '../assets/authors/full/sir_salmon.jpg';
import steveMartenFull from '../assets/authors/full/steve_marten.jpg';
import { url } from './paths';

/** Authors who get their own "Articles by …" page; their bylines link to it. */
export const AUTHORS_WITH_PAGES = ['Lysander Lynx', 'Celia Lion', 'Sand H. Crane'];

/** Square headshots (1080×1080) shown as circles next to bylines. Authors
 * without an entry render name only. */
const AUTHOR_PHOTOS: Record<string, ImageMetadata> = {
	'Dr. Bell Uga': bellUga,
	'Celia Lion': celiaLion,
	'Lysander Lynx': lysanderLynx,
	'Marb Murrelet': marbMurrelet,
	Mooooose: mooooose,
	'Mr. Griz': mrGriz,
	'Professor Puffin': professorPuffin,
	'Sir Salmon': sirSalmon,
	'Steve Marten': steveMarten,
};

/** The author's headshot, or undefined if they don't have one. */
export function authorPhoto(name: string): ImageMetadata | undefined {
	return AUTHOR_PHOTOS[name];
}

/** The unclipped original portraits (handwritten names included) shown on the
 * Staff page — and available for the author pages later. Authors without an
 * entry have no portrait yet. */
const AUTHOR_FULL_PHOTOS: Record<string, ImageMetadata> = {
	'Dr. Bell Uga': bellUgaFull,
	'Celia Lion': celiaLionFull,
	'Lysander Lynx': lysanderLynxFull,
	'Marb Murrelet': marbMurreletFull,
	Mooooose: moooooseFull,
	'Mr. Griz': mrGrizFull,
	'Professor Puffin': professorPuffinFull,
	'Sir Salmon': sirSalmonFull,
	'Steve Marten': steveMartenFull,
};

/** Authors with an original portrait, in display order. */
export const AUTHORS_WITH_PORTRAITS = Object.keys(AUTHOR_FULL_PHOTOS);

/** The author's original portrait, or undefined if they don't have one. */
export function authorFullPhoto(name: string): ImageMetadata | undefined {
	return AUTHOR_FULL_PHOTOS[name];
}

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
