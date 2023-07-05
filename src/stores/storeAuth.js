import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/js/firebase";
import { db } from "@/js/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, computed } from "vue";
import router from "@/router";
import { useStoreCompetition } from "@/stores/storeCompetition";
import { useStoreDailyActivity } from "@/stores/storeDailyActivity";

export const useStoreAuth = defineStore("storeAuth", {
  state: () => {
    return {
      user: {},
      loading: true,
    };
  },
  actions: {
    init() {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            this.user.id = user.uid;
            this.user.email = user.email;
            this.user.displayName = user.displayName;
            this.user.photoURL = user.photoURL;

            // Get user profile from Firestore
            const userRef = doc(db, "users", user.uid);
            getDoc(userRef).then((docSnapshot) => {
              if (docSnapshot.exists()) {
                this.user.favoriteFood = docSnapshot.data().favoriteFood;
                this.user.age = docSnapshot.data().age;
                this.user.selectedOption = docSnapshot.data().selectedOption;
              }
              // Set loading to false after user data has been fetched
              this.loading = false;
              resolve(); // resolve the promise when the user data has been loaded
            });
          } else {
            this.user = {};
            this.loading = false;
            this.router.replace("/login");
            resolve(); // resolve the promise if there's no user
          }
        });
      });
    },

    registerUser(credentials) {
      createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // Set user profile in Firestore
          const userRef = doc(db, "users", user.uid);
          setDoc(userRef, {
            favoriteFood: credentials.favoriteFood,
            age: credentials.age,
          });
        })
        .catch((error) => {
          console.log("error message", error.message);
        });
    },
    claimPoints(productPrice) {
      this.user.points -= productPrice;
    },
    // social google login
    googleLogin() {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then(async (result) => {
          // The signed-in user info.
          const user = result.user;
          console.log("user message:", user);

          // Check if this is a new user (i.e. they have just signed up)
          const userDocRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(userDocRef);
          if (!docSnap.exists()) {
            // Create a document for the new user
            const userProfile = {
              id: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
              favoriteFood: "", // initial value
              age: 0, // initial value
            };
            await setDoc(userDocRef, userProfile);
          }

          // On successful login, redirect to home page
          this.router.push({ name: "account" });
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    },

    updateUser(displayName, photoURL) {
      updateProfile(auth.currentUser, {
        displayName: displayName,
        photoURL: `https://robohash.org/${auth.currentUser.uid.slice(20)}.png`,
      })
        .then(() => {
          console.log("profile updated", auth);

          // ...
        })
        .catch((error) => {
          console.log("profile not updated", auth);
          console.log(error.message);
          // ...
        });
    },
    loginUser(credentials) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // console.log("user successfull logged in", user);
        })
        .catch((error) => {
          console.log("error message:", error.message);
        });
    },
    logoutUser() {
      signOut(auth)
        .then(() => {
          console.log("User signed out");
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    updateUserProfile(newData) {
      const userRef = doc(db, "users", this.user.id);
      updateDoc(userRef, newData)
        .then(() => {
          console.log("User profile updated");
          // Update local state
          Object.assign(this.user, newData);
        })
        .catch((error) => {
          console.log("Error updating user profile", error);
        });
    },
  },
});
