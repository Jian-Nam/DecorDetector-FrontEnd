class WebDataLoder {
    constructor(){
        this.categoryData =  {
            1 : { id : "fu001", category: "all"},
            2 : { id : "fu002", category: "chairs"},
            3 : { id : "fu003", category: "sofas-armchairs"},
            6 : { id : "fu006", category: "armchairs-couches"},
        }

        this.loadImg = this.loadImg.bind(this);
    }

    async loadImg (categoryNum, start, end){
        let url = `https://sik.search.blue.cdtapps.com/kr/ko/product-list-page/more-products?category=${this.categoryData[categoryNum].id}&start=${start}&end=${end}&c=lf&v=20220826&sort=RELEVANCE`
        const response = await fetch(url);
        const data = await response.json();
        const products_data = data.moreProducts.productWindow

        return products_data
    };
}

export default WebDataLoder