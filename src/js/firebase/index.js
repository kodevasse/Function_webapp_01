// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {
  getFunctions,
  connectFunctionsEmulator,
  httpsCallable,
} from "firebase/functions";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service

const auth = getAuth(app);
const storage = getStorage(app);
// const functions = getFunctions(app, "europe-west2"); // <-- specify your region here
const functions = getFunctions(app, "europe-west2"); // <-- specify your region here

// Determine if running locally and connect to emulator
// Determine if running locally and connect to emulator
if (window.location.hostname === "localhost") {
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
}
// connectFunctionsEmulator(functions, "127.0.0.1", 5001);
else {
  // In production, specify the region
  functions.region = "europe-west2";
}

// Callable functions
const chatGPT4 = httpsCallable(functions, "chatGPT4");
const createImageFromText = httpsCallable(functions, "createImageFromText");
const createVippsPaymentSession = httpsCallable(
  functions,
  "createVippsPaymentSession"
);

export {
  app,
  db,
  auth,
  storage,
  functions,
  chatGPT4,
  createImageFromText,
  createVippsPaymentSession,
};
