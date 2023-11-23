import React, {useState} from 'react';
import axios from 'axios';
import Button from '../Button';
import { useNavigate } from "react-router-dom";

const AddData = ()=>{

    const [externalIdValue, setEexternalId] = useState('');
    const [productNameValue, setProductNameValue] = useState('');
    const [imageLinkValue, setImageLinkValue] = useState('');
    const [productLinkValue, setProductLinkValue] = useState('');
    const [loading, setLoading] = useState(false);

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

        if(externalIdValue=="" || productNameValue=="" || imageLinkValue=="" || productLinkValue==""){
            alert("값을 모두 입력하세요")
            return;
        }
        setLoading(true);
        let formData = new FormData();
    
        formData.append('externalId', externalIdValue)
        formData.append('productName', productNameValue)
        formData.append('image', imageLinkValue)
        formData.append('link', productLinkValue)

        const response = await axios({
            url: process.env.REACT_APP_BACKEND_URL + "/products/new",
            method: 'POST',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(response => {
            console.log("BACKEND RESPONSE STATUS: " + response.status);
            setLoading(false)
            alert(response.data)
        })
        .catch(error => {
            alert(error);
        });

    }

    return (
        <div className='pageCenterize'>
        <div className='page'>
            <div className='subTitle'>데이터 추가하기</div>
            <div className="form-group">
                <div className='inputSet'>
                    <label>외부 ID</label>
                    <input 
                        className='inputBox'
                        type="text" 
                        placeholder="외부 ID를 입력하세요"
                        value={externalIdValue}
                        onChange={saveEexternalId}
                    />
                    
                </div>
                <div className='inputSet'>
                    <label>물품 이름</label>
                    <input 
                        className='inputBox'
                        type="text" 
                        placeholder="이름을 입력하세요"
                        value={productNameValue}
                        onChange={saveProductNameValue}
                    />
                    
                </div>

                <div className='inputSet'>
                    <label >이미지 링크</label>
                    <input 
                        className='inputBox'
                        type="text" 
                        placeholder="이미지 링크를 입력하세요"
                        value={imageLinkValue}
                        onChange={saveImageLinkValue}
                    />
                    
                </div>
                
                <div className='inputSet'>
                    <label>상품 링크</label>
                    <input 
                        className='inputBox'
                        type="text" 
                        placeholder="상품 링크를 입력하세요"
                        value={productLinkValue}
                        onChange={saveProductLinkValue}
                    />
                    
                </div>
                <div onClick={postData}>
                    <Button buttonText={loading? "로딩중..." : "등록"}></Button>
                </div>
                
            </div>

            <div className='exampleText'>이미지 링크예시: https://www.ikea.com/kr/ko/images/products/fjaellbo-storage-table-black__1194911_pe902156_s5.jpg</div>
            <div className='exampleText'>상품 링크예시: https://www.ikea.com/kr/ko/p/fjaellbo-storage-table-black-30539579/</div>
        </div>
        </div>
    )
}


export default AddData;