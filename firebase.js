import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDq9pGJioh6XKpcjZRWPU6GGpTzfN9lLSQ",
    authDomain: "to-do-list-e6a0c.firebaseapp.com",
    projectId: "to-do-list-e6a0c",
    storageBucket: "to-do-list-e6a0c.appspot.com",
    messagingSenderId: "597224726416",
    appId: "1:597224726416:web:6bd8c8f548360f17e79d15",
    measurementId: "G-JT0GYDR192"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth() ;

export { firestore, auth };