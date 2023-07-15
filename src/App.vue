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
    <Notification />
    <NavBarSide v-if="storeAuth.user.displayName" class="md:fixed z-10" />

    <div class="flex flex-col w-full lg:ml-72">
      <NavBar />
      <div class="flex flex-col items-center w-full h-full p-4">
        <div class="w-full space-x-1.5 space-y-1.5 sm:mb-3">
          <RouterView />
        </div>
        <!-- <SideBar v-if="storeAuth.user.displayName" /> -->
      </div>
    </div>
  </div>
  <NavBarBottom v-if="storeAuth.user.displayName" class="flex lg:hidden" />
</template>

<style scoped></style>
