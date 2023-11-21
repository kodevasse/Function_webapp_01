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
import { getFunctions, httpsCallable } from "firebase/functions";

const startPayment = async () => {
  const functions = getFunctions();
  const initiatePayment = httpsCallable(functions, "createVippsPayment");

  try {
    const response = await initiatePayment({
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
