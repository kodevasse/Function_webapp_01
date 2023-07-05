<template>
  <h1>Account page!</h1>

  <div v-if="isLoading">Loading account information...</div>
  <PriceSelection v-else-if="!subscription" />
  <SubscribedAccount v-else :subscription="subscription" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import PriceSelection from "@/components/PriceSelection.vue";
import SubscribedAccount from "@/components/SubscribedAccount.vue";
import { useStoreAuth } from "@/stores/storeAuth";

const storeAuth = useStoreAuth();

import { db } from "@/js/firebase";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const isLoading = ref(false);
const subscription = ref(null);

onMounted(() => {
  fetchSubscription();
});

const fetchSubscription = async () => {
  isLoading.value = true;
  const db = getFirestore();
  const subsRef = collection(db, "users", storeAuth.user.id, "subscriptions");
  const subsQuery = query(
    subsRef,
    where("status", "in", ["trialing", "active", "past_due", "unpaid"])
  );

  subscription.value = await getDocs(subsQuery).then((sub) =>
    sub.docs.length > 0 ? sub.docs[0].data() : null
  );

  isLoading.value = false;
};
</script>
