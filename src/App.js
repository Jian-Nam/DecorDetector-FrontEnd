import React, { useEffect, useState } from 'react'
import UserPage from './user/UserPage';
import ManagerPage from './manager/ManagerPage';
import DataList from './manager/DataList'
import AddData from './manager/AddData'
import AddIkeaData from './manager/AddIkeaData';
import { Routes, Route, useNavigate } from "react-router-dom";

import './App.css'
import Button from './Button';
import NavigatorElement from './NavigatorElement';

function App() {
  const navigate = useNavigate();
  const [appState, setAppState] = useState(true) // 이미지 검색:true 데이터 관리: false

  useEffect(()=>{
    if(!appState){
      navigate("/manager")
      return
    }
    navigate("/")

  },[appState])

  const goToUserPage = () => {
    navigate("/");
    setAppState(true)
  }

  const goToManagerPage = () => {
    navigate("/manager");
    setAppState(false)
  }

  return (

    <div className='App'>
      <div className = "topBar">
        <div className='title'>DecorDetector</div>
      </div>
      <div className='flexContainer navigator'>
        <div onClick={goToUserPage}>
          <NavigatorElement buttonText="이미지 검색" isClicked={appState}/>
        </div>
        <div onClick={goToManagerPage}>
          <NavigatorElement buttonText="데이터 관리" isClicked={!appState}/>
        </div>
      </div>
      <div className='container'>
        <Routes>
          <Route path="/" element={<UserPage className = "item"/>} />
          <Route path="/manager/*" element={<ManagerPage className = "item"/>} />

        </Routes>
      </div>
    </div>
  );
}

export default App;
