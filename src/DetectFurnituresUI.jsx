import React, { useState, useRef, useEffect} from 'react';

import axios from 'axios'
import './DetectFurnituresUI.css'

import SimilarityCheckingModel from "./SimilarityCheckingModel.js"
import WebDataLoder from './WebDataLoader';
import CategoryData from './CategoryData';

import SearchResultsUI from './SearchResultsUI';

const DetectFurnituresUI = (ctrl)=>{
    const [ctx, setCtx] = useState();
    const [targetImg, setTargetImg] = useState({
        src: '',
        label: '',
    });

    const [searchResults , setSearchResults] = useState([]);
    const [targetImgList, setTargetImgList] = useState([]);
    const [imgLabelList, setImgLabelList] = useState([]);

    const [imgFile, setImgFile] = useState();
    const [previewSrc, setPreviewSrc] = useState();

    const [point, setPoint] = useState({
        pointX: '',
        pointY: '',
      });


    const [similarityModel, dummy1] = useState( new SimilarityCheckingModel());
    const [webDataLoader, dummy2] = useState( new WebDataLoder());
    const [categoryData, dummy3] = useState( new CategoryData() );

    const imgRef = useRef();
    const fileRef = useRef();
    const canvasRef = useRef();

    useEffect(()=>{
        if(targetImg.src !== '' && targetImg.label !== ''){
            searchProducts()
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
                setTargetImg(prev => ({
                    ...prev,
                    src: newtargetImgSrc ,
                    label: 9 ,
                  }))
                // setTargetImgList([newtargetImgSrc, ...targetImgList])
                // setImgLabelList([9, ...imgLabelList])
            })
            .catch(error => {
              console.error(error);
            });
    }

    const searchProducts = async () => {
        const ikeaCode = categoryData.getIkeaCode(targetImg.label);
        const webData = await webDataLoader.loadImg(ikeaCode, 1, 51);

        //const originImgEmbedding = await similarityModel.getEmbeddingWithTensor(imageTensor);
        const originImgEmbedding = await similarityModel.getEmbedding(targetImg.src);

        const cosineSimilarityData = await Promise.all(
            webData.map(async (Data) => {
                let embedding = null

                embedding = await similarityModel.getEmbedding(Data.mainImageUrl);
                const cosineSimilarity = similarityModel.getCosineSimilarity(originImgEmbedding, embedding);
                Data.cosineSimilarity = cosineSimilarity;
                return Data;
            }));

        const sortedData = cosineSimilarityData.sort((A, B) => { return B.cosineSimilarity - A.cosineSimilarity })
        
        const newResult = {
            originImg: targetImg,
            sortedProducts: sortedData,
        }
        setSearchResults([newResult, ...searchResults]);
    };
    
      
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