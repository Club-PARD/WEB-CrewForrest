
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


const app = initializeApp(firebaseConfig); // 초기화 
const auth = getAuth(app); // 유저 정보 관리
const dbService = getFirestore(app); // DB 관리 => 
const storage = getStorage(app); // 파일이나 사진등 텍스트가 아닌 내용 저장 . 

export { app, auth, dbService,storage }; // 다른 화면에서 사용할 수 있게 