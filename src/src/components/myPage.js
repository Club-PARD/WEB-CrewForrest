import React from 'react';
import { Link } from 'react-router-dom';
import { collection, setDoc, doc, updateDoc, deleteField, deleteDoc, addDoc, getDoc, getDocs } from "firebase/firestore";
import { auth, dbService, storage } from '../fbase';
import { useState, useEffect } from "react";
import "../common.css";



function MyPage() {

  const [modify, setModify] = useState(true);
  const [userEmail, setuserEmail] = useState("");
  const [emailName, setEmailName] = useState("");
  const [newNickName ,setNewNickName] = useState("");
  const [currentName , setCurrentName] = useState("");
  const [CrewTitle, setCrewTitle] = useState("");
  const [crew, setCrew] = useState("");
  const [pressGoodTitle, setpressGoodTitle] = useState("");
  const [pressGood, setpressGood] = useState("");

    const [oneday, setOneday] = useState("");
    const [Category, setCategory] = useState("");
    const [Intro, setIntro] = useState("");

  // updateNameData();
  // updateCrewData();
  // useEffect(() => {

  //   setuserEmail(auth.currentUser.email);
  //   setEmailName(auth.currentUser.displayName);
  //   console.log(auth.currentUser);
    
    
  //   console.log("동작중임");
  // }, [])
  
  
  // async function updateNameData() { // firebase Update : 함수 원하는 collection 안에 원하는 doc 안에 내용을 읽어올 때 사용한다.
  //   const docRef = doc(dbService, "userboard", emailName);
  //   const docSnap = await getDoc(docRef);
  //   if (docSnap.exists()) {
  //     console.log("Document data:", docSnap.data());
  //     const user = docSnap.data();
  //     // setNewNickName(docSnap.data['NickName']);
  //     setNewNickName(user['NickName']);
  //   } else {
  //     console.log("No such document!");
  //   }
  // }

  // async function updateCrewData() { // firebase Update : 함수 원하는 collection 안에 원하는 doc 안에 내용을 읽어올 때 사용한다.
  //   const docRef = doc(dbService, "userboard", emailName);
  //   const docSnap = await getDoc(docRef);
  //   if (docSnap.exists()) {
  //     console.log("Document data:", docSnap.data());
  //     const crew = docSnap.data();
    
  //     setCrewTitle(crew['EnterCrewTitle']);
  //     setCrew(crew['EnterCrew']);
  //   } else {
  //     console.log("No such document!");
  //   }
  // }
  
 

  // function handleOnUpdate() {  // firebase Update : 함수 원하는 collection 안에 원하는 doc 안에 특정 field를 업데이트해주고 싶을 때 사용한다
  //   console.log('update 시작');
  //   const docRef = doc(dbService, "userboard", emailName);
  //   updateDoc(docRef, {
  //     NickName: currentName
  //   });
  //   if (docRef) {
  //     console.log('update 성공');
  //   }
  // }

  // function changeModify(props){
  //   if(modify){
      
  //   console.log("함수 실행");
  //   }else{
  //     setNewNickName(currentName);
  //     console.log(newNickName);
  //     handleOnUpdate();
  //   }
  //   console.log("함수 실행");
  //     const mo = !modify;
  //   setModify(mo);
  // }

  
  function handleOnUpdate() {  
    console.log('update 시작');
    const docRef = doc(dbService, "crewPost");
    updateDoc(docRef, {
      CrewTitle: CrewTitle,
      Oneday: oneday,
      Category: Category,
      Intro: Intro,
    });
    if (docRef) {
      setCrew();
      console.log('update 성공');
    }
  }
  //Delete
  function handleOnDelte() { 
    console.log('delete 시작');
    const docRef = doc(dbService, "crewBoard", 'crewInformation');
    deleteDoc(docRef, {
      delete: deleteField()
    });
    if (docRef) {
      setCrew();
      console.log('delete 성공');
    }
  }

  const onChange = (event) => { //input 값이 입력 될 때 onchange를 통해 자동적으로 setState해준다! = 동기화 시켜주기
    const {
      target: { value }
    } = event;
    console.log(value);
    setCurrentName(value);
  };
  
  return (
    <body>
        <header>
              <div class="site-title">
                <img src="/img/로고.png" alt="logo" class="logoBox"/>
                <img src="/img/crewSearchBt.png" alt="searchBt" class="searchBox" />
              </div>
              
            </header>     
            <ul>
            <li><a href="/">홈</a></li>
            <li><a href="/createcrew">크루 만들기</a></li>
            <li><a href="/findcrew">크루 찾기</a></li>
            <li><a href="/mypage">마이 페이지</a></li>
            </ul>
            <a href="https://pardhgu.notion.site/PARD-cc679bfd495b4074b9142abfa3db7046"><div class="navBarIntro">PARD 소개</div></a>
        <img src="./img/copyright.png" alt="" class="copyright"/>
        <div class="navBarIntro2">2023 크루의 숲</div>

        <div>
            <p class="findCrewText">크루 찾기</p>
            <div class="findCrewBox">
                <img src="/img/카테고리.png" alt="" class="categoryLo"/>
                <p class="findCrewTitle">원데이 크루 신청하세요!</p>
                <p class="divideLine"></p>
                <p class="findCrewIntro">
                크루 이름 : 크루어스<br></br>
                크루 모집 인원 : 10명<br></br>
                크루 소개: 저희 ‘크루어스'는 테니스 크루로, 생긴지 2년정도 됐습니다! 테니스 궁금하신 분들 함께해요!<br></br>
                크루 정모 일정 : 2023.02.10(금) 서울 종로구 테니스장 예정<br></br> 
                크루 활동 지역 : 서울 전지역<br></br>
                </p>
                <img src="/img/수정.png" alt="" class="applyBt2" onClick={handleOnUpdate}/>
                <img src="/img/삭제.png" alt="" class="applyBt" onClick={handleOnDelte}/>
                
                
            </div>

        <h1>findCrew</h1>
        <p>findCrew page</p>
        </div>

       
      
      {/* <h1>내 프로필 </h1>
      
      {modify
        ? <div>
          <p><img src="./img/google.jpg" /> </p><p1>{emailName}   <button onClick={changeModify} title='modifybtn'  >수정</button></p1><br></br><p1>{userEmail}</p1><br></br>
          <p>닉네임 :    {newNickName} </p> <br></br>
          <p>소셜 로그인 :   Google</p> <br></br>
          <p>이메일 :   {userEmail} </p>
        </div>
        : <div>
          
          <p1>닉네임 :    {newNickName} <button onClick={changeModify}  title='modifybtn'  >저장</button></p1> <br></br>
          <br></br>
          <input type='text' value={currentName} placeholder={newNickName} requred onChange={onChange} />
          
        </div>
        }
      
      
 
      <h1> 내 크루 </h1> <br></br>
      <h1><img src="./img/samson.png" /> {crewTitle} <br></br> {crew} </h1>
     */}
    
    </body>
    
  );
}



export default MyPage;
