import React from "react";
import styled, { css } from 'styled-components'
import image from "./google.png";
import image2 from "./kakao.png";
import { useState } from 'react';
import { auth, dbService, storage } from './fbase';
import { GoogleAuthProvider, signInWithPopup, GithubAuthProvider} from 'firebase/auth';




function GoLogin(){

}

function Modal({ onClose }) {
  const [init, setInit] = useState(false);
  const [userData, setUserData] = useState("");
  const [logFirst, setLogFirst] = useState(false);


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
  const handleClose = () => {
    onClose?.();
  };
  return (
    <Overlay>
        <ModalWrap>
          <CloseButton onClick={handleClose}>
            <i className="fa-solid fa-xmark"></i>
          </CloseButton>
          <Contents>
          <button onClick={handleGoogleLogin} 
          className="google">
          <img src={image}></img>Google 계정으로 로그인</button>
          <>
          {init
            ? <h3>로그인 후 유저 이름 : {userData.displayName}</h3>
            : <h3>로그인 전</h3>}
         </>
            <h1>This is a Modal Dialog</h1>
            <button  img src={image}></button>
            <Button onClick={handleClose} >Close</Button>
          </Contents>
        </ModalWrap>
      </Overlay>
  );
}
const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;

const ModalWrap = styled.div`
  width: 600px;
  height: fit-content;
  border-radius: 15px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CloseButton = styled.div`
  float: right;
  width: 40px;
  height: 40px;
  margin: 20px;
  cursor: pointer;
  i {
    color: #5d5d5d;
    font-size: 30px;
  }
`;

const Contents = styled.div`
  margin: 50px 30px;
  h1 {
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 60px;
  }
  img {
    margin-top: 60px;
    width: 300px;
  }
`;
const Button = styled.button`
  font-size: 14px;
  padding: 10px 20px;
  border: none;
  background-color: #ababab;
  border-radius: 10px;
  color: white;
  font-style: italic;
  font-weight: 200;
  cursor: pointer;
  &:hover {
    background-color: #898989;
  }
`;


export default Modal;