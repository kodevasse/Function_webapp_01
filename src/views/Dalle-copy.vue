<template>
  <div class="flex flex-col">
    <div class="flex flex-col w-full h-full items-center sm:justify-start mt-6">
      <!-- First Card -->
      <div class="card w-full max-w-2xl bg-base-200 shadow-xl mb-4">
        <div class="card-body">
          <span class="font-bold">DALL-E</span>

          <div class="mt-4">
            <input
              v-model="textPrompt"
              class="input input-bordered w-full"
              placeholder="Enter text here..."
            />
            <button @click="generateImage" class="btn btn-primary mt-2">
              Generate Image
            </button>
          </div>

          <div class="mt-4">
            <h2 class="text-xl">Generated Image:</h2>
            <img
              v-if="generatedImageUrl"
              :src="generatedImageUrl"
              class="mt-2"
            />
          </div>

          <div class="mt-4">
            <h2 class="text-xl">Your Image Library:</h2>
            <div v-for="url in imageLibrary" :key="url" class="mt-2">
              <img :src="url" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useStoreDalle } from "@/stores/storeDalle";
import { createImageFromText } from "@/js/firebase/index";

let textPrompt = ref("");

const storeDalle = useStoreDalle();
const generateImage = async () => {
  if (textPrompt.value.trim()) {
    const imageUrl = await createImageFromText(textPrompt.value);
    storeDalle.setGeneratedImage(imageUrl);
  }
};

let generatedImageUrl = computed(() => storeDalle.generatedImageUrl);
let imageLibrary = computed(() => storeDalle.imageLibrary);
</script>
