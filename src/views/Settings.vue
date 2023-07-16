<template>
  <div class="flex flex-col">
    <div class="flex flex-col w-full items-center sm:justify-start mt-6 mb-12">
      <div class="card w-full max-w-2xl bg-base-200 shadow-xl">
        <div class="card-body">
          <div class="flex flex-col items-center" v-if="isLoading">
            <span class="loading loading-infinity loading-lg"></span>
            Loading account information...
          </div>
          <ProfileSettings />
        </div>
        <div class="card-actions justify-end"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import ProfileSettings from "../components/user/ProfileSettings.vue";
</script>
