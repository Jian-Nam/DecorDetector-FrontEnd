import MultiDetectionModel from './MultiDetectionModel'

class DetectFurnitures {
    constructor(){
        this.MDM = new MultiDetectionModel();
    };

    async listFurnitures(pixels) {
        await this.MDM.listFurnitures(pixels);
    };


}
export default DetectFurnitures