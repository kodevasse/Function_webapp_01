import "./assets/main.css";
import { createApp, markRaw } from "vue";

import { createPinia } from "pinia";
import App from "./App.vue";
import router from "@/router";
import { auth } from "@/js/firebase"; // update this line

const pinia = createPinia();
// Pinia property to route
pinia.use(({ store }) => {
  store.router = markRaw(router);
});

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(pinia).use(router).mount("#app");
  }
});
