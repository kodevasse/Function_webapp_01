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
      <div class="space-y-4 mt-6 flex flex-col w-11/12">
        <!-- Join and Quit buttons -->
        <button
          class="btn btn-secondary"
          @click="storeCompetition.joinCompetition"
          v-if="!storeCompetition.isParticipant"
        >
          BLI MED PÅ KONKURRANSEN🤩
        </button>
        <button
          class="btn btn-error"
          @click="storeCompetition.quitCompetition"
          v-if="storeCompetition.isParticipant"
        >
          JEG VIL IKKE MER😪
        </button>

        <!-- Participant list -->
        <span class="text-primary font-bold">Påmeldte</span>
        <div
          v-for="participant in storeCompetition.participants"
          :key="participant.userId"
        >
          <p>{{ participant.displayName }}</p>
          <p>Ble med: {{ participant.joinDate }}</p>
          <p>Poeng: {{ participant.score }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStoreAuth } from "@/stores/storeAuth";
import { useStoreCompetition } from "@/stores/storeCompetition";
const storeAuth = useStoreAuth();

const storeCompetition = useStoreCompetition();

onMounted(() => {
  storeCompetition.init();
});
</script>

<style scoped></style>
