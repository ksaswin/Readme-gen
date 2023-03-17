import { createRouter, createWebHistory } from "vue-router";


const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import('@/views/AppHome.vue')
  },
  {
    path: "/editor",
    name: "Editor",
    component: () => import('@/views/AppEditor.vue')
  },
  {
    path: "/:pathName(.*)*",
    name: "NotFound",
    component: () => import('@/views/NotFound.vue')
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
