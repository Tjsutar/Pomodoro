import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyDwz1ZcoiC_BCi5bRjjQAMM_Wts8c5Caj4",
  authDomain: "pomodoroapp-630fa.firebaseapp.com",
  projectId: "pomodoroapp-630fa",
  storageBucket: "pomodoroapp-630fa.appspot.com",
  messagingSenderId: "431514769778",
  appId: "1:431514769778:web:4fb0eab21780fa4d23a5eb",
  measurementId: "G-1277RB1DCD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth,provider};