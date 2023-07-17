<template>
  <div
    class="p-10 w-screen h-screen flex flex-col items-center justify-center bg-gray-50"
  >
    <h1 class="font-semibold text-3xl mb-4">Email Verification Required</h1>
    <p class="mb-4 text-gray-600 max-w-sm text-center">
      Thanks for signing up! Before we get started, we need to confirm your
      email address. We've sent an email to the address you provided. Please
      check your email and click on the verification link.
    </p>
    <button @click="resendVerificationEmail" class="btn btn-primary mb-4">
      Resend Verification Email
    </button>
    <p class="text-gray-600">
      If you're having trouble, please
      <a href="mailto:support@yourapp.com" class="text-blue-600 underline"
        >contact our support team</a
      >.
    </p>
    <button @click="checkEmailVerification" class="btn btn-secondary mt-4">
      I've verified my email
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  onAuthStateChanged,
  sendEmailVerification,
  getRedirectResult,
} from "firebase/auth";
import { useGlobalStore } from "@/stores/globalStore";
import { auth } from "@/js/firebase";
import { db } from "@/js/firebase";

import { useRouter } from "vue-router";

const router = useRouter();

const globalStore = useGlobalStore();

const resendVerificationEmail = async () => {
  const user = auth.currentUser;
  if (user) {
    await sendEmailVerification(user)
      .then(() => {
        globalStore.addNotification({
          id: Date.now(),
          type: "success",
          message: "Verification email resent. Please check your email.",
        });
      })
      .catch((error) => {
        globalStore.addNotification({
          id: Date.now(),
          type: "error",
          message: `Error resending verification email + ${error}`,
        });
      });
  }
};

const checkEmailVerification = async () => {
  // Refresh the user's auth state
  const user = auth.currentUser;
  await user.reload();
  // Now we can check if the email was verified
  if (user.emailVerified) {
    // Email was verified, redirect the user
    router.push("/subscription");
  } else {
    // Email wasn't verified, notify the user
    globalStore.addNotification({
      id: Date.now(),
      type: "error",
      message: "Email hasn't been verified yet.",
    });
  }
};
</script>
