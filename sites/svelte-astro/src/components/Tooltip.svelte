<script lang="ts">
  import type { Snippet } from "svelte";

  let { children }: { children: Snippet<[]> } = $props();

  let open = $state(false);

  let tooltip: HTMLElement | undefined = $state();
  let contents: HTMLElement | undefined = $state(undefined);

  function handleLightDismiss(event: MouseEvent) {
    const target = event.target as Node;
    if (
      contents &&
      target !== tooltip &&
      target !== contents &&
      !contents.contains(target)
    ) {
      open = false;
    }
  }
</script>

<svelte:document onclick={handleLightDismiss} />

<button class="tooltip" onclick={() => (open = !open)} bind:this={tooltip}>
  ?
</button>
{#if open}
  <span class="contents" bind:this={contents}>
    {@render children?.()}
  </span>
{/if}

<style>
  .tooltip {
    --size: 1.5em;

    padding: 0;
    border: 0.1em solid black;
    border-radius: 100%;
    width: var(--size);
    height: var(--size);
    background-color: var(--color-secondary);
    cursor: pointer;
  }
  .contents {
    display: block;
    position: fixed;
    max-width: 40rem;
    width: fit-content;
    height: fit-content;
    margin: auto;
    inset: 0px;
    padding: 0.5em;
    border: 0.1em solid black;
    border-radius: 0.3em;
    background-color: var(--color-secondary);
    box-shadow: var(--drop-shadow-large);
  }
</style>
