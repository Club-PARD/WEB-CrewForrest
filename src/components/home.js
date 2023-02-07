import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import findCrew from './findCrew';
import "./home.css";
import Modal from './modal';
import styled, { css } from 'styled-components'

import {
    BrowserRouter as Router,
    Route,
    Routes,
  } from "react-router-dom"; 
 

  import { useEffect } from "react";
  import { auth, dbService, storage } from './fbase';
  import { GoogleAuthProvider, signInWithPopup, GithubAuthProvider} from 'firebase/auth';
  import Hello from "./home";
  


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
      <h1>home</h1>
      <p>homepage</p>
     
    <ul>
    <ul>
		<li><a href="/index.php">Home</a></li>
		<li><a class="current" href="/html/intro">HTML</a></li>
		<li><a href="/css/intro">CSS</a></li>
		<li><a href="/javascript/intro">자바스크립트</a></li>
	</ul>
	</ul>
      
      <Link to="/findcrew"><li>findCrew로 이동</li></Link> //화면 이동 태그
      <Link to="/createcrew"><li>createCrew로 이동</li></Link> //화면 이동 태그
      <Link to="/mypage"><li>myPage로 이동</li></Link> //화면 이동 태그
    
      <AppWrap>
      <Button onClick={onClickButton}>Click Me !</Button>
      {isOpen && (<Modal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />)}
    </AppWrap>

    <button onClick={handleGoogleLogin}>구글 로그인</button>
        <>
          {init
            ? <h3>로그인 후 유저 이름 : {userData.displayName}</h3>
            : <h3>로그인 전</h3>}
        </>
    </div>
  );
};

const Button = styled.button`
  font-size: 14px;
  padding: 10px 20px;
  border: none;
  background-color: #fa9f98;
  border-radius: 10px;
  color: white;
  font-style: italic;
  font-weight: 200;
  cursor: pointer;
  &:hover {
    background-color: #fac2be;
  }
`;

const AppWrap = styled.div`
  text-align: center;
  margin: 50px auto;
`;

export default Home;