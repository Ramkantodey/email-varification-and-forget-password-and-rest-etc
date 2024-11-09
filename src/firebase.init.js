// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBpCjUThBS3afCDltmJaAsXvLzu_Qa_9MA",
    authDomain: "email-password-auth-2eb7f.firebaseapp.com",
    projectId: "email-password-auth-2eb7f",
    storageBucket: "email-password-auth-2eb7f.firebasestorage.app",
    messagingSenderId: "1059120760220",
    appId: "1:1059120760220:web:5f87cab788a7ae778f7459"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)