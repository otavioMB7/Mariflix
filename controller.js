// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLegA46NoiRoEBIoJaUaqhwsI2CWbOaTo",
  authDomain: "aulasolmob2025.firebaseapp.com",
  projectId: "aulasolmob2025",
  storageBucket: "aulasolmob2025.firebasestorage.app",
  messagingSenderId: "228822485650",
  appId: "1:228822485650:web:3c1c3b8342c7046f57b44b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);