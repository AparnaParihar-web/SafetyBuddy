import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "safetybuddy-76ddd.firebaseapp.com",
  projectId: "safetybuddy-76ddd",
  storageBucket: "safetybuddy-76ddd.firebasestorage.app",
  messagingSenderId: "958071414805",
  appId: "1:958071414805:web:41bd485bf1cedc85c8ee1c",
  measurementId: "G-2J8WQNTEXG"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;