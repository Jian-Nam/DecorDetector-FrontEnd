import React, { useMemo, useState, useRef, useEffect, forwardRef } from 'react';
import './ResultPrintUnit.css'
import ProductUnit from './ProductUnit';
import ProgressBar from './ProgressBar';

const ResultUI = ({resultData}) => {

    return (
        <div>
            <div className='unitContainer'>
                <div className='unitItem'>
                    <img className='itemImg' src={resultData.originImg.src} />
                    <div>{resultData.originImg.label}</div>
                </div>

                <ProductUnit product={ resultData.sortedProducts[0] } />
                <ProductUnit product={ resultData.sortedProducts[1] } />
                <ProductUnit product={ resultData.sortedProducts[2] } />
                
            </div>
        </div>

    )
}

export default ResultUI;