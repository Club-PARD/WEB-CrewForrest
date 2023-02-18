import React from 'react';
import { Link } from 'react-router-dom';
import { getAuth } from "firebase/auth"; 
import { collection, setDoc, doc, updateDoc, deleteField, deleteDoc, addDoc, getDoc, getDocs } from "firebase/firestore";
import { auth, dbService, storage } from '../fbase';
import { useState, useEffect } from "react";
import "../common.css";


function MyPage() {

  const [modify, setModify] = useState(true);
  const [uid, setUid] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [currentName , setCurrentName] = useState("");
  const [datam1, setDatam1] = useState("");
  const [datam2, setDatam2] = useState("");
  const [datam3, setDatam3] = useState("");

  const [dataa1, setDataa1] = useState("");
  const [dataa2, setDataa2] = useState("");

  const [datal1, setDatal1] = useState("");
  const [datal2, setDatal2] = useState("");
  const [datal3, setDatal3] = useState("");


  const [oneday, setOneday] = useState("");
  const [Category, setCategory] = useState("");
  const [Intro, setIntro] = useState("");
  const [mdata, setMdata] = useState("");
  const [mdata2, setMdata2] = useState("");
  const [mc1T, setmc1T] = useState(); // make crew 1 title 
  const [mc1I, setmc1I] = useState(); // make crew 1 title 
  const [mc2T, setmc2T] = useState(); // make crew 1 title 
  const [mc2I, setmc2I] = useState(); // make crew 1 title 
  const [makecrew2, setMakecrew2] = useState();
  const [makecrew1, setMakecrew1] = useState();

  
  const [nickname, setNickname] = useState(""); // 닉네임 재설정 부분 초기화 
  finduid();
  setUserInfo();
  readM(); // 찾은 uid로 M1 정보를 읽어오는 함수 
  showM1();
  showM2();
  
  useEffect(() => {     
  console.log(auth.currentUser);                      // 한번만 닉네임 유저 이름으로 설정 
  // setNickname(auth.currentUser.displayName);
  // setCurrentName(auth.currentUser.displayName);
  }, [])

  function changename() {
    console.log('유저 이름 update 시작');
    const docRef = doc(dbService, "user", auth.currentUser.uid);
    updateDoc(docRef, {
      nickname : currentName
    });
    if (docRef) {
      console.log(modify);
    }
  }

  function changeMyinfo(){
    if(modify === true){
      console.log("안녕하세요");
    }else{
      changename();
      setNickname(currentName);
      console.log(nickname);
    }
    const instance = modify;
    setModify(!instance);
  }

  async function finduid() { // firebase Update : 함수 원하는 collection 안에 원하는 doc 안에 내용을 읽어올 때 사용한다.
    const docRef = doc(dbService, "currentuser", "now");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const instance = data.uid;
      setUid(instance);
      console.log(uid);
    }
  }
  async function setUserInfo() { // firebase Update : 함수 원하는 collection 안에 원하는 doc 안에 내용을 읽어올 때 사용한다.
    const docRef = doc(dbService, "user", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setuserEmail(data.email);
      setNickname(data.nickname);
      
    } 
  }

  async function showM1() { // firebase Update : 함수 원하는 collection 안에 원하는 doc 안에 내용을 읽어올 때 사용한다.
    const docRef = doc(dbService, "crew", mdata);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const a = docSnap.data()['CrewTitle'];
      const b = docSnap.data()['Intro']
     
      setmc2T(a);
      setmc2I(b);
      console.log(makecrew1);
    } else {
      console.log("No such document!");
      
    }
  }

  async function showM2() { // firebase Update : 함수 원하는 collection 안에 원하는 doc 안에 내용을 읽어올 때 사용한다.
    const docRef = doc(dbService, "crew", mdata2);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
        const a = docSnap.data()['CrewTitle'];
        const b = docSnap.data()['Intro']
        setmc1T(a);
        setmc1I(b);
        
        
    } else {
      console.log("No such document!");
      
    }
  }

  async function readM() { // firebase Update : 함수 원하는 collection 안에 원하는 doc 안에 내용을 읽어올 때 사용한다.
    const docRef = doc(dbService, uid, "M");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      // setFirstStep(docSnap.data().create);
      const a = docSnap.data();
      const alpha1 = Object.keys(a).length-1;
      setMdata(docSnap.data()[alpha1]);
      const alpha2 = Object.keys(a).length;
      setMdata2(docSnap.data()[alpha2]);
      console.log(mdata, mdata2);
    } else {
      console.log("No such document!");
      
    }
  }



async function readm2(props) { // firebase Update : 함수 원하는 collection 안에 원하는 doc 안에 내용을 읽어올 때 사용한다.
  const docRef = doc(dbService, "crew", mdata[props]);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    // setFirstStep(docSnap.data().create);
    const a = docSnap.data();
    setDatam2(a);
    
  } else {
    console.log("No such document!");
    
  }
}



  
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

  
  // function handleOnUpdate() {  
  //   console.log('update 시작');
  //   const docRef = doc(dbService, "crewPost");
  //   updateDoc(docRef, {
  //     CrewTitle: CrewTitle,
  //     Oneday: oneday,
  //     Category: Category,
  //     Intro: Intro,
  //   });
  //   if (docRef) {
  //     setCrew();
  //     console.log('update 성공');
  //   }
  // }
  // //Delete
  // function handleOnDelte() { 
  //   console.log('delete 시작');
  //   const docRef = doc(dbService, "crewBoard", 'crewInformation');
  //   deleteDoc(docRef, {
  //     delete: deleteField()
  //   });
  //   if (docRef) {
  //     setCrew();
  //     console.log('delete 성공');
  //   }
  // }

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
              <Link to="/"><img src="/img/로고.png" alt="logo" class="logoBox"/></Link>
              <Link to="/findCrew"><img src="/img/crewSearchBt.png" alt="searchBt" class="searchBox" /></Link>
              <p class="headerSection"/>
              <p class="nameSection">{nickname}</p>
              <img src="./img/google.jpg" class="profileIcon" />
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
        <p class="myProfile">내 프로필</p>
        <div class="myProfileBox">
          
        </div>
        {/* <div>
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
                {/* <img src="/img/수정.png" alt="" class="applyBt2" onClick={handleOnUpdate}/>
                <img src="/img/삭제.png" alt="" class="applyBt" onClick={handleOnDelte}/> 
                
                
            </div>
        </div>
  */}

      <div class="testProfile">      
      {modify
        ? <div>
          <img src="./img/google.jpg" class="profilePic" />
          <p1 class="nameText">{nickname}</p1>   
          <img src="/img/수정.png" class="editBt" onClick={changeMyinfo}/>
          <p1 class="emailText">{userEmail}</p1>
          <div class="profileDiv"/>
            <p class="nicknameText">닉네임</p>
            <p class="nicknameT">{nickname} </p> 
            <p class="loginRoute">소셜 로그인</p> 
            <p class="googleLogin">Google</p>
            <p class="addressText">이메일</p>
            <p class="address">{userEmail}</p>
          
        </div>
        : <div>
          <img src="./img/google.jpg" class="profilePic" />
          <p1 class="nameText">{nickname}</p1>   
          <img src="/img/저장.png" class="editBt" onClick={changeMyinfo}/>
          <p1 class="emailText">{userEmail}</p1>
          <div class="profileDiv"/>
          <p class="nicknameText">닉네임</p>
          <input type='text' value={currentName} placeholder={nickname} class="editNicknameBox" required onChange={onChange} />
        </div>
        }
      </div>
      <p class="myBoard">✍🏻 내가 쓴 글</p>
      <p1 class="myBoardTitle1">{mc1T}</p1>
      <p1 class="myBoardIntro1">{mc1I}</p1>
      <p1 class="myBoardTitle2">{mc2T}</p1>
      <p1 class="myBoardIntro2">{mc2I}</p1>
      <p class="myCrew">👥 내 크루 (내가 신청한 크루)</p>
      <p class="myInterest">💚 내가 관심있는 크루</p>
      {/* <h1> 내 크루 </h1> <br></br>
      <h1><img src="./img/samson.png" /> {crewTitle} <br></br> {crew} </h1> */}
     
    
    </body>
    
  );
}

export default MyPage;
