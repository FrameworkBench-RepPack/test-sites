<script setup lang="ts">
import LayoutHeader from "~/components/LayoutHeader.vue";
import LayoutFooter from "~/components/LayoutFooter.vue";
</script>

<template>
  <div>
    <LayoutHeader />
    <main class="page-width">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>

<style scoped>
main {
  margin-top: var(--header-height);
}
</style>
