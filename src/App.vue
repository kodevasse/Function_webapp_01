<script setup>
import { onMounted } from "vue";
import { useStoreAuth } from "./stores/storeAuth";
import { RouterLink, RouterView } from "vue-router";
import NavBar from "./components/nav/NavBar.vue";
const storeAuth = useStoreAuth();
onMounted(async () => {
  // await the init function
  await storeAuth.init();
});
</script>

<template>
  <div class="">
    <header>
      <div class="">
        <nav>
          <NavBar />
        </nav>
      </div>
    </header>

    <RouterView />
  </div>
</template>

<style scoped></style>
