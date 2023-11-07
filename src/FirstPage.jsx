import React from 'react';
import { useNavigate } from "react-router-dom";

const FirstPage = ()=>{
    const navigate = useNavigate();

    const goToUserPage = () => {
      navigate("/user");
    }
  
    const goToManagerPage = () => {
      navigate("/manager");
    }
    

    return (
        <div>
            <button onClick={goToUserPage}>사용자 접속</button>
            <button onClick={goToManagerPage}>관리자 접속</button>
        </div>
    )
}


export default FirstPage;