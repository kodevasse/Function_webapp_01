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
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { ref, computed } from "vue";
import router from "@/router";
import { useStoreCompetition } from "@/stores/storeCompetition";
import { useStoreDailyActivity } from "@/stores/storeDailyActivity";

export const useStoreAuth = defineStore("storeAuth", {
  state: () => {
    return {
      user: {},
    };
  },
  actions: {
    init() {
      const storeCompetition = useStoreCompetition();
      const storeDailyActivity = useStoreDailyActivity();
      console.log("init storeAuth");
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("user message:", user);
          this.user.id = user.uid;
          this.user.email = user.email;
          this.user.displayName = user.displayName;
          this.user.photoURL = user.photoURL;
          storeCompetition.init();
          storeDailyActivity.init();
          // No need to push to portal. The router guard in router/index.js will handle redirections.
          // this.router.push("/portal");

          //   storeNotes.init();
          //   storeCounts.init();
          //   storeTodos.init();
          //   storeMessages.init();
          //   storeUsers.init();
        } else {
          this.user = {};
          // If there's no user (not authenticated), redirect to login. This could be handled by router guard too.
          this.router.replace("/login");
          //   storeNotes.clearNotes();
          //   storeUsers.clearUsers();
        }
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
          // console.log("user message:", user);
          // ...
        })
        .catch((error) => {
          console.log("error messaage", error.message);
        });
    },
    claimPoints(productPrice) {
      this.user.points -= productPrice;
    },
    // social google login
    googleLogin() {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          // The signed-in user info.
          const user = result.user;
          console.log("user message:", user);
          // on sucessful login, redirect to home page
          this.router.push({ name: "portal" });
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
  },
});
