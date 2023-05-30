import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCjdGVqKDDU-jLzkcwtHqZTciL18JowVO0",
    authDomain: "firestore-fb410.firebaseapp.com",
    projectId: "firestore-fb410",
    storageBucket: "firestore-fb410.appspot.com",
    messagingSenderId: "1046509296150",
    appId: "1:1046509296150:web:4eef45316f69bc438ff337",
    measurementId: "G-NC4K3Q93P7"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth, provider};