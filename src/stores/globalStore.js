// a pinia store is a function that returns a store definition

import { defineStore } from "pinia";

export const useGlobalStore = defineStore({
  // unique name of the store across your application (required)
  id: "global",
  // a function that returns a fresh state
  state: () => ({
    menuOpen: false,
    search: "",
    notifications: [],
    // the state of your store
    // ...
  }),
  // optional getters
  getters: {
    menuStatus: (state) => {
      return state.menuOpen;
    },
  },
  // optional actions
  actions: {
    addNotification(notification) {
      this.notifications.push(notification);

      setTimeout(() => {
        this.removeNotification(notification.id);
      }, 5000);
    },

    removeNotification(id) {
      const index = this.notifications.findIndex((n) => n.id === id);
      if (index !== -1) this.notifications.splice(index, 1);
    },
  },
});
