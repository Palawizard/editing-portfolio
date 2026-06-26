<script lang="ts">
	import { contactFormCopy, contactStyleOptions } from '$lib/content/contact';
	import type { ContactFormErrors, ContactFormValues } from '$lib/types/contact';

	type Props = {
		values: ContactFormValues;
		errors: ContactFormErrors;
		minimumDate?: string;
	};

	let { values = $bindable(), errors, minimumDate = '' }: Props = $props();

	const fieldClasses =
		'mt-2 min-h-12 w-full rounded-xl border border-white/12 bg-black/25 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 hover:border-white/20 focus:border-cyan-200/60 focus:ring-2 focus:ring-cyan-200/15 aria-invalid:border-rose-300/70 aria-invalid:ring-2 aria-invalid:ring-rose-300/10';
	const labelClasses = 'text-sm font-semibold text-slate-100';
</script>

<div class="mt-8 grid gap-6 sm:grid-cols-2">
	<div>
		<label class={labelClasses} for="name">Nom ou pseudo <span aria-hidden="true">*</span></label>
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
		<label class={labelClasses} for="budget">Budget</label>
		<p id="budget-help" class="mt-1 text-xs leading-5 text-slate-400">
			Indique le montant ou la fourchette que tu as en tête.
		</p>
		<input
			class={fieldClasses}
			id="budget"
			name="budget"
			type="text"
			inputmode="text"
			maxlength="80"
			placeholder="Ex. 150 €, 300 à 500 €, à définir"
			bind:value={values.budget}
			aria-describedby="budget-help"
		/>
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
