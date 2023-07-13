<template>
  <nav
    class="fixed bottom-0 left-0 w-screen shadow z-40 bg-base-100 text-gray-800 border-t-2 border-gray-300"
  >
    <div class="flex items-center justify-between w-full h-14">
      <button
        @click="globalStore.menuOpen = !globalStore.menuOpen"
        class="text-sm font-semibold tracking-wide grow h-full flex items-center justify-center"
        :class="{ 'bg-base-200': globalStore.menuOpen }"
      >
        <IconMenu v-if="!globalStore.menuOpen" />
        <IconClose v-else />
      </button>
      <RouterLink
        to="/tool"
        @click="globalStore.menuOpen = false"
        :class="{ 'knappen-active': isDashboardActive }"
        class="knappen text-sm font-semibold tracking-wide grow h-full flex items-center justify-center"
      >
        <IconHome />
      </RouterLink>
      <RouterLink
        to="/templates"
        @click="globalStore.menuOpen = false"
        :class="{ 'knappen-active': isTemplatesActive }"
        class="knappen text-sm font-semibold tracking-wide grow h-full flex items-center justify-center"
      >
        <IconGrid />
      </RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink, useRouter, useRoute } from "vue-router";
import { ref, reactive, watchEffect, computed } from "vue";
import { useGlobalStore } from "@/stores/globalStore";
import IconHome from "@/components/icons/IconHome.vue";
import IconMenu from "@/components/icons/IconMenu.vue";
import IconGrid from "@/components/icons/IconGrid.vue";
import IconClose from "@/components/icons/IconClose.vue";

const globalStore = useGlobalStore();

const route = useRoute();
const isDashboardActive = computed(() => route.path === "/tool");
const isTemplatesActive = computed(() => route.path === "/templates");

watchEffect(() => {
  route.path;
  globalStore.menuOpen = false;

  console.log(route.path);
});
</script>

<style scoped>
.knappen {
  @apply bg-base-100;
}

.knappen-active {
  @apply bg-base-200;
}
</style>
