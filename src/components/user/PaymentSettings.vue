<template>
  <div class="payment-settings">
    <!-- Her kan du legge til formular for å oppdatere betalingsinnstillingene -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStoreAuth } from "@/stores/storeAuth";

const props = defineProps({
  payment: Object,
});

const store = useStoreAuth();

const updatePayment = (newPayment) => {
  // Oppdater betalingsinnstillingene i databasen her
  store.updatePayment(newPayment);
};
</script>
