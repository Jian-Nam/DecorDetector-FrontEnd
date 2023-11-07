import React, { useState, useRef, useEffect} from 'react';

import axios from 'axios'
import './UserPage.css'

import ResultList from './ResultList';

const UserPage = (ctrl)=>{
    const backendUrl = "http://localhost:8080"
    const envBackendUrl = process.env.REACT_APP_BACKEND_URL

    const [ctx, setCtx] = useState();
    const [targetImg, setTargetImg] = useState({
        src: '',
        label: '',
    });

    const [searchResults , setSearchResults] = useState([]);

    const [imgFile, setImgFile] = useState();
    const [previewSrc, setPreviewSrc] = useState();
    const [altSrc, setAltSrc] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")

    const [point, setPoint] = useState({
        pointX: '',
        pointY: '',
      });

    const imgRef = useRef();
    const fileRef = useRef();
    const canvasRef = useRef();

    useEffect(()=>{
        if(targetImg.src !== '' && targetImg.label !== ''){

        }
    }, [targetImg])

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
        setImgFile(e.target.files[0])
        showPreview();
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
            })
            .catch(error => {
              console.error(error);
            });
    }

    return (
      <div className='page'>
        <div class = "subTitle">Search Product</div>
        <div class = 'manual'>
            <div>1. 이미지를 업로드하세요</div>
            <div>2. 이미지를 클릭하세요</div>
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
                <div className="buttonBox">
                    <div className='buttonText'>Upload Image</div>
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
    );
  }
  export default UserPage;