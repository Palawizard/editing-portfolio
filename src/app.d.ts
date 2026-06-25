// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	interface Window {
		turnstile?: {
			render: (
				container: HTMLElement,
				options: {
					sitekey: string;
					theme?: 'dark' | 'light' | 'auto';
					language?: string;
					appearance?: 'always' | 'execute' | 'interaction-only';
					'error-callback'?: (errorCode: string) => boolean;
				}
			) => string;
			reset: (widgetId?: string) => void;
			remove: (widgetId: string) => void;
		};
	}

	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
