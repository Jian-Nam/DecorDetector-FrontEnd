import { useState, useRef } from 'react';
import DetectFurnitures from './DetectFurnitures';
import './DetectFurnituresUI.css'

const DetectFurnituresUI = ()=>{
    const [imgFile, setImgFile] = useState("")
    const [control, setControl] = useState(new DetectFurnitures())

    const imgRef = useRef();
    const imgfileRef = useRef();

    const uploadImage = async() => {
        await showPreview();
        await control.listFurnitures(imgRef.current);
        console.log(imgRef.current)
    }

    async function showPreview() {
        const file = imgfileRef.current.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImgFile(reader.result);
        };
    };
      
    return (
      <div className="FileInput">
        <div>
            <img
                className = "preview"
                src={imgFile ? imgFile : ""}
                ref = {imgRef}
            />
        </div>
        <div>
            <input 
                type="file"
                accept="image/*"
                id="profileImg"
                onChange={uploadImage}
                ref={imgfileRef}
            />
        </div>
      </div>
    );
  }

  export default DetectFurnituresUI;