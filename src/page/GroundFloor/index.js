import React, { useEffect,useRef } from "react";
import './style.css'
import plan from "../../assets/plan/planFloorGround_v3.png"
import listStore from "../../data/coordinate/store_coord_g.json"
import { useNavigate } from "react-router-dom";
import { useTracking } from 'react-tracking';


export default function GroundFloor({lang, floor}) {
  const { track,trackEvent } = useTracking({floor: 'G'});
    const canvasRef = useRef(null);
    const navigate = useNavigate();
    const handleClickImg = (event) => {
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        console.log(`Clicked at (${x},${y})`);
        const store = listStore.results;
        const clickedStore = store.find((data) => {
          return (
            x >= data.x &&
            x <= data.x + data.w &&
            y >= data.y &&
            y <= data.y + data.h
          );
        });
        trackEvent({ action: 'click', storeName: `${clickedStore.name}` });
        console.log(trackEvent)
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
            // const x = 16;
            // const y = 790;
            // const width = 220;
            // const height = 120;
            // ctx.beginPath();
            // ctx.rect(x, y, width, height);
            // ctx.strokeStyle = 'red';
            // ctx.stroke();
          };
      }, []);
    return (
        <div className="App">
            <div className="App-header">
                <canvas ref={canvasRef} onClick={handleClickImg} />
            </div>
        </div>
    );
}

