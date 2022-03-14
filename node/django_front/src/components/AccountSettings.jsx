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
import StoreIcon from '@mui/icons-material/Store';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const testUser = {
    firstName: "太郎",
    lastName: "山田",
    mail: "hogehoge@gmail.com",
    userID: "taro0000",
    shopName: "太郎一号店",
    shopID: "taro1stShop",
    shopAddress: "東京都〇〇区",
    shopNumber: "048 2828 2828",
}

export default function AccountSettings() {
    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <nav aria-label="main mailbox folders">
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <BadgeIcon />
                            </ListItemIcon>
                            <ListItemText primary="名前" secondary={testUser.lastName + " " + testUser.firstName} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <EmailIcon />
                            </ListItemIcon>
                            <ListItemText primary="メールアドレス" secondary={testUser.mail} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary="ユーザーID" secondary={testUser.userID} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <KeyIcon />
                            </ListItemIcon>
                            <ListItemText primary="パスワード" secondary="パスワード再設定画面に移動します" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <StoreIcon />
                            </ListItemIcon>
                            <ListItemText primary="店名" secondary={testUser.shopName} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <StoreIcon />
                            </ListItemIcon>
                            <ListItemText primary="店舗ID" secondary={testUser.shopID} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <StoreIcon />
                            </ListItemIcon>
                            <ListItemText primary="店舗住所" secondary={testUser.shopAddress} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <LocalPhoneIcon />
                            </ListItemIcon>
                            <ListItemText primary="電話番号" secondary={testUser.shopNumber} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
        </Box>
    );
}