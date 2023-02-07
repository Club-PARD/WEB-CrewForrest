
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Auth 연결
import { getFirestore } from "firebase/firestore"; // Database 연결
import { getStorage } from "firebase/storage"; // storage 연결


   const firebaseConfig = {
    apiKey: "AIzaSyCA6rlKrq4vH3h1o_xqifZZOhwcgvjOuCI",
    authDomain: "animalforrest-8ba3e.firebaseapp.com",
    projectId: "animalforrest-8ba3e",
    storageBucket: "animalforrest-8ba3e.appspot.com",
    messagingSenderId: "709488153051",
    appId: "1:709488153051:web:85d5d960ec78132ecd17fe",
    measurementId: "G-JKZQ5587Q0"
  };


const app = initializeApp(firebaseConfig); // 초기화 
const auth = getAuth(app); // 유저 정보 관리
const dbService = getFirestore(app); // DB 관리 => 
const storage = getStorage(app); // 파일이나 사진등 텍스트가 아닌 내용 저장 . 

export { app, auth, dbService,storage }; // 다른 화면에서 사용할 수 있게 