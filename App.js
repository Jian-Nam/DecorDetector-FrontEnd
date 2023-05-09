const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const multer  = require('multer');
const util = require('util');
const tf = require('@tensorflow/tfjs');
const tfNode = require('@tensorflow/tfjs-node');
const fs = require("fs");

const app = express();

const path = require('path');
const upload = multer({ 
    storage: multer.diskStorage({
        // set a localstorage destination
        destination: (req, file, callback) => {
            callback(null, 'uploads/');
        },
        // convert a file name
        filename: (req, file, callback) => {
            callback(null, new Date().valueOf() + path.extname(file.originalname));
        },
      }),
 });

const PORT = process.env.PORT || 5000;

//유저가 보낸 array/object 데이터를 출력해보기 위해 필요
app.use(express.json()); 

//다른 도메인주소끼리 ajax 요청 주고받을 때 필요
app.use(cors()); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.send("Hello here is server");
    console.log("Hello");
});


const yolov5_weight = 'https://raw.githubusercontent.com/Jian-Nam/YOLOv5_model/main/model.json'



app.post("/api/files/images", upload.single('img'),  async(req, res) => {
    const image_path = req.file.path;
    // console.log(req.file)
    
    if(image_path === undefined) {
        return res.status(400).send( "failed")
    }
    res.status(200).send("success");
});

app.listen(PORT, (err) => {
    if (err) return console.log(err);
    else console.log("SERVER STARTS IN", PORT);
});