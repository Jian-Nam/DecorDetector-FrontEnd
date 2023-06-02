import React, { useState, useRef, useEffect} from 'react';
import './ResultPrintUnit.css'

const ResultPrintUnit = (props)=>{

    const goPage = (e) => {

    }

    return (
        <div className = 'unitContainer'>
            <div className = 'unitItem'>
                <img className = 'itemImg' src = {props.itemData.originImgSrc}/>
                <div>original</div>
            </div>
            <div className = 'unitItem'>
                <img className = 'itemImg' src = {props.itemData.searchedItems[0].mainImageUrl}/>
                <div>Similarity: { (props.itemData.searchedItems[0].cosineSimilarity*100).toFixed(2) }%</div>
            </div>
            <div className = 'unitItem'> 
                <img className = 'itemImg' src = {props.itemData.searchedItems[1].mainImageUrl}/>
                <div >Similarity: { (props.itemData.searchedItems[1].cosineSimilarity*100).toFixed(2) }%</div>
            </div>
            <div className = 'unitItem'>
                <img className = 'itemImg' src = {props.itemData.searchedItems[2].mainImageUrl}/>
                <div>Similarity: { (props.itemData.searchedItems[2].cosineSimilarity*100).toFixed(2) }%</div>
            </div>
        </div>
    )
}

export default ResultPrintUnit;