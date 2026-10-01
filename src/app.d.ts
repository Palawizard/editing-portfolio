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
					'error-callback'?: (errorCode?: string) => boolean;
				}
			) => string;
			reset: (widgetId?: string) => void;
			remove: (widgetId: string) => void;
		};
		/** Shared palawi.fr consent manager (/consent/palawi-consent.js), absent in local dev. */
		PalawiConsent?: {
			get: (purpose: string) => boolean | null;
			set: (choices: Record<string, boolean>) => void;
			open: () => void;
			onChange: (listener: (choices: Record<string, boolean>) => void) => () => void;
			gate: (
				container: HTMLElement,
				purpose: string,
				load: () => void,
				options?: { provider?: string }
			) => () => void;
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
