<template>
  <div class="flex flex-row">
    <div class="flex flex-col w-full">
      <div class="flex flex-row mb-4">
        <h2 class="font-bold">Subscribed Account</h2>
        <svg
          class="text-success w-6 h-6 ml-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div
        class="alert alert-warning-content"
        v-if="subscription.cancel_at_period_end"
      >
        This subscription will cancel at the end of the period.
      </div>
      <p>
        Current period start:
        {{
          new Date(
            subscription.current_period_start.seconds * 1000
          ).toLocaleString()
        }}
      </p>

      <p>
        Current period end:
        {{
          new Date(
            subscription.current_period_end.seconds * 1000
          ).toLocaleString()
        }}
      </p>

      <button
        class="btn btn-primary mt-6"
        :disabled="isLoading"
        @click="openCustomerPortal"
      >
        {{ isLoading ? "Loading..." : "Open my billing portal" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/js/firebase";

const props = defineProps({
  subscription: {
    type: Object,
  },
});

const isLoading = ref(false);

const openCustomerPortal = async () => {
  isLoading.value = true;

  const functionRef = httpsCallable(
    functions,
    "ext-firestore-stripe-payments-createPortalLink"
  );

  const { data } = await functionRef({ returnUrl: window.location.origin });
  window.location.assign(data.url);
};
</script>
