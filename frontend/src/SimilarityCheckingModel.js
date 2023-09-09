import * as tf from '@tensorflow/tfjs';
import Queue from './Queue';
//import * as tf from '@tensorflow/tfjs-node'

class SimilarityCheckingModel {
    constructor (){ 
        this.queue = new Queue(); 
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

    getModel = async() =>{
        if(!this.model){
            console.log("Loading search model");
            this.model = await this.loadModel();
            this.modelWidth = this.model.inputs[0].shape[1];
            this.modelHeight =  this.model.inputs[0].shape[2];
            console.log("Search model loaded");
        }
        return this.model
    }

    async getImageElement(imgUrl){
        let image = new Image();
        image.crossOrigin = 'Anonymous';
        //image.src = this.proxyUrl + imgUrl
        image.src =  imgUrl
        return new Promise((resolve) => {
            image.onload = ()=>{
                resolve(image);
            }
        })
    }

    async getEmbeddingWithTensor(imgTensor){
        const model = await this.queue.add(this.getModel);
        //console.log(this.queue.queue)

        const converted_img = tf.tidy(() => {
            const converted_image =  tf.image.resizeBilinear(imgTensor, [this.modelWidth, this.modelHeight]).expandDims(0);
            return converted_image
        })

        const embedding = model.predict(converted_img);
        const data = embedding.dataSync();
        embedding.dispose();
        //console.log("getEmbeddingWithTensor ", tf.memory().numTensors);
        return data
    }

    async tensorToDataUrl(tensor3d){
        const canvas = document.createElement('canvas');
        canvas.width = tensor3d.shape[1]
        canvas.height = tensor3d.shape[0]
        await tf.browser.toPixels(tensor3d , canvas);
        //console.log("tensorToDataUrl ", tf.memory().numTensors);
        return canvas.toDataURL();
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
        //console.log("getEmbedding ", tf.memory().numTensors);
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