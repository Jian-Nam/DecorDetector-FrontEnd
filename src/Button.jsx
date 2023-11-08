import React, { useState } from 'react';

const Button = ({buttonText})=>{
    const [isHovering, setIsHovering] = useState(false);


    const handleMouseOver = () => {
        setIsHovering(true);
      };
    
      const handleMouseOut = () => {
        setIsHovering(false);
      };
    

    return (
        <div 
            className = {`buttonBox ${isHovering ? "yellow": "black"}`} 
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            <div className='buttonText'>{buttonText}</div>
        </div>
    )
}


export default Button;