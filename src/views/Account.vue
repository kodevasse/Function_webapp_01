<template>
  <div class="flex flex-col">
    <div class="flex flex-col w-full h-full items-center sm:justify-start mt-6">
      <div class="card w-full max-w-2xl bg-base-200 shadow-xl">
        <div class="card-body">
          <div class="flex flex-col items-center" v-if="isLoading">
            <span class="loading loading-infinity loading-lg"></span>
            Loading account information...
          </div>
          <PriceSelection v-else-if="!subscription" />
          <SubscribedAccount v-else :subscription="subscription" />
        </div>
        <div class="card-actions justify-end"></div>
      </div>
    </div>
    <div class="flex flex-col w-full items-center sm:justify-start mt-6 mb-12">
      <div class="card w-full max-w-2xl bg-base-200 shadow-xl">
        <div class="card-body">
          <div class="flex flex-col items-center" v-if="isLoading">
            <span class="loading loading-infinity loading-lg"></span>
            Loading account information...
          </div>
          <ProfileSettings />
        </div>
        <div class="card-actions justify-end"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import PriceSelection from "@/components/PriceSelection.vue";
import SubscribedAccount from "@/components/SubscribedAccount.vue";
import ProfileSettings from "@/components/user/ProfileSettings.vue";
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
