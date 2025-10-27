<script lang="ts">
  import { route } from "@mateothegreat/svelte5-router";
  import { pages } from "../assets/pages";
</script>

{#each pages.entries() as [path, name] (path)}
  <li><a href={path} use:route>{name}</a></li>
{/each}
