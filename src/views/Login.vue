<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <h1
      class="font-extrabold text-transparent sm:text-6xl text-3xl bg-clip-text bg-gradient-to-r from-yellow-200 to-emerald-400 -mt-24 sm:mb-12 mb-6"
    >
      Snorre <span class="text-gray-600">f</span>A<span class="text-gray-600"
        >t</span
      ><span
        class="font-extrabold text-transparent sm:text-6xl text-3xl bg-clip-text bg-gradient-to-r from-yellow-400 to-red-400"
        >burn</span
      >
    </h1>

    <img
      class="h-24 w-24 rounded-full ring-2 ring-white sm:h-32 sm:w-32 sm:mb-4 hover:animate-spin"
      src="/images/fat.svg"
      alt="Snorrefatburn logo"
    />
    <div class="max-w-md w-full space-y-8">
      <div>
        <!-- <h2 class="mt-6 text-center text-3xl font-extrabold">
          Sign in to your account
        </h2> -->
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <input type="hidden" name="remember" value="true" />
        <!-- <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              v-model="credentials.email"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              v-model="credentials.password"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign in
          </button>
        </div> -->
        <div>
          <button
            @click.prevent="handleGoogleLogin"
            class="bg-emerald-600 group relative w-full flex justify-center py-2 px-4 border border-transparent text-base font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <img
              class="mr-4"
              src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png"
              width="24"
              alt="google logo icon png transparent background osteopathy"
            />
            Sign in with Google
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStoreAuth } from "@/stores/storeAuth";

const storeAuth = useStoreAuth();
const credentials = ref({ email: "", password: "" });

function handleLogin() {
  storeAuth.loginUser(credentials.value);
}

function handleGoogleLogin() {
  storeAuth.googleLogin();
}
</script>
