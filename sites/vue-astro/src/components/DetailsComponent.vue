<script setup lang="ts">
import { ref } from "vue";

const { summary } = defineProps<{
  summary: string;
}>();

const open = ref(false);
</script>

<template>
  <div class="details" :class="{ open }">
    <button class="summary" @click="open = !open">{{ summary }}</button>
    <div v-if="open" class="contents">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.details {
  margin: 1.5em 0.5em;
  padding: 0.5em;
  background-color: var(--color-secondary);
  box-shadow: var(--drop-shadow-large);

  &.open .summary::before {
    content: "▼";
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
    content: "▶";
    margin-right: 0.8em;
  }
}
.contents {
  margin: 0.2em;
}
</style>
