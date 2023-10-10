import React, { useState, useRef, useEffect} from 'react';

const ProductUnit = ({product})=>{
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
    

    return (
        <div 
            className = {`unitItem ${isHovering ? "shadow": ""}`} 
            onClick={goPage}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            { product?
                <div>
                    <img className = 'itemImg' src = {"http://localhost:8080/images/ikea?url=" + product.image}/>
                    <div>
                        <div className='productName'>{product.name}</div>
                        <div className='similarity'>Similarity: { (product.cosineSimilarity*100).toFixed(2) }%</div>
                    </div>
                </div> 
                : 
                <div>Loading...</div>
            }
        </div>
    )
}


export default ProductUnit;