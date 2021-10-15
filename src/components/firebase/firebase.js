import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAq0LwvA0QgUGj1cBGyvxfrA2lOfWtDVpk",
  authDomain: "konobar-co.firebaseapp.com",
  databaseURL:
    "https://konobar-co-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "konobar-co",
  storageBucket: "konobar-co.appspot.com",
  messagingSenderId: "784927640486",
  appId: "1:784927640486:web:e6b6f993c4cd5104a39d67",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const fprovider = new FacebookAuthProvider();
export const auth = getAuth();
