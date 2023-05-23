import React, { useState, useRef, useEffect} from 'react';
import {ImageList, ImageListItem} from '@mui/material'

//import './SearchFurnituresUI.css'
import SearchFurnitures from './SearchFurnitures';
import WebDataLoder from './WebDataLoader';

const SearchFurnituresUI = (ctrl)=>{
    const [itemData, setItemData] = useState([{mainImageUrl:"", title:""}]);


    const imgRef = useRef();
    const imgfileRef = useRef();

    useEffect(() => {
    });

    const getImg = async(category) =>{
        const webDataLoder = new WebDataLoder;
        const itemData = await webDataLoder.loadImg(category, 1, 30);
        setItemData(itemData)
        console.log(itemData)
    };

    return (
        <div>
            <button onClick={()=>{getImg(1)}}>1</button>
            <button onClick={()=>{getImg(2)}}>2</button>
            <button onClick={()=>{getImg(3)}}>3</button>
            <button onClick={()=>{getImg(6)}}>6</button>
            <ImageList sx={{ width: 800, height: 1000 }} cols={3} rowHeight={250}>
            {itemData.map((item) => (
                <ImageListItem key={item.mainImageUrl}>
                <img
                    src={`${item.mainImageUrl}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${item.mainImageUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.id}
                    loading="lazy"
                />
                </ImageListItem>
            ))}
            </ImageList>
        </div>
    );
  }
  export default SearchFurnituresUI;