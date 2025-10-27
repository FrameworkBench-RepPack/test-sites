<script setup lang="ts">
import Links from "./LinksComponent.vue";
</script>

<template>
  <footer>
    <div id="footer-content">
      <NuxtLink id="footer-logo" href="/">Test site</NuxtLink>
      <ul>
        <Links />
      </ul>
      <blockquote>
        Sed blandit est nec quam vulputate, id vulputate ipsum scelerisque.
        Etiam in elit ornare, fermentum nisl vel, gravida ipsum.
      </blockquote>
    </div>
  </footer>
</template>

<style scoped>
footer {
  width: 100%;
  padding: 0 var(--page-padding);
  box-shadow: var(--drop-shadow-small);
  background-color: var(--color-tertiary);

  & #footer-content {
    display: flex;
    justify-content: space-around;
    align-items: center;
    max-width: var(--page-width);
    margin-left: auto;
    margin-right: auto;
    padding: var(--page-padding);
    gap: 2em;

    & #footer-logo {
      text-decoration: none;
      margin: 0;
      font-size: 3rem;
    }

    & blockquote {
      width: 19rem;
    }
  }
}
</style>
