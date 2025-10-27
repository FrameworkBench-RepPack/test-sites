<script lang="ts">
  import {
    route,
    Router,
    type RouteConfig,
  } from "@mateothegreat/svelte5-router";
  import Static1 from "./Static1.svelte";
  import Static2 from "./Static2.svelte";
  import Live from "./Live.svelte";
  import Tooltips from "./Tooltips.svelte";
  import FAQ from "./FAQ.svelte";
  import List from "./List.svelte";
  import Links from "../../components/links.svelte";

  const routes: RouteConfig[] = [
    { path: "/static-1", component: Static1 },
    { path: "/static-2", component: Static2 },
    { path: "/live", component: Live },
    { path: "/tooltips", component: Tooltips },
    { path: "/faq", component: FAQ },
    { path: "/list", component: List },
  ];
</script>

<header>
  <nav>
    <ul>
      <li>
        <a href="/" use:route
          ><img id="icon" src="/favicon.svg" alt="Front page" /></a
        >
      </li>
      <Links />
    </ul>
  </nav>
</header>
<main class="page-width">
  <Router {routes} />
</main>

<style>
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
