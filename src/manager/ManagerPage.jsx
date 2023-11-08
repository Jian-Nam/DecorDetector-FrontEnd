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
      navigate("manager/datalist");
      setPageState(1);
    }
  
    const goToAddDataPage = () => {
      navigate("manager/adddata");
      setPageState(2);
    }

    const goToAddIkeaDataPage = () => {
      navigate("manager/addIkeadata");
      setPageState(3);
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
            <div className='buttonBox' onClick={ goToAddIkeaDataPage }>
              <NavigatorElement buttonText = "Add Ikea Data" isClicked={pageState==3}/>
            </div>
          </div>
            <Routes>
              <Route path="manager/datalist" element={<DataList className = "item"/>} />
              <Route path="manager/adddata" element={<AddData className = "item"/>} />
              <Route path="manager/addikeadata" element={<AddIkeaData className = "item"/>} />
            </Routes>
        </div>
    )
}


export default ManagerPage;