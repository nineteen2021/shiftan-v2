import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import KeyIcon from '@mui/icons-material/Key';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';

const testUser = {
    storeName: "若狭屋渋谷店",
    firstName: "コウキ",
    lastName: "フルヤ",
    phoneNumber: "07044039803",
    postalCode: "1500043",
    address: "東京都渋谷区道玄坂1丁目1",
    storeID: "1234567890"


}

export default function CheckStore() {

    return (
        <>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <nav aria-label="settings">
                    <List>
                        <ListItem disablePadding sx={{ m: 2 }}>
                            <ListItemIcon>
                                <StorefrontIcon />
                            </ListItemIcon>
                            <ListItemText primary="店舗名" secondary={testUser.storeName} />
                        </ListItem>
                        <ListItem disablePadding sx={{ m: 2 }}>
                            <ListItemIcon>
                                <BadgeIcon />
                            </ListItemIcon>
                            <ListItemText primary="店舗責任者" secondary={testUser.lastName + " " + testUser.firstName} />
                        </ListItem>
                        <ListItem disablePadding sx={{ m: 2 }}>
                            <ListItemIcon>
                                <LocalPhoneIcon />
                            </ListItemIcon>
                         <ListItemText primary="店舗電話番号" secondary={testUser.phoneNumber} />
                        </ListItem>
                        <ListItem disablePadding sx={{ m: 2 }}>
                            <ListItemIcon>
                                <LocationOnIcon />
                            </ListItemIcon>
                        <ListItemText primary="店舗住所" secondary={"〒" + testUser.postalCode + " " + testUser.address} />
                        </ListItem>
                        <ListItem disablePadding sx={{ m: 2 }}>
                            <ListItemIcon>
                                <Grid3x3Icon />
                            </ListItemIcon>
                        <ListItemText primary="店舗ID" secondary={testUser.storeID} />
                        </ListItem>
                    </List>
                </nav>
            </Box>
        </>
    );
    }