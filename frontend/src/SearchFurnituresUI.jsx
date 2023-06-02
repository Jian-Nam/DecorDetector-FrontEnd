import React, { useState, useRef, useEffect} from 'react';
//import {ImageList, ImageListItem} from '@mui/material'
import SimilarityCheckingModel from './SimilarityCheckingModel';
import ResultPrintUnit from './ResultPrintUnit';

//import './SearchFurnituresUI.css'
import WebDataLoder from './WebDataLoader';

const SearchFurnituresUI = ({imageList, labelList})=>{
    const [itemDataList , setItemDataList] = useState([]);
    const [similarityCheckingModel, setSCM] = useState(new SimilarityCheckingModel);

    useEffect(() => {
        //itemDataList.length = 0;
        itemDataList.splice(0, itemDataList.length);
        setItemDataList([]);

        imageList.map((imageTensor, index) => {
            getImg(1, imageTensor, index)
        });
        }, [imageList]
    );

    
    useEffect(() => {
        //console.log(itemDataList)
        }, [itemDataList]
    );


    const getImg = async(category, imageTensor, index) =>{
        const webDataLoder = new WebDataLoder;
        const newItemData = await webDataLoder.loadImg(category, 1, 51);

        const firstElementEmbedding = await similarityCheckingModel.getEmbeddingWithTensor(imageTensor);
        const firstElementDataUrl = await similarityCheckingModel.tensorToDataUrl(imageTensor)


        const cosineSimilarityData = await Promise.all(
            newItemData.map(async(item)=>{
                const embedding = await similarityCheckingModel.getEmbedding(item.mainImageUrl);
                const cosineSimilarity = similarityCheckingModel.getCosineSimilarity(firstElementEmbedding, embedding);
                item.cosineSimilarity = cosineSimilarity;
                return item;
        }));


        const sortedItemData = cosineSimilarityData.sort((A, B)=>{return B.cosineSimilarity - A.cosineSimilarity})

        const itemData = {
            originImgSrc : firstElementDataUrl,
            originImgLabel : labelList[index],
            searchedItems : sortedItemData,
        };

        //setItemDataList(itemDataList.concat(itemData));
        //setItemDataList([...itemDataList, itemData]);
        itemDataList.push(itemData);
        setItemDataList(itemDataList)
        console.log(itemDataList);
        // console.log(itemDataList);
    };

    return (

        <div>
            {/* <div>
                {console.log(itemDataList)}
            </div> */}
            {
            itemDataList[0] && 
                itemDataList.map((itemData, index) => (
                    <ResultPrintUnit originImg = {{src: itemData.originImgSrc, label: itemData.originImgLabel}} searchedItems = {itemData.searchedItems} key = {index}/>
                ))
            }   
        </div>
    );
            
  }
  export default SearchFurnituresUI;