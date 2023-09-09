import React, { useMemo, useState, useRef, useEffect, forwardRef } from 'react';
import './ResultPrintUnit.css'
import ProductUnit from './ProductUnit';
import ProgressBar from './ProgressBar';

const ResultPrintUnit = ({ imageSrc, label , similarityModel, categoryData, webDataLoader }) => {
    const [originImgSrc, setOriginImgSrc] = useState(null);
    const [result, setResult] = useState(null);

    useEffect(() => {
        async function getOriginImgSrc(){
            //const ois =  await similarityModel.tensorToDataUrl(imageTensor);
            setOriginImgSrc(imageSrc)
        }
        getOriginImgSrc();
    }, [imageSrc])


    useEffect(() => {
        setResult(null);
        getImg();
    }, [originImgSrc]);


    const getImg = async () => {
        const ikeaCode = categoryData.getIkeaCode(label);
        const webData = await webDataLoader.loadImg(ikeaCode, 1, 51);

        //const originImgEmbedding = await similarityModel.getEmbeddingWithTensor(imageTensor);
        const originImgEmbedding = await similarityModel.getEmbedding(imageSrc);

        const cosineSimilarityData = await Promise.all(
            webData.map(async (Data) => {
                let embedding = null

                embedding = await similarityModel.getEmbedding(Data.mainImageUrl);
                const cosineSimilarity = similarityModel.getCosineSimilarity(originImgEmbedding, embedding);
                Data.cosineSimilarity = cosineSimilarity;
                return Data;
            }));

        const sortedData = cosineSimilarityData.sort((A, B) => { return B.cosineSimilarity - A.cosineSimilarity })

        setResult(sortedData);
        
    };
    


    return (
        <div>
            <div className='unitContainer'>
                { originImgSrc ?
                <div className='unitItem'>
                    <img className='itemImg' src={originImgSrc} />
                    <div>{categoryData.getLabel(label)}</div>
                </div>
                : null
                }
                <ProductUnit product={ result ? result[0]: null} />
                <ProductUnit product={ result ? result[1]: null} />
                <ProductUnit product={ result ? result[2]: null} />
                
            </div>
        </div>

    )
}

export default ResultPrintUnit;