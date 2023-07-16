import { createRouter, createWebHistory } from "vue-router";
import { useStoreAuth } from "@/stores/storeAuth";
import { auth } from "@/js/firebase"; // Import auth here

// ROUTES
import HomeView from "../views/HomeView.vue";
import Login from "../views/Login.vue";
import Portal from "../views/Portal.vue";
import Scores from "../views/Scores.vue";
import Subscription from "../views/Subscription.vue";
import Success from "../views/Success.vue";
import Tool from "../views/Tool.vue";
import Templates from "../views/Templates.vue";
import Documents from "../views/Documents.vue";
import Examples from "../views/Examples.vue";
import Help from "../views/Help.vue";
import Faq from "../views/Faq.vue";
import Settings from "../views/Settings.vue";
import Signup from "../views/Signup.vue";
import VerifyEmail from "../views/VerifyEmail.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  { path: "/tool", name: "tool", component: Tool },
  { path: "/templates", name: "templates", component: Templates },
  {
    path: "/success",
    name: "success",
    component: Success,
  },
  {
    path: "/verify-email",
    name: "verify-email",
    component: VerifyEmail,
  },
  {
    path: "/subscription",
    name: "subscription",
    component: Subscription,
  },
  {
    path: "/documents",
    name: "documents",
    component: Documents,
  },
  {
    path: "/examples",
    name: "examples",
    component: Examples,
  },
  {
    path: "/settings",
    name: "settings",
    component: Settings,
  },
  {
    path: "/help",
    name: "help",
    component: Help,
  },
  { path: "/faq", name: "faq", component: Faq },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/portal",
    name: "portal",
    component: Portal,
    // meta: {
    //   requiredAuth: true,
    // },
  },

  {
    path: "/scores",
    name: "scores",
    component: Scores,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/templates/:name",
    name: "template",
    component: () => import("../views/TemplateView.vue"),
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
  // Allow unauthenticated user to navigate to 'login' and 'signup'
  if (!user && to.name !== "login" && to.name !== "signup") {
    return { name: "login" };
  }
  // Prevent authenticated user from navigating to 'login' and 'signup'
  if (user && (to.name === "login" || to.name === "signup")) {
    return false;
  }
});

export default router;
