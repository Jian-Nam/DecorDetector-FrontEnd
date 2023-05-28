import React, { useState, useRef, useEffect} from 'react';
import {ImageList, ImageListItem} from '@mui/material'
import SimilarityCheckingModel from './SimilarityCheckingModel';

//import './SearchFurnituresUI.css'
import WebDataLoder from './WebDataLoader';

const SearchFurnituresUI = (ctrl)=>{
    const [itemData, setItemData] = useState([{mainImageUrl:"", title:""}]);
    const [similarityCheckingModel, setSCM] = useState(new SimilarityCheckingModel);


    const imgRef = useRef();
    const imgfileRef = useRef();

    useEffect(() => {
    });


    const getImg = async(category) =>{
        const webDataLoder = new WebDataLoder;
        const newItemData = await webDataLoder.loadImg(category, 1, 51);
        const firstElementEmbedding = await similarityCheckingModel.getEmbedding(newItemData[0].mainImageUrl);

        const cosineSimilarityData = await Promise.all(
            newItemData.map(async(item)=>{
                const embedding = await similarityCheckingModel.getEmbedding(item.mainImageUrl);
                const cosineSimilarity = similarityCheckingModel.getCosineSimilarity(firstElementEmbedding, embedding);
                item.cosineSimilarity = cosineSimilarity;
                return item;
        }));

        //console.log(cosineSimilarityData);
        const sortedItemData = cosineSimilarityData.sort((A, B)=>{return B.cosineSimilarity - A.cosineSimilarity})
        //console.log(sortedItemData);
        setItemData(sortedItemData);
    };

    return (
        <div>
            <button onClick={()=>{getImg(1)}}>1</button>
            <button onClick={()=>{getImg(2)}}>2</button>
            <button onClick={()=>{getImg(3)}}>3</button>
            <button onClick={()=>{getImg(6)}}>6</button>
            <ImageList sx={{ width: 800, height: 1000 }} cols={3} rowHeight={300}>
            {itemData.map((item) => (
                <ImageListItem key={item.id}>
                <img
                    src={`${item.mainImageUrl}?w=164&h=164&fit=crop&auto=format`}
                    alt={item.id}
                    loading="lazy"
                />
                <div dangerouslySetInnerHTML={{__html: `Similarity: ${(item.cosineSimilarity*100).toFixed(2)}%`}}></div>
                </ImageListItem>
            ))}
            </ImageList>
        </div>
    );
  }
  export default SearchFurnituresUI;