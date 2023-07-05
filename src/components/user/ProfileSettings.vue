<template>
  <!-- Vis brukerinformasjon og legg til inngangsbindinger og knappen for å sende oppdatering -->
  <div v-if="loading" class="loading">Loading...</div>
  <div v-else class="w-full flex flex-col">
    <h1>User Profile</h1>
    <p>ID: {{ user.id }}</p>
    <p>Email: {{ user.email }}</p>
    <p>Name: {{ user.displayName }}</p>
    <p>Photo URL: {{ user.photoURL }}</p>

    <label for="favoriteFood">Favorite Food</label>
    <input
      v-model="storeAuth.user.favoriteFood"
      id="favoriteFood"
      type="text"
    />

    <label for="age">Age</label>
    <input v-model="storeAuth.user.age" id="age" type="number" />
    <label for="options">Options</label>
    <button
      :class="{
        'bg-blue-500 text-white': storeAuth.user.selectedOption === 'Option 1',
        'bg-gray-200 text-black': storeAuth.user.selectedOption !== 'Option 1',
      }"
      @click="updateOption('Option 1')"
    >
      Option 1
    </button>
    <button
      :class="{
        'bg-blue-500 text-white': storeAuth.user.selectedOption === 'Option 2',
        'bg-gray-200 text-black': storeAuth.user.selectedOption !== 'Option 2',
      }"
      @click="updateOption('Option 2')"
    >
      Option 2
    </button>
    <button
      :class="{
        'bg-blue-500 text-white': storeAuth.user.selectedOption === 'Option 3',
        'bg-gray-200 text-black': storeAuth.user.selectedOption !== 'Option 3',
      }"
      @click="updateOption('Option 3')"
    >
      Option 3
    </button>
    <button
      :class="{
        'bg-blue-500 text-white': storeAuth.user.selectedOption === 'Option 4',
        'bg-gray-200 text-black': storeAuth.user.selectedOption !== 'Option 4',
      }"
      @click="updateOption('Option 4')"
    >
      Option 4
    </button>

    <button @click="updateProfile">Update Profile</button>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from "vue";
import { useStoreAuth } from "@/stores/storeAuth";
const storeAuth = useStoreAuth();
// This will ensure the user data is reactive
const user = computed(() => storeAuth.user);
const loading = computed(() => storeAuth.loading);

// Method to update the selected option
const updateOption = (option) => {
  storeAuth.user.selectedOption = option;
};

// Metode for å oppdatere profil
const updateProfile = () => {
  const newData = {
    favoriteFood: storeAuth.user.favoriteFood,
    age: storeAuth.user.age,
    selectedOption: storeAuth.user.selectedOption, // Include the selectedOption in the updated data
  };
  storeAuth.updateUserProfile(newData);
};
</script>
