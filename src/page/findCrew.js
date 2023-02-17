import { Link } from 'react-router-dom';

import React, { useState, useEffect, useId } from 'react';
import { collection, setDoc, doc, updateDoc, deleteField, deleteDoc, addDoc, getDoc, getDocs } from "firebase/firestore";

import { app, auth, dbService, storage } from "../fbase";
import MyPage from './MyPage';
import "../common.css";

function findCrew() {
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
            <div ></div>
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
                <img src="/img/크루지원.png" alt="" class="applyBt"/>
            </div>

        <h1>findCrew</h1>
        <p>findCrew page</p>
        </div>
    </body>
    
  );
};

export default findCrew;