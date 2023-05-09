import React from 'react';

class ObjectDetection extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [], text: '', imagePreview: '' };
        this.onChange = this.onChange.bind(this);
    }

    async onChange(e) {
        e.preventDefault();
        if(e.target.files){
            const img = e.target.files[0];
            

            let reader = new FileReader(); // FileReader API로 이미지 인식
            reader.readAsDataURL(e.target.files[0]); //reader에게 file을 먼저 읽힘

            reader.onload = () => {// 사진 올리고 나서 처리하는 event
                this.state.imagePreview = reader.result;
                console.log(this.state.imagePreview)
                this.forceUpdate();
            //   e.target.value = ""; //같은 파일을 올리면 인지못해서 초기화
            };
        };
    }
    
    render() {
        return (
        <div>
            <input type="file" 
                accept='image/jpg,impge/png,image/jpeg,image/gif' 
                onChange={this.onChange}/>
            <canvas id = "output"></canvas>
            {this.state.imagePreview && <img src={this.state.imagePreview} alt="preview image" />}
        </div>)
    }

}

export default ObjectDetection