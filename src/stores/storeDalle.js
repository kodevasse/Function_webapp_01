import { defineStore } from "pinia";
export const useStoreDalle = defineStore({
  id: "dalle",
  state: () => ({
    generatedImageUrl: "",
    imageLibrary: [],
  }),
  actions: {
    setGeneratedImage(imageUrl) {
      this.generatedImageUrl = imageUrl;
      this.addImage(imageUrl);
    },
    addImage(imageUrl) {
      this.imageLibrary.unshift(imageUrl);
      if (this.imageLibrary.length > 10) {
        this.imageLibrary.pop();
      }
    },
  },
});
