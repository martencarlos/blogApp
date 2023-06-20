// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBo52GCfckamlw24ApyjJJeHzKmtzTP7wU",
  authDomain: "webframe-blog.firebaseapp.com",
  projectId: "webframe-blog",
  storageBucket: "webframe-blog.appspot.com",
  messagingSenderId: "698430516088",
  appId: "1:698430516088:web:971641218b05b6c4d8768d",
  measurementId: "G-CR7XJVN8TX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);