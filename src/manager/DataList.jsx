import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DataList.css'
import { useNavigate } from "react-router-dom";

const DataList = ()=>{
    const[dataList, setDataList] = useState();
    const[pageNumber, setPageNumber] = useState(1);
    const[maxDataNumber, setMaxDataNumber] = useState(10);
    const[maxPageNumber, setMaxPageNumber] = useState(0);

    useEffect(()=> {
        getDataList();
    }, [])

    useEffect(()=>{
        if(!typeof dataList == "undefined"){
            setMaxPageNumber(Math.floor(dataList.length/maxDataNumber)+1)
        }
    },[])

    function getMaxPage(){
        if(dataList){
            return Math.floor(dataList.length/maxDataNumber)+1
        }
    }

    const getDataList = async()=>{
        try{
            const response = await axios.get(process.env.REACT_APP_BACKEND_URL + "/products");
            setDataList(response.data)
            console.log(response.data)
        }catch (error){
            alert(error)
        }
    }

    const deleteData = async(dataId)=>{
        console.log(dataId)
        var pwd = prompt("삭제를 원하시면 관리자에게 문의하세요 PASSWORD: ")
        if(pwd == 3877){
            try{
                const response = await axios.delete(process.env.REACT_APP_BACKEND_URL + "/products/one?id="+ String(dataId));
                console.log(response.data);
                getDataList();
            }catch (error){
                alert(error)
            }
        }
        else{
            alert("비밀번호가 틀렸습니다.")
        }
    }
    const savePageNumber = (event)=>{
        setPageNumber(parseInt(event.target.value))
    }

    const goToNextPage = ()=>{
        setPageNumber(Math.min(pageNumber+1, getMaxPage()))
    }

    const goToPreviousPage = ()=>{
        setPageNumber(Math.max(pageNumber-1, 0))
    }

    function range(start, end) {
        let array = [];
        for (let i = start; i < end+1; ++i) {
          array.push(i);
        }
        return array;
    }

    return (
        <div className='pageCenterize'>
        <div className='page'>
            <div className='subTitle'>데이터 리스트</div>
            <table className='dataTable' >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>IMAGE</th>
                        <th>SUB ID</th>
                        <th>PRODUCT NAME</th>
                        <th>LINK</th>
                        <th>DELETE</th>
                    </tr>
                </thead>
                <tbody>

                {
                    (dataList) &&
                        dataList.slice((pageNumber-1) * maxDataNumber, Math.min((pageNumber * maxDataNumber), dataList.length)).map((data) => (
                            <tr key = {data.id}>
                                <td>{data.id}</td>
                                <td>
                                    <img className='dataImage' src={data.image}/> 
                                </td>
                                <td>{data.externalId}</td>
                                <td>{data.productName}</td>
                                <td>
                                    <a href={data.link}>링크</a>
                                </td>
                                <td>
                                    <button onClick={()=>{ deleteData(data.id) }}>x</button>
                                </td>
                            </tr>
                    ))
                }  
                </tbody>
            </table>

            {(dataList) &&
                <div>
                    <span>페이지 번호 </span>
                    <select 
                        className='inputBox'        
                        type="number" 
                        value={pageNumber}
                        onChange={savePageNumber}
                    ><option value = "select" disabled={true}> 페이지 선택 </option>
                        {   
                            (dataList)&&
                                range(1, getMaxPage()).map((k)=> (
                                    <option key = {k} value = {k}>{k}</option>
                                ))
                        }
                    </select>
                </div>
            }   
        </div>
        </div>
    )
}


export default DataList;