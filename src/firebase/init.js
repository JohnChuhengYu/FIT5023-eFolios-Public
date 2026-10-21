// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnCuCvQZ61osAC-VwJ_YHyNKXqCTPKs84",
  authDomain: "fit5032-c6d1e.firebaseapp.com",
  projectId: "fit5032-c6d1e",
  storageBucket: "fit5032-c6d1e.firebasestorage.app",
  messagingSenderId: "184549806552",
  appId: "1:184549806552:web:0d9eb5fac33b7a7b18a2ad"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();
export default db