// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBKUutoIzbG7F_HLwYNBUCSZVMO7o2YcLA",
  authDomain: "productive-pulse.firebaseapp.com",
  projectId: "productive-pulse",
  storageBucket: "productive-pulse.appspot.com",
  messagingSenderId: "243276620175",
  appId: "1:243276620175:web:d8955e4e9b97e423aaabfa",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
