<template>
  <div class="flex flex-row">
    <div class="flex flex-col w-full">
      <div class="flex flex-col mb-4">
        <h2 class="font-bold">Subscription plan</h2>

        <hr />
        <div v-for="(product, index) in products" :key="index + '-product'">
          <h3 class="text-primary font-bold">{{ product.name }}</h3>
          <div
            v-for="(price, priceIndex) in product.prices"
            :key="priceIndex + '-price'"
            class="relative"
          >
            <label
              class="form-control m-3 cursor-pointer p-4 rounded-md border border-base-300 transition-all ease-in-out duration-200 block"
              :class="{
                'bg-base-300': selectedPrice === price.id,
                'hover:bg-base-300 bg-base-200': selectedPrice !== price.id,
              }"
              @click="selectPrice(price.id)"
            >
              <input
                type="radio"
                class="hidden"
                v-model="selectedPrice"
                :value="price.id"
                :id="price.id"
              />
              <div class="flex items-center">
                <div
                  class="w-5 h-5 border rounded-md border-primary mr-2"
                  :class="{ 'bg-primary': selectedPrice === price.id }"
                >
                  <svg
                    v-show="selectedPrice === price.id"
                    class="w-4 h-4 text-white fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 18 19"
                  >
                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                  </svg>
                </div>
                <span class="label-text font-bold">
                  {{ price.interval }}: NOK{{ price.unit_amount / 100 }}
                </span>
              </div>
            </label>
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
const selectPrice = (id) => {
  selectedPrice.value = id;
};
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
    success_url: window.location.origin + "/success",
    cancel_url: window.location.origin + "/subscription",
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

<style scoped></style>
