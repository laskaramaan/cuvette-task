// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCO608q-LKPIBcfo-32hoGdklA6VtxrHiU",
  authDomain: "e-commerce-7a656.firebaseapp.com",
  projectId: "e-commerce-7a656",
  storageBucket: "e-commerce-7a656.appspot.com",
  messagingSenderId: "2550362643",
  appId: "1:2550362643:web:641a8e022685c7233ec5e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)