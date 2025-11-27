<script lang="ts">
	import type { Snippet } from 'svelte';

	let { summary, children }: { summary: string; children: Snippet<[]> } = $props();

	const contentsId = `contents-${crypto.randomUUID()}`;

	let open = $state(false);

	let hidden = $derived<'until-found' | false>(open ? false : 'until-found');
</script>

<div class="details" role="group" class:open>
	<button
		class="summary"
		aria-controls={contentsId}
		aria-expanded={open}
		onclick={() => (open = !open)}
	>
		{summary}
	</button>
	<div id={contentsId} class="contents" {hidden}>
		{@render children?.()}
	</div>
</div>

<style>
	.details {
		margin: 1.5em 0.5em;
		padding: 0.5em;
		background-color: var(--color-secondary);
		box-shadow: var(--drop-shadow-large);

		&.open .summary {
			list-style-type: disclosure-open;
		}
	}
	.summary {
		display: list-item;
		counter-increment: list-item 0;
		list-style: inside disclosure-closed;
		unicode-bidi: isolate;
		width: 100%;
		text-align: start;
		margin: 0.2em;
		font-size: 1.1em;
		appearance: none;
		border: none;
		background: none;
		cursor: pointer;
	}
	.contents {
		margin: 0.2em;
	}
</style>
