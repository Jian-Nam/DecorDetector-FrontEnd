import React, { useState, useRef, useEffect} from 'react';

import './DetectFurnituresUI.css'
import MultiDetectionModel from './MultiDetectionModel'

const DetectFurnituresUI = (ctrl)=>{
    const [ctx, setCtx] = useState();
    const [multiDetectionModel, setMDM] = useState(new MultiDetectionModel)

    const imgRef = useRef();
    const imgfileRef = useRef();
    const canvasRef = useRef();

    useEffect(() => {
        const context = canvasRef.current.getContext("2d");
        setCtx(context);

        // window.addEventListener('resize', resizeCanvas);
        // return()=>{
        //     window.removeEventListener('resize', resizeCanvas);
        // }
    });

    const uploadImage = async() => {
        const targetImgRef = await showPreview();
        resizeCanvas();
        const detectionData = await multiDetectionModel.listFurnitures(targetImgRef);
        // console.log(`${detectionData.validDetections[0]} objects detected`)
        drawBoxes(detectionData)
    }

    const resizeCanvas = () => {
        let tctx = ctx;
        canvasRef.current.width = imgRef.current.width;
        canvasRef.current.height = imgRef.current.height;
        setCtx(ctx);
        //console.log(canvasRef.current.width);
    }

    function showPreview() {
        return new Promise((resolve, reject) => {
            const file = imgfileRef.current.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = async() => {
                // setImgFile(reader.result);
                imgRef.current.src = reader.result
                resolve(imgRef.current)
            };
        })

    };

    function drawBoxes(detectionData) {

        const dd = detectionData
        for(let i = 0; i < dd.numBoxes[0]; i++){
            let [x1, y1, x2, y2] = dd.boxes.slice(i*4, (i+1)*4);
            x1 *= canvasRef.current.width;
            x2 *= canvasRef.current.width;
            y1 *= canvasRef.current.height;
            y2 *= canvasRef.current.height;
            const width = x2-x1;
            const height = y2-y1;
            const cls = dd.classes[i];
            const score = dd.scores[i].toFixed(2);

            // console.log(`${x1}, ${y1}, ${width}, ${height}`);
            ctx.strokeStyle = "#00ffff";
            ctx.lineWidth = 3;
            ctx.strokeRect(x1, y1, width, height);
        }
    }
      
    return (
      <div>
        <div id = "upload-wrapper">
            <input 
                type="file"
                accept="image/*"
                id="upload"
                onChange={uploadImage}
                ref={imgfileRef}
            />
        </div>
        <div id ="canvas-wrapper">
            <img
                id = "image"
                src = ""
                ref = {imgRef}
            />
            <canvas
                id="output"
                ref={canvasRef}
                height = "0"
            >
            </canvas>

        </div>

      </div>
    );
  }
  export default DetectFurnituresUI;