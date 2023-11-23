import React, { useState } from 'react';
import './ManagerPage.css'
import DataList from './DataList'
import AddData from './AddData'
import AddIkeaData from './AddIkeaData';
import NavigatorElement from '../NavigatorElement';
import { Routes, Route, useNavigate } from "react-router-dom";

const ManagerPage = ()=>{
    const [pageState, setPageState] = useState(0);
    const navigate = useNavigate();

    const goToDataListPage = () => {
      navigate("datalist");
      setPageState(1);
    }
  
    const goToAddDataPage = () => {
      navigate("adddata");
      setPageState(2);
    }
    

    return (
        <div>
          <div className='flexContainer navigator'>
            <div onClick={ goToDataListPage }>
              <NavigatorElement buttonText = "Data List" isClicked={pageState==1}/>
            </div>
            <div className='buttonBox' onClick={ goToAddDataPage }>
              <NavigatorElement buttonText = "Add Data" isClicked={pageState==2}/>
            </div>
          </div>
            <Routes>
              <Route path="datalist" element={<DataList className = "item"/>} />
              <Route path="adddata" element={<AddData className = "item"/>} />
            </Routes>
        </div>
    )
}


export default ManagerPage;