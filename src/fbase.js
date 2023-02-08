import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Auth 연결
import { getFirestore } from "firebase/firestore"; // Database 연결
import { getStorage } from "firebase/storage"; // storage 연결

const firebaseConfig = {
  apiKey: "AIzaSyAjKvwNlr46XqvHbkqN0rppq4XnB17f2us",
  authDomain: "crewforest-95461.firebaseapp.com",
  projectId: "crewforest-95461",
  storageBucket: "crewforest-95461.appspot.com",
  messagingSenderId: "232811124432",
  appId: "1:232811124432:web:2fc471dcd2b1100ee0b0d5",
  measurementId: "G-LWB8Z61EPS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const dbService = getFirestore(app);
const storage = getStorage(app);

export { app, auth, dbService,storage };