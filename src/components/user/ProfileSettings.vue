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
    <input v-model="favoriteFood" id="favoriteFood" type="text" />

    <label for="age">Age</label>
    <input v-model="age" id="age" type="number" />

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

// Define the refs with initial data from the user
let favoriteFood = ref(user.value.favoriteFood || "");
let age = ref(user.value.age || "");

// watch for changes in user data and update the refs accordingly
watch(user, (newUser) => {
  favoriteFood.value = newUser.favoriteFood || "";
  age.value = newUser.age || "";
});

// Metode for å oppdatere profil
const updateProfile = () => {
  const newData = {
    favoriteFood: favoriteFood.value,
    age: age.value,
  };
  storeAuth.updateUserProfile(newData);
};
</script>
