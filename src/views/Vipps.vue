<template>
  <div class="flex flex-col">
    <div class="flex flex-col w-full h-full items-center sm:justify-start mt-6">
      <!-- First Card -->
      <div class="card w-full max-w-2xl bg-base-200 shadow-xl mb-4">
        <div class="card-body">
          <button @click="startPayment">Pay with Vipps</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import { createVippsPayment } from "@/js/firebase/index";

const startPayment = async () => {
  try {
    const response = await createVippsPayment({
      amount: 1000, // Amount in øre (10.00 NOK)
      phoneNumber: "4791234567", // Example phone number
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
