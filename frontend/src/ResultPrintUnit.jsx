import React, { useState, useRef, useEffect} from 'react';
import './ResultPrintUnit.css'
import ProductUnit from './ProductUnit';
import CategoryData from './CategoryData';

const ResultPrintUnit = ({originImg, searchedItems})=>{

    const categoryData = new CategoryData

    return (
        <div className = 'unitContainer'>
            <div className = 'unitItem'>
                <img className = 'itemImg' src = {originImg.src}/>
                <div>{categoryData.getLabel(originImg.label)}</div>
            </div>
            <ProductUnit product = {searchedItems[0]} />
            <ProductUnit product = {searchedItems[1]} />
            <ProductUnit product = {searchedItems[2]} />
        </div>
    )
}

export default ResultPrintUnit;