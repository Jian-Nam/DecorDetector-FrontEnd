class WebDataLoder {
    constructor(){
        this.loadImg = this.loadImg.bind(this);
    }

    async loadImg (ikeaCode, start, end){
        let url = `https://sik.search.blue.cdtapps.com/kr/ko/product-list-page/more-products?category=${ikeaCode}&start=${start}&end=${end}&c=lf&v=20220826&sort=RELEVANCE`
        const response = await fetch(url);
        const data = await response.json();
        const products_data = data.moreProducts.productWindow

        return products_data
    };
}

export default WebDataLoder