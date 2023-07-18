<script setup>
import NavBar from "@/components/nav/NavBar.vue";
import { useStoreAuth } from "@/stores/storeAuth";
const storeAuth = useStoreAuth();
</script>

<template>
  <div class="flex justify-center">
    <button class="btn btn-success" v-if="storeAuth.subscription">
      Premium Feature ENABLED
    </button>
  </div>
</template>
