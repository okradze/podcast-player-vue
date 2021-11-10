import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/discover",
    name: "DiscoverPodcasts",
    component: () => import("../views/DiscoverPodcasts.vue"),
  },
  {
    path: "/podcast/:id",
    name: "PodcastDetails",
    component: () => import("../views/PodcastDetails.vue"),
  },
  {
    path: "/",
    name: "Podcasts",
    component: () => import("../views/Podcasts.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
