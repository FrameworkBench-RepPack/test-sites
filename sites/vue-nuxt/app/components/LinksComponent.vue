<script setup lang="ts">
import { pages } from "~/assets/pages";
</script>

<template>
  <li v-for="[path, name] in pages.entries()" :key="path">
    <NuxtLink :href="path">{{ name }}</NuxtLink>
  </li>
</template>
