import { access, readFile } from 'node:fs/promises';
import { dirname, extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const projectsFile = join(projectRoot, 'src/lib/content/projects.ts');
const projectsSource = await readFile(projectsFile, 'utf8');
const videoMatches = [
	...projectsSource.matchAll(/previewVideo:\s*['"](\/videos\/[^'"]+\.mp4)['"]/g)
];
const sourceVideos = [...new Set(videoMatches.map((match) => match[1]))];

if (sourceVideos.length === 0) {
	throw new Error('No project video paths were found in src/lib/content/projects.ts.');
}

const expectedAssets = sourceVideos.flatMap((sourceVideo) => {
	const extension = extname(sourceVideo);
	const basename = sourceVideo.slice(sourceVideo.lastIndexOf('/') + 1, -extension.length);

	return [sourceVideo, `/videos/previews/${basename}-preview.mp4`];
});

const missingAssets = [];

for (const publicPath of expectedAssets) {
	const filePath = join(projectRoot, 'static', publicPath.slice(1));

	try {
		await access(filePath);
	} catch {
		missingAssets.push(relative(projectRoot, filePath).replaceAll('\\', '/'));
	}
}

if (missingAssets.length > 0) {
	console.error('Missing local video assets required by the portfolio:');
	for (const asset of missingAssets) {
		console.error(`- ${asset}`);
	}
	console.error('Provision the ignored video files locally or on the server before building.');
	process.exitCode = 1;
} else {
	console.log(
		`Verified ${sourceVideos.length} source videos and ${sourceVideos.length} optimized previews.`
	);
}
