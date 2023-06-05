import React, { useState, useRef, useEffect} from 'react';

const ProductUnit = ({product})=>{
    const [isHovering, setIsHovering] = useState(false);

    const goPage = (e) => {
        //console.log(product)
        window.open(product.pipUrl) 
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
            <img className = 'itemImg' src = {product.mainImageUrl}/>
            <div>
                <div className='productName'>{product.name}</div>
                <div className='similarity'>Similarity: { (product.cosineSimilarity*100).toFixed(2) }%</div>
            </div>
        </div>
    )
}


export default ProductUnit;