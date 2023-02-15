import * as React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BadgeIcon from '@mui/icons-material/Badge';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';

export default function CheckStore() {
    const [stores, setStores] = useState(null)

    useEffect(() => {
        let fk;
        axios
        .get('http://localhost:8000/api-auth/users/me/',{
            headers: {
                'Authorization': `JWT ${window.localStorage.getItem('access')}`,
            }
        })
        .then(res=>{
            fk = res.data.store_FK;
            axios
            .get('http://localhost:8000/api/store/' + String(fk) + '/',{
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            })
            .then(res=>{setStores(res.data);
                        console.log(res.data);
                    })
            .catch(err=>{console.log(err);});
        })
        .catch(err=>{console.log(err);});
    }, []);

    if (!stores) return null;
    return (
        <>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <nav aria-label="settings">
                    <List>
                        <ListItem disablePadding sx={{ m: 2 }}>
                            <ListItemIcon>
                                <StorefrontIcon />
                            </ListItemIcon>
                            <ListItemText primary="店舗名" secondary={stores.store_name} />
                        </ListItem>
                        <ListItem disablePadding sx={{ m: 2 }}>
                            <ListItemIcon>
                                <LocalPhoneIcon />
                            </ListItemIcon>
                        <ListItemText primary="店舗電話番号" secondary={stores.phone} />
                        </ListItem>
                        <ListItem disablePadding sx={{ m: 2 }}>
                            <ListItemIcon>
                                <LocationOnIcon />
                            </ListItemIcon>
                        <ListItemText primary="店舗住所" secondary={stores.address} />
                        </ListItem>
                        <ListItem disablePadding sx={{ m: 2 }}>
                            <ListItemIcon>
                                <Grid3x3Icon />
                            </ListItemIcon>
                        <ListItemText primary="店舗ID" secondary={stores.store_ID} />
                        </ListItem>
                    </List>
                </nav>
            </Box>
        </>
    );
    }