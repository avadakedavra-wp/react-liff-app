import React, { useEffect,useRef } from "react";
import './style.css'
import plan from "../../assets/plan/planFloorOne_v3.png"
import listStore from "../../data/coordinate/store_coord_1.json"
import { useNavigate } from "react-router-dom";

export default function FirstFloor({storeName, lang, floor}){
    const canvasRef = useRef(null);
    const navigate = useNavigate();
    const handleClickImg = (event) => {
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        // console.log(`Clicked at (${x},${y})`);
      
        const store = listStore.results;
        const clickedStore = store.find((data) => {
          return (
            x >= data.x &&
            x <= data.x + data.w &&
            y >= data.y &&
            y <= data.y + data.h
          );
        });
      
        if (clickedStore) {
            navigate(`/store/${lang.language}/${floor}/${clickedStore.name}`);
        }
      };

    // useEffect(() => {
    //   console.log(`Clicked on ${clicked}`);
    // }, [clicked]);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = plan;
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            // const x = 6;
            // const y = 14;
            // const width = 100;
            // const height = 120;
            // ctx.beginPath();
            // ctx.rect(x, y, width, height);
            // ctx.strokeStyle = 'red';
            // ctx.stroke();
          };
      }, []);
    return(
        <div className="App">
            <div className="App-header">
              <canvas ref={canvasRef} onClick={handleClickImg} />
            </div>
        </div>
    );
}