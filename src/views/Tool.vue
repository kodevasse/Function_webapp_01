<template>
  <div class="flex flex-col">
    <div class="flex flex-col w-full h-full items-center sm:justify-start mt-6">
      <!-- First Card -->
      <div class="card w-full max-w-2xl bg-base-200 shadow-xl mb-4">
        <div class="card-body">
          <button
            :class="['btn', loading ? 'btn-loading' : 'btn-primary']"
            :disabled="loading"
            @click="chatWithGPT4"
          >
            <span v-if="loading" class="loading loading-spinner"></span>
            <span v-if="loading">Processing...</span>
            <span v-else>Test GPT-4 Chat</span>
          </button>
          <p class="flex justify-center mt-6" v-if="loading">
            <!-- <span class="loading loading-bars loading-md"></span> -->
          </p>
          <p class="font-bold mt-4" v-else-if="error">Error: {{ error }}</p>
          <p class="font-bold mt-4" v-else>
            Response: <br /><span class="font-normal">{{ response }} </span>
          </p>
        </div>
      </div>
      <!-- Second Card -->
      <div class="card w-full max-w-2xl bg-base-200 shadow-xl">
        <div class="card-body">
          <div class="form-control">
            <label class="label">
              <span class="label-text">User Prompt</span>
            </label>
            <input
              type="text"
              class="input"
              v-model="userPrompt"
              placeholder="Your user prompt here..."
            />
          </div>
          <div class="form-control mt-4">
            <label class="label">
              <span class="label-text">System Message</span>
            </label>
            <input
              type="text"
              class="input"
              v-model="systemMessage"
              placeholder="Your system message here..."
            />
          </div>
          <button
            :class="[
              'btn btn-primary mt-4',
              loading ? 'btn-loading' : 'btn-primary',
            ]"
            :disabled="loading"
            @click="chatWithGPT4"
          >
            <span v-if="loading" class="loading loading-spinner"></span>
            <span v-if="loading">Processing...</span>
            <span v-else>Send Custom Messages</span>
          </button>
        </div>
      </div>
      <!-- Test Notification Button -->
      <div class="flex flex-row flex-wrap gap-2">
        <button
          class="btn btn-success mt-4"
          @click="triggerSuccessNotification"
        >
          Test Success
        </button>
        <button class="btn btn-error mt-4" @click="triggerErrorNotification">
          Test Error
        </button>
        <button
          class="btn btn-warning mt-4"
          @click="triggerWarningNotification"
        >
          Test Warning
        </button>
        <button class="btn btn-info mt-4" @click="triggerInfoNotification">
          Test Info
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { chatGPT4 } from "@/js/firebase/index";
import { useGlobalStore } from "@/stores/globalStore.js";

let userPrompt = ref("Hello, how are you?");
let systemMessage = ref("This is a test message from system.");
let response = ref(null);
let error = ref(null);
let loading = ref(false);

const globalStore = useGlobalStore();

async function chatWithGPT4() {
  loading.value = true;
  try {
    const result = await chatGPT4({
      userPrompt: userPrompt.value,
      systemMessage: systemMessage.value,
    });
    response.value = result.data;
  } catch (err) {
    console.error("Error chatting with GPT-4: ", err);
    error.value = err;
    // Add the error to the global notifications
    globalStore.addNotification({
      id: Date.now(),
      type: "warning",
      message: "Error chatting with GPT-4: " + err,
    });
  } finally {
    loading.value = false;
  }
}

function triggerNotification() {
  globalStore.addNotification({
    id: Date.now(),
    type: "info",
    message: "This is a test notification!",
  });
}

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

// For info notification
function triggerInfoNotification() {
  globalStore.addNotification({
    id: Date.now(),
    type: "info",
    message: "This is an info notification!",
  });
}

// For error notification
function triggerErrorNotification() {
  globalStore.addNotification({
    id: Date.now(),
    type: "error",
    message: "This is an error notification!",
  });
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
