<template>
  <div class="flex flex-col w-full items-center">
    <!-- Vis brukerinformasjon og legg til inngangsbindinger og knappen for å sende oppdatering -->
    <div v-if="loading" class="">Loading...</div>
    <div v-else class="w-full flex flex-col">
      <h2 class="font-bold mb-4">User profile</h2>
      <p>ID: {{ user.id }}</p>
      <p>Email: {{ user.email }}</p>
      <p>Name: {{ user.displayName }}</p>
      <div class="mt-4 w-full flex flex-col">
        <label for="favoriteFood">Favorite Food</label>
        <input
          class="input input-bordered"
          v-model="storeAuth.user.favoriteFood"
          id="favoriteFood"
          type="text"
        />

        <label for="age">Age</label>
        <input
          class="input input-bordered"
          v-model="storeAuth.user.age"
          id="age"
          type="number"
        />
      </div>

      <div class="mt-4">
        <label for="options">Options</label>
      </div>
      <div class="mt-1 flex flex-row w-full">
        <button
          class="btn btn-ghost w-1/4"
          :class="{
            'bg-secondary ': storeAuth.user.selectedOption === 'Option 1',
            ' text-gray-400': storeAuth.user.selectedOption !== 'Option 1',
          }"
          @click="updateOption('Option 1')"
        >
          Option 1
        </button>
        <button
          class="btn btn-ghost w-1/4"
          :class="{
            'bg-secondary ': storeAuth.user.selectedOption === 'Option 2',
            ' text-gray-400': storeAuth.user.selectedOption !== 'Option 2',
          }"
          @click="updateOption('Option 2')"
        >
          Option 2
        </button>
        <button
          class="btn btn-ghost w-1/4"
          :class="{
            'bg-secondary ': storeAuth.user.selectedOption === 'Option 3',
            ' text-gray-400': storeAuth.user.selectedOption !== 'Option 3',
          }"
          @click="updateOption('Option 3')"
        >
          Option 3
        </button>
        <button
          class="btn btn-ghost w-1/4"
          :class="{
            'bg-secondary ': storeAuth.user.selectedOption === 'Option 4',
            ' text-gray-400': storeAuth.user.selectedOption !== 'Option 4',
          }"
          @click="updateOption('Option 4')"
        >
          Option 4
        </button>
      </div>
      <button
        class="btn mt-4 btn-neutral"
        @click="updateProfile"
        :disabled="!isFormDirty"
      >
        Update Profile
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from "vue";
import { useStoreAuth } from "@/stores/storeAuth";
const storeAuth = useStoreAuth();
// This will ensure the user data is reactive
const user = computed(() => storeAuth.user);
const loading = computed(() => storeAuth.loading);
let originalUserData = reactive({});

onMounted(() => {
  originalUserData = { ...storeAuth.user };
});

watch(
  () => storeAuth.user,
  (newVal, oldVal) => {
    if (JSON.stringify(newVal) !== JSON.stringify(originalUserData)) {
      isFormDirty.value = true;
    } else {
      isFormDirty.value = false;
    }
  },
  { deep: true }
);

const isFormDirty = ref(false);
// For success notification
function triggerSuccessNotification() {
  globalStore.addNotification({
    id: Date.now(),
    type: "success",
    message: "User data updated successfully!",
  });
}
// For warning notification
function triggerWarningNotification() {
  globalStore.addNotification({
    id: Date.now(),
    type: "warning",
    message: "There was an issue updating user data!",
  });
}
// Method to update the selected option
const updateOption = (option) => {
  storeAuth.user.selectedOption = option;
};

// Metode for å oppdatere profil
const updateProfile = () => {
  const newData = {
    favoriteFood: storeAuth.user.favoriteFood || "",
    age: storeAuth.user.age || "",
    selectedOption: storeAuth.user.selectedOption, // Include the selectedOption in the updated data
  };
  storeAuth.updateUserProfile(newData);
  originalUserData = { ...storeAuth.user };
  isFormDirty.value = false;
};
</script>
