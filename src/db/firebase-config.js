// Import the functions you need from the SDKs you need
import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCs4nMl8oj1E10E5xqY1ab9rKDfOJ3cRww",
  authDomain: "collegepro-bf701.firebaseapp.com",
  projectId: "collegepro-bf701",
  storageBucket: "collegepro-bf701.appspot.com",
  messagingSenderId: "943430078218",
  appId: "1:943430078218:web:6d1e79041b40e47209f4f3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
