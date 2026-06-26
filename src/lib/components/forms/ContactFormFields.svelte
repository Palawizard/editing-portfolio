<script lang="ts">
	import type { ContactFormErrors, ContactFormValues } from '$lib/types/contact';
	import { getLocaleContext } from '$lib/i18n/context';

	type Props = {
		values: ContactFormValues;
		errors: ContactFormErrors;
		minimumDate?: string;
	};

	let { values = $bindable(), errors, minimumDate = '' }: Props = $props();
	const i18n = getLocaleContext();
	const copy = $derived(i18n.content.contactFormCopy);
	const styleOptions = $derived(i18n.content.contactStyleOptions);

	const fieldClasses =
		'mt-2 min-h-12 w-full rounded-xl border border-white/12 bg-black/25 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 hover:border-white/20 focus:border-cyan-200/60 focus:ring-2 focus:ring-cyan-200/15 aria-invalid:border-rose-300/70 aria-invalid:ring-2 aria-invalid:ring-rose-300/10';
	const labelClasses = 'text-sm font-semibold text-slate-100';
</script>

<div class="mt-8 grid gap-6 sm:grid-cols-2">
	<div>
		<label class={labelClasses} for="name">
			{copy.fields.name} <span aria-hidden="true">*</span>
		</label>
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
		<label class={labelClasses} for="email">
			{copy.fields.email} <span aria-hidden="true">*</span>
		</label>
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
			{copy.fields.style} <span aria-hidden="true">*</span>
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
			<option value="" disabled>{copy.fields.stylePlaceholder}</option>
			{#each styleOptions as option (option.value)}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
		{#if errors.style}
			<p id="style-error" class="mt-2 text-sm text-rose-200">{errors.style}</p>
		{/if}
	</div>

	<div class="sm:col-span-2">
		<label class={labelClasses} for="projectDescription">
			{copy.fields.projectDescription} <span aria-hidden="true">*</span>
		</label>
		<p id="project-description-help" class="mt-1 text-xs leading-5 text-slate-400">
			{copy.fields.projectDescriptionHelp}
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
		<label class={labelClasses} for="footageDetails">{copy.fields.footageDetails}</label>
		<p id="footage-help" class="mt-1 text-xs leading-5 text-slate-400">
			{copy.fields.footageDetailsHelp}
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
		<label class={labelClasses} for="desiredDate">{copy.fields.desiredDate}</label>
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
		<label class={labelClasses} for="budget">{copy.fields.budget}</label>
		<p id="budget-help" class="mt-1 text-xs leading-5 text-slate-400">{copy.fields.budgetHelp}</p>
		<input
			class={fieldClasses}
			id="budget"
			name="budget"
			type="text"
			inputmode="text"
			maxlength="80"
			placeholder={copy.fields.budgetPlaceholder}
			bind:value={values.budget}
			aria-describedby="budget-help"
		/>
	</div>

	<div class="sm:col-span-2">
		<label class={labelClasses} for="usefulLinks">{copy.fields.usefulLinks}</label>
		<p id="links-help" class="mt-1 text-xs leading-5 text-slate-400">{copy.linksHelp}</p>
		<textarea
			class={[fieldClasses, 'min-h-24 resize-y']}
			id="usefulLinks"
			name="useful_links"
			maxlength="1200"
			bind:value={values.usefulLinks}
			aria-describedby="links-help"></textarea>
	</div>
</div>
