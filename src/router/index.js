import { createRouter, createWebHistory } from "vue-router";

const AppHome = () =>
  import(/* webpackChunkName: "AppHome" */ "@/views/AppHome.vue");
const AppEditor = () =>
  import(/* webpackChunkName: "AppEditor" */ "@/views/AppEditor.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    component: AppHome,
  },
  {
    path: "/editor",
    name: "Editor",
    component: AppEditor,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
