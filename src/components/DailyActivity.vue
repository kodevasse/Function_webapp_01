<template>
  <div class="flex flex-col items-center justify-center w-full">
    <div class="sm:space-x-24 sm:mb-6">
      <button
        class="btn btn-xl sm:btn-lg text-2xl mt-4"
        @click="goToPreviousDay"
        :disabled="isFirstDay"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon animate-pulse text-primary icon-tabler icon-tabler-arrow-big-left-lines"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path
            d="M12 15v3.586a1 1 0 0 1 -1.707 .707l-6.586 -6.586a1 1 0 0 1 0 -1.414l6.586 -6.586a1 1 0 0 1 1.707 .707v3.586h3v6h-3z"
          ></path>
          <path d="M21 15v-6"></path>
          <path d="M18 15v-6"></path>
        </svg>
      </button>
      <input
        class="input sm:input-lg font-extrabold text-primary"
        type="date"
        v-model="selectedDate"
        :max="maxDate"
        :min="minDate"
      />
      <button
        class="btn btn-xl sm:btn-lg"
        @click="goToNextDay"
        :disabled="isLastDay"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon animate-pulse text-secondary icon icon-tabler icon-tabler-arrow-big-right-lines"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path
            d="M12 9v-3.586a1 1 0 0 1 1.707 -.707l6.586 6.586a1 1 0 0 1 0 1.414l-6.586 6.586a1 1 0 0 1 -1.707 -.707v-3.586h-3v-6h3z"
          ></path>
          <path d="M3 9v6"></path>
          <path d="M6 9v6"></path>
        </svg>
      </button>
    </div>
    <div class="" v-if="activity">
      <div>
        <div class="form-control w-56">
          <label class="cursor-pointer label">
            <span class="label-text text-xl text-primary font-bold"
              >Liten økt +25min</span
            >
            <input
              v-model="activity.littleExercise"
              type="checkbox"
              class="checkbox checkbox-secondary"
            />
          </label>
        </div>
        <div class="form-control">
          <label class="cursor-pointer label">
            <span class="label-text text-xl text-primary font-bold">
              Stor økt +40min</span
            >
            <input
              v-model="activity.bigExercise"
              type="checkbox"
              class="checkbox checkbox-secondary"
            />
          </label>
        </div>
        <div class="form-control">
          <label class="cursor-pointer label">
            <span class="label-text text-xl text-primary font-bold">
              Faste utført - 16/8</span
            >
            <input
              v-model="activity.completedRoutine"
              type="checkbox"
              class="checkbox checkbox-secondary"
            />
          </label>
        </div>

        <button class="btn btn-success w-full" @click="saveActivity">
          Oppdater🏃‍♂️
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";
import { useStoreDailyActivity } from "@/stores/storeDailyActivity";
import { useStoreAuth } from "@/stores/storeAuth";
const storeAuth = useStoreAuth();
const storeDailyActivity = useStoreDailyActivity();
const today = new Date();
const maxDate = today.toISOString().split("T")[0]; // Current date
const minDate = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 24
)
  .toISOString()
  .split("T")[0]; // 24 days ago
const selectedDate = ref(maxDate); // Selected date
const userId = storeAuth.user.id;

const activity = ref({}); // Activity of the selected date

const isFirstDay = computed(() => selectedDate.value === minDate);
const isLastDay = computed(() => selectedDate.value === maxDate);

const fetchActivity = async () => {
  let date = new Date(selectedDate.value);
  activity.value = await storeDailyActivity.getActivity(userId, date);
};

const saveActivity = async () => {
  const date = new Date(selectedDate.value);

  // First, try to get an existing activity for this date
  const existingActivity = await storeDailyActivity.getActivity(userId, date);

  if (existingActivity.id) {
    // An activity already exists for this date, so update it
    await storeDailyActivity.updateActivity(
      existingActivity.id,
      activity.value
    );
  } else {
    // No activity exists for this date, so create a new one
    await storeDailyActivity.addActivity(userId, date, activity.value);
  }
};

const goToPreviousDay = () => {
  const previousDay = new Date(selectedDate.value);
  previousDay.setDate(previousDay.getDate() - 1);
  selectedDate.value = previousDay.toISOString().split("T")[0];
};

const goToNextDay = () => {
  const nextDay = new Date(selectedDate.value);
  nextDay.setDate(nextDay.getDate() + 1);
  selectedDate.value = nextDay.toISOString().split("T")[0];
};

watch(selectedDate, fetchActivity);

onMounted(() => {
  setTimeout(() => fetchActivity(), 600);
});
</script>
