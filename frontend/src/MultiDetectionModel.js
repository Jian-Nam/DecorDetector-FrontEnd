import * as tf from '@tensorflow/tfjs';

class MultiDetectionModel {
    constructor (){  
        this.createDetector = this.createDetector.bind(this)
        this.listFurnitures = this.listFurnitures.bind(this)
        }

    async createDetector() {
            const yolov5_weight = 'https://raw.githubusercontent.com/Jian-Nam/YOLOv5_model/main/model.json'
            return tf.loadGraphModel(yolov5_weight); 
        }

    async listFurnitures(pixels, userInterface){
        if(!this.detector){
            this.detector = await this.createDetector();
            this.modelWidth = this.detector.inputs[0].shape[1]
            this.modelHeight =  this.detector.inputs[0].shape[2]
        }

        const imageTensor = tf.browser.fromPixels(pixels)
        const converted_img = tf.image.resizeBilinear(imageTensor, [this.modelWidth, this.modelHeight]).div(255.0).expandDims(0)
        const detect_res = await this.detector.executeAsync(converted_img)

        const [boxes, scores, classes, validDetections] = detect_res;

        const detectionData = {
            boxes: boxes.dataSync(),
            scores : scores.dataSync(),
            classes : classes.dataSync(),
            validDetections: validDetections.dataSync()
        };
        tf.dispose(detect_res);

        return detectionData

    }


}

export default MultiDetectionModel