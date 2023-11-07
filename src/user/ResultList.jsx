import React from 'react';
import Result from './Result';

const ResultList = ({searchResults})=>{
    return (
        <div>
            {
            (searchResults) &&
                searchResults.map((result, index) => (
                    <Result 
                        resultData = {result} 
                        key = {searchResults.length-index}
                    />
                ))
            }   
        </div>
    );
            
  }
  export default ResultList;