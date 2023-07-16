<template>
  <transition-group class="" name="slide" tag="div">
    <div
      v-for="notification in notifications"
      :key="notification.id"
      :class="`alert bg-pink-400 fixed z-40 top-14 right-0 sm:w-1/2 w-full flex flex-row alert-${notification.type}`"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{{ notification.message }}</span>
    </div>
  </transition-group>
</template>

<script setup>
import { useGlobalStore } from "@/stores/globalStore";
const globalStore = useGlobalStore();
const notifications = globalStore.notifications;
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}
</style>
