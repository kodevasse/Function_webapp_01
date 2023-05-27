<script setup>
import { ref, watch, computed } from "vue";
import { useStoreDailyActivity } from "@/stores/storeDailyActivity";

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

const activity = ref({}); // Activity of the selected date

const isFirstDay = computed(() => selectedDate.value === minDate);
const isLastDay = computed(() => selectedDate.value === maxDate);

const fetchActivity = async () => {
  // This will ensure that selectedDate.value is in the correct format
  let date = new Date(selectedDate.value);
  if (isNaN(date.getTime())) {
    // selectedDate.value is not a valid date string. Handle this situation as you see fit.
    console.error(`Invalid date: ${selectedDate.value}`);
    return;
  }

  // If we made it here, date is a valid Date object and we can pass it to getActivity.
  activity.value = await storeDailyActivity.getActivity(date);
};

const saveActivity = async () => {
  // Make sure selectedDate.value is a valid date string
  const date = new Date(selectedDate.value);
  if (isNaN(date.getTime())) {
    // selectedDate.value is not a valid date string. Handle this situation as you see fit.
    console.error(`Invalid date: ${selectedDate.value}`);
    return;
  }

  if (activity.value.id) {
    await storeDailyActivity.updateActivity(activity.value.id, activity.value);
  } else {
    // Pass date to addActivity instead of activity.value
    await storeDailyActivity.addActivity(date, activity.value);
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
</script>
