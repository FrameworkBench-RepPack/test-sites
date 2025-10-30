<script setup lang="ts">
import LinksComponent from "../components/LinksComponent.vue";
</script>

<template>
  <div>
    <header>
      <nav>
        <ul>
          <li>
            <RouterLink to="/">
              <img id="icon" src="/favicon.svg" alt="Front page" />
            </RouterLink>
          </li>
          <LinksComponent />
        </ul>
      </nav>
    </header>
    <main class="page-width">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: var(--header-height);
  padding: 0 var(--page-padding);
  background-color: var(--color-secondary);
  box-shadow: var(--drop-shadow-small);

  & nav {
    height: 100%;
    max-width: var(--page-width);
    margin-left: auto;
    margin-right: auto;
    & > ul {
      display: flex;
      align-items: center;
      gap: 3em;
      height: 100%;
      margin: 0;
      padding: 0;
      list-style-type: none;
    }
  }
}
#icon {
  height: var(--header-height);
  aspect-ratio: 1;
  padding: 1em;
}
main {
  margin-top: var(--header-height);
}
</style>
