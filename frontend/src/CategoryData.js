class CategoryData{
    constructor(){
        this.data = {
            0: {labelName :'Bathroom_cabinet', } ,
            1: {labelName :'Bed',} ,
            2: {labelName :'Bench',} ,
            3: {labelName :'Bookcase',} ,
            4: {labelName :'Cabinetry',} ,
            5: {labelName :'Cat_furniture',} ,
            6: {labelName :'Chest_of_drawers',} ,
            7: {labelName :'Closet',} ,
            8: {labelName :'Couch',} ,
            9: {labelName :'Cupboard',} ,
            10: {labelName :'Desk',} ,
            11: {labelName :'Dog_bed',} ,
            12: {labelName :'Filing_cabinet',} , 
            13: {labelName :'Nightstand',} ,
            14: {labelName :'Shelf',} ,
            15: {labelName :'Stool',} ,
            16: {labelName :'Table',} ,
            17: {labelName :'Wall_clock',} ,
            18: {labelName :'Wardrobe',} ,
            19: {labelName :'Wine_rack',} ,
        }
        this.getLabel = this.getLabel.bind(this)
    }
    getLabel(index){
        return this.data[index].labelName;
    }
}

export default CategoryData
