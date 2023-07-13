<template>
  <div class="px-4 sm:px-4 pt-3 lg:px-4">
    <div class="flex items-center sm:justify-between sm:gap-4">
      <div v-if="storeAuth.user.displayName" class="navbar bg-base-100">
        <div class="flex-1">
          <h1 class="font-extrabold text-3xl">
            {{ formattedRoute }} <span class="text-gray-600"></span>
          </h1>
        </div>
        <div class="flex-none sm:gap-2" v-if="storeAuth.user">
          <div class="sm:text-sm text-xs ml-2">
            {{ storeAuth.user.displayName }}
          </div>
          <div class="dropdown dropdown-end">
            <div class="btn btn-ghost btn-circle avatar">
              <div class="sm:w-10 sm:h-10 h-8 w-8 rounded-full">
                <img :src="storeAuth.user.photoURL" />
              </div>
            </div>
            <ul
              tabindex="0"
              class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <RouterLink to="/portal" class="justify-between text-pink-400">
                  Advance MODE
                  <span class="badge">New</span>
                </RouterLink>
              </li>

              <li><RouterLink to="/account">Account</RouterLink></li>

              <li><button @click="storeAuth.logoutUser()">Logout</button></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, useRoute } from "vue-router";
import { useStoreAuth } from "@/stores/storeAuth";
import { computed } from "vue";
const route = useRoute();
const storeAuth = useStoreAuth();
const formattedRoute = computed(() => {
  let name = route.name;
  return name ? name.charAt(0).toUpperCase() + name.slice(1) : "";
});
</script>
