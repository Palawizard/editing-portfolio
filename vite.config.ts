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

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			paths: {
				base: basePath
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
