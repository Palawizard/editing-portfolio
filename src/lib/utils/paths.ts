import { base } from '$app/paths';

export const resolveAssetPath = (path: string | undefined): string | undefined => {
	if (!path?.startsWith('/')) return path;
	return `${base}${path}`;
};
