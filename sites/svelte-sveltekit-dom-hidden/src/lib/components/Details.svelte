<script lang="ts">
	import type { Snippet } from 'svelte';

	let { summary, children }: { summary: string; children: Snippet<[]> } = $props();

	let open = $state(false);
</script>

<div class="details" class:open>
	<button class="summary" onclick={() => (open = !open)}>{summary}</button>
	<div class="contents" hidden={!open}>
		{@render children?.()}
	</div>
</div>

<style>
	.details {
		margin: 1.5em 0.5em;
		padding: 0.5em;
		background-color: var(--color-secondary);
		box-shadow: var(--drop-shadow-large);

		&.open .summary::before {
			content: '▼';
		}
	}
	.summary {
		margin: 0.2em;
		font-size: 1.1em;
		appearance: none;
		border: none;
		background: none;
		cursor: pointer;

		&::before {
			content: '▶';
			margin-right: 0.8em;
		}
	}
	.contents {
		margin: 0.2em;
	}
</style>
