/** Joins a site-root-relative path onto the configured base path (e.g. "/alltheanchorage-web"). */
export function url(path = '/'): string {
	const base = import.meta.env.BASE_URL.replace(/\/$/, '');
	const suffix = path.startsWith('/') ? path : `/${path}`;
	return `${base}${suffix}` || '/';
}
