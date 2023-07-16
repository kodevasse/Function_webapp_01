<template>
  <div>
    <h1>Email Verification Required</h1>
    <p>
      Thanks for signing up! Before we get started, we need to confirm your
      email address. We've sent an email to the address you provided. Please
      check your email and click on the verification link.
    </p>
    <button @click="resendVerificationEmail">Resend Verification Email</button>
    <p>
      If you're having trouble, please
      <a href="mailto:support@yourapp.com">contact our support team</a>.
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { useGlobalStore } from "@/stores/globalStore";
import { auth } from "@/js/firebase";
import { db } from "@/js/firebase";

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
</script>
