<template>
  <div class="flex flex-col">
    <div class="flex flex-col w-full h-full items-center sm:justify-start mt-6">
      <!-- First Card -->
      <div
        class="card w-full max-w-2xl bg-base-200 shadow-xl mb-4 items-center"
      >
        <input
          class="input input-bordered w-full max-w-lg m-4"
          v-model="amount"
          type="number"
          placeholder="Amount in øre (10.00 NOK)"
        />
        <div class="card-body">
          <button @click="startPayment">Pay with Vipps</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import { createVippsPaymentSession } from "@/js/firebase/index";

const amount = ref();
const startPayment = async () => {
  try {
    const response = await createVippsPaymentSession({
      amount: amount.value, // Amount in øre (10.00 NOK)
      // phoneNumber: "4791234567", // Example phone number
      returnUrl: "http://example.com/redirect",
    });

    if (response.data.paymentUrl) {
      window.location.href = response.data.paymentUrl;
    }
  } catch (error) {
    console.error("Error initiating payment:", error);
  }
};
</script>
