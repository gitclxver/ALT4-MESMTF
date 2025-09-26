import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzM0_w17xLyHfk3tyzE8vgabyOWEfVBwg",
  authDomain: "alt4-hackathon.firebaseapp.com",
  projectId: "alt4-hackathon",
  storageBucket: "alt4-hackathon.firebasestorage.app",
  messagingSenderId: "390171642120",
  appId: "1:390171642120:web:e618129d112cc457cac4bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;