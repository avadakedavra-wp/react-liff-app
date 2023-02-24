import React, { useState } from "react";
import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTranslation } from 'react-i18next';
import { Grid } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

// page
import GroundFloor from "../GroundFloor";
import FirstFloor from "../FirstFloor";
import SecondFloor from "../SecondFloor";
import ThirdFloor from "../ThirdFloor";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function Layouts({defalutFloor, storeName}) {
    const { t, i18n } = useTranslation();
    const { floorNumber } = useParams();
    console.log(floorNumber)
    const [value, setValue] = useState(defalutFloor ? 0 : parseInt(floorNumber))
    const [lang, setLang] = useState({
        language: i18n.language
    })
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleLangChange = (event) => {
        i18n.changeLanguage(event.target.value)
        setLang(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }))
    }

    console.log(lang)

    return (
        <Grid container spacing={1} style={{ marginTop: 10, marginBottom:40 }}>
            <Grid item xs={12} sm={4} sx={{ marginright: "100px" }}>
                <Grid container spacing={1} justifyContent="flex-end">
                    <Grid item xs={6} sm={6}>
                        <Typography variant="h6" gutterBottom style={{ marginLeft: 20, marginTop: 0}}>
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
            </Grid> 
            <Grid item xs={12} sm={12}>
                <Box sx={{ width: '100%' }}>
                    <Tabs
                        variant="scrollable"
                        scrollButtons
                        value={value}
                        onChange={handleChange}
                        allowScrollButtonsMobile
                        sx={{
                            [`& .${tabsClasses.scrollButtons}`]: {
                                '&.Mui-disabled': { opacity: 0.3 },
                            },
                        }}
                    >
                        <Tab label={t('FG')} {...a11yProps(0)} />
                        <Tab label={t('F1')} {...a11yProps(1)} />
                        <Tab label={t('F2')} {...a11yProps(2)} />
                        <Tab label={t('F3')} {...a11yProps(3)} />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <GroundFloor storeName={storeName} lang={lang} floor={"floor_g"} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <FirstFloor storeName={storeName} lang={lang} floor={"floor_f"} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <SecondFloor storeName={storeName} lang={lang} />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <ThirdFloor storeName={storeName} lang={lang} />
                    </TabPanel>
                </Box>
                <Box sx={{ width: '100%'}}>
                    <img src={require('../../assets/plan/facility.png')} alt="facility" style={{width:350, display: 'flex' ,alignItems: 'center' ,justifyContent: 'center', margin: '0 auto'}}/>
                </Box>
            </Grid>
        </Grid>
    );
}