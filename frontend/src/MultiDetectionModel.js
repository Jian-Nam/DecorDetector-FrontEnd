import * as tf from '@tensorflow/tfjs';

class MultiDetectionModel {
    constructor (){  
        this.semaphore = false;
        this.model = false;
        this.loadModel = this.loadModel.bind(this);
        this.getModel = this.getModel.bind(this);
        this.listFurnitures = this.listFurnitures.bind(this);
        this.modelUrl = 'https://raw.githubusercontent.com/Jian-Nam/YOLOv5_model/main/model.json' //trained Yolov5
        }

    async loadModel() {
            const model = await tf.loadGraphModel(this.modelUrl); 
            return model;
        }

    async getModel(){
        if(!this.model){
            if(!this.semaphore){
                this.semaphore = true;
                console.log("Loading model");
                this.model = await this.loadModel();
                this.modelWidth = this.model.inputs[0].shape[1];
                this.modelHeight =  this.model.inputs[0].shape[2];
                console.log("Model loaded");
            }else {
                console.log("Model loading now")
                await setTimeout(this.getModel, 1000)
            }
        }
        return this.model
    }

    async listFurnitures(pixels){
        const model = await this.getModel();


        const imageTensor =  tf.browser.fromPixels(pixels);

        //console.log(`${widthOrigin}, ${heightOrigin}`)

        const image = imageTensor.div(255.0).expandDims(0);

        const widthOrigin = image.shape[2];
        const heightOrigin = image.shape[1];

        const resizedImage =  tf.image.resizeBilinear(image, [this.modelWidth, this.modelHeight]);
        const [boxes, scores, classes, numBoxes] = await model.executeAsync(resizedImage);

        const detectionData = {
            boxes: boxes.dataSync(),
            scores : scores.dataSync(),
            classes : classes.dataSync(),
            numBoxes: numBoxes.dataSync()
        };

        boxes.dispose();
        scores.dispose();
        classes.dispose();
        numBoxes.dispose();

        const slicedImages = [];
        for(let i = 0; i < detectionData.numBoxes[0]; i++){
            const boxIndices = tf.zeros([1], 'int32');

            let [x1, y1, x2, y2] = detectionData.boxes.slice(i*4, (i+1)*4);
            const normWidth = x2-x1;
            const normHeight = y2-y1;

            let width = Math.round(normWidth * widthOrigin);
            let height = Math.round(normHeight * heightOrigin);

            

            const croppedImage =  tf.image.cropAndResize(image, [[y1, x1, y2, x2]], boxIndices, [height, width]).squeeze();


            slicedImages.push(croppedImage);

        }
        detectionData.slicedImages = slicedImages
        //console.log(detectionData)
        



        return detectionData
    }


}

export default MultiDetectionModel