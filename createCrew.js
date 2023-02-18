import { Link } from 'react-router-dom';

import React, { useState, useEffect, useId } from 'react';
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

    const [uid, setUid] = useState("");
    const [mdata, setMdata] = useState("");
    const [randomid, setRandomid] = useState("");
    const [ b, setB ] = useState(""); // book document 넣을때 필요한 변수 밑에 emnopv 도 같은 맥락 
    const [ e, setE ] = useState("");
    const [ m, setM] = useState("");
    const [ n, setN ] = useState("");
    const [ o, setO ] = useState("");
    const [ p, setP ] = useState("");
    const [ v, setV ] = useState("");

    const onChange = (event) => { 
        const {
          target: { value }
        } = event;
        setCrewTitle(value);
        setOneday(value);
        setCategory(value);
        setIntro(value);
      };
      
    /////////////////////////////////////////Create///////////////////////////////////////////
    async function handleOnSubmitWithdoc() { 
      console.log(CrewTitle);
        const docRef = addDoc(collection(dbService, "crew"), { 
          CrewTitle: CrewTitle,
          Oneday: oneday,
          Category: Category,
          Intro: Intro,
        });
        if (docRef) {
          setCrew();
          console.log('crew crewInformation에 저장 성공');
          console.log(docRef.id);
          setRandomid(docRef.id);
          finduid(); // 현재 유저의 uid 찾기 
          readM(); // 찾은 uid로 M(자기가 적은 글 랜덤 id읽기 ) 
          readData(); // Data 예전꺼 지우기 
          updateData(); // Data 방금 만든거 추가하기 1번으로 => 요거는 collection home 에서 각각의 document에 맞게 (ex 독서 , 원데이 => d, o , n(new crew) 에 업데이트됨 )
          updateM(); // 개인 uid M 항목에 추가
        } if (CrewTitle.length > 16) {
          alert("양식을 다시 확인해주세요.");
          // titleInput.style.border='3px #FF7B7B';
        } else alert("저장되었습니다!");

      }
    //////////////////////////////////////////Update//////////////////////////////////////////  
    async function updateData() { // firebase Update : 함수 원하는 collection 안에 원하는 doc 안에 내용을 읽어올 때 사용한다.
      
      const docRef = doc(dbService, "home", "new");
      const docSnap = await getDoc(docRef);

      updateDoc(docRef, {
        1 : randomid
       });

       console.log("실행중 이상현");


      if(Category === "운동/스포츠"){
        const docRef1 = doc(dbService, "home", "exercise");
      const docSnap1 = await getDoc(docRef1);
      updateDoc(docRef1, {
        1 : randomid
       });
      }
      
      if(Category === "독서"){
      const docRef2 = doc(dbService, "home", "book");
      const docSnap2 = await getDoc(docRef2);
      updateDoc(docRef2, {
        1 : randomid
       });
    }

    if(Category === "공예"){
      const docRef3 = doc(dbService, "home", "make");
      const docSnap3 = await getDoc(docRef3);
      updateDoc(docRef3, {
        1 : randomid
       });
    }

    if(Category === "사진/영상"){
      const docRef4 = doc(dbService, "home", "photo");
      const docSnap4 = await getDoc(docRef4);
      updateDoc(docRef4, {
        1 : randomid
       });
    }

    if(Category === "봉사활동"){
      const docRef5 = doc(dbService, "home", "volunteer");
      const docSnap5 = await getDoc(docRef5);
      updateDoc(docRef5, {
        1 : randomid
       });
    }
    if(oneday === ""){
      const docRef6 = doc(dbService, "home", "one");
      const docSnap6 = await getDoc(docRef6);
      updateDoc(docRef6, {
        1 : randomid
       });
      
    }
  }

  async function readData() { // firebase Update : 함수 원하는 collection 안에 원하는 doc 안에 내용을 읽어올 때 사용한다.
      
    const docRef = doc(dbService, "home", 'new');
    const docSnap = await getDoc(docRef);
    const a = docSnap.data()[1];
    setN(a);
    updateDoc(docRef, {
        2 : n
       });
    const docRefm = doc(dbService, uid, 'M');
    const docSnapm = await getDoc(docRef);
    const am = docSnapm.data()[1];
    // setN(a);
    updateDoc(docRef, {
        2 : am
      });
    if(Category === "운동/스포츠"){
      const docRef1 = doc(dbService, "home", "exercise");
    const docSnap1 = await getDoc(docRef1);
    const a1 = docSnap1.data()[1];
    
    setE(a1);
    
    updateDoc(docRef1, {
      2 : e
     });

    }
    
    if(Category === "독서"){
    const docRef2 = doc(dbService, "home", "book");
    const docSnap2 = await getDoc(docRef2);
    const a2 = docSnap2.data()[1];   
    setB(a2);
    updateDoc(docRef2, {
      2 : b
     });
  }

  if(Category === "공예"){
    const docRef3 = doc(dbService, "home", "make");
    const docSnap3 = await getDoc(docRef3);
    const a3 = docSnap3.data()[1];
    setM(a3);
    updateDoc(docRef3, {
      2 : m
     });
  }

  if(Category === "사진/영상"){
    const docRef4 = doc(dbService, "home", "photo");
    const docSnap4 = await getDoc(docRef4);
    const a4 = docSnap4.data()[1];
    setP(a4);
    updateDoc(docRef4, {
      2 : p
     });
  }

  if(Category === "봉사활동"){
    const docRef5 = doc(dbService, "home", "volunteer");
    const docSnap5 = await getDoc(docRef5);
    const a5 = docSnap5.data()[1];
    setV(a5);
    updateDoc(docRef5, {
      2 : v
     });
  }

  if(oneday === ""){
    const docRef6 = doc(dbService, "home", "one");
    const docSnap6 = await getDoc(docRef6);
    const a6 = docSnap6.data()[1];
    setO(a6)
    updateDoc(docRef6, {
      2 : o
     });
    
  }
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

async function readM() { // firebase Update : 함수 원하는 collection 안에 원하는 doc 안에 내용을 읽어올 때 사용한다.
  const docRef = doc(dbService, uid, "M");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    // setFirstStep(docSnap.data().create);
    const a = docSnap.data();
    setMdata(a);
    console.log(mdata);
  } else {
    console.log("No such document!");
    
  }
}

function updateM() {  // firebase Update : 함수 원하는 collection 안에 원하는 doc 안에 특정 field를 업데이트해주고 싶을 때 사용한다

  const alpha = Object.keys(mdata).length+1;
  const docRef = doc(dbService, uid, 'M');
  updateDoc(docRef, {
   [alpha] : randomid
  });
  if (docRef) {
    console.log('update 성공');
  }
}

 // crew를 생성하는 함수 => 버튼 눌렸을 때 firebase에 데이터 create 함수 랜덤 id 넣어줌 
 function crewUpdate() {  
  console.log('update 시작');
  const docRef = doc(dbService, "crew");
  updateDoc(docRef, {
    CrewTitle: CrewTitle,
    Oneday: oneday,
    Category: Category,
    Intro: Intro,
    docid : doc.id,
    docRef : docRef.id
  });
  if (docRef) {

    setCrew();
    console.log('update 성공');
  }
}

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
  ////////////////////////////////////////Delete/////////////////////////////////
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

    return (   
      <body>
        <header>
          <div class="site-title">
            <Link to="/"><img src="/img/로고.png" alt="logo" class="logoBox"/></Link>
            <Link to="/findCrew"><img src="/img/crewSearchBt.png" alt="searchBt" class="searchBox" /></Link>
            <p class="headerSection"/>
            <p class="nameSection" />
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
            <input type="file" accept="image/*" id="input-file" required onChange={onFileChange}/>
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
                  <div class="categoryBt">
                    <input type="radio" id="radio1" name="category" value="운동/스포츠"/>
                    <label for="radio1">운동/스포츠</label>
                    <input type="radio" id="radio2" name="category" value="독서"/>
                    <label for="radio2">독서</label>
                    <input type="radio" id="radio3" name="category" value="공예"/>
                    <label for="radio3">공예</label>
                    <input type="radio" id="radio4" name="category" value="사진/영상"/>
                    <label for="radio4">사진/영상</label>
                    <input type="radio" id="radio5" name="category" value="봉사활동"/>
                    <label for="radio5">봉사활동</label>
                  </div>
                </div>             
          </div>
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
      {/* </div> */}
    </body>  
  );
}

export default CreateCrewPage;
