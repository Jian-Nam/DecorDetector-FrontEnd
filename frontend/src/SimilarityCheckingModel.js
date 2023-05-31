import * as tf from '@tensorflow/tfjs';
//import * as tf from '@tensorflow/tfjs-node'

class SimilarityCheckingModel {
    constructor (){ 
        this.semaphore = false; 
        this.model = false;
        this.loadModel = this.loadModel.bind(this);
        this.getModel = this.getModel.bind(this);
        this.getEmbedding = this.getEmbedding.bind(this);
        this.getImageElement = this.getImageElement.bind(this);
        this.modelUrl = 'https://raw.githubusercontent.com/Jian-Nam/Resnet50_model/main/model.json' //resnet50
        this.proxyUrl = "https://nja-test.herokuapp.com/";
    }

    async loadModel() {
        const model = await tf.loadLayersModel(this.modelUrl); //Load resnet50
        return model 
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

    async getImageElement(imgUrl){
        let image = new Image();
        image.crossOrigin = 'Anonymous';
        image.src = this.proxyUrl + imgUrl
        return new Promise((resolve) => {
            image.onload = ()=>{
                resolve(image);
            }
        })
    }


    async getEmbedding(imgUrl){
        const model = await this.getModel();
        const imageElement = await this.getImageElement(imgUrl);

        const converted_img = tf.tidy(() => {
            const imageTensor =  tf.browser.fromPixels(imageElement);
            const converted_image =  tf.image.resizeBilinear(imageTensor, [this.modelWidth, this.modelHeight]).div(255.0).expandDims(0);
            return converted_image
        })

        const embedding = model.predict(converted_img);
        const data = embedding.dataSync();
        embedding.dispose();
        return data
    }

    dotp(x, y) {
        function dotp_sum(a, b) {
          return a + b;
        }
        function dotp_times(a, i) {
          return x[i] * y[i];
        }
        return x.map(dotp_times).reduce(dotp_sum, 0);
      }
      
    getCosineSimilarity(A,B){
        var similarity = this.dotp(A, B) / (Math.sqrt(this.dotp(A,A)) * Math.sqrt(this.dotp(B,B)));
        //console.log(`${similarity}`)
        return similarity;
    }
    


}

export default SimilarityCheckingModel