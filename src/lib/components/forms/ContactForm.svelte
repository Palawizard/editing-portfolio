<script lang="ts">
	import { ArrowRight, CheckCircle2, Mail, RotateCcw, Send } from '@lucide/svelte';
	import { onMount, tick } from 'svelte';
	import { resolve } from '$app/paths';
	import Button from '$lib/components/ui/Button.svelte';
	import {
		contactBudgetOptions,
		contactFormCopy,
		contactStyleOptions,
		emptyContactFormValues,
		getContactBudgetLabel,
		getContactStyleLabel
	} from '$lib/content/contact';
	import { projects } from '$lib/content/projects';
	import type {
		ContactFormErrors,
		ContactFormField,
		ContactFormValues,
		ContactRequestContext
	} from '$lib/types/contact';
	import type { ProjectChoice } from '$lib/types/project';

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

	const endpoint = $derived(formId ? `https://formspree.io/f/${formId}` : '');
	const isConfigured = $derived(Boolean(endpoint));
	const fieldClasses =
		'mt-2 min-h-12 w-full rounded-xl border border-white/12 bg-black/25 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 hover:border-white/20 focus:border-cyan-200/60 focus:ring-2 focus:ring-cyan-200/15 aria-invalid:border-rose-300/70 aria-invalid:ring-2 aria-invalid:ring-rose-300/10';
	const labelClasses = 'text-sm font-semibold text-slate-100';
	const subjectTemplate = 'Nouvelle demande de montage de {{ name }}';

	const isProjectChoice = (value: string): value is ProjectChoice =>
		contactStyleOptions.some((option) => option.value === value);

	const setContextFromUrl = () => {
		const searchParams = new URLSearchParams(window.location.search);
		const projectSlug = searchParams.get('project')?.trim() ?? '';
		const style = searchParams.get('style')?.trim() ?? '';
		const project = projects.find((entry) => entry.slug === projectSlug);

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

	onMount(() => {
		isEnhanced = true;
		minimumDate = new Date().toISOString().slice(0, 10);
		setContextFromUrl();
	});

	const validate = (): ContactFormErrors => {
		const nextErrors: ContactFormErrors = {};
		const trimmedName = values.name.trim();
		const trimmedEmail = values.email.trim();
		const trimmedDescription = values.projectDescription.trim();

		if (trimmedName.length < 2) {
			nextErrors.name = 'Indique un nom ou un pseudo.';
		}

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
			nextErrors.email = 'Indique une adresse email valide.';
		}

		if (!values.style) {
			nextErrors.style = 'Choisis un type de montage.';
		}

		if (trimmedDescription.length < 20) {
			nextErrors.projectDescription = 'Décris ton projet en au moins 20 caractères.';
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
			submitError = 'La vérification anti-spam est en cours. Attends un instant puis réessaie.';
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
				style: getContactStyleLabel(values.style),
				projectTitle: context.projectTitle,
				budget: getContactBudgetLabel(values.budget) || undefined
			};
			isSuccess = true;
			await focusResult();
		} catch {
			submitError = contactFormCopy.errorDescription;
			await focusResult();
		} finally {
			isSubmitting = false;
		}
	};

	const resetForm = () => {
		values = { ...emptyContactFormValues };
		errors = {};
		context = {};
		submitError = '';
		submissionSummary = undefined;
		isSuccess = false;
		window.history.replaceState({}, '', resolve('/contact'));
		window.turnstile?.reset();
	};
</script>

{#if isSuccess && submissionSummary}
	<div
		bind:this={statusElement}
		class="rounded-[1.5rem] border border-emerald-300/25 bg-emerald-300/[0.07] p-6 outline-none md:p-9"
		tabindex="-1"
		role="status"
		aria-live="polite"
	>
		<div class="grid size-12 place-items-center rounded-2xl bg-emerald-300/12 text-emerald-200">
			<CheckCircle2 size={24} aria-hidden="true" />
		</div>
		<h2 class="mt-6 text-3xl font-bold text-white">{contactFormCopy.successTitle}</h2>
		<p class="mt-3 max-w-2xl leading-7 text-slate-200">{contactFormCopy.successDescription}</p>

		<dl
			class="mt-7 grid gap-3 rounded-2xl border border-white/10 bg-black/20 p-5 text-sm sm:grid-cols-2"
		>
			<div>
				<dt class="text-slate-400">Contact</dt>
				<dd class="mt-1 font-semibold text-white">{submissionSummary.name}</dd>
			</div>
			<div>
				<dt class="text-slate-400">Email</dt>
				<dd class="mt-1 font-semibold text-white">{submissionSummary.email}</dd>
			</div>
			<div>
				<dt class="text-slate-400">Type de montage</dt>
				<dd class="mt-1 font-semibold text-white">{submissionSummary.style}</dd>
			</div>
			{#if submissionSummary.projectTitle}
				<div>
					<dt class="text-slate-400">Projet de référence</dt>
					<dd class="mt-1 font-semibold text-white">{submissionSummary.projectTitle}</dd>
				</div>
			{/if}
			{#if submissionSummary.budget}
				<div>
					<dt class="text-slate-400">Budget prévu</dt>
					<dd class="mt-1 font-semibold text-white">{submissionSummary.budget}</dd>
				</div>
			{/if}
		</dl>

		<div class="mt-7 flex flex-col gap-3 sm:flex-row">
			<Button href="/projets">
				Voir les projets
				<ArrowRight size={18} aria-hidden="true" />
			</Button>
			<button
				type="button"
				class="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/[0.08]"
				onclick={resetForm}
			>
				<RotateCcw size={17} aria-hidden="true" />
				Envoyer une autre demande
			</button>
		</div>
	</div>
{:else}
	<form
		action={endpoint || undefined}
		method="POST"
		novalidate={isEnhanced}
		onsubmit={handleSubmit}
		class="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6 shadow-[var(--shadow-premium)] md:p-9"
	>
		<div>
			<p class="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
				{contactFormCopy.eyebrow}
			</p>
			<h2 class="mt-4 text-3xl font-bold text-white">{contactFormCopy.title}</h2>
			<p class="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
				{contactFormCopy.description}
			</p>
		</div>

		{#if context.style}
			<div class="mt-7 rounded-xl border border-violet-300/20 bg-violet-300/[0.08] p-4">
				<p class="text-sm font-semibold text-violet-100">
					Tu demandes un montage de type {getContactStyleLabel(context.style)}.
				</p>
				{#if context.projectTitle}
					<p class="mt-1 text-sm text-slate-300">
						Projet de référence : {context.projectTitle}
					</p>
				{/if}
				<p class="mt-2 text-xs text-slate-400">Tu peux modifier ce choix dans le formulaire.</p>
			</div>
		{/if}

		<div class="mt-8 grid gap-6 sm:grid-cols-2">
			<div>
				<label class={labelClasses} for="name"
					>Nom ou pseudo <span aria-hidden="true">*</span></label
				>
				<input
					class={fieldClasses}
					id="name"
					name="name"
					type="text"
					autocomplete="name"
					required
					minlength="2"
					maxlength="80"
					bind:value={values.name}
					aria-invalid={errors.name ? 'true' : undefined}
					aria-describedby={errors.name ? 'name-error' : undefined}
				/>
				{#if errors.name}
					<p id="name-error" class="mt-2 text-sm text-rose-200">{errors.name}</p>
				{/if}
			</div>

			<div>
				<label class={labelClasses} for="email">Email <span aria-hidden="true">*</span></label>
				<input
					class={fieldClasses}
					id="email"
					name="email"
					type="email"
					autocomplete="email"
					required
					maxlength="160"
					bind:value={values.email}
					aria-invalid={errors.email ? 'true' : undefined}
					aria-describedby={errors.email ? 'email-error' : undefined}
				/>
				{#if errors.email}
					<p id="email-error" class="mt-2 text-sm text-rose-200">{errors.email}</p>
				{/if}
			</div>

			<div class="sm:col-span-2">
				<label class={labelClasses} for="style">
					Type de montage <span aria-hidden="true">*</span>
				</label>
				<select
					class={fieldClasses}
					id="style"
					name="style"
					required
					bind:value={values.style}
					aria-invalid={errors.style ? 'true' : undefined}
					aria-describedby={errors.style ? 'style-error' : undefined}
				>
					<option value="" disabled>Choisis un type de montage</option>
					{#each contactStyleOptions as option (option.value)}
						<option value={option.value}>{option.label}</option>
					{/each}
				</select>
				{#if errors.style}
					<p id="style-error" class="mt-2 text-sm text-rose-200">{errors.style}</p>
				{/if}
			</div>

			<div class="sm:col-span-2">
				<label class={labelClasses} for="projectDescription">
					Décris ton projet <span aria-hidden="true">*</span>
				</label>
				<p id="project-description-help" class="mt-1 text-xs leading-5 text-slate-400">
					Indique le contenu, la plateforme visée et le résultat recherché.
				</p>
				<textarea
					class={[fieldClasses, 'min-h-36 resize-y']}
					id="projectDescription"
					name="project_description"
					required
					minlength="20"
					maxlength="2000"
					bind:value={values.projectDescription}
					aria-invalid={errors.projectDescription ? 'true' : undefined}
					aria-describedby={[
						'project-description-help',
						errors.projectDescription ? 'projectDescription-error' : undefined
					]
						.filter(Boolean)
						.join(' ')}></textarea>
				{#if errors.projectDescription}
					<p id="projectDescription-error" class="mt-2 text-sm text-rose-200">
						{errors.projectDescription}
					</p>
				{/if}
			</div>

			<div class="sm:col-span-2">
				<label class={labelClasses} for="footageDetails">Durée et volume des rushs</label>
				<p id="footage-help" class="mt-1 text-xs leading-5 text-slate-400">
					Par exemple : 2 heures de rushs pour une vidéo finale de 10 minutes.
				</p>
				<textarea
					class={[fieldClasses, 'min-h-24 resize-y']}
					id="footageDetails"
					name="footage_details"
					maxlength="600"
					bind:value={values.footageDetails}
					aria-describedby="footage-help"></textarea>
			</div>

			<div>
				<label class={labelClasses} for="desiredDate">Date souhaitée</label>
				<input
					class={fieldClasses}
					id="desiredDate"
					name="desired_date"
					type="date"
					min={minimumDate || undefined}
					bind:value={values.desiredDate}
				/>
			</div>

			<div>
				<label class={labelClasses} for="budget">Budget prévu</label>
				<select class={fieldClasses} id="budget" name="budget" bind:value={values.budget}>
					<option value="">Choisir une fourchette</option>
					{#each contactBudgetOptions as option (option.value)}
						<option value={option.value}>{option.label}</option>
					{/each}
				</select>
			</div>

			<div class="sm:col-span-2">
				<label class={labelClasses} for="usefulLinks">Liens utiles</label>
				<p id="links-help" class="mt-1 text-xs leading-5 text-slate-400">
					{contactFormCopy.linksHelp}
				</p>
				<textarea
					class={[fieldClasses, 'min-h-24 resize-y']}
					id="usefulLinks"
					name="useful_links"
					maxlength="1200"
					bind:value={values.usefulLinks}
					aria-describedby="links-help"></textarea>
			</div>
		</div>

		<input type="hidden" name="project_slug" value={values.projectSlug} />
		<input type="hidden" name="subject" value={subjectTemplate} />
		<div class="absolute -left-[10000px]" aria-hidden="true">
			<label for="companyWebsite">Ne pas remplir ce champ</label>
			<input id="companyWebsite" name="_gotcha" type="text" tabindex="-1" autocomplete="off" />
		</div>

		{#if turnstileSiteKey}
			<div class="mt-7">
				<div
					class="cf-turnstile"
					data-sitekey={turnstileSiteKey}
					data-theme="dark"
					data-language="fr"
				></div>
			</div>
		{/if}

		{#if submitError}
			<div
				bind:this={statusElement}
				class="mt-6 rounded-xl border border-rose-300/25 bg-rose-300/[0.08] p-4 outline-none"
				tabindex="-1"
				role="alert"
				aria-live="assertive"
			>
				<p class="font-semibold text-rose-100">{contactFormCopy.errorTitle}</p>
				<p class="mt-1 text-sm leading-6 text-slate-200">{submitError}</p>
			</div>
		{/if}

		{#if !isConfigured}
			<div
				class="mt-6 rounded-xl border border-amber-200/20 bg-amber-200/[0.06] p-4 text-sm leading-6 text-slate-200"
			>
				<p>{contactFormCopy.unavailable}</p>
			</div>
		{/if}

		<div
			class="mt-7 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between"
		>
			<p class="max-w-md text-xs leading-5 text-slate-400">{contactFormCopy.privacy}</p>
			<button
				type="submit"
				class="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-violet-300 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-violet-950/35 transition hover:bg-violet-200 disabled:pointer-events-none disabled:opacity-50"
				disabled={isSubmitting || !isConfigured}
			>
				<Send size={17} aria-hidden="true" />
				{isSubmitting ? contactFormCopy.submittingLabel : contactFormCopy.submitLabel}
			</button>
		</div>

		{#if contactEmail}
			<p class="mt-5 flex flex-wrap items-center gap-2 text-sm text-slate-400">
				<Mail size={16} aria-hidden="true" />
				Une difficulté avec le formulaire ?
				<!-- eslint-disable svelte/no-navigation-without-resolve -- Mailto is an external protocol. -->
				<a class="font-semibold text-cyan-100 hover:text-cyan-50" href={`mailto:${contactEmail}`}>
					Écrire par email
				</a>
				<!-- eslint-enable svelte/no-navigation-without-resolve -->
			</p>
		{/if}
	</form>
{/if}
