<template>
  <div class="dashboard">
    <ProfileSettings :user="user" @update="updateUser" />
    <SubscriptionSettings
      :subscription="user.subscription"
      @update="updateSubscription"
    />
    <PaymentSettings :payment="user.payment" @update="updatePayment" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStoreAuth } from "@/stores/storeAuth";
import ProfileSettings from "./ProfileSettings.vue";
import SubscriptionSettings from "./SubscriptionSettings.vue";
import PaymentSettings from "./PaymentSettings.vue";

const store = useStoreAuth();
const user = ref(store.user);

const updateUser = (newUser) => {
  store.updateUser(newUser);
  user.value = newUser;
};

const updateSubscription = (newSubscription) => {
  store.updateSubscription(newSubscription);
  user.value.subscription = newSubscription;
};

const updatePayment = (newPayment) => {
  store.updatePayment(newPayment);
  user.value.payment = newPayment;
};
</script>
