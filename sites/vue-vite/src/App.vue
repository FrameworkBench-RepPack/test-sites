<script setup lang="ts">
import LinksComponent from "./components/LinksComponent.vue";
</script>

<template>
  <div>
    <RouterView />
    <footer>
      <div id="footer-content">
        <RouterLink id="footer-logo" to="/">Test site</RouterLink>
        <ul>
          <LinksComponent />
        </ul>
        <blockquote>
          Sed blandit est nec quam vulputate, id vulputate ipsum scelerisque.
          Etiam in elit ornare, fermentum nisl vel, gravida ipsum.
        </blockquote>
      </div>
    </footer>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}
:root {
  --header-height: 5rem;
  --page-width: 60rem;
  --page-padding: 1rem;

  --color-secondary: rgba(0, 255, 255);
  --color-tertiary: rgba(255, 0, 255);

  --drop-shadow-small: 0.15rem 0.15rem 1rem rgba(0, 0, 0, 0.1);
  --drop-shadow-large: 0 0 1rem rgba(0, 0, 0, 0.15);
}
body {
  margin: 0;
}
header {
  background-color: var(--color-secondary);
}
:is(header, main) + * * {
  scroll-margin-top: var(--header-height);
}
.page-width {
  max-width: var(--page-width);
  margin: 0 auto;
  padding: var(--page-padding);
}
a {
  display: inline-block;
  color: CanvasText;
  transition-property: color, translate, text-shadow;
  transition-timing-function: ease-out;
  transition-duration: 0.1s;

  &:hover,
  &:focus-visible,
  &:active {
    color: rgba(255, 0, 255, 0.7);
    translate: -0.05em -0.025em;
    text-shadow:
      0.1em 0.05em 0 rgba(0, 255, 255, 0.7),
      0.07em 0.03em 0 CanvasText;
  }
}
</style>
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
