import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyIiQzmrxTOtYxJZXSgeDHWggxCevOceU",
  authDomain: "messenger-3cabd.firebaseapp.com",
  projectId: "messenger-3cabd",
  storageBucket: "messenger-3cabd.appspot.com",
  messagingSenderId: "1056077046982",
  appId: "1:1056077046982:web:343da4700d97f34aa8a3c7",
  measurementId: "G-XNZDM64QCV"
};

const app = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(app)