import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 5173,

    proxy: {
      "/vue-boilerplate-firebase": {
        target: "http://127.0.0.1:5001",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },

  // string shorthand: http://localhost:5173/foo -> http://localhost:4567/foo
});
