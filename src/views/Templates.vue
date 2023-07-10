<template>
  <div class="flex flex-col w-full items-center">
    <div class="flex flex-row">
      <div class="flex flex-col w-full">
        <div class="flex flex-col items-center w-full h-full p-4">
          <div class="w-full space-x-1.5 space-y-1.5 sm:mb-3">
            <button
              v-for="category in catValues2"
              class="inline-block rounded-full border border-gray-400 px-3 py-1 text-sm font-medium text-gray-800 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-4"
              :class="{
                active: category === activeCategory,
                inactive: category !== activeCategory,
              }"
              @click="setActiveCategory(category), tester()"
            >
              {{ category }}
            </button>
          </div>
          <div
            class="my-2 sm:mt-1 mt-4 grid gap-4 mb-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full"
          >
            <TemplateCard02
              v-for="template in sortedTemplates"
              :key="template.id"
              :title="template.title"
              :subtitle="template.subtitle"
              :emoji="template.emoji"
              :slug="template.slug"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import TemplateCard02 from "@/components/TemplateCard02.vue";
import { useGlobalStore } from "@/stores/globalStore";

const globalStore = useGlobalStore();
const catValues2 = ref([]);

const tester = () => {
  console.log(activeCategory.value);
};
const templates = ref([
  {
    title: "Company Bio",
    subtitle: "Tell your company story with a captivating bio",
    emoji: "📝",
    isfav: false,
    category: ["All", "SEO"],
    slug: function () {
      return this.title.toLowerCase().replace(/ /g, "");
    },
  },
  {
    title: "Instragram Caption",
    subtitle: "Create a compelling caption for your Instagram post",
    emoji: "📸",
    isfav: false,
    category: ["All", "Social Media"],
    slug: function () {
      return this.title.toLowerCase().replace(/ /g, "");
    },
  },
  {
    title: "Blog Post",
    subtitle: "Write a blog post that will engage your audience",
    emoji: "🪄",
    isfav: false,
    category: ["All", "Social Media"],
    slug: function () {
      return this.title.toLowerCase().replace(/ /g, "");
    },
  },
  {
    title: "Twitter Tweet",
    subtitle: "Write a engaging tweet that will get retweeted",
    emoji: "🐦",
    isfav: false,
    category: ["All", "Social Media"],
    slug: function () {
      return this.title.toLowerCase().replace(/ /g, "");
    },
  },
  {
    title: "Content Improver",
    subtitle:
      "Take a piece of content and make it better, more interesting, more engaging and more creative",
    emoji: "📃",
    isfav: false,
    category: ["All", "Email", "Social Media"],
    slug: function () {
      return this.title.toLowerCase().replace(/ /g, "");
    },
  },
  {
    title: "Product Description",
    subtitle:
      "Create compelling product descriptions to be used on websites, email and social media",
    emoji: "💭",
    isfav: false,
    category: ["All", "Ecommerce", "Social Media"],
    slug: function () {
      return this.title.toLowerCase().replace(/ /g, "");
    },
  },
  {
    title: "Google Ads Description",
    subtitle:
      "Create high converting copy of the 'Description' section of your Google Ads",
    emoji: "🔎",
    isfav: false,
    category: ["All", "Google"],
    slug: function () {
      return this.title.toLowerCase().replace(/ /g, "");
    },
  },
  {
    title: "Company SEO",
    subtitle: "Tell your company story with a captivating bio",
    emoji: "❤️‍🔥",
    isfav: false,
    category: ["All", "SEO"],
    slug: function () {
      return this.title.toLowerCase().replace(/ /g, "");
    },
  },
]);
const activeCategory = ref("All");
const sortedTemplates = computed(() => {
  let sorted = [...templates.value];
  sorted.sort((a, b) => a.title.localeCompare(b.title));

  if (globalStore.search !== "") {
    const search = globalStore.search.toLowerCase();
    return sorted.filter(
      (template) =>
        template.title.toLowerCase().includes(search) ||
        template.subtitle.toLowerCase().includes(search)
    );
  }

  if (activeCategory.value === "All") {
    return sorted;
  } else {
    return sorted.filter((template) =>
      template.category.includes(activeCategory.value)
    );
  }
});

const setActiveCategory = (category) => {
  activeCategory.value = category;
};

const getCat = () => {
  templates.value.map((item) => {
    if (typeof item.category === "string") {
      if (!catValues2.value.includes(item.category)) {
        catValues2.value.push(item.category);
      }
    } else {
      item.category.forEach((item) => {
        if (!catValues2.value.includes(item)) {
          catValues2.value.push(item);
        }
      });
    }
  });
};

// Navbar scroll remove
// watchEffect(globalStore.menuOpen, (newValue) => {
//   if (newValue) {
//     document.body.style.overflow = "hidden";
//   } else {
//     document.body.style.overflow = "scroll";
//   }
// });

// watch(items, (newValue) => {   // call your function here   newValue.forEach((item) => {     if (!catValues2.value.includes(item.cat)) {       catValues2.value.push(item.cat);     }   }); });
onMounted(() => {
  getCat();
});
</script>

<style scoped>
.active {
  @apply bg-blue-700 text-white;
}
.inactive {
}
</style>
