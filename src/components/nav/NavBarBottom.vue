t
<template>
  <nav
    class="fixed bottom-0 left-0 w-screen shadow z-40 bg-gray-200 text-gray-800 border-t-2 border-gray-300"
  >
    <div class="flex items-center justify-between w-full h-14">
      <button
        @click="globalStore.menuOpen = !globalStore.menuOpen"
        class="text-sm font-semibold tracking-wide grow h-full flex items-center justify-center"
      >
        <IconMenu v-if="!globalStore.menuOpen" />
        <IconClose v-else />
      </button>
      <RouterLink
        to="/dashboard"
        @click="globalStore.menuOpen = false"
        :class="{ 'btn-active': isDashboardActive }"
        class="btnlocal text-sm font-semibold tracking-wide grow h-full flex items-center justify-center"
      >
        <IconHome />
      </RouterLink>
      <RouterLink
        to="/templates"
        @click="globalStore.menuOpen = false"
        :class="{ 'btn-active': isTemplatesActive }"
        class="btnlocal text-sm font-semibold tracking-wide grow h-full flex items-center justify-center"
      >
        <IconGrid />
      </RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink, useRouter, useRoute } from "vue-router";
import { ref, reactive, watchEffect } from "vue";
import { useGlobalStore } from "@/stores/globalStore";
import IconHome from "@/components/icons/IconHome.vue";
import IconMenu from "@/components/icons/IconMenu.vue";
import IconGrid from "@/components/icons/IconGrid.vue";
import IconClose from "@/components/icons/IconClose.vue";

const globalStore = useGlobalStore();

const router = useRouter();
const route = useRoute();
const isDashboardActive = route.path === "/dashboard";
const isTemplatesActive = route.path === "/templates";

watchEffect(() => {
  route.path;
  globalStore.menuOpen = false;

  console.log(route.path);
});
</script>

<style scoped>
.btnlocal {
  @apply bg-white;
}

.btnlocal-active {
  @apply bg-gray-200;
}
</style>
