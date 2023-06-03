import React, { useState, useRef, useEffect, useCallback} from 'react';
//import {ImageList, ImageListItem} from '@mui/material'
import SimilarityCheckingModel from './SimilarityCheckingModel';
import ResultPrintUnit from './ResultPrintUnit';

//import './SearchFurnituresUI.css'
import WebDataLoder from './WebDataLoader';

const SearchFurnituresUI = ({imageList, labelList})=>{
    const [itemDataList , setItemDataList] = useState([]);
    const [similarityCheckingModel, setSCM] = useState(new SimilarityCheckingModel());
    const [loading, setLoading] = useState(true);

    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);



    console.log("rerender")
    useEffect(() => {
        setLoading(true);
        itemDataList.splice(0, itemDataList.length);
        setItemDataList([]);

        imageList.map((imageTensor, index) => {
            getImg(index, imageTensor )
        });
         forceUpdate();
        }, [imageList]
    );



    
    useEffect(() => {
        //console.log(itemDataList)
        }, [itemDataList]
    );


    const getImg = async(index, imageTensor ) =>{
        const webDataLoder = new WebDataLoder();
        const newItemData = await webDataLoder.loadImg(labelList[index], 1, 101);

        const firstElementEmbedding = await similarityCheckingModel.getEmbeddingWithTensor(imageTensor);
        const firstElementDataUrl = await similarityCheckingModel.tensorToDataUrl(imageTensor)


        const cosineSimilarityData = await Promise.all(
            newItemData.map(async(item)=>{
                const embedding = await similarityCheckingModel.getEmbedding(item.mainImageUrl);
                //const embedding = await similarityCheckingModel.getEmbedding(item.contextualImageUrl);
                //console.log(item.contextualImageUrl)
                const cosineSimilarity = similarityCheckingModel.getCosineSimilarity(firstElementEmbedding, embedding);
                item.cosineSimilarity = cosineSimilarity;
                return item;
        }));


        //const sortedItemData = cosineSimilarityData.sort((A, B)=>{return A.cosineSimilarity -  B.cosineSimilarity})
        const sortedItemData = cosineSimilarityData.sort((A, B)=>{return  B.cosineSimilarity - A.cosineSimilarity })

        const itemData = {
            originImg : {
                src : firstElementDataUrl,
                label : labelList[index],
            },
            searchedItems : sortedItemData,
        };

        //setItemDataList(itemDataList.concat(itemData));
        //setItemDataList([...itemDataList, itemData]);
        itemDataList.push(itemData);
        setItemDataList(itemDataList);
        setLoading(false);
        console.log(itemDataList);
        // console.log(itemDataList);
    };

    return (

        <div>
            {loading && <img src = 'Pulse.gif' />}
            {
            itemDataList[0] && 
                itemDataList.map((itemData, index) => (
                    <ResultPrintUnit originImg = {itemData.originImg} searchedItems = {itemData.searchedItems} key = {index}/>
                ))
            }   
        </div>
    );
            
  }
  export default SearchFurnituresUI;