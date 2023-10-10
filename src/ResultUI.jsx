import React, { useMemo, useState, useRef, useEffect, forwardRef } from 'react';
import './ResultPrintUnit.css'
import ProductUnit from './ProductUnit';
import ProgressBar from './ProgressBar';

const ResultUI = ({resultData}) => {

    return (
        <div>
            <div className='unitContainer'>
                <div className='unitItem'>
                    <img className='itemImg' src={resultData.segmentedImage} />
                    <div></div>
                </div>

                <ProductUnit product={ resultData.similarProducts[0] } />
                <ProductUnit product={ resultData.similarProducts[1] } />
                <ProductUnit product={ resultData.similarProducts[2] } />
                
            </div>
        </div>

    )
}

export default ResultUI;