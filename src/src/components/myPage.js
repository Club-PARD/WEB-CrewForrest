import React from 'react';
import { Link } from 'react-router-dom';
// import { async } from "@firebase/util";
import { collection, setDoc, doc, updateDoc, deleteField, deleteDoc, addDoc, getDoc, getDocs } from "firebase/firestore";
import { auth, dbService, storage } from './fbase';
import { useState, useEffect } from "react";
import googleImg from './google.jpg';
import samsonImg from './samson.png';




function MyPage() {

  const [modify, setModify] = useState(true);
  const [userEmail, setuserEmail] = useState("");
  const [emailName, setEmailName] = useState("");
  const [newNickName ,setNewNickName] = useState("");
  const [currentName , setCurrentName] = useState("");
  const [crewTitle, setCrewTitle] = useState("");
  const [crew, setCrew] = useState("");
  const [pressGoodTitle, setpressGoodTitle] = useState("");
  const [pressGood, setpressGood] = useState("");



  updateNameData();
  updateCrewData();
  useEffect(() => {

    setuserEmail(auth.currentUser.email);
    setEmailName(auth.currentUser.displayName);
    console.log(auth.currentUser);
    
    
    console.log("동작중임");
  }, [])
  
  
  async function updateNameData() { // firebase Update : 함수 원하는 collection 안에 원하는 doc 안에 내용을 읽어올 때 사용한다.
    const docRef = doc(dbService, "userboard", emailName);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const user = docSnap.data();
      // setNewNickName(docSnap.data['NickName']);
      setNewNickName(user['NickName']);
    } else {
      console.log("No such document!");
    }
  }

  async function updateCrewData() { // firebase Update : 함수 원하는 collection 안에 원하는 doc 안에 내용을 읽어올 때 사용한다.
    const docRef = doc(dbService, "userboard", emailName);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const crew = docSnap.data();
    
      setCrewTitle(crew['EnterCrewTitle']);
      setCrew(crew['EnterCrew']);
    } else {
      console.log("No such document!");
    }
  }
  
 

  function handleOnUpdate() {  // firebase Update : 함수 원하는 collection 안에 원하는 doc 안에 특정 field를 업데이트해주고 싶을 때 사용한다
    console.log('update 시작');
    const docRef = doc(dbService, "userboard", emailName);
    updateDoc(docRef, {
      NickName: currentName
    });
    if (docRef) {
      console.log('update 성공');
    }
  }

  function changeModify(props){
    if(modify){
      
    console.log("함수 실행");
    }else{
      setNewNickName(currentName);
      console.log(newNickName);
      handleOnUpdate();
    }
    console.log("함수 실행");
      const mo = !modify;
    setModify(mo);
  }

  

  const onChange = (event) => { //input 값이 입력 될 때 onchange를 통해 자동적으로 setState해준다! = 동기화 시켜주기
    const {
      target: { value }
    } = event;
    console.log(value);
    setCurrentName(value);
  };

  return (
    
    
    <div>
      
      <h1>내 프로필 </h1>
      
      {modify
        ? <div>
          <p1><img src={googleImg} /> </p1><p1>{emailName}   <button onClick={changeModify} title='modifybtn'  >수정</button></p1><br></br><p1>{userEmail}</p1><br></br><br></br>
          <p1>닉네임 :    {newNickName} </p1> <br></br>
          <p1>소셜 로그인 :   Google</p1> <br></br>
          <p1>이메일 :   {userEmail} </p1>
          <br></br><br></br>
        </div>
        : <div>
          
          <p1>닉네임 :    {newNickName} <button onClick={changeModify}  title='modifybtn'  >저장</button></p1> <br></br>
          <br></br>
          <input type='text' value={currentName} placeholder={newNickName} requred onChange={onChange} />
          
        </div>
        }
      
      
      <br></br><br></br>
      <h1> 내 크루 </h1> <br></br><br></br>
      <h1><img src={samsonImg} /> {crewTitle} <br></br> {crew} </h1> <br><br></br></br>

      


      
      
    </div>
  );
}



export default MyPage;