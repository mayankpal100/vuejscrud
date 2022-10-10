import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import List from "@/components/List.vue";
import Edit from "@/components/Edit.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: List,
    },
    {
      path: "/list",
      name: "list",
      component: List,
    },
    {
      path: "/edit/:id",
      name: "edit",
      component: Edit,
    },
    {
      path: "/create",
      name: "create",
      component: Edit,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
