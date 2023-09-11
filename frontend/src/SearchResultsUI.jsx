import React, { useMemo, useState, useRef, useEffect, useCallback} from 'react';
//import {ImageList, ImageListItem} from '@mui/material'
import ResultUI from './ResultUI';

//import './SearchFurnituresUI.css'
const SearchResultsUI = ({searchResults})=>{
    return (
        <div>
            {
            (searchResults) &&
                searchResults.map((result, index) => (
                    <ResultUI 
                        resultData = {result} 
                        key = {index}
                    />
                ))
            }   
        </div>
    );
            
  }
  export default SearchResultsUI;