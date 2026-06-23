import { error } from '@sveltejs/kit';
import { projects } from '$lib/content/projects';
import type { PageLoad } from './$types';

export const entries = () => projects.map((project) => ({ slug: project.slug }));

export const load: PageLoad = ({ params }) => {
	const projectIndex = projects.findIndex((item) => item.slug === params.slug);
	const project = projects[projectIndex];

	if (!project) {
		error(404, 'Projet introuvable');
	}

	const previousProject = projects[(projectIndex - 1 + projects.length) % projects.length];
	const nextProject = projects[(projectIndex + 1) % projects.length];

	return { project, previousProject, nextProject };
};
