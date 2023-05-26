import { createRouter, createWebHistory } from "vue-router";
import { useStoreAuth } from "@/stores/storeAuth";
import { auth } from "@/js/firebase"; // Import auth here

// ROUTES
import HomeView from "../views/HomeView.vue";
import Login from "../views/Login.vue";
import Portal from "../views/Portal.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/portal",
    name: "portal",
    component: Portal,
  },

  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (About.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import('../views/AboutView.vue')
  // }
];
// navigation routes
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// navigation guards ENABLE LATER
router.beforeEach(async (to, from) => {
  const user = auth.currentUser;
  if (!user && to.name !== "login") {
    return { name: "login" };
  }
  if (user && to.name === "login") {
    return false;
  }
});

export default router;
