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
              v-if="storeDalle.generatedImageUrl"
              :src="storeDalle.generatedImageUrl"
              class="mt-2 rounded-box"
            />
          </div>

          <!-- <div class="mt-4 w-full">
            <h2 class="text-xl">Your Image Library:</h2>
            <div
              v-for="url in imageLibrary"
              :key="url"
              class="mt-2 flex justify-start w-1/3 bg-red-300"
            >
              <img class="" :src="url" />
            </div>
          </div> -->
          <div class="carousel rounded-box w-full">
            <div
              v-for="url in imageLibrary"
              :key="url"
              class="carousel-item w-1/2"
            >
              <img :src="url" class="w-full" />
              <button @click="testSaveImage(url)" class="btn btn-primary mt-2">
                Save Image
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStoreDalle } from "@/stores/storeDalle";
import { createImageFromText } from "@/js/firebase/index";
import { useRoute, useRouter } from "vue-router";
import { useStoreAuth } from "@/stores/storeAuth";

const storeAuth = useStoreAuth();
const route = useRoute();
const router = useRouter();
let textPrompt = ref("");

const storeDalle = useStoreDalle();
const generateImage = async () => {
  if (textPrompt.value) {
    const response = await createImageFromText({
      prompt: textPrompt.value,
      n: 1,
      size: "1024x1024",
    });
    console.log(response.data.data);
    const imageUrl = await response.data.data[0].url; // change this line
    storeDalle.setGeneratedImage(imageUrl);
  }
};
const saveImage = async (url) => {
  await storeDalle.saveImage(url);
};
const testSaveImage = async () => {
  await storeDalle.testSaveImage(imageLibrary.value);
};

onMounted(async () => {
  if (route.path === "/dalle") {
    if (storeAuth.user.id) {
      await storeDalle.fetchUserImages();
    }
  }
});

let generatedImageUrl = computed(() => storeDalle.generatedImageUrl);
let imageLibrary = computed(() => storeDalle.imageLibrary);
</script>
