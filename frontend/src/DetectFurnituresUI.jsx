import React, { useState, useRef, useEffect} from 'react';

import './DetectFurnituresUI.css'
import DetectFurnitures from './DetectFurnitures';

const DetectFurnituresUI = (ctrl)=>{
    const [imgFile, setImgFile] = useState("");
    const [control, setControl] = useState(ctrl);
    const [ctx, setCtx] = useState();

    const imgRef = useRef();
    const imgfileRef = useRef();
    const canvasRef = useRef();

    useEffect(() => {
        const context = canvasRef.current.getContext("2d")
        setCtx(context)
    });

    const uploadImage = async() => {
        await showPreview();
        console.log(imgRef.current);
        await startDetection();
    }

    const startDetection = async() =>{
        const detectionData = await control.listFurnitures(imgRef.current);
        console.log(detectionData)
        resizeCanvas();
        drawBoxes(detectionData)
    }

    function resizeCanvas(){
        canvasRef.current.width = imgRef.current.width
        canvasRef.current.height = imgRef.current.height
    }

    function showPreview() {
        return new Promise((resolve, reject) => {
            const file = imgfileRef.current.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = async() => {
                // setImgFile(reader.result);
                imgRef.current.src = reader.result
                resolve("success")
            };
        })

    };

    function drawBoxes(detectionData) {

        const dd = detectionData
        for(let i = 0; i < dd.validDetections[0]; i++){
            let [x1, y1, x2, y2] = dd.boxes.slice(i*4, (i+1)*4);
            x1 *= canvasRef.current.width;
            x2 *= canvasRef.current.width;
            y1 *= canvasRef.current.height;
            y2 *= canvasRef.current.height;
            const width = x2-x1;
            const height = y2-y1;
            const cls = dd.classes[i];
            const score = dd.scores[i].toFixed(2);

            console.log(`${x1}, ${y1}, ${width}, ${height}`);
            ctx.strokeStyle = "#00ffff";
            ctx.lineWidth = 4;
            ctx.strokeRect(x1, y1, width, height);
        }
    }
      
    return (
      <div className="FileInput">
        <div id ="canvas-wrapper">

            <img
                id = "image"
                // src={imgFile ? imgFile : ""}
                src = ""
                ref = {imgRef}
            />
            <canvas
                id="output"
                ref={canvasRef}
            >
            </canvas>
        </div>
        <div id = "upload-wrapper">
            <input 
                type="file"
                accept="image/*"
                id="upload"
                onChange={uploadImage}
                ref={imgfileRef}
            />
        </div>
      </div>
    );
  }
  export default DetectFurnituresUI;