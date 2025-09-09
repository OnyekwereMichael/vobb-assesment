// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKHpsbOmfkKy7AaACvONrt0cRoFkzNltI",
  authDomain: "vobb-auth.firebaseapp.com",
  projectId: "vobb-auth",
  storageBucket: "vobb-auth.firebasestorage.app",
  messagingSenderId: "305650303309",
  appId: "1:305650303309:web:fbd53495a85f12a0753704"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export default app
