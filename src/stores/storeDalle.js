import { defineStore } from "pinia";
import { storage } from "@/js/firebase/index";
import { useStoreAuth } from "@/stores/storeAuth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/js/firebase";

export const useStoreDalle = defineStore({
  id: "dalle",
  state: () => ({
    generatedImageUrl: "",
    imageLibrary: [],
    savedImageLibrary: [],
  }),
  actions: {
    async fetchUserImages() {
      const storeAuth = useStoreAuth();
      const userId = storeAuth.user.id;

      const userImagesCol = collection(db, `users/${userId}/images`);

      let userImagesSnapshot;

      // Check if the images are already saved in local storage
      const savedImages = localStorage.getItem("userImages");
      if (savedImages) {
        this.imageLibrary = JSON.parse(savedImages);
      } else {
        // If not in local storage, fetch from Firestore
        userImagesSnapshot = await getDocs(userImagesCol);
        this.imageLibrary = [];

        userImagesSnapshot.forEach((doc) => {
          this.imageLibrary.push({
            id: doc.id,
            url: doc.data().url,
          });
        });

        // Save the images to local storage
        localStorage.setItem("userImages", JSON.stringify(this.imageLibrary));
      }

      console.log("User images fetched");
    },

    setGeneratedImage(imageUrl) {
      this.generatedImageUrl = imageUrl;
      // Check if the image already exists in the imageLibrary
    },
    addImage(imageUrl) {
      // Generate a unique ID for the new image
      const imageId = `${new Date().getTime()}`;

      this.imageLibrary.unshift({
        id: imageId,
        url: imageUrl,
      });

      if (this.imageLibrary.length > 10) {
        this.imageLibrary.pop();
      }
    },

    async saveImage(imageUrl) {
      // Check if the image already exists in the user's imageLibrary
      const imageExists = this.imageLibrary.some(
        (image) => image.url === imageUrl
      );
      if (imageExists) {
        console.log("Image already saved");
        return;
      }

      // Add the new image URL to Firestore
      const storeAuth = useStoreAuth();
      const userId = storeAuth.user.id;
      const userImagesCol = collection(db, `users/${userId}/images`);

      // Generate a unique ID for the new image document
      const imageId = `${new Date().getTime()}`;

      // Use setDoc instead of addDoc to specify the document ID
      await setDoc(doc(userImagesCol, imageId), {
        url: imageUrl,
        timestamp: new Date(),
      });

      // Add the new image to the imageLibrary array
      this.imageLibrary.push({
        id: imageId,
        url: imageUrl,
      });

      // Save the images to local storage
      localStorage.setItem("userImages", JSON.stringify(this.imageLibrary));

      console.log("Image saved");
    },

    async deleteImage(image) {
      const storeAuth = useStoreAuth();
      const userId = storeAuth.user.id;
      const userImagesDoc = doc(db, `users/${userId}/images/${image.id}`);

      await deleteDoc(userImagesDoc);

      // Update the local list of saved images
      this.imageLibrary = this.imageLibrary.filter(
        (img) => img.id !== image.id
      );

      // Save the images to local storage
      localStorage.setItem("userImages", JSON.stringify(this.imageLibrary));

      console.log("Image deleted");
    },
  },
});
