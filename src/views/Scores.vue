<template>
  <div
    class="border-secondary border flex flex-col justify-center items-center sm:mx-36 mx-2 p-6 rounded-lg"
  >
    <h2 class="text-primary font-mono text-xl">
      KONKURRANSEN🤩 - Mai tur skift 3
    </h2>
    <DailyActivity />
    <Highscore />
  </div>
</template>

<script setup>
import DailyActivity from "../components/DailyActivity.vue";
import Highscore from "../components/Highscore.vue";
</script>
