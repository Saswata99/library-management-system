import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBEW0h65TXdLtEvtPHz4ZBJCKkw6OggJUM",
  authDomain: "library-management-f422d.firebaseapp.com",
  projectId: "library-management-f422d",
  storageBucket: "library-management-f422d.appspot.com",
  messagingSenderId: "812289726487",
  appId: "1:812289726487:web:a029e82abb6bb3699d6452",
};

const app = initializeApp(firebaseConfig);

export const firebaseDb = getFirestore(app);
export const firebaseAuth = getAuth(app);
export const firebaseStorage = getStorage(app);


