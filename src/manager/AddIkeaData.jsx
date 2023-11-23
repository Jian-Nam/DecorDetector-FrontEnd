import React, {useState} from 'react';
import axios from 'axios';
import CategoryData from '../user/CategoryData';
import Button from '../Button';

const AddIkeaData = ()=>{

    const [categoryValue, setCategoryValue] = useState('');
    const [startValue, seStartValue] = useState('');
    const [endValue, setEndValue] = useState('');
    const [categoryData, setCategoryData] = useState(new CategoryData());

    const saveCategoryValue = event => {
        setCategoryValue(event.target.value);
        console.log(event.target.value);
      };
    
      const saveStartValue = event => {
        seStartValue(event.target.value);
        // console.log(event.target.value);
      };

      const saveEndValue = event => {
        setEndValue(event.target.value);
        // console.log(event.target.value);
      };


    const postData = async()=>{
        if(startValue=="" || endValue==""){
            alert("시작 범위와 끝 범위를 모두 입력하세요")
            return;
        }
        try{
            let formData = new FormData();
        
            formData.append('category', categoryValue)
            formData.append('start', startValue)
            formData.append('end', endValue)

            const response = await axios({
                url: process.env.REACT_APP_BACKEND_URL + "/products/new/ikea",
                method: 'POST',
                data: formData,
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              })
              alert("Ikea 아이디" + response.data + "가 추가 되었습니다.")
        }catch (error){
            console.log(error)
        }
    }

    return (
        <div className='pageCenterize'>
        <div className='page'>
        <div className='subTitle'>IKEA 데이터 추가하기</div>
            <div className="form-group">
                <div className='inputSet'>
                    <label>가구 카테고리</label>
                    <select 
                        className='inputBox'        
                        type="text" 
                        placeholder="가구 카테고리를 입력하세요"
                        value={categoryValue}
                        onChange={saveCategoryValue}
                    ><option value = "select" disabled={true}> 카테고리를 선택하세요 </option>
                        {
                            (categoryData)&&
                                Object.keys(categoryData.getData()).map((categoryKey)=> (
                                    <option key = {categoryKey} value = {categoryData.getIkeaCode(categoryKey)}>{categoryData.getLabel(categoryKey)}</option>
                                ))
                        }
                    </select>
                </div>
                <div className='inputSet'>
                    <label>이케아 데이터 범위 시작</label>
                    <input 
                        className='inputBox'
                        type="number" 
                        placeholder="시작 값을 입력하세요"
                        value={startValue}
                        onChange={saveStartValue}
                    />
                </div>
                <div className='inputSet'>
                    <label >이케아 데이터 범위 끝</label>
                    <input 
                        className='inputBox'
                        type="number" 
                        placeholder="끝 값을 입력하세요"
                        value={endValue}
                        onChange={saveEndValue}
                    />
                </div>
                <div onClick={postData}>
                    <Button buttonText="등록"></Button>
                </div>
            </div>

        </div>
        </div>
    )
}


export default AddIkeaData;