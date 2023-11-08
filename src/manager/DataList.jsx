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

    const getDataList = async()=>{
        try{
            const response = await axios.get("http://localhost:8080/products");
            setDataList(response.data)
            console.log(response.data)
        }catch (error){
            console.log(error)
        }
    }

    const deleteData = async(dataId)=>{
        console.log(dataId)
        try{
            const response = await axios.delete("http://localhost:8080/products/one?id="+String(dataId));
            console.log(response.data);
            getDataList();
        }catch (error){
            console.log(error)
        }
    }

    const goToNextPage = ()=>{
        setPageNumber(pageNumber+1)
    }

    const goToPreviousPage = ()=>{
        setPageNumber(pageNumber-1)
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
                    <span>1...</span>
                    <button onClick={goToPreviousPage}>prev</button>
                    <span>{ pageNumber}</span>
                    <button onClick={goToNextPage}>next</button>
                    <span>...{ Math.floor(dataList.length/maxDataNumber)+1 }</span>
                </div>
            }   
        </div>
        </div>
    )
}


export default DataList;