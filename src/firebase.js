// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2dMdR6W3sEgWsM75zH4VAmdEQhd9dU2g",
  authDomain: "quiz-energia.firebaseapp.com",
  projectId: "quiz-energia",
  storageBucket: "quiz-energia.appspot.com",
  messagingSenderId: "284088141385",
  appId: "1:284088141385:web:c88ca77bc6a375f9bca198"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {db}