// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, EmailAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC5PXh-wlfeE4ycEkIyYUviXKseG10YRqE",
    authDomain: "chatter-fd269.firebaseapp.com",
    projectId: "chatter-fd269",
    storageBucket: "chatter-fd269.appspot.com",
    messagingSenderId: "494470929289",
    appId: "1:494470929289:web:669a47da5e1f11ba771f58",
    measurementId: "G-E83KEZ34Q1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const emailProvider = new EmailAuthProvider();
export const db = getFirestore(app);