import React, { useState, useRef, useEffect} from 'react';

import axios from 'axios'
import './UserPage.css'

import ResultList from './ResultList';
import Button from '../Button';

const UserPage = (ctrl)=>{
    const backendUrl = "http://localhost:8080"
    const envBackendUrl = process.env.REACT_APP_BACKEND_URL

    const [ctx, setCtx] = useState();
    const [targetImg, setTargetImg] = useState({
        src: '',
        label: '',
    });
    const[enableSearch, setEnableSearch] = useState(true)

    const [searchResults , setSearchResults] = useState([]);

    const [imgFile, setImgFile] = useState();
    const [previewSrc, setPreviewSrc] = useState();
    const [altSrc, setAltSrc] = useState("/images/UploadImage.png")

    const [point, setPoint] = useState({
        pointX: '',
        pointY: '',
      });

    const imgRef = useRef();
    const fileRef = useRef();
    const canvasRef = useRef();


    useEffect(() => {
        const context = canvasRef.current.getContext("2d");
        setCtx(context);
    });

    useEffect(() => {
        if(point.pointX !== '' && point.pointY !==''){
            // console.log("Photo is clicked on: ", point);
            sendFrom();
        }
    }, [point]);

    useEffect(() => {
        resizeCanvas();
    }, [previewSrc]);


    // ======== onChangeFile ======== //

    const onChangeFile = async(e) => {
        if(e.target.files[0]){
            setImgFile(e.target.files[0])
            showPreview();
            return;
        }
    }

    function showPreview() {
        const file = fileRef.current.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async() => {
            setPreviewSrc(reader.result)
        };
    };


    // ======== onLoadPreview ======== //

    const onLoadPreview = () =>{
        resizeCanvas();
    }

    const resizeCanvas = () => {
        canvasRef.current.width = imgRef.current.width;
        canvasRef.current.height = imgRef.current.height;
        setCtx(ctx);
        //console.log(canvasRef.current.width);
    }

    // ======== onClickCanvas ======== //

    const onClickCanvas = (e) => {
        if(!enableSearch){
            alert("결과를 받는중입니다. 기다려주세요.");
            return;
        }
        if(previewSrc){
            const xInBrowser = e.nativeEvent.offsetX
            const yInBrowser = e.nativeEvent.offsetY
            
            setPoint(prev => ({
                ...prev,
                pointX: Math.round(xInBrowser / imgRef.current.width *  imgRef.current.naturalWidth) ,
                pointY: Math.round(yInBrowser / imgRef.current.height *  imgRef.current.naturalHeight) ,
            }));
            
            // canvas 에 점찍기
            ctx.beginPath();
            ctx.arc(xInBrowser, yInBrowser, 5, 0, 2*Math.PI);
            ctx.fillStyle = "#FFA500";
            ctx.fill()
        }
    }


    const sendFrom = async() => {
        setEnableSearch(false)
        let formData = new FormData();
        
        formData.append('image', imgFile)
        formData.append('pointX', point.pointX)
        formData.append('pointY', point.pointY)
        console.log("ENV TEST: " + envBackendUrl)
        axios({
            url: backendUrl + "/products/similar",
            method: 'POST',
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
            .then(response => {
                console.log("BACKEND RESPONSE STATUS: " + response.status);
                setSearchResults([response.data, ...searchResults]);
                setEnableSearch(true)
            })
            .catch(error => {
              console.error(error);
            });
    }

    return (
      <div className='pageCenterize'>
        <div className='page'>
        <div className = "subTitle">Search Product</div>
        <div className = 'description'>
            <div>이 페이지는 이미지를 통해 가구 검색을 하기 위한 페이지 입니다.</div>
            <div>하나의 이미지 내에서 원하는 부분만 골라 유사한 가구를 받아볼 수 </div>
            <div>있습니다. 검색을 위해서 다음 메뉴얼을 따라주세요.</div>
        </div>
        <div className='manual'>
            <div className='manualTitle'>----------Manual----------</div>
            <div className='manualText'>
                <div>1. 이미지를 업로드하세요</div>
                <div>2. 이미지에서 검색을 원하는 부분을 클릭하세요</div>
            </div>
        </div>

        <div id ="canvas-wrapper">
            <img
                id = "image"
                src = {(previewSrc)? previewSrc:altSrc}
                ref = {imgRef}
                onLoad={onLoadPreview}
            />
            <canvas
                id="output"
                ref={canvasRef}
                height = "0"
                onClick = {onClickCanvas}
            >
            </canvas>
        </div>
        <div id = "upload-wrapper">
            <label htmlFor="upload">
                <Button buttonText="Select Image"></Button>
                <div className="buttonBox">
                </div>
            </label>
            <input 
                type="file"
                accept="image/jpg"
                id="upload"
                onChange={onChangeFile}
                ref={fileRef}
            />
        </div>

        {searchResults ? <ResultList searchResults = {searchResults}/>: null}
        </div>
      </div>

    );
  }
  export default UserPage;