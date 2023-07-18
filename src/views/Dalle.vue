<template>
  <div class="flex flex-col">
    <div class="flex flex-col w-full h-full items-center sm:justify-start mt-6">
      <!-- First Card -->
      <div class="card w-full max-w-2xl bg-base-200 shadow-xl mb-4">
        <div class="card-body">
          <span class="font-bold">DALL-E</span>

          <div class="mt-4 w-full flex flex-col">
            <input
              v-model="textPrompt"
              class="input input-bordered w-full"
              placeholder="Enter text here..."
              :disabled="loading"
            />
            <button
              :class="['btn', loading ? 'btn-loading' : 'btn-primary']"
              :disabled="loading"
              @click="generateImage"
              class="mt-2 flex justify-center w-full"
            >
              <span v-if="loading">Processing...</span>
              <span v-if="loading" class="loading loading-spinner"></span>

              <span v-else>Generate Image</span>
            </button>
          </div>

          <div class="mt-4 w-full flex flex-col">
            <h2 class="text-xl">Generated Image:</h2>
            <img
              v-if="storeDalle.generatedImageUrl"
              :src="storeDalle.generatedImageUrl"
              class="mt-2 rounded-box"
            />
            <button
              @click="saveImage(storeDalle.generatedImageUrl)"
              class="btn btn-success mt-2"
              :disabled="!storeDalle.generatedImageUrl"
            >
              Save Image
            </button>
          </div>

          <div class="rounded-md w-full flex flex-wrap flex-row">
            <div
              v-for="image in imageLibrary"
              :key="image.id"
              class="flex flex-col m-1"
            >
              <img
                :src="image.url"
                class="w-[5.5rem] rounded-md cursor-pointer"
                @click="openImageModal(image)"
              />
              <button
                v-if="image.url"
                @click="deleteImage(image)"
                class="btn bg-secondary btn-xs mt-2"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="showModal"
    class="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
        @click="showModal = false"
      ></div>

      <div
        class="inline-block align-bottom bg-base-200 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full w-full"
      >
        <div class="bg-base-200 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div
              class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full rounded-md"
            >
              <img :src="selectedImage.url" class="w-full h-auto rounded-md" />
            </div>
          </div>
        </div>
        <div
          class="flex flex-row border-t border-base-300 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse justify-between"
        >
          <a :href="selectedImage.url" download class="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25"
              />
            </svg>
          </a>
          <button
            type="button"
            class="btn ghost ml-2"
            @click="showModal = false"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
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

// modal
const showModal = ref(false);
const selectedImage = ref(null);

const openImageModal = (image) => {
  selectedImage.value = image;
  showModal.value = true;
};

// component
const storeAuth = useStoreAuth();
const route = useRoute();
const router = useRouter();
const loading = ref(false);
let textPrompt = ref("");

const storeDalle = useStoreDalle();
const generateImage = async () => {
  if (textPrompt.value) {
    loading.value = true;
    const response = await createImageFromText({
      prompt: textPrompt.value,
      n: 1,
      size: "256x256",
    });
    console.log(response.data.data);
    const imageUrl = await response.data.data[0].url;
    storeDalle.setGeneratedImage(imageUrl);

    loading.value = false;
  }
};
const saveImage = async (url) => {
  await storeDalle.saveImage(url);
  await storeDalle.fetchUserImages();
};
const deleteImage = async (url) => {
  await storeDalle.deleteImage(url);
};
onMounted(async () => {
  if (route.path === "/dalle") {
    if (storeAuth.user.id) {
      await storeDalle.fetchUserImages();
    }
  }
});

let generatedImageUrl = computed(() => storeDalle.generatedImageUrl);
let imageLibrary = computed(() =>
  storeDalle.imageLibrary.sort((a, b) => b.id - a.id)
);
</script>
