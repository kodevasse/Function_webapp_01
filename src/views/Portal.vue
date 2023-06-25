<template>
  <div
    class="min-h-screen overflow-none flex flex-col flex-wrap items-center py-5 px-4 sm:px-6 lg:px-8"
  >
    <div
      class="flex flex-col w-full justify-center items-center"
      v-if="storeAuth.user"
    >
      <h2 class="mt-2 text-center text-2xl font-extrabold">
        Velkommen {{ storeAuth.user.displayName }}
      </h2>
      <ProfileSettings />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStoreAuth } from "@/stores/storeAuth";
import { useStoreCompetition } from "@/stores/storeCompetition";
import ProfileSettings from "@/components/user/ProfileSettings.vue";
const storeAuth = useStoreAuth();

const storeCompetition = useStoreCompetition();
</script>

<style scoped></style>
