import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAdke0mAjIZquZTfxKY0z8VB8IpzLqKWK8",
  authDomain: "ghar-dila.firebaseapp.com",
  projectId: "ghar-dila",
  storageBucket: "ghar-dila.appspot.com",
  messagingSenderId: "301747942972",
  appId: "1:301747942972:web:6a86433756d9ebd7b63539"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)