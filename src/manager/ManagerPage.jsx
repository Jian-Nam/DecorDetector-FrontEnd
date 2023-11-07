import React from 'react';
import { useNavigate } from "react-router-dom";
import './ManagerPage.css'

const ManagerPage = ()=>{
    const navigate = useNavigate();

    const goToDataListPage = () => {
      navigate("/datalist");
    }
  
    const goToAddDataPage = () => {
      navigate("/adddata");
    }

    const goToAddIkeaDataPage = () => {
      navigate("/addIkeadata");
    }
    

    return (
        <div>
            <button onClick={ goToDataListPage }>데이터 리스트 보기</button>
            <button onClick={ goToAddDataPage }>개별 데이터 추가</button>
            <button onClick={ goToAddIkeaDataPage }>IKEA 데이터 추가</button>
        </div>
    )
}


export default ManagerPage;