import React, { useState, useEffect, useId } from 'react';
import ListItem from './ListItem';
import { collection, setDoc, doc, updateDoc, deleteField, deleteDoc, addDoc, getDoc, getDocs } from "firebase/firestore";

import { app, auth, dbService, storage } from "../fbase";
import styled, { css } from "styled-components";
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
    const [CrewName, setCrewName] = useState("");
    const [CrewNum, setCrewNum] = useState(0);
    const [CrewLocation, setCrewLocation] = useState("");
    const [CrewIntro, setCrewIntro] = useState("");
    const [CrewDates, setCrewDates] = useState("");

    const [Crew, setCrew] = useState();
    const [users, setUsers] = useState([]);  //users 추가하고 삭제하는거 진행을 도와줄 state
    
    const uniqueId = useId(); // 유니크 id를 만들기 위한 useId()
    const [attachment, setAttachment] = useState();
    const data = useFetch("/api/list");

    // const  [color, setColor] =useState("black")
    // onClick =()=> {
    //   color==="black"
    // }

    const onChange = (event) => { 
        const {
          target: { value }
        } = event;
        setCrewTitle(value);
        setCrewName(value);
        setCrewNum(value);
        setCrewLocation(value);
        setCrewIntro(value);
        setCrewDates(value);
      };
      
    //Create
    function handleOnSubmitWithdoc() {  
        const docRef = setDoc(doc(dbService, "crewBoard", 'crewInformation'), { 
          crewTitle: CrewTitle,
          crewName: CrewName,
          crewNum: CrewNum,
          crewLocation: CrewLocation,
          crewIntro: CrewIntro,
          crewDates: CrewDates
        });
        if (docRef) {
          setCrew();
          console.log('crewBoard crewInformation에 저장 성공');
        } if (CrewTitle.length > 16) {
          alert("양식을 다시 확인해주세요.");
        }
      }
    //Update
      function handleOnUpdate() {  
        console.log('update 시작');
        const docRef = doc(dbService, "crewBoard", 'crewInformation');
        updateDoc(docRef, {
          crewTitle: CrewTitle,
          crewName: CrewName,
          crewNum: CrewNum,
          crewLocation: CrewLocation,
          crewIntro: CrewIntro,
          crewDates: CrewDates
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

    return (
        
        <body>
          <div class="container">
            <header>
              <div class="site-title">
                <img src="/img/로고.png" alt="logo" class="logoBox"/>
                <img src="/img/crewSearchBt.png" alt="searchBt" class="searchBox" />

              </div>
              
            </header>     

                <h3 class="createCrewText">크루 만들기</h3><br></br>
                <div class="createCrewBox">
                <div>
                  <input type='text' id='title_txt' name='title' placeholder='  제목 (16자 이내로 적어주세요.)' class="firstBox" onChange={(event) => {setCrewTitle(event.target.value)}}/><br></br>
                </div>
                <div class='secondBox'>
                  <h3 class="mainPhotoText">* 대표 사진</h3>
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
                <label for="input-file" >
                  <div class="input-file-button"> 이미지 업로드</div>
                </label>
                <input type='file' accept="image/*" id="input-file" onChange={onFileChange}/><br></br>

                  <div class="onedayClassBox">
                  원데이 크루 오픈 여부
                    <input type="radio" name="openCrew" class="radioBt" checked/>오픈
                    <input type="radio" name="openCrew" class="radioBt"/>미오픈 
                  </div>
            <div class="categoryFrame">
              <h3 class="categoryText">* 카테고리</h3>
                  <div class="categorySection">
                    <button type="button" class="categoryBt">운동/스포츠</button>
                    <button type="button" class="categoryBt">독서</button>
                    <button type="button" class="categoryBt">공예</button>
                    <button type="button" class="categoryBt">사진/영상</button>
                    <button type="button" class="categoryBt">봉사활동</button>
                  </div>
                                        
            </div><br></br>
            </div>
            <div class="thirdBox">
                <h3>크루 소개글 양식</h3> 
                <textarea class="textareaForm">
                  크루 이름:   
                  크루 모집 인원:   
                  크루 소개:   
                  크루 정모 일정:   
                  크루 활동 지역:
                </textarea><br></br>
                {/* <input type='text' id='crewName' name='crewName' placeholder='크루 이름' onChange={(event) => {setCrewName(event.target.value)}}/><br></br>
                <input type='text' id='crewNum' name='crewNum' placeholder='크루 모집 인원' onChange={(event) => {setCrewNum(event.target.value)}}/><br></br>
                <input type='text' id='crewIntro' name='crewIntro' placeholder='크루 소개' onChange={(event) => {setCrewIntro(event.target.value)}}/><br></br>
                <input type='text' id='crewDates' name='crewDates' placeholder='크루 정모 일정' onChange={(event) => {setCrewDates(event.target.value)}}/><br></br>
                <input type='text' id='crewLocation' name='crewLocation' placeholder='크루 활동 지역' onChange={(event) => {setCrewLocation(event.target.value)}}/><br></br> */}
              </div>  
              
              <button class="crudBt" onClick={handleOnSubmitWithdoc}>작성</button>
              {/* <button onClick={handleOnUpdate}>업데이트하기</button>
              <button onClick={handleOnDelte}>삭제하기</button> */}
            </div>
            <br></br>
          </div>
          
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