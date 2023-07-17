<template>
  <div>
    <button @click="generateImage" class="btn btn-primary">
      Generate Image
    </button>

    <div v-if="images.length">
      <h2>Generated Images:</h2>
      <div v-for="image in images" :key="image.url">
        <img :src="image.url" class="mt-2" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { createImageFromText } from "@/js/firebase/index";

let images = ref([]);
const generateImage = async () => {
  const result = await createImageFromText({
    prompt: "An elephant in the wild",
    n: 1,
    size: "1024x1024",
  });

  images.value = result.data.data;
};
</script>
