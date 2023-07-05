<template>
  <div class="row">
    <div class="col">
      <h2>Subscription Plans</h2>

      <hr />

      <div v-for="(product, index) in products" :key="index + '-product'">
        <h3>{{ product.name }}</h3>
        <div
          v-for="(price, priceIndex) in product.prices"
          :key="priceIndex + '-price'"
        >
          <div class="form-check">
            <input
              type="radio"
              class="form-check-input"
              v-model="selectedPrice"
              :value="price.id"
              :id="price.id"
            />

            <label :for="price.id" class="form-check-label">
              {{ price.interval }}: NOK{{ price.unit_amount / 100 }}
            </label>
          </div>
        </div>
      </div>

      <button
        class="btn btn-primary"
        @click="createSub"
        :disabled="!selectedPrice || isLoading"
      >
        {{ isLoading ? "Loading..." : "Create subscription" }}
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";

import { db } from "@/js/firebase";
import {
  collection,
  where,
  getDocs,
  query,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { useStoreAuth } from "@/stores/storeAuth";

const storeAuth = useStoreAuth();
const products = ref([]);
const selectedPrice = ref(null);
const isLoading = ref(false);
onMounted(() => {
  fetchProducts();
});
const fetchProducts = async () => {
  const productsRef = collection(db, "products");
  const productsQuery = query(productsRef, where("active", "==", true));
  const productsQuerySnap = await getDocs(productsQuery);

  const productsPromises = productsQuerySnap.docs.map(async (doc) => {
    const pricesRef = collection(db, "products", doc.id, "prices");
    const pricesQuerySnap = await getDocs(pricesRef);

    return {
      id: doc.id,
      ...doc.data(),
      prices: pricesQuerySnap.docs.map((price) => {
        return {
          id: price.id,
          ...price.data(),
        };
      }),
    };
  });

  products.value = await Promise.all(productsPromises);
};
const createSub = async () => {
  isLoading.value = true;
  const collectionRef = collection(
    db,
    "users",
    storeAuth.user.id,
    "checkout_sessions"
  );

  const docRef = await addDoc(collectionRef, {
    price: selectedPrice.value,
    success_url: window.location.origin,
    cancel_url: window.location.origin,
  });

  onSnapshot(docRef, (snap) => {
    const { error, url } = snap.data();

    if (error) {
      console.error(`An error occured: ${error.message}`);
      isLoading.value = false;
    }

    if (url) {
      window.location.assign(url);
    }
  });
};
</script>
