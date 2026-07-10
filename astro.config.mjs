// @ts-check
import { defineConfig } from 'astro/config';

// Deployed via GitHub Pages as a project site (github.com/alltheanchorage/alltheanchorage-web).
// If you switch to a custom domain or a <user>.github.io repo, change `site` and set `base` to '/'.
export default defineConfig({
	site: 'https://alltheanchorage.github.io',
	base: '/alltheanchorage-web',
});
