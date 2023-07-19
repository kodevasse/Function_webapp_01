<script setup>
import { onMounted } from "vue";
import { useStoreAuth } from "./stores/storeAuth";
import { RouterLink, RouterView } from "vue-router";
import NavBar from "./components/nav/NavBar.vue";
import SideBar from "./components/nav/SideBar.vue";
import NavBarSide from "@/components/nav/NavBarSide.vue";
import NavBarBottom from "@/components/nav/NavBarBottom.vue";
import Notification from "@/components/Notification.vue";
const storeAuth = useStoreAuth();
onMounted(async () => {
  // await the init function
  await storeAuth.init();
});
</script>

<template>
  <div class="flex flex-row">
    <NavBarSide v-if="storeAuth.user.id" class="md:fixed z-10" />

    <div
      class="flex flex-col w-full sm:ml-0"
      :class="storeAuth.user.id && 'lg:ml-72'"
    >
      <NavBar />
      <div
        class="flex flex-col items-center w-full h-full"
        :class="!storeAuth.user.id ?? 'p-4' | 'p-0'"
      >
        <div class="w-11/12 sm:w-full space-x-1.5 space-y-1.5 sm:mb-3 mb-24">
          <RouterView /><Notification />
        </div>
        <!-- <SideBar v-if="storeAuth.user.id" /> -->
      </div>
    </div>
  </div>
  <NavBarBottom v-if="storeAuth.user.id" class="flex lg:hidden" />
</template>

<style scoped></style>
