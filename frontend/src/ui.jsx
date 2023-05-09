import React from 'react';
import axios from 'axios'
const SERVER_URL = 'http://localhost:5000'

class InputModule extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [], text: '' };
        this.onChange = this.onChange.bind(this);
    }

    async onChange(e) {
        e.preventDefault();
        if(e.target.files){
          const img = e.target.files[0];
          const formData = new FormData();
          formData.append('img', img);
          console.log(formData.get('img'));
      
          const response = await axios({
            method: 'post',
            url: SERVER_URL + '/api/files/images',
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log(response.data)
        }
      }

      render() {
        return <input type="file" 
        accept='image/jpg,impge/png,image/jpeg,image/gif' 
        onChange={this.onChange}/>
    }
}

export default InputModule