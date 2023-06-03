class CategoryData {
    constructor() {
        this.data = {
            0: { labelName: 'Bathroom_cabinet', ikeaCode: "st003"},
            1: { labelName: 'Bed', ikeaCode: "bm003" },
            2: { labelName: 'Bench', ikeaCode: "700319" },
            3: { labelName: 'Bookcase', ikeaCode: "st002" },
            4: { labelName: 'Cabinetry', ikeaCode: "st003" },
            5: { labelName: 'Cat_furniture', ikeaCode: "bc002" },
            6: { labelName: 'Chest_of_drawers', ikeaCode: "st004" },
            7: { labelName: 'Closet', ikeaCode: "19053" },
            8: { labelName: 'Couch', ikeaCode: "fu003" },
            9: { labelName: 'Cupboard', ikeaCode: "st003" },
            10: { labelName: 'Desk', ikeaCode: "fu004" },
            11: { labelName: 'Dog_bed', ikeaCode: "bc002" },
            12: { labelName: 'Filing_cabinet', ikeaCode: "st003" },
            13: { labelName: 'Nightstand', ikeaCode: "li001" },
            14: { labelName: 'Shelf', ikeaCode: "st002" },
            15: { labelName: 'Stool', ikeaCode: "22659" },
            16: { labelName: 'Table', ikeaCode: "fu004" },
            17: { labelName: 'Wall_clock', ikeaCode: "10785" },
            18: { labelName: 'Wardrobe', ikeaCode: "19053" },
            19: { labelName: 'Wine_rack', ikeaCode: "15952" },
        }
        this.getLabel = this.getLabel.bind(this)
    }
    getLabel(index) {
        return this.data[index].labelName;
    }

    getIkeaCode(index) {
        return this.data[index].ikeaCode;
    }
}

export default CategoryData
