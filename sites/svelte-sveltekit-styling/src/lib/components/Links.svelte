<script lang="ts">
	import { resolve } from '$app/paths';
	import { pages } from '$lib/assets/pages';
</script>

{#each pages.entries() as [path, name] (path)}
	<li><a href={resolve(path)}>{name}</a></li>
{/each}
