class CategoryData {
    constructor() {
        this.data = {
            0: { labelName: 'Bed', ikeaCode: "bm003" },
            1: { labelName: 'Cabinetry', ikeaCode: "st003" },
            2: { labelName: 'Chair', ikeaCode: "fu002" },
            3: { labelName: 'Chest_of_drawers', ikeaCode: "st004" },
            4: { labelName: 'Couch', ikeaCode: "fu003" },
            5: { labelName: 'Nightstand', ikeaCode: "li001" },
            6: { labelName: 'Shelf', ikeaCode: "st002" },
            7: { labelName: 'Stool', ikeaCode: "22659" },
            8: { labelName: 'Table', ikeaCode: "fu004" },

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
