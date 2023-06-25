<template>
  <div class="subscription-settings">
    <!-- Her kan du legge til formular for å oppdatere abonnementsinnstillingene -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStoreAuth } from "@/stores/storeAuth";

const props = defineProps({
  subscription: Object,
});

const store = useStoreAuth();

const updateSubscription = (newSubscription) => {
  // Oppdater abonnementsinnstillingene i databasen her
  store.updateSubscription(newSubscription);
};
</script>
