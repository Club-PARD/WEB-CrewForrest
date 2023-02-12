import React, { useState, useEffect, useId } from 'react';
import ListItem from './ListItem';
import { collection, setDoc, doc, updateDoc, deleteField, deleteDoc, addDoc, getDoc, getDocs } from "firebase/firestore";

import { app, auth, dbService, storage } from "../fbase";
import "../common.css";


function useFetch(url) {

    const [data, setData] = useState([]);
    
    async function fetchUrl() {
        const response = await fetch(url);
        const json = await response.json();
        
        setData(json);
    }
    
    useEffect(() => {
        fetchUrl();
    }, []);
    return data;
}

function CreateCrewPage() {
    const [CrewTitle, setCrewTitle] = useState("");
    const [oneday, setOneday] = useState("");
    const [Category, setCategory] = useState("");
    const [Intro, setIntro] = useState("");
  
    const [Crew, setCrew] = useState();
    const [users, setUsers] = useState([]);  //users 추가하고 삭제하는거 진행을 도와줄 state
    
    const uniqueId = useId(); // 유니크 id를 만들기 위한 useId()
    const [attachment, setAttachment] = useState();
    const data = useFetch("/api/list");

 

    const onChange = (event) => { 
        const {
          target: { value }
        } = event;
        setCrewTitle(value);
        setOneday(value);
        setCategory(value);
        setIntro(value);
      };
      
    //Create
    function handleOnSubmitWithdoc() { 
      console.log(CrewTitle);
        const docRef = addDoc(collection(dbService, "crewPost"), { 
          CrewTitle: CrewTitle,
          Oneday: oneday,
          Category: Category,
          Intro: Intro,
        });
        if (docRef) {
          setCrew();
          console.log('crew crewInformation에 저장 성공');
        } if (CrewTitle.length > 16) {
          alert("양식을 다시 확인해주세요.");
        } else console.log("저장되었습니다!");
      }
    //Update  

    // const personCategory = auth.currentUser,uid;

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
      const onFileChange = (event) =>{
        const{target:{files},
      } = event;
      const theFile = files[0]; //한 개의 파일만 input으로 지정 (첫번째 파일만 가져옴)
      const reader = new FileReader(); //파일을 가지고 reader를 만듦
      reader.onloadend = (finishedEvent) => {
        const {currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
      };
      reader.readAsDataURL(theFile); //readAsDataURL을 사용해서 파일을 읽음
      }
      //const onClearAttachment = () => setAttachment(null)

      // const open = document.querySelector(".open");
      // const close = document.querySelector(".modal_closeBtn");
      // const modal = document.querySelector(".modal");

      // function init(){
      //   open.addEventListener("click", function(){
      //     modal.classList.remove("hidden");
      //   });
      //   close.addEventListener("click", function(){
      //     modal.classList.add("hidden");
      //   });
      // }
      // init();

    return (   
        <body>
          {/* <div class="container"> */}
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
                <h3 class="createCrewText">크루 만들기</h3><br></br>
                <div class="createCrewBox">
                <div>
                  <input type='text' id='title_txt' name='title' placeholder='  제목 (16자 이내로 적어주세요.)' class="firstBox" onChange={(event) => {setCrewTitle(event.target.value)}}/><br></br>
                  
                </div>
                <div class='secondBox'>
                  <h3 class="mustInput">* </h3>
                  <h3 class="mainPhotoText">대표 사진</h3>
                  <div class="selectPic">
                    <center>
                      <img src="/img/ImageLogo.png" alt="selectPhoto" class="imageLogoBox"/>
                    </center>
                
                {attachment && (
                  <div>
                    <img src={attachment} width="48px" height="48px"/>
                  </div>
                  )}
                  </div>
                <div class = "filebox">
                  <label for="input-file">이미지 업로드</label>
                  <input type="file" accept="image/*" id="input-file" onChange={onFileChange}/>
                </div>
                 <div class="onedayClassBox">
                  원데이 크루 오픈 여부
                    <input type="radio" name="openCrew" class="radioBt" value="Open" checked onChange={(event) => {setOneday(event.target.value)}}/>오픈
                    <input type="radio" name="openCrew" class="radioBt" value="Not Open" onChange={(event) => {setOneday(event.target.value)}}/>미오픈 
                    <div id='result'></div>
                  </div>
            <div class="categoryFrame">
              <h3 class="mustInput">* </h3>
              <h3 class="categoryText">카테고리</h3>
                  <div class="categorySection">
                    <input type="button" name="category"class="categoryBt" value="운동/스포츠" onClick={(event) => {setCategory(event.target.value)}}/>
                    <input type="button" name="category" class="categoryBt" value="독서" onClick={(event) => {setCategory(event.target.value)}}/>
                    <input type="button" name="category" class="categoryBt" value="공예" onClick={(event) => {setCategory(event.target.value)}}/>
                    <input type="button" name="category" class="categoryBt" value="사진/영상" onClick={(event) => {setCategory(event.target.value)}}/>
                    <input type="button" name="category" class="categoryBt" value="봉사활동" onClick={(event) => {setCategory(event.target.value)}}/>
                  </div>             
            </div><br></br>
            </div>
            <div class="thirdBox">
                <h3 class="introStyleText">크루 소개글 양식</h3> 
                <textarea id="intro" class="textareaForm" onChange={(event) => {setIntro(event.target.value)}}>
                크루 이름: 
                크루 모집 인원: 
                크루 소개:
                크루 정모 일정: 
                크루 활동 지역: 
                </textarea>
                
              </div>  
              
              <button id="write" class="crudBt" onClick={handleOnSubmitWithdoc}>작성</button>
              {/* <div class="modal hidden" id="jsModal">
                <button class="modal_closeBtn" id="jsCloseBtn">CLOSE</button>
              </div> */}
              {/* <button onClick={handleOnUpdate}>업데이트하기</button>
              <button onClick={handleOnDelte}>삭제하기</button> */}
            </div>
            <br></br>
          {/* </div> */}
          
                <section className="list-wrapper">
                {data.map(
                    ({board_id, title, start_date, end_date}) => (
                        <ListItem
                            board_id={board_id}
                            title={title}
                            start_date={start_date}
                            end_date={end_date}
                            key={board_id}
                        />
                    )
                )}
                </section>
        
      
        </body>  
    );
}

export default CreateCrewPage;
