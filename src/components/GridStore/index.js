import React from "react";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import "../GridStore/style.css";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function GridStore({ lang, storeName, dataStore, floor }) {
    const floorData = dataStore[floor];
    return (
        <div className="app">
            <ul className="hs full">
                {
                    // eslint-disable-next-line array-callback-return
                    floorData.map(dataname => {
                        if(dataname.store_name === storeName){
                            return dataname.promotions.map((item,index)=>{
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
                                                <Typography variant="h6">{item.PromotionName}</Typography>
                                                <Typography variant="subtitle1">{item.PromotionDesc} </Typography>
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