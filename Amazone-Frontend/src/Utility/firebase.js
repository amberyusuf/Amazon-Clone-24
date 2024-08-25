const API_KEY = import.meta.env.VITE_API_KEY;


// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";

// authentication
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "clone-react-4a2e6.firebaseapp.com",
  projectId: "clone-react-4a2e6",
  storageBucket: "clone-react-4a2e6.appspot.com",
  messagingSenderId: "488662965156",
  appId: "1:488662965156:web:ad3aa38a944635add53f31",
};


// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = app.firestore();
