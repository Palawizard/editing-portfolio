export type PublishedVideoProvider =
	| 'google-drive'
	| 'instagram'
	| 'tiktok'
	| 'vimeo'
	| 'youtube'
	| 'other';

export type PublishedVideo = {
	id?: string;
	url: string;
	provider: PublishedVideoProvider;
	directUrl?: string;
	embedUrl?: string;
	poster?: string;
};

const hasDomain = (url: URL, domain: string) =>
	url.hostname === domain || url.hostname.endsWith(`.${domain}`);

const getYouTubeId = (url: URL) => {
	if (url.hostname === 'youtu.be') {
		return url.pathname.split('/').filter(Boolean)[0];
	}

	if (hasDomain(url, 'youtube.com')) {
		if (url.pathname === '/watch') {
			return url.searchParams.get('v') ?? undefined;
		}

		const [, type, id] = url.pathname.split('/');
		if (['embed', 'shorts', 'live'].includes(type)) {
			return id;
		}
	}

	return undefined;
};

const getGoogleDriveFileId = (url: URL) => {
	if (!hasDomain(url, 'drive.google.com') && !hasDomain(url, 'drive.usercontent.google.com')) {
		return undefined;
	}

	if (url.searchParams.has('id')) {
		return url.searchParams.get('id') ?? undefined;
	}

	const [, type, id] = url.pathname.split('/');
	if (type === 'file' && id === 'd') {
		return url.pathname.split('/')[3];
	}

	return undefined;
};

export const getPublishedVideo = (source?: string): PublishedVideo | undefined => {
	if (!source) return undefined;

	let url: URL;

	try {
		url = new URL(source);
	} catch {
		return { url: source, provider: 'other' };
	}

	const googleDriveFileId = getGoogleDriveFileId(url);
	if (googleDriveFileId) {
		return {
			id: googleDriveFileId,
			url: source,
			provider: 'google-drive',
			directUrl: `https://drive.usercontent.google.com/uc?id=${googleDriveFileId}&export=download`,
			embedUrl: `https://drive.google.com/file/d/${googleDriveFileId}/preview?autoplay=1`,
			poster: `https://drive.google.com/thumbnail?id=${googleDriveFileId}&sz=w1000`
		};
	}

	const youtubeId = getYouTubeId(url);
	if (youtubeId) {
		return {
			id: youtubeId,
			url: source,
			provider: 'youtube',
			embedUrl: `https://www.youtube-nocookie.com/embed/${youtubeId}`,
			poster: `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`
		};
	}

	if (hasDomain(url, 'vimeo.com')) {
		const videoId = url.pathname
			.split('/')
			.filter(Boolean)
			.findLast((part) => /^\d+$/.test(part));
		if (videoId) {
			return {
				url: source,
				provider: 'vimeo',
				embedUrl: `https://player.vimeo.com/video/${videoId}`
			};
		}
	}

	if (hasDomain(url, 'tiktok.com')) {
		const videoId = url.pathname.match(/\/video\/(\d+)/)?.[1];
		if (videoId) {
			return {
				url: source,
				provider: 'tiktok',
				embedUrl: `https://www.tiktok.com/player/v1/${videoId}`
			};
		}
	}

	if (hasDomain(url, 'instagram.com')) {
		const match = url.pathname.match(/^\/(p|reel|tv)\/([^/]+)/);
		if (match) {
			return {
				url: source,
				provider: 'instagram',
				embedUrl: `https://www.instagram.com/${match[1]}/${match[2]}/embed/`
			};
		}
	}

	return { url: source, provider: 'other' };
};
