import { error } from '@sveltejs/kit';
import { projects } from '$lib/content/projects';
import type { PageLoad } from './$types';

export const entries = () => projects.map((project) => ({ slug: project.slug }));

export const load: PageLoad = ({ params }) => {
	const project = projects.find((item) => item.slug === params.slug);

	if (!project) {
		error(404, 'Projet introuvable');
	}

	return { project };
};
