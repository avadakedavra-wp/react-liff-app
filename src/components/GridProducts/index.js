import React from "react";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import Typography from "@mui/material/Typography";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function GridProducts({ lang, storeName, dataStore, floor }) {
    // check floor 
    // const floorData = Object.keys(dataStore).find(data => {
    //     if(data === floor){
    //         console.log(data)
    //     }
    // }); 
    const floorData = dataStore[floor];
    // console.log(floorData)
    return (
        <div className="app">
            <ul className="hs full">
                {
                    floorData.map(dataname => {
                        if(dataname.store_name === storeName){
                            return dataname.menu.map((item,index)=>{
                                return (
                                    <li className="item" key={index}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <img 
                                                    src={require("../../assets/icons/picture.png")}
                                                    style={{
                                                        width:80,
                                                    }}
                                                    alt="productsPic"
                                                />
                                                <Typography variant="h6">{item.product}</Typography>
                                                <Typography variant="subtitle1">{lang === 'th' ? 'ราคา' : 'Price'}: {item.price} ฿</Typography>
                                            </Box>
                                    </li>
                                );
                            })
                        }
                    })
                }
            </ul>
        </div>
    );
}