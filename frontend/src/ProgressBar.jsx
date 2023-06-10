import React ,{forwardRef}from "react"

const ProgressBar = forwardRef(({num, maxNum}, ref) => {
    const persent = Math.floor((num / maxNum) * 100);
    const ProgressStyle = {
        width: "60px",
        height: "10px",
        backgroundColor: "gray",
        display: "inline-block"
    };
    const DealtStyle = {
        backgroundColor: "blue",
        width: `${persent + "%"}`,
        height: "100%",
    };

    return (
        <div  style = {ProgressStyle}>
    	    <div style = {DealtStyle}></div>
        </div>
    )
});
export default ProgressBar