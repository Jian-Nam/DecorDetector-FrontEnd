import React, { useMemo, useState, useRef, useEffect, useCallback} from 'react';
//import {ImageList, ImageListItem} from '@mui/material'
import ResultPrintUnit from './ResultPrintUnit';
import SimilarityCheckingModel from "./SimilarityCheckingModel.js"
import WebDataLoder from './WebDataLoader';
import CategoryData from './CategoryData';

//import './SearchFurnituresUI.css'
const SearchFurnituresUI = ({imageList, labelList})=>{
    //const similarityModel = useMemo(()=>{ return new SimilarityCheckingModel()});
    const [similarityModel, dummy1] = useState( new SimilarityCheckingModel());
    const [webDataLoader, dummy2] = useState( new WebDataLoder());
    const [categoryData, dummy3] = useState( new CategoryData() );

    return (

        <div>
            {
            (imageList && labelList) &&
                imageList.map((imageTensor, index) => (
                    <ResultPrintUnit 
                        imageTensor = {imageTensor} 
                        label = {labelList[index]} 
                        key = {index}
                        similarityModel={similarityModel}
                        webDataLoader = {webDataLoader}
                        categoryData = {categoryData}
                    />
                ))
            }   
        </div>
    );
            
  }
  export default SearchFurnituresUI;