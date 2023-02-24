import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { Box } from "@mui/material";
import GridStore from "../../components/GridStore";
import GridProducts from "../../components/GridProducts";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import dataStore from "../../data/store/store_info_en.json"
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function Store() {
    const { storeName, floor } = useParams();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [lang, setLang] = useState({
        language: i18n.language
    })
    const handleLangChange = (event) => {
        i18n.changeLanguage(event.target.value)
        setLang(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }))
    }
    return (
        <Grid container spacing={1} style={{ marginTop: 10,color: 'black' ,backgroundColor: '#fafafa'  }}>
            <Grid item xs={12} sm={4} sx={{ marginright: "100px" }}>
                <Grid container spacing={1} justifyContent="flex-end" style={{ color: 'black', backgroundColor: '#fafafa' }}>
                    <Grid item xs={6} sm={6}>
                        <Typography variant="h6" gutterBottom style={{ marginLeft: 20, marginTop: 0 }}>
                            {t('title')}
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3}>
                        <Typography variant="subtitle1" gutterBottom style={{ marginLeft: 10, marginTop: 5 }}>
                            {t('lang')}
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3}>
                        <Select
                            value={lang.language}
                            onChange={(event) => handleLangChange(event)}
                            inputProps={{
                                name: 'language'
                            }}
                            style={{
                                width: 80,
                                height: 40
                            }}
                            sx={{
                                '& .MuiInputBase-root': {
                                    '&:before': {
                                        borderBottom: 'none'
                                    },
                                    '&:after': {
                                        borderBottom: 'none'
                                    }
                                }
                            }}
                        >
                            <MenuItem value='en'><Typography>Eng</Typography></MenuItem>
                            <MenuItem value='th'><Typography>Th</Typography></MenuItem>
                        </Select>
                    </Grid>
                </Grid>
                <Box sx={{ flexGrow: 2 }}>
                    <Grid container>
                        <Grid container>
                            <Grid item xs={9}>
                                <Typography variant="h4" style={{ margin: 15 }}>
                                    {storeName}
                                </Typography>
                            </Grid>
                            <Grid item xs={3} >
                                <Button variant="text" style={{ margin: 15, marginTop: 20 }} onClick={() => navigate(-1)}>Back</Button>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5" style={{ margin: 15 }}>
                                {t('promotions')} 
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <GridStore lang={lang} storeName={storeName} dataStore={dataStore} floor={floor} />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5" style={{ margin: 15 }}>
                                {t('menu')}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <GridProducts lang={lang} storeName={storeName} dataStore={dataStore} floor={floor} />
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
}