import React, { useState } from 'react';

const NavigatorElement = ({buttonText, isClicked})=>{
    const [isHovering, setIsHovering] = useState(false);


    const handleMouseOver = () => {
        setIsHovering(true);
      };
    
      const handleMouseOut = () => {
        setIsHovering(false);
      };
    

    return (
        <div 
            className = {`buttonBox ${isHovering ? "yellow": (isClicked? "white" : "black")}`} 
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            <div className='buttonText'>{buttonText}</div>
        </div>
    )
}


export default NavigatorElement;