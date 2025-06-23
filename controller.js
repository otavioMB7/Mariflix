// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAg4NJZAmSiyi1XZwUb2b2GLNbOzdq9-JA",
  authDomain: "mariflix-2f3d0.firebaseapp.com",
  projectId: "mariflix-2f3d0",  
  storageBucket: "mariflix-2f3d0.firebasestorage.app",
  messagingSenderId: "265826856624",
  appId: "1:265826856624:web:3575a1dcf77fe5df025575",
  measurementId: "G-V23QJJVCNG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);