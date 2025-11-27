<script lang="ts">
	import type { Snippet } from 'svelte';

	let { summary, children }: { summary: string; children: Snippet<[]> } = $props();

	let open = $state(false);
</script>

<div class="details" class:open>
	<button class="summary" onclick={() => (open = !open)}>{summary}</button>
	{#if open}
		<div class="contents">
			{@render children?.()}
		</div>
	{/if}
</div>

<style>
	.details {
		unicode-bidi: normal;
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
		padding: 0;
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
