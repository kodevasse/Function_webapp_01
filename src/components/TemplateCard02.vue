<template>
  <!--
  This component uses @tailwindcss/line-clamp

  yarn add @tailwindcss/line-clamp
  npm install @tailwindcss/line-clamp

  plugins: [require('@tailwindcss/line-clamp')]
-->
  <router-link
    class="cursor-pointer hover:outline hover:outline-[0.15rem] outline-gray-300 -outline-offset-1 rounded-lg border-[0.13rem] border-gray-200 p-4 shadow-sm transition hover:shadow-lg sm:p-6"
    :to="{ name: 'template', params: { name: props.slug() } }"
  >
    <span class="text-3xl">{{ emoji }}</span>
    <!-- <span class="inline-block rounded bg-blue-600 p-2 text-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path
          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
        />
      </svg>
    </span> -->

    <a href="#">
      <h3 class="mt-0.5 text-lg font-medium text-gray-900">
        {{ title }}
      </h3>
    </a>

    <p class="mt-2 text-sm leading-relaxed text-gray-500 line-clamp-3">
      {{ subtitle }}
    </p>
  </router-link>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "DEFAULT",
  },
  subtitle: {
    type: String,
    default: "DEFAULT",
  },
  emoji: {
    type: String,
    default: "🥴",
  },
  slug: { type: Function, default: "DEFAULT" },
});
</script>
