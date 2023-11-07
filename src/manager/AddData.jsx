import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AddData = ()=>{

    const [externalIdValue, setEexternalId] = useState('');
    const [productNameValue, setProductNameValue] = useState('');
    const [imageLinkValue, setImageLinkValue] = useState('');
    const [productLinkValue, setProductLinkValue] = useState('');

    const saveEexternalId = event => {
        setEexternalId(event.target.value);
        // console.log(event.target.value);
      };
    
      const saveProductNameValue = event => {
        setProductNameValue(event.target.value);
        // console.log(event.target.value);
      };

      const saveImageLinkValue = event => {
        setImageLinkValue(event.target.value);
        // console.log(event.target.value);
      };
    
      const saveProductLinkValue = event => {
        setProductLinkValue(event.target.value);
        // console.log(event.target.value);
      };

    const postData = async()=>{   
        try{
            let formData = new FormData();
        
            formData.append('externalId', externalIdValue)
            formData.append('productName', productNameValue)
            formData.append('image', imageLinkValue)
            formData.append('link', productLinkValue)

            const response = await axios({
                url: "http://localhost:8080/products/new",
                method: 'POST',
                data: formData,
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              })
              console.log(response.data)
        }catch (error){
            console.log(error)
        }
    }

    return (
        <div>
            <div className="form-group">
                <div>
                    <label>외부 ID</label>
                    <input 
                        type="text" 
                        placeholder="외부 ID를 입력하세요"
                        value={externalIdValue}
                        onChange={saveEexternalId}
                    />
                    <div>ex. 111</div>
                </div>
                <div>
                    <label>물품 이름</label>
                    <input 
                        type="text" 
                        placeholder="이름을 입력하세요"
                        value={productNameValue}
                        onChange={saveProductNameValue}
                    />
                </div>
                <div>ex. FJÄLLBO 피엘보 수납테이블</div>
                <div>
                    <label >이미지 링크</label>
                    <input 
                        type="text" 
                        placeholder="이미지 링크를 입력하세요"
                        value={imageLinkValue}
                        onChange={saveImageLinkValue}
                    />
                </div>
                <div>ex. https://www.ikea.com/kr/ko/images/products/fjaellbo-storage-table-black__1194911_pe902156_s5.jpg</div>
                <div>
                    <label>상품 링크</label>
                    <input 
                        type="text" 
                        placeholder="상품 링크를 입력하세요"
                        value={productLinkValue}
                        onChange={saveProductLinkValue}
                    />
                </div>
                <div>ex. https://www.ikea.com/kr/ko/p/fjaellbo-storage-table-black-30539579/</div>
            </div>
            <button onClick={postData}>등록</button>
        </div>
    )
}


export default AddData;