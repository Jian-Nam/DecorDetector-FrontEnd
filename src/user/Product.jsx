import React, { useState } from 'react';

const Product = ({product})=>{
    const [isHovering, setIsHovering] = useState(false);

    const goPage = (e) => {
        //console.log(product)
        if(product.link){
            window.open(product.link) 
        }
    }

    const handleMouseOver = () => {
        setIsHovering(true);
      };
    
      const handleMouseOut = () => {
        setIsHovering(false);
      };
    

    // img src 접근시 백엔드 proxy를 통해 CORS 회피
    return (
        <div 
            className = {`unitItem ${isHovering ? "shadow": ""} recommandedItem`} 
            onClick={goPage}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            { product?
                <div>
                    <img className = 'itemImg' src = {process.env.REACT_APP_BACKEND_URL + "/images/ikea?url=" + product.image}/>
                    <div className='itemDescriptionWrapper'>
                        <div className='itemDescription'>
                            <div className='productName'>{product.name}</div>
                            <div className='similarity'>Similarity: { (product.cosineSimilarity*100).toFixed(2) }%</div>
                        </div>
                    </div>
                </div> 
                : 
                <div>Loading...</div>
            }
        </div>
    )
}


export default Product;