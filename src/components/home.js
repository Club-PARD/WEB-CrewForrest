import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, setDoc, doc, updateDoc, deleteField, deleteDoc, addDoc, getDoc, getDocs } from "firebase/firestore";
import { app, auth, dbService, storage } from "../fbase";
import "../common.css";
import Modal from './modal';


import {
    BrowserRouter as Router,
    Route,
    Routes,
  } from "react-router-dom"; 
 

  import { useEffect } from "react";
  import { GoogleAuthProvider, signInWithPopup, GithubAuthProvider} from 'firebase/auth';
  import Hello from "./home";
import { async } from '@firebase/util';
  



const Home = () => {



   const [imageUpload, setImageUpload] = useState();
  const [imageUrl, setImageUrl] = useState("");

  const [userData, setUserData] = useState("");
  const [init, setInit] = useState(false);
  const [logFirst, setLogFirst] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [nickname, setNickname] = useState("");
  const [uid, setUid] = useState("");
  const [currentuser, setCurrentUser] = useState();

  const [modalOpen, setModalOpen] = useState(false);
  const [ b1, set1B ] = useState("");
    const [ e1, set1E ] = useState("");
    const [ m1, set1M] = useState("");
    const [ n1, set1N ] = useState("");
    const [ o1, set1O ] = useState("");
    const [ p1, set1P ] = useState("");
    const [ v1, set1V ] = useState("");
    const [ b2, set2B ] = useState("");
    const [ e2, set2E ] = useState("");
    const [ m2, set2M] = useState("");
    const [ n2, set2N ] = useState("");
    const [ o2, set2O ] = useState("");
    const [ p2, set2P ] = useState("");
    const [ v2, set2V ] = useState("");

    // async function showData(){
    //   const docRef = doc(dbService, "home", "book");
    //   const docSnap = await getDoc(docRef);
    //   if (docSnap.exists()) {
    //     console.log("Document data:", docSnap.data());
    //     set
    //   }

      
    // }


  const openModal = () => {
    setModalOpen(true);
  }
  const closeModal = () => {
    setModalOpen(false);
  }
  

    finduid();
    console.log(nickname);
    
    
    
    async function setUserName() { // firebase Update : 함수 원하는 collection 안에 원하는 doc 안에 내용을 읽어올 때 사용한다.
      const docRef = doc(dbService, "user", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log(data);
        setNickname(data['nickname']);
        console.log(nickname);
      } 
    }
    
    async function finduid() { // firebase Update : 함수 원하는 collection 안에 원하는 doc 안에 내용을 읽어올 때 사용한다.
      const docRef = doc(dbService, "currentuser", "now");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUid(data["uid"]);
        console.log(uid);
        setUserName();
      } 
    }

    
    

    function makeCurrentUid(){
      const docRef = setDoc(doc(dbService, "currentuser", "now"), { // create라는 collection 안에 firstStep이라는 document에 저장하겠다는 뜻
        uid : auth.currentUser.uid
      });
      if (docRef) {
        console.log('현재 로그인한 유저 저장 성공');
      }
    }

    function makeUser() {  // 로그인 처음일 시 collection user에 개인 uid로 document 생성 field에 각종 정보들 생성 함수 
      console.log('User, uid 정보들 저장 시작');
      const docRef = setDoc(doc(dbService, "user", auth.currentUser.uid), { // create라는 collection 안에 firstStep이라는 document에 저장하겠다는 뜻
        nickname: auth.currentUser.displayName,
        email : auth.currentUser.email,
        uid : auth.currentUser.uid
      });
      if (docRef) {
        console.log('create firstStep에 저장 성공');
      }
    }  

  function makeLMA(){   // 로그인 처음일 시 collection 개인 uid로 document LMA 생성해주는 함수 
    console.log("개인 Like생성");
    const docRef = setDoc(doc(dbService, auth.currentUser.uid, 'L'), { // create라는 collection 안에 firstStep이라는 document에 저장하겠다는 뜻
    });
    if (docRef) {
      console.log('L 저장 성공');
    }

    const docRef1 = setDoc(doc(dbService, auth.currentUser.uid, 'M'), { // create라는 collection 안에 firstStep이라는 document에 저장하겠다는 뜻
    });
    if (docRef1) {
      console.log('M 저장 성공');
    }

    const docRef2 = setDoc(doc(dbService, auth.currentUser.uid, 'A'), { // create라는 collection 안에 firstStep이라는 document에 저장하겠다는 뜻
    });
    if (docRef2) {
      console.log('A 저장 성공');
    }
  }

  const onClickButton = () => {
    setIsOpen(true);
  };

  async function checkNewUser(){    
    console.log("돌아가는중 ");          // 로그인 처음인지 확인해 주는 함수 
    const docRef = doc(dbService, "user", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log('기존 유저');
        
    } else {
      console.log('User, uid 정보들 저장 시작');
      const docRef = setDoc(doc(dbService, "user", auth.currentUser.uid), { // create라는 collection 안에 firstStep이라는 document에 저장하겠다는 뜻
        nickname: auth.currentUser.displayName,
        email : auth.currentUser.email,
        uid : auth.currentUser.uid
      });
      makeLMA();
      if (docRef) {
        console.log('create firstStep에 저장 성공');
      }
    } 
  }

  function deleteCurrentuser() {  // firebase Delete : 함수 원하는 collection 안에 원하는 doc 안에 특정 field를 삭제한다.
    console.log('delete 시작');
    const docRef = doc(dbService, "currentuser", 'now');
    updateDoc(docRef, {
      uid: deleteField()
    });
    if (docRef) {
      console.log('delete 성공');
    }
  }

  const onLogOutClick = () => { // 로그아웃
    auth.signOut();
    console.log('logout')
  };

  function GoogleLogin() {  
    const provider = new GoogleAuthProvider(); // provider를 구글로 설정
    
    signInWithPopup(auth, provider) // popup을 이용한 signup
      .then((data) => {
        deleteCurrentuser();
        setUserData(data.user); // user data 설정
        const personName = auth.currentUser.displayName;
        const personUid = auth.currentUser.uid;
        const personEmail = auth.currentUser.email;
        makeCurrentUid();

        checkNewUser(); // 로그인 처음인지 확인해 주는 함수 처음이면 logFirst true 
        
      } 
        
      )
      .catch((err) => {
        console.log(err);
      }); 

  }

  
  

  
  return (
    <div>
    <body>
      <header>
          <div class="site-title">
              <Link to="/"><img src="/img/로고.png" alt="logo" class="logoBox"/></Link>
              <Link to="/findCrew"><img src="/img/crewSearchBt.png" alt="searchBt" class="searchBox2" /></Link>  
              <React.Fragment>
              {/* <button type="button" class="loginBt" id="img_btn" onClick={openModal}><img src="/img/버튼.png"/></button> */}
              <button type="button" class="loginBt" id="img_btn"><img src="/img/버튼.png" onClick={openModal}/></button>

              <Modal open={modalOpen} close={closeModal} header="" src="/img/로고.png">
                <img src="/img/googleLogin.png" class ="googleLoginBt" onClick={GoogleLogin}/>
              </Modal>
              </React.Fragment>
          </div>
      </header>
      
      <div class="carousel-wrapper"></div>
      <img src="/img/1.png" alt="" class="carouselBox"/>
              {/* <img src="/img/2.png" alt=""/>
              <img src="/img/3.png" alt=""/> */}
              <div class="carouselBt"></div>
              <div class="carouselNumBt"></div>
              <button class="carouselCircle1" type="button"></button>
              <button class="carouselCircle2" type="button"></button> 
              <button class="carouselCircle3" type="button"></button> 
      <ul>
          <li><a href="/">홈</a></li>
          <li><a href="/createcrew">크루 만들기</a></li>
          <li><a href="/findcrew">크루 찾기</a></li>
          <li><a href="/MyPage">마이 페이지</a></li>
      </ul>
      <a href="https://pardhgu.notion.site/PARD-cc679bfd495b4074b9142abfa3db7046"><div class="navBarIntro">PARD 소개</div></a>
      <img src="./img/copyright.png" alt="" class="copyright"/>
      <div class="navBarIntro2">2023 크루의 숲</div>
    <br></br>
    <div class="hotCrewText">🔥요즘 HOT한 크루</div>
    <div class="hotCrewBox1">
      <img src="/img/running.png" alt="" class="hotCrewPic1"/>
      <p class="hotCrewTitle1">포항시 러닝크루 모집해요!</p>
      <p class="hotCrewContent">
      크루 이름 : 크루어스<br></br>
      크루 모집 인원 : 10명<br></br>
      크루 소개: 저희 ‘크루어스'는 테니스 크루로, 생긴지 2년정도 됐습니다! 테니스 궁금하신 분들 함께해요!<br></br>
      크루 정모 일정 : 2023.02.10(금) 서울 종로구 테니스장 예정<br></br> 
      크루 활동 지역 : 서울 전지역<br></br>
      </p>
    </div>
  
  

  {/* <button onClick={handleGoogleLogin}>구글 로그인</button> */}
      <>
        {init
          ? <h3>로그인 후 유저 이름 : {userData.displayName}</h3>
          : <h3>로그인 전</h3>}
      </>
      </body>
  </div>
  );
};



export default Home;
