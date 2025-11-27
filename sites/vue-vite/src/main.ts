import { createApp } from "vue";
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import App from "./App.vue";
import HomePage from "./paths/HomePage.vue";
import PagesLayout from "./paths/PagesLayout.vue";
import Static1Page from "./paths/pages/Static1Page.vue";
import Static2Page from "./paths/pages/Static2Page.vue";
import LivePage from "./paths/pages/LivePage.vue";
import TooltipsPage from "./paths/pages/TooltipsPage.vue";
import FaqPage from "./paths/pages/FaqPage.vue";
import ListPage from "./paths/pages/ListPage.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", component: HomePage },
  {
    path: "/(.*)",
    component: PagesLayout,
    children: [
      { path: "/static-1", component: Static1Page },
      { path: "/static-2", component: Static2Page },
      { path: "/live", component: LivePage },
      { path: "/tooltips", component: TooltipsPage },
      { path: "/faq", component: FaqPage },
      { path: "/list", component: ListPage },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // always scroll to top when navigating to a new page
    return { top: 0 };
  },
});

createApp(App).use(router).mount("#app");
