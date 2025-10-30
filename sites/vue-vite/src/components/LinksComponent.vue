<script setup lang="ts">
import { RouterLink } from "vue-router";
import { pages } from "../assets/pages";
</script>

<template>
  <li v-for="[path, name] in pages.entries()" :key="path">
    <RouterLink :to="path">{{ name }}</RouterLink>
  </li>
</template>
