import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const configuredBasePath = process.env.BASE_PATH?.trim() ?? '';

if (
	configuredBasePath &&
	(!configuredBasePath.startsWith('/') || configuredBasePath.endsWith('/'))
) {
	throw new Error('BASE_PATH must start with "/" and must not end with "/".');
}

const basePath = configuredBasePath as '' | `/${string}`;

// Public origin used while prerendering, so canonical and Open Graph URLs are absolute.
const siteOrigin = new URL(process.env.APP_PUBLIC_URL?.trim() || 'https://palawi.fr').origin;

// Pages shared by every app on palawi.fr (privacy policy, consent script). They live outside
// this app, so the prerender crawler must not treat links to them as broken.
const sharedSitePaths = ['/confidentialite/', '/consent/'];

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			paths: {
				base: basePath
			},
			prerender: {
				origin: siteOrigin,
				handleHttpError: ({ path, message }) => {
					if (sharedSitePaths.some((shared) => path.startsWith(shared))) return;
					throw new Error(message);
				}
			},
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			adapter: adapter()
		})
	]
});
