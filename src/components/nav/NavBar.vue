<template>
  <div v-if="storeAuth.user.displayName" class="navbar bg-base-100">
    <div class="flex-1">
      <h1
        class="font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
      >
        Template <span class="text-gray-600"></span
        ><span class="text-gray-600"></span
        ><span
          class="font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-r from-yellow-400 to-red-400"
          >App 01</span
        >
      </h1>
    </div>
    <div class="flex-none gap-2" v-if="storeAuth.user">
      <div class="text-sm ml-2">{{ storeAuth.user.displayName }}</div>
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 h-10 rounded-full">
            <img :src="storeAuth.user.photoURL" />
          </div>
        </label>
        <ul
          tabindex="0"
          class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
        >
          <li>
            <RouterLink to="/portal" class="justify-between text-pink-400">
              Portal
              <span class="badge">New</span>
            </RouterLink>
          </li>
          <li><RouterLink to="/scores">Highscore</RouterLink></li>

          <li><button @click="storeAuth.logoutUser()">Logout</button></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { useStoreAuth } from "@/stores/storeAuth";
const storeAuth = useStoreAuth();
</script>
