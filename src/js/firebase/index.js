// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwvw1XoQdquBI6YxY7YIcag65oJ2Ep5bA",
  authDomain: "function-webapp-01.firebaseapp.com",
  projectId: "function-webapp-01",
  storageBucket: "function-webapp-01.appspot.com",
  messagingSenderId: "1079844680",
  appId: "1:1079844680:web:e00676f17e05560abd9d7d",
  measurementId: "G-47TTKGF5D8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
