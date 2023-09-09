import React, { useState, useRef, useEffect} from 'react';

import axios from 'axios'
import './DetectFurnituresUI.css'
import SearchFurnituresUI from './SearchFurnituresUI';

const DetectFurnituresUI = (ctrl)=>{
    const [ctx, setCtx] = useState();
    const [targetImgList, setTargetImgList] = useState([]);
    const [imgLabelList, setImgLabelList] = useState([]);

    const [imgFile, setImgFile] = useState();
    const [previewSrc, setPreviewSrc] = useState();

    const [onClickCoordinate, setOnClickCoordinate] = useState({
        coordinateX: '',
        coordinateY: '',
      });


    const imgRef = useRef();
    const fileRef = useRef();
    const canvasRef = useRef();

    useEffect(() => {
        const context = canvasRef.current.getContext("2d");
        setCtx(context);
    });

    useEffect(() => {
        if(onClickCoordinate.coordinateX !== '' && onClickCoordinate.coordinateX !==''){
            console.log("Photo is clicked on: ", onClickCoordinate);
            sendFrom();
        }
    }, [onClickCoordinate]);

    useEffect(() => {
        resizeCanvas();
    }, [previewSrc]);

    const segmentImgUpload = async(e) => {
        setImgFile(e.target.files[0])
        showPreview();
    }


    const resizeCanvas = () => {
        let tctx = ctx;
        canvasRef.current.width = imgRef.current.width;
        canvasRef.current.height = imgRef.current.height;
        setCtx(ctx);
        //console.log(canvasRef.current.width);
    }

    function showPreview() {
        const file = fileRef.current.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async() => {
            setPreviewSrc(reader.result)
        };
    };


    const sendFrom = async() => {

        let formData = new FormData();
        
        formData.append('image', imgFile)
        formData.append('pointX', onClickCoordinate.coordinateX)
        formData.append('pointY', onClickCoordinate.coordinateY)

        axios({
            url: "http://127.0.0.1:5000/segment",
            method: 'POST',
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            responseType:'blob',
          })
            .then(response => {
                const responseBlob =  response.data
                //imgRef.current.src = URL.createObjectURL(responseBlob);
                const newtargetImgSrc =  URL.createObjectURL(responseBlob);
                setTargetImgList([newtargetImgSrc, ...targetImgList])
                setImgLabelList([9, ...imgLabelList])
            })
            .catch(error => {
              console.error(error);
            });
    }


    const pinPoint = (e) => {
        const xInBrowser = e.nativeEvent.offsetX
        const yInBrowser = e.nativeEvent.offsetY

        setOnClickCoordinate(prev => ({
            ...prev,
            coordinateX: Math.round(xInBrowser / imgRef.current.width *  imgRef.current.naturalWidth) ,
            coordinateY: Math.round(yInBrowser / imgRef.current.height *  imgRef.current.naturalHeight) ,
          }));
        
        // canvas 에 점찍기
        ctx.beginPath();
        ctx.arc(xInBrowser, yInBrowser, 5, 0, 2*Math.PI);
        ctx.fillStyle = "#FFA500";
        ctx.fill()
    }
      
    return (
      <div>
        <div id = "upload-wrapper">
            <input 
                type="file"
                accept="image/*"
                id="upload"
                onChange={segmentImgUpload}
                ref={fileRef}
            />
        </div>
        <div id ="canvas-wrapper">
            <img
                id = "image"
                src = {previewSrc}
                ref = {imgRef}
                onLoad={resizeCanvas}
            />
            <canvas
                id="output"
                ref={canvasRef}
                height = "0"
                onClick = {pinPoint}
            >
            </canvas>
        </div>
        {targetImgList&&imgLabelList ? <SearchFurnituresUI labelList = {imgLabelList} imageList = {targetImgList}  /> : null}
      </div>
    );
  }
  export default DetectFurnituresUI;