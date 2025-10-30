<script setup lang="ts">
import { ref, computed } from "vue";

const clicked = ref(false);
const hovered = ref(false);
const open = computed(() => clicked.value || hovered.value);
</script>

<template>
  <span>
    <button
      class="tooltip"
      :class="{ clicked }"
      @click="clicked = !clicked"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
    >
      <p>?</p>
    </button>
    <div v-if="open" class="contents"><slot /></div>
  </span>
</template>

<style scoped>
.tooltip {
  --size: 1.5em;

  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  border: 0.1em solid black;
  border-radius: 100%;
  width: var(--size);
  height: var(--size);
  background-color: var(--color-secondary);

  &.clicked {
    background-color: var(--color-tertiary);
  }

  & p {
    margin: 0;
    padding: 0;
    font-size: 0.9em;
  }
}
.contents {
  --width: 40rem;
  position: absolute;
  left: calc(50vw - calc(var(--width) / 2));
  width: var(--width);
  padding: 0.5em;
  border: 0.1em solid black;
  border-radius: 0.3em;
  background-color: var(--color-secondary);
  box-shadow: var(--drop-shadow-large);
}
</style>
