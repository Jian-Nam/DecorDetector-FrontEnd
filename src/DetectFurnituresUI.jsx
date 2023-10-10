import React, { useState, useRef, useEffect} from 'react';

import axios from 'axios'
import './DetectFurnituresUI.css'
import CategoryData from './CategoryData';

import SearchResultsUI from './SearchResultsUI';

const DetectFurnituresUI = (ctrl)=>{
    const [ctx, setCtx] = useState();
    const [targetImg, setTargetImg] = useState({
        src: '',
        label: '',
    });

    const [searchResults , setSearchResults] = useState([]);

    const [imgFile, setImgFile] = useState();
    const [previewSrc, setPreviewSrc] = useState();

    const [point, setPoint] = useState({
        pointX: '',
        pointY: '',
      });

    const [categoryData, dummy3] = useState( new CategoryData() );

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
            console.log("Photo is clicked on: ", point);
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


    const sendFrom = async() => {

        let formData = new FormData();
        
        formData.append('image', imgFile)
        formData.append('pointX', point.pointX)
        formData.append('pointY', point.pointY)

        axios({
            url: "http://127.0.0.1:8080/products/similar",
            method: 'POST',
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
            .then(response => {
                console.log(response.data);
                setSearchResults([response.data, ...searchResults]);
            })
            .catch(error => {
              console.error(error);
            });
    }


      
    return (
      <div>
        <div id = "upload-wrapper">
            <input 
                type="file"
                accept="image/*"
                id="upload"
                onChange={onChangeFile}
                ref={fileRef}
            />
        </div>
        <div id ="canvas-wrapper">
            <img
                id = "image"
                src = {previewSrc}
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

        {searchResults ? <SearchResultsUI searchResults = {searchResults}/>: null}
      </div>
    );
  }
  export default DetectFurnituresUI;