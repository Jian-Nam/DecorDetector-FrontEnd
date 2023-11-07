import React from 'react'
import FirstPage from './FirstPage';
import UserPage from './user/UserPage';
import ManagerPage from './manager/ManagerPage';
import DataList from './manager/DataList'
import AddData from './manager/AddData'
import AddIkeaData from './manager/AddIkeaData';
import { Routes, Route, BrowserRouter } from "react-router-dom";

import './App.css'

function App() {

  return (

    <BrowserRouter>
    <div className = "topBar">
      <div className='title'>DecorDetector</div>
    </div>
    <div className='container'>
      <Routes>
        <Route path="/" element={<FirstPage className = "item"/>} />
        <Route path="/user" element={<UserPage className = "item"/>} />
        <Route path="/manager" element={<ManagerPage className = "item"/>} />
        <Route path="/datalist" element={<DataList className = "item"/>} />
        <Route path="/adddata" element={<AddData className = "item"/>} />
        <Route path="/addikeadata" element={<AddIkeaData className = "item"/>} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
