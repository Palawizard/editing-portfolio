<script lang="ts">
	import { ArrowRight, CheckCircle2, Mail, RotateCcw, Send } from '@lucide/svelte';
	import { onMount, tick } from 'svelte';
	import { resolve } from '$app/paths';
	import ContactFormFields from '$lib/components/forms/ContactFormFields.svelte';
	import TurnstileWidget from '$lib/components/forms/TurnstileWidget.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { emptyContactFormValues } from '$lib/content/contact';
	import { getContactStyleLabel } from '$lib/content/contact';
	import { getLocaleContext } from '$lib/i18n/context';
	import type { EstimateContactPrefill } from '$lib/types/estimate';
	import type {
		ContactFormErrors,
		ContactFormField,
		ContactFormValues,
		ContactRequestContext
	} from '$lib/types/contact';
	import type { ProjectChoice } from '$lib/types/project';
	import { ESTIMATE_PREFILL_STORAGE_KEY } from '$lib/utils/estimate';

	type Props = {
		formId?: string;
		turnstileSiteKey?: string;
		contactEmail?: string;
	};

	type SubmissionSummary = {
		name: string;
		email: string;
		style: string;
		projectTitle?: string;
		budget?: string;
	};

	let { formId = '', turnstileSiteKey = '', contactEmail = '' }: Props = $props();
	const i18n = getLocaleContext();
	const copy = $derived(i18n.content.contactFormCopy);
	const styleOptions = $derived(i18n.content.contactStyleOptions);

	let values = $state<ContactFormValues>({ ...emptyContactFormValues });
	let errors = $state<ContactFormErrors>({});
	let context = $state<ContactRequestContext>({});
	let isEnhanced = $state(false);
	let isSubmitting = $state(false);
	let isSuccess = $state(false);
	let submitError = $state('');
	let minimumDate = $state('');
	let statusElement = $state<HTMLElement>();
	let submissionSummary = $state<SubmissionSummary>();
	let hasEstimatePrefill = $state(false);

	const endpoint = $derived(formId ? `https://formspree.io/f/${formId}` : '');
	const isConfigured = $derived(Boolean(endpoint && turnstileSiteKey));

	const isProjectChoice = (value: string): value is ProjectChoice =>
		styleOptions.some((option) => option.value === value);
	const getOptionLabel = (
		options: Array<{ value: string; label: string }>,
		value: string
	): string => options.find((option) => option.value === value)?.label ?? value;

	const setContextFromUrl = () => {
		const searchParams = new URLSearchParams(window.location.search);
		const projectSlug = searchParams.get('project')?.trim() ?? '';
		const style = searchParams.get('style')?.trim() ?? '';
		const project = i18n.content.projects.find((entry) => entry.slug === projectSlug);

		if (project) {
			values.projectSlug = project.slug;
			values.style = project.category;
			context = {
				style: project.category,
				projectSlug: project.slug,
				projectTitle: project.title
			};
			return;
		}

		if (isProjectChoice(style)) {
			values.style = style;
			context = { style };
		}
	};

	const setEstimatePrefillFromSession = () => {
		const storedPrefill = sessionStorage.getItem(ESTIMATE_PREFILL_STORAGE_KEY);
		if (!storedPrefill) return;

		try {
			const prefill = JSON.parse(storedPrefill) as Partial<EstimateContactPrefill>;
			values.name = typeof prefill.name === 'string' ? prefill.name.slice(0, 80) : '';
			values.email = typeof prefill.email === 'string' ? prefill.email.slice(0, 160) : '';
			values.projectDescription =
				typeof prefill.projectDescription === 'string'
					? prefill.projectDescription.slice(0, 4000)
					: '';
			values.objective =
				typeof prefill.objective === 'string' ? prefill.objective.slice(0, 80) : '';
			values.providedFiles =
				typeof prefill.providedFiles === 'string' ? prefill.providedFiles.slice(0, 80) : '';
			values.finalDuration =
				typeof prefill.finalDuration === 'string' ? prefill.finalDuration.slice(0, 80) : '';
			values.footageDuration =
				typeof prefill.footageDuration === 'string' ? prefill.footageDuration.slice(0, 80) : '';
			values.editingLevel =
				typeof prefill.editingLevel === 'string' ? prefill.editingLevel.slice(0, 80) : '';
			values.deadline = typeof prefill.deadline === 'string' ? prefill.deadline.slice(0, 80) : '';
			values.subtitles =
				typeof prefill.subtitles === 'string' ? prefill.subtitles.slice(0, 80) : '';
			values.footageDetails =
				typeof prefill.footageDetails === 'string' ? prefill.footageDetails.slice(0, 600) : '';
			values.budget = typeof prefill.budget === 'string' ? prefill.budget.slice(0, 80) : '';
			values.referenceLink =
				typeof prefill.referenceLink === 'string' ? prefill.referenceLink.slice(0, 1200) : '';
			values.specificRequests =
				typeof prefill.specificRequests === 'string' ? prefill.specificRequests.slice(0, 1200) : '';
			values.constraints =
				typeof prefill.constraints === 'string' ? prefill.constraints.slice(0, 1200) : '';
			values.usefulLinks =
				typeof prefill.usefulLinks === 'string' ? prefill.usefulLinks.slice(0, 1200) : '';

			if (typeof prefill.style === 'string' && isProjectChoice(prefill.style)) {
				values.style = prefill.style;
				context = { style: prefill.style };
			}

			hasEstimatePrefill = true;
			sessionStorage.removeItem(ESTIMATE_PREFILL_STORAGE_KEY);
		} catch {
			sessionStorage.removeItem(ESTIMATE_PREFILL_STORAGE_KEY);
		}
	};

	onMount(() => {
		isEnhanced = true;
		minimumDate = new Date().toISOString().slice(0, 10);
		setContextFromUrl();
		setEstimatePrefillFromSession();
	});

	const validate = (): ContactFormErrors => {
		const nextErrors: ContactFormErrors = {};
		const trimmedName = values.name.trim();
		const trimmedEmail = values.email.trim();
		const trimmedDescription = values.projectDescription.trim();

		if (trimmedName.length < 2) {
			nextErrors.name = copy.validation.name;
		}

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
			nextErrors.email = copy.validation.email;
		}

		if (!values.style) {
			nextErrors.style = copy.validation.style;
		}

		if (!values.objective) {
			nextErrors.objective = copy.validation.objective;
		}

		if (!values.providedFiles) {
			nextErrors.providedFiles = copy.validation.providedFiles;
		}

		if (!values.finalDuration) {
			nextErrors.finalDuration = copy.validation.finalDuration;
		}

		if (!values.editingLevel) {
			nextErrors.editingLevel = copy.validation.editingLevel;
		}

		if (!values.deadline) {
			nextErrors.deadline = copy.validation.deadline;
		}

		if (trimmedDescription.length < 20) {
			nextErrors.projectDescription = copy.validation.projectDescription;
		}

		return nextErrors;
	};

	const focusResult = async () => {
		await tick();
		statusElement?.focus();
	};

	const focusFirstError = async (nextErrors: ContactFormErrors) => {
		await tick();
		const firstField = Object.keys(nextErrors)[0] as ContactFormField | undefined;
		if (firstField) {
			document.getElementById(firstField)?.focus();
		}
	};

	const handleSubmit = async (event: SubmitEvent) => {
		if (!isEnhanced || !isConfigured) {
			return;
		}

		event.preventDefault();

		if (isSubmitting) {
			return;
		}

		const nextErrors = validate();
		errors = nextErrors;
		submitError = '';

		if (Object.keys(nextErrors).length > 0) {
			await focusFirstError(nextErrors);
			return;
		}

		const form = event.currentTarget as HTMLFormElement;
		const formData = new FormData(form);

		if (turnstileSiteKey && !formData.get('cf-turnstile-response')) {
			submitError = copy.turnstilePending;
			await focusResult();
			return;
		}

		isSubmitting = true;

		try {
			const response = await fetch(endpoint, {
				method: 'POST',
				body: formData,
				headers: {
					Accept: 'application/json'
				}
			});

			if (!response.ok) {
				throw new Error(`Form submission failed with status ${response.status}`);
			}

			submissionSummary = {
				name: values.name.trim(),
				email: values.email.trim(),
				style: getContactStyleLabel(values.style, i18n.locale),
				projectTitle: context.projectTitle,
				budget: values.budget.trim() || undefined
			};
			isSuccess = true;
			await focusResult();
		} catch {
			submitError = copy.errorDescription;
			await focusResult();
		} finally {
			isSubmitting = false;
		}
	};

	const resetForm = () => {
		values = { ...emptyContactFormValues };
		errors = {};
		context = {};
		hasEstimatePrefill = false;
		submitError = '';
		submissionSummary = undefined;
		isSuccess = false;
		window.history.replaceState({}, '', resolve('/contact'));
	};

	const handleTurnstileError = (errorCode = '') => {
		if (errorCode) {
			console.warn(`Cloudflare Turnstile error: ${errorCode}`);
		}

		submitError = errorCode === '110200' ? copy.turnstileDomainError : copy.turnstileGenericError;
	};
</script>

{#if isSuccess && submissionSummary}
	<div
		bind:this={statusElement}
		class="panel p-6 outline-none md:p-9"
		tabindex="-1"
		role="status"
		aria-live="polite"
	>
		<CheckCircle2 class="text-ok" size={28} strokeWidth={1.5} aria-hidden="true" />
		<h2 class="display-title mt-6 text-4xl text-paper">{copy.successTitle}</h2>
		<p class="mt-3 max-w-2xl leading-7 text-mute">{copy.successDescription}</p>

		<dl class="mt-7 grid gap-4 rounded-2xl bg-white/70 p-5 text-sm sm:grid-cols-2">
			<div>
				<dt class="text-xs font-bold text-mute">{copy.successFields.contact}</dt>
				<dd class="mt-1 font-semibold text-paper">{submissionSummary.name}</dd>
			</div>
			<div>
				<dt class="text-xs font-bold text-mute">{copy.successFields.email}</dt>
				<dd class="mt-1 font-semibold text-paper">{submissionSummary.email}</dd>
			</div>
			<div>
				<dt class="text-xs font-bold text-mute">{copy.successFields.style}</dt>
				<dd class="mt-1 font-semibold text-paper">{submissionSummary.style}</dd>
			</div>
			{#if submissionSummary.projectTitle}
				<div>
					<dt class="text-xs font-bold text-mute">{copy.successFields.referenceProject}</dt>
					<dd class="mt-1 font-semibold text-paper">{submissionSummary.projectTitle}</dd>
				</div>
			{/if}
			{#if submissionSummary.budget}
				<div>
					<dt class="text-xs font-bold text-mute">{copy.successFields.budget}</dt>
					<dd class="mt-1 font-semibold text-paper">{submissionSummary.budget}</dd>
				</div>
			{/if}
		</dl>

		<div class="mt-7 flex flex-col gap-2 sm:flex-row">
			<Button href="/projets">
				{copy.viewProjects}
				<ArrowRight size={18} aria-hidden="true" />
			</Button>
			<button
				type="button"
				class="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-[0.9375rem] font-extrabold text-paper shadow-[var(--shadow)] transition-transform duration-150 active:scale-[0.97]"
				onclick={resetForm}
			>
				<RotateCcw size={17} aria-hidden="true" />
				{copy.sendAnother}
			</button>
		</div>
	</div>
{:else}
	<form
		action={endpoint || undefined}
		method="POST"
		novalidate={isEnhanced}
		onsubmit={handleSubmit}
		class="panel p-6 md:p-9"
	>
		<div>
			<h2 class="display-title text-4xl text-paper">{copy.title}</h2>
			<p class="mt-3 max-w-2xl text-sm leading-6 text-mute">{copy.description}</p>
		</div>

		<div
			class="mt-7 grid gap-4 rounded-2xl bg-peach/70 p-4 text-paper sm:grid-cols-[1fr_auto] sm:items-center"
		>
			<div>
				<p class="text-sm font-bold">{copy.estimateCta.title}</p>
				<p class="mt-1 text-xs leading-5 text-paper/75">{copy.estimateCta.description}</p>
			</div>
			<Button href="/estimation" variant="secondary" class="w-full sm:w-auto">
				{copy.estimateCta.action}
				<ArrowRight size={18} aria-hidden="true" />
			</Button>
		</div>

		{#if context.style}
			<div class="mt-7 rounded-2xl bg-white/70 p-4">
				<p class="text-sm font-semibold text-paper">
					{copy.contextPrefix}
					{getContactStyleLabel(context.style, i18n.locale)}.
				</p>
				{#if context.projectTitle}
					<p class="mt-1 text-sm text-mute">
						{copy.contextReference}
						{context.projectTitle}
					</p>
				{/if}
				<p class="mt-2 text-xs text-mute">{copy.contextHint}</p>
			</div>
		{/if}

		{#if hasEstimatePrefill}
			<div class="mt-7 rounded-2xl bg-white/70 p-4">
				<p class="text-sm font-semibold text-paper">{copy.estimateContextTitle}</p>
				<p class="mt-1 text-xs leading-5 text-mute">{copy.estimateContextHint}</p>
			</div>
		{/if}

		<ContactFormFields bind:values {errors} {minimumDate} />

		<input type="hidden" name="project_slug" value={values.projectSlug} />
		<input type="hidden" name="project_title" value={context.projectTitle ?? ''} />
		<input
			type="hidden"
			name="style_label"
			value={getContactStyleLabel(values.style, i18n.locale)}
		/>
		<input
			type="hidden"
			name="objective_label"
			value={getOptionLabel(copy.options.objective, values.objective)}
		/>
		<input
			type="hidden"
			name="provided_files_label"
			value={getOptionLabel(copy.options.providedFiles, values.providedFiles)}
		/>
		<input
			type="hidden"
			name="final_duration_label"
			value={getOptionLabel(copy.options.finalDuration, values.finalDuration)}
		/>
		<input
			type="hidden"
			name="footage_duration_label"
			value={getOptionLabel(copy.options.footageDuration, values.footageDuration)}
		/>
		<input
			type="hidden"
			name="editing_level_label"
			value={getOptionLabel(copy.options.editingLevel, values.editingLevel)}
		/>
		<input
			type="hidden"
			name="deadline_label"
			value={getOptionLabel(copy.options.deadline, values.deadline)}
		/>
		<input
			type="hidden"
			name="subtitles_label"
			value={getOptionLabel(copy.options.subtitles, values.subtitles)}
		/>
		<input type="hidden" name="subject" value={copy.subjectTemplate} />
		<div class="absolute -left-[10000px]" aria-hidden="true">
			<label for="companyWebsite">{copy.honeypotLabel}</label>
			<input id="companyWebsite" name="_gotcha" type="text" tabindex="-1" autocomplete="off" />
		</div>

		{#if turnstileSiteKey}
			<div class="mt-7">
				<TurnstileWidget siteKey={turnstileSiteKey} onError={handleTurnstileError} />
			</div>
		{/if}

		{#if submitError}
			<div
				bind:this={statusElement}
				class="mt-6 rounded-2xl border-2 border-bad bg-white p-4 outline-none"
				tabindex="-1"
				role="alert"
				aria-live="assertive"
			>
				<p class="font-semibold text-bad">{copy.errorTitle}</p>
				<p class="mt-1 text-sm leading-6 text-paper">{submitError}</p>
			</div>
		{/if}

		{#if !isConfigured}
			<div class="mt-6 rounded-2xl border-2 border-warn bg-white p-4 text-sm leading-6 text-paper">
				<p>{copy.unavailable}</p>
			</div>
		{/if}

		<div class="mt-7 flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
			<p class="max-w-xl text-xs leading-5 text-mute">
				{copy.privacy}
				<!-- eslint-disable svelte/no-navigation-without-resolve -- Shared palawi.fr policy, outside the base path. -->
				<a
					class="font-bold whitespace-nowrap text-paper underline underline-offset-4 hover:decoration-live"
					href="/confidentialite/#formulaires"
					data-sveltekit-reload
				>
					{copy.privacyLink}
				</a>
				<!-- eslint-enable svelte/no-navigation-without-resolve -->
			</p>
			<button
				type="submit"
				class="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-paper px-6 py-3 text-[0.9375rem] font-extrabold text-white shadow-[0_12px_24px_-12px_rgb(42_20_9/0.8)] transition-transform duration-150 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50"
				disabled={isSubmitting || !isConfigured}
			>
				<Send size={17} aria-hidden="true" />
				{isSubmitting ? copy.submittingLabel : copy.submitLabel}
			</button>
		</div>

		{#if contactEmail}
			<p class="mt-5 flex flex-wrap items-center gap-2 text-sm text-mute">
				<Mail size={16} aria-hidden="true" />
				{copy.emailFallbackLead}
				<!-- eslint-disable svelte/no-navigation-without-resolve -- Mailto is an external protocol. -->
				<a
					class="font-bold text-paper underline underline-offset-4 hover:decoration-live"
					href={`mailto:${contactEmail}`}
				>
					{copy.emailFallbackAction}
				</a>
				<!-- eslint-enable svelte/no-navigation-without-resolve -->
			</p>
		{/if}
	</form>
{/if}
