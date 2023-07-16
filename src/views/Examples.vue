<template>
  <div class="flex flex-col">
    <div class="flex flex-col w-full h-full items-center sm:justify-start mt-6">
      <!-- First Card -->
      <div class="card w-full max-w-2xl bg-base-200 shadow-xl mb-4">
        <div class="card-body">
          Examples
          <!-- <button
              :class="['btn', loading ? 'btn-loading' : 'btn-primary']"
              :disabled="loading"
              @click="chatWithGPT4"
            >
              <span v-if="loading" class="loading loading-spinner"></span>
              <span v-if="loading">Processing...</span>
              <span v-else>Test GPT-4 Chat</span>
            </button>
            <p class="flex justify-center mt-6" v-if="loading">
              
            </p>
            <p class="font-bold mt-4" v-else-if="error">Error: {{ error }}</p>
            <p class="font-bold mt-4" v-else>
              Response: <br /><span class="font-normal">{{ response }} </span>
            </p> -->
        </div>
      </div>
    </div>
  </div>
</template>
