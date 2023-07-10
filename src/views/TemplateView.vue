<template>
  <div class="flex flex-row">
    <div class="flex flex-col w-full">
      <div class="flex flex-col items-center w-full h-full p-2">
        TemplateView
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// sort catValues2 alphabetically with a function

const catValues2 = ref([]);

const tester = () => {
  console.log(activeCategory.value);
};
</script>

<style scoped>
.active {
  @apply bg-blue-700 text-white;
}
</style>
