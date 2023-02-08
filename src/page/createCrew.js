import React, { useState, useEffect } from 'react';
import ListItem from './ListItem';
import { collection, setDoc, doc, updateDoc, deleteField, deleteDoc, addDoc, getDoc, getDocs } from "firebase/firestore";

import { auth, dbService, storage } from "../fbase";

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
    const [CrewInfo, setCrewInfo] = useState();
    const [CrewNum, setCrewNum] = useState();
    const [CrewLocation, setCrewLocation] = useState();
    const [imageUpload, setImageUpload] = useState();
    const [imageUrl, setImageUrl] = useState("");
    const [Crew, setCrew] = useState();
    const data = useFetch("/api/list");

    const onChange = (event) => { 
        const {
          target: { value }
        } = event;
        setCrewInfo(value);
        setCrewNum(value);
        setCrewLocation(value);
        setImageUpload(value);
        setImageUrl(value);
      };

    //Create
    function handleOnSubmitWithdoc() {  
        const docRef = setDoc(doc(dbService, "crewBoard", 'crewInformation'), { 
          create: Crew,
          update: Crew,
          delete: Crew
        });
        if (docRef) {
          setCrew();
          console.log('crewBoard crewInformation에 저장 성공');
        }
      }
    //Update
      function handleOnUpdate() {  
        console.log('update 시작');
        const docRef = doc(dbService, "crewBoard", 'crewInformation');
        updateDoc(docRef, {
          update: Crew
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
        updateDoc(docRef, {
          delete: deleteField()
        });
        if (docRef) {
          setCrew();
          console.log('delete 성공');
        }
      }
    return (
        <main className="list-template">     
            <div className="list-title">
                <h1>크루 게시판</h1>
            </div>
            <section className="head-wrapper">
                <h3>크루 만들기</h3>
                <input type='text' id='title_txt' name='title' placeholder='제목 (10자 이내로 적어주세요.)' /><br></br>
                <input type='text' id='photo' name='image' placeholder='대표 사진'/><br></br>
                <div>
                    <h2>원데이 클래스 오픈 여부</h2>
                    <label><input type='checkbox' id='openClass' />오픈</label>
                    <label><input type='checkbox' id='NotopenClass' />미오픈</label>
                </div>
            <div>
                <p>카테고리 선택</p>
                <button className="category" type="button">운동</button>
                <button className="category" type="button">댄스</button>
                <button className="category" type="button">독서</button>
                <button className="category" type="button">공예</button>
                <button className="category" type="button">사진/영상</button>
                <button className="category" type="button">봉사활동</button>
            </div><br></br>
            <div>
                <h2>크루를 소개해주세요</h2>
                <textarea name="CrewInfo">크루에 대한 간단한 소개:  </textarea>
                <textarea name="CrewInfo">크루 모집 인원:   </textarea>
                <textarea name="CrewInfo">크루 활동 장소: </textarea><br></br>
            </div>
            <div id="submit_btn">
                <button type="submit">저장</button>&nbsp;&nbsp;
                <button>취소</button>
            </div>
            <button onClick={handleOnSubmitWithdoc}>저장하기</button>
            <button onClick={handleOnUpdate}>업데이트하기</button>
            <button onClick={handleOnDelte}>삭제하기</button>

            /*사진 업로드 기능 추가*/

            </section> 
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
        </main>
    );
}

export default CreateCrewPage;