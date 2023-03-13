import { createRouter, createWebHistory } from "vue-router";

const AppHome = () =>
  import(/* webpackChunkName: "AppHome" */ "@/views/AppHome.vue");
const AppEditor = () =>
  import(/* webpackChunkName: "AppEditor" */ "@/views/AppEditor.vue");

const NotFound = () =>
  import(/* webpackChunkName: "NotFound" */ "@/views/NotFound.vue");

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
  {
    path: "/:pathName(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
