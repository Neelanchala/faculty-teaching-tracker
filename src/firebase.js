import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDkv7tqptmnu4u6A7oQFGr59BCq0JCArBM",
  authDomain: "faculty-teaching-tracker-bc35d.firebaseapp.com",
  projectId: "faculty-teaching-tracker-bc35d",
  storageBucket: "faculty-teaching-tracker-bc35d.appspot.com",
  messagingSenderId: "1018193225776",
  appId: "1:1018193225776:web:f90fa3ba112284fbd565f5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
