import React, {useRef} from 'react';
import './Result.css'
import Product from './Product';

const Result = ({resultData}) => {

    const scrollTarget = useRef();

    const goLeft = ()=>{
        console.log(scrollTarget.current.offsetLeft)
        scrollTarget.current.scrollLeft-=500
    }

    const goRight = ()=>{
        console.log(scrollTarget.current.offsetLeft)
        scrollTarget.current.scrollLeft+=500

    }
    

    return (
        <div className='resultWrapper'>
            <div className = "resultTitle">Search Result</div>
            <hr className = "horizontalLine"></hr>
            <div className='unitContainerWrapper'>
                <div 
                    className='unitContainer'
                    ref ={scrollTarget}
                >
                    <div className='unitItem targetItem' >
                        <img className='itemImg' src={resultData.segmentedImage} />
                        <div className='itemDescriptionWrapper'>
                            <div className='itemDescription'>TARGET IMAGE</div>
                        </div>
                    </div>
                    {(resultData)&&
                        resultData.similarProducts.map((product, index)=>(
                            <Product key = {index} product={ product } />
                        ))
                    }
                    
                </div>
                <div className = "scrollButton leftButton" onClick={goLeft}>left</div>
                <div className = "scrollButton rightButton" onClick={goRight}>right</div>
            </div>


        </div>

    )
}

export default Result;