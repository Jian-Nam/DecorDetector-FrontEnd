import DetectFurnituresUI from "./DetectFurnituresUI";
import MultiDetectionModel from './MultiDetectionModel'

class DetectFurnitures {
    constructor(){
        this.interface = DetectFurnituresUI(this)
        this.MDM = new MultiDetectionModel();

        this.listFurnitures = this.listFurnitures.bind(this)
    };

    async listFurnitures(pixels) {
        await this.MDM.listFurnitures(pixels);
    };


}
export default DetectFurnitures