// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkXEx7gturkMqy1unoimNchQ99aCZcf3o",
  authDomain: "dashboard-admin-20f2f.firebaseapp.com",
  projectId: "dashboard-admin-20f2f",
  storageBucket: "dashboard-admin-20f2f.appspot.com",
  messagingSenderId: "619641666769",
  appId: "1:619641666769:web:77c314694bfa4a78bfd9f0",
  measurementId: "G-WQQ8X61PSK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)