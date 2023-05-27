<template>
  <div class="flex flex-col items-center">
    <h2
      class="text-red-400 text-2xl font-extrabold mt-12 flex flex-col items-center"
    >
      Highscore || Resultat
    </h2>
    <div
      class="text-xl font-bold mt-4 flex"
      v-for="participant in sortedParticipants"
      :key="participant.id"
    >
      <p>
        {{ participant.displayName }}:
        <span class="text-primary font-bold">{{
          getScore(participant.userId)
        }}</span>
        poeng
      </p>
    </div>
  </div>
</template>

<script setup>
import { useStoreCompetition } from "@/stores/storeCompetition";
import { useStoreDailyActivity } from "@/stores/storeDailyActivity";
import { computed } from "vue";

const storeCompetition = useStoreCompetition();
const storeDailyActivity = useStoreDailyActivity();

const participants = storeCompetition.participants;

const getScore = (userId) => {
  return storeDailyActivity.getScores[userId] || 0;
};

const sortedParticipants = computed(() => {
  return participants
    .slice()
    .sort((a, b) => getScore(b.userId) - getScore(a.userId));
});
</script>
