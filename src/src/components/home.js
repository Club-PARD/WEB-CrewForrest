import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDoc, getDocs } from "firebase/firestore";
import { app, auth, dbService, storage } from "../fbase";
import "../common.css";


import {
    BrowserRouter as Router,
    Route,
    Routes,
  } from "react-router-dom"; 
 

  import { useEffect } from "react";
  import { GoogleAuthProvider, signInWithPopup, GithubAuthProvider} from 'firebase/auth';
  import Hello from "./home";
import { async } from '@firebase/util';
  


function crewClick (){
    console.log("hi");
    // return(location.href="/findcrew");
};

   

const Home = () => {

  const [valuel, setValuel] = useState();
  const [firstStep, setFirstStep] = useState('');
  const [getImformation, setGetImformation] = useState();
  const [imageUpload, setImageUpload] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [userData, setUserData] = useState("");
  const [init, setInit] = useState(false);
  const [logFirst, setLogFirst] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
//   const querySnapshot = getDocs(collection(dbService, "crewBoard"));
//   querySnapshot.forEach((doc) => {
//     console.log(doc.id, " => ", doc.data());
//   });


    // const prevButton = document.querySelector('.prev');
    // const nextButton = document.querySelector('.next');
    // const carousel = document.querySelector('.carousel');

    // let index = 0;

    // prevButton.addEventListener('click', () => {
    // if (index === 0) return;
    // index -= 1;
    
    // carousel.style.transform = `translate3d(-${500 * index}px, 0, 0)`;
    // });

    // nextButton.addEventListener('click', () => {
    // if (index === 2) return;
    // index += 1;
    
    // carousel.style.transform = `translate3d(-${500 * index}px, 0, 0)`;
    // });

  const onClickButton = () => {
    setIsOpen(true);
  };

  function handleGoogleLogin() {  
    const provider = new GoogleAuthProvider(); // provider를 구글로 설정
    
    signInWithPopup(auth, provider) // popup을 이용한 signup
      .then((data) => {
        setInit(true)
        setUserData(data.user); // user data 설정
        console.log(userData); // console로 들어온 데이터 표시
        // console.log(auth.currentUser); // 현재 로그인한 사람의 정보를 auth로 부터 읽어오기
        const personName = auth.currentUser.displayName;
        const personUid = auth.currentUser.uid;
        const personEmail = auth.currentUser.email;
        // handleOnSubmitWithdocUserid(personUid, personEmail, personName);
        // console.log(userData.length === 1 ? "처음 로그인한 유저 입니다. " : "이 유저는 처음 로그인한 유저가 아닙니다.");
        // console.log(userData.)
        if(logFirst){
          console.log("로그인 처음이 아닙니다");
        }else{
          console.log("로그인이 처음이시네요");
          setLogFirst(true);
        }
      } 
        
      )
      .catch((err) => {
        console.log(err);
      }); 
     
  }
  
  function Logincheck(){
    if(logFirst){
      return false;
    }
    else{
      return true;
    }
  }
  
  const onLogOutClick = () => { // 로그아웃
    auth.signOut();
    console.log('logout')
  };
  
  function onReadUserData(user){
    auth.onAuthStateChanged(async (user) => { // 실시간으로 계속해서 user의 정보를 읽어오는 과정
      if (user) { // 로그인 상태
        console.log(user); 
        return true;
      } else { // 로그아웃 상태
        console.log(user); 
        return false;
      }
    });
  }
  
  return (
    <div>
        <header>
            <div class="site-title">
                <Link to="/"><img src="/img/로고.png" alt="logo" class="logoBox"/></Link>
                <Link to="/findCrew"><img src="/img/crewSearchBt.png" alt="searchBt" class="searchBox2" /></Link>  
                <button type="button" class="loginBt" id="img_btn" onClick={handleGoogleLogin}><img src="/img/버튼.png"/></button>
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
    </div>
  );
};



export default Home;
