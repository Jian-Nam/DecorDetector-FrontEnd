import DetectFurnituresUI from "./DetectFurnituresUI";
import MultiDetectionModel from './MultiDetectionModel'

class DetectFurnitures {
    constructor(){
        this.interface = DetectFurnituresUI(this);
        this.MDM = new MultiDetectionModel();

        this.listFurnitures = this.listFurnitures.bind(this);
        this.getInterface = this.getInterface.bind(this);
    };

    getInterface(){
        return this.interface
    }

    async listFurnitures(pixels) {
        return await this.MDM.listFurnitures(pixels);
    };


}
export default DetectFurnitures