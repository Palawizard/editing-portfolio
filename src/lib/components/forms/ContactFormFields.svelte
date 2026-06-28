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

	<div>
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

	<div>
		<label class={labelClasses} for="objective">
			{copy.fields.objective} <span aria-hidden="true">*</span>
		</label>
		<select
			class={fieldClasses}
			id="objective"
			name="objective"
			required
			bind:value={values.objective}
			aria-invalid={errors.objective ? 'true' : undefined}
			aria-describedby={errors.objective ? 'objective-error' : undefined}
		>
			<option value="" disabled>{copy.fields.objectivePlaceholder}</option>
			{#each copy.options.objective as option (option.value)}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
		{#if errors.objective}
			<p id="objective-error" class="mt-2 text-sm text-rose-200">{errors.objective}</p>
		{/if}
	</div>

	<div>
		<label class={labelClasses} for="providedFiles">
			{copy.fields.providedFiles} <span aria-hidden="true">*</span>
		</label>
		<select
			class={fieldClasses}
			id="providedFiles"
			name="provided_files"
			required
			bind:value={values.providedFiles}
			aria-invalid={errors.providedFiles ? 'true' : undefined}
			aria-describedby={errors.providedFiles ? 'providedFiles-error' : undefined}
		>
			<option value="" disabled>{copy.fields.providedFilesPlaceholder}</option>
			{#each copy.options.providedFiles as option (option.value)}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
		{#if errors.providedFiles}
			<p id="providedFiles-error" class="mt-2 text-sm text-rose-200">
				{errors.providedFiles}
			</p>
		{/if}
	</div>

	<div>
		<label class={labelClasses} for="finalDuration">
			{copy.fields.finalDuration} <span aria-hidden="true">*</span>
		</label>
		<select
			class={fieldClasses}
			id="finalDuration"
			name="final_duration"
			required
			bind:value={values.finalDuration}
			aria-invalid={errors.finalDuration ? 'true' : undefined}
			aria-describedby={errors.finalDuration ? 'finalDuration-error' : undefined}
		>
			<option value="" disabled>{copy.fields.finalDurationPlaceholder}</option>
			{#each copy.options.finalDuration as option (option.value)}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
		{#if errors.finalDuration}
			<p id="finalDuration-error" class="mt-2 text-sm text-rose-200">
				{errors.finalDuration}
			</p>
		{/if}
	</div>

	<div>
		<label class={labelClasses} for="footageDuration">{copy.fields.footageDuration}</label>
		<select
			class={fieldClasses}
			id="footageDuration"
			name="footage_duration"
			bind:value={values.footageDuration}
		>
			<option value="">{copy.fields.footageDurationPlaceholder}</option>
			{#each copy.options.footageDuration as option (option.value)}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
	</div>

	<div>
		<label class={labelClasses} for="editingLevel">
			{copy.fields.editingLevel} <span aria-hidden="true">*</span>
		</label>
		<select
			class={fieldClasses}
			id="editingLevel"
			name="editing_level"
			required
			bind:value={values.editingLevel}
			aria-invalid={errors.editingLevel ? 'true' : undefined}
			aria-describedby={errors.editingLevel ? 'editingLevel-error' : undefined}
		>
			<option value="" disabled>{copy.fields.editingLevelPlaceholder}</option>
			{#each copy.options.editingLevel as option (option.value)}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
		{#if errors.editingLevel}
			<p id="editingLevel-error" class="mt-2 text-sm text-rose-200">
				{errors.editingLevel}
			</p>
		{/if}
	</div>

	<div>
		<label class={labelClasses} for="deadline">
			{copy.fields.deadline} <span aria-hidden="true">*</span>
		</label>
		<select
			class={fieldClasses}
			id="deadline"
			name="deadline"
			required
			bind:value={values.deadline}
			aria-invalid={errors.deadline ? 'true' : undefined}
			aria-describedby={errors.deadline ? 'deadline-error' : undefined}
		>
			<option value="" disabled>{copy.fields.deadlinePlaceholder}</option>
			{#each copy.options.deadline as option (option.value)}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
		{#if errors.deadline}
			<p id="deadline-error" class="mt-2 text-sm text-rose-200">{errors.deadline}</p>
		{/if}
	</div>

	<div>
		<label class={labelClasses} for="subtitles">{copy.fields.subtitles}</label>
		<select class={fieldClasses} id="subtitles" name="subtitles" bind:value={values.subtitles}>
			<option value="">{copy.fields.subtitlesPlaceholder}</option>
			{#each copy.options.subtitles as option (option.value)}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
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
			maxlength="4000"
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

	<div class="sm:col-span-2">
		<label class={labelClasses} for="referenceLink">{copy.fields.referenceLink}</label>
		<p id="reference-link-help" class="mt-1 text-xs leading-5 text-slate-400">
			{copy.fields.referenceLinkHelp}
		</p>
		<input
			class={fieldClasses}
			id="referenceLink"
			name="reference_link"
			type="url"
			maxlength="1200"
			bind:value={values.referenceLink}
			aria-describedby="reference-link-help"
		/>
	</div>

	<div class="sm:col-span-2">
		<label class={labelClasses} for="specificRequests">{copy.fields.specificRequests}</label>
		<textarea
			class={[fieldClasses, 'min-h-24 resize-y']}
			id="specificRequests"
			name="specific_requests"
			maxlength="1200"
			bind:value={values.specificRequests}></textarea>
	</div>

	<div class="sm:col-span-2">
		<label class={labelClasses} for="constraints">{copy.fields.constraints}</label>
		<textarea
			class={[fieldClasses, 'min-h-24 resize-y']}
			id="constraints"
			name="constraints"
			maxlength="1200"
			bind:value={values.constraints}></textarea>
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
		<input
			class={fieldClasses}
			id="budget"
			name="budget"
			type="text"
			inputmode="text"
			maxlength="80"
			placeholder={copy.fields.budgetPlaceholder}
			bind:value={values.budget}
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
