<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const open = ref(false);
const tooltip = ref<HTMLElement | undefined>();
const contents = ref<HTMLElement | undefined>(undefined);

function handleLightDismiss(event: MouseEvent) {
  const target = event.target as Node;
  if (
    contents.value &&
    target !== tooltip.value &&
    target !== contents.value &&
    !contents.value.contains(target)
  ) {
    open.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleLightDismiss);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleLightDismiss);
});
</script>

<template>
  <span>
    <button ref="tooltip" class="tooltip" @click="open = !open">?</button>
    <span v-if="open" ref="contents" class="contents"><slot /></span>
  </span>
</template>

<style scoped>
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
