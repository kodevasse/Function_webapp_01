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
      const userImagesSnapshot = await getDocs(userImagesCol);
      this.savedImageLibrary = userImagesSnapshot.docs.map(
        (doc) => doc.data().url
      );
    },

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

    async saveImage(imageUrl) {
      // fetch image blob from url
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // create a unique file name
      const fileName = `${new Date().getTime()}.png`;

      // get reference to storage bucket
      const storageRef = storage.ref();
      const fileRef = storageRef.child(fileName);

      // upload the image to the bucket
      const snapshot = await fileRef.put(blob);

      // get the download URL of the uploaded file
      const uploadedUrl = await snapshot.ref.getDownloadURL();

      // Add the new image URL to Firestore
      const storeAuth = useStoreAuth();
      const userId = storeAuth.user.uid;
      const userImagesCol = collection(db, `users/${userId}/images`);
      const newImageDoc = doc(userImagesCol);

      await setDoc(newImageDoc, { url: uploadedUrl });

      this.savedImageLibrary.push(uploadedUrl);
    },
    async testSaveImage(imageLibrary) {
      const storeAuth = useStoreAuth();
      const userId = storeAuth.user.id;
      const userImagesCollectionRef = collection(db, `users/${userId}/images`);

      for (let imageUrl of imageLibrary) {
        const newImage = {
          url: imageUrl,
          timestamp: new Date(),
        };

        await addDoc(userImagesCollectionRef, newImage);
      }

      console.log("All images in imageLibrary saved to Firestore");
    },
  },
});
