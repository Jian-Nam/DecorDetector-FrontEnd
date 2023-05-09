import { useState, useRef } from 'react';
import './fileInput.css';
const FileInput = ()=>{
    const [imgFile, setImgFile] = useState("")
    const [imgFile2, setImgFile2] = useState("")
    const [imgIndex, setimgIndex] = useState(0)

    const imgRef = useRef();

    const saveImgFile = () => {
        const file = imgRef.current.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImgFile(reader.result);
        };
    };


    const fetchImg = ()=>{
        let start = 0
        let end = 100
        let url = `https://sik.search.blue.cdtapps.com/kr/ko/product-list-page/more-products?category=fu006&start=${start}&end=${end}&c=lf&v=20220826&sort=RELEVANCE`
        fetch(url)
          .then((response) => {
            return response.json();
        })
        .then((data) => {
            const products_data = data.moreProducts.productWindow
            const first_product = products_data[imgIndex]
            const first_product_imgURL = first_product.mainImageUrl
            console.log(imgIndex)
            // const reader = new FileReader();
            // reader.readAsDataURL(first_product_imgURL);
            // reader.onloadend = () => {
            //     setImgFile2(reader.result);
            // };
            setImgFile2(first_product_imgURL);
            setimgIndex(imgIndex+1)
        });
    };

      

    return (
      <div className="FileInput">
        <div>
            <img
                className = "preview"
                src={imgFile ? imgFile : ""}
            />
        </div>
        <div>
            <input 
                type="file"
                accept="image/*"
                id="profileImg"
                onChange={saveImgFile}
                ref={imgRef}
            />
        </div>
        <div>
            <img
                className = "preview"
                src={imgFile2 ? imgFile2 : ""}
            />
        </div>
        <div>
            <button onClick = {fetchImg}>fetch</button>
        </div>
      </div>
    );
  }
  export default FileInput;