import * as React from 'react';
import { Fragment, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
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
import LocalPhone from '@mui/icons-material/LocalPhone';
import axios from 'axios';

const testUser = {
    firstName: "太郎",
    lastName: "山田",
    mail: "hogehoge@gmail.com",
    storeName: "若狭屋渋谷店",
    phoneNumber: "07044039803",
    address: "東京都渋谷区道玄坂1丁目1",
    storeID: "1234567890"
}

export default function AccountSettings() {

    const [users, setUsers] = useState(null)
    const [stores, setStores] = useState(null)
    const [value, setValue] = useState("");
    const [subValue, setSubValue] = useState("");

    useEffect(() => {
        axios
        .get('http://localhost:8000/api-auth/users/me/',{
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`, // ここを追加
            }
        })
        .then(res=>{setUsers(res.data);
                    //console.log(res.data);
                })
        .catch(err=>{console.log(err);});
        }, []);

    useEffect(() => {
        let fk;
        axios
        .get('http://localhost:8000/api-auth/users/me/',{
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`, // ここを追加
            }
        })
        .then(res=>{setUsers(res.data);
                    fk = res.data.store_FK;
                    //console.log(fk);
                    axios
                    .get('http://localhost:8000/api/store/' + String(fk) + '/',{
                        headers: {
                            'Authorization': `JWT ${localStorage.getItem('access')}`
                        }
                    })
                    .then(res=>{setStores(res.data);
                                //console.log(res.data);
                            })
                    .catch(err=>{console.log(err);});
                
                })
        .catch(err=>{console.log(err);});


    }, []);

    const [selectedItem, setSelectedItem] = React.useState('')

    const onOpenDialog = (name) => {
        setSelectedItem(name)
    }

    const onCloseDialog = () => {
        setSelectedItem('')
    }

    const changeData = (key, value) => { //PATCHを利用しデータベースの値を変更する関数
        axios
        .patch('http://localhost:8000/api-auth/users/me/',
            {[key]: value} //変更したいキーと値
        ,{
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`, 
            }
        })
        .then(res=>{setUsers(res.data);
                    console.log(res.data);})
        .catch(err=>{console.log(err);});
    }
    if (!users || !stores) return null;
    return (
        <>
            <Fragment>
                <div>
                    <div>
                    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => onOpenDialog("name")}>
                                    <ListItemIcon>
                                        <BadgeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="氏名" secondary={users.last_name + " " + users.first_name} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => onOpenDialog("phoneNumber")}>
                                    <ListItemIcon>
                                        <LocalPhone />
                                    </ListItemIcon>
                                    <ListItemText primary="電話番号" secondary={users.store_FK} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => onOpenDialog("email")}>
                                    <ListItemIcon>
                                        <EmailIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="メールアドレス" secondary={users.email} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => onOpenDialog("password")}>
                                    <ListItemIcon>
                                        <KeyIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="パスワード" secondary="パスワード再設定画面に移動します" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => onOpenDialog("storeName")}>
                                    <ListItemIcon>
                                        <StorefrontIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="店舗名" secondary={stores.store_name} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => onOpenDialog("phoneNumber")}>
                                    <ListItemIcon>
                                        <LocalPhoneIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="電話番号" secondary={stores.phone} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => onOpenDialog("address")}>
                                    <ListItemIcon>
                                        <LocationOnIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="店舗住所" secondary={stores.address} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => onOpenDialog("storeID")}>
                                    <ListItemIcon>
                                        <Grid3x3Icon />
                                    </ListItemIcon>
                                    <ListItemText primary="店舗ID" secondary={stores.store_ID} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                    </div>
                </div>
            </Fragment>

            <Dialog open={selectedItem === "name"} onClose={onCloseDialog}>
                <DialogTitle>氏名</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        新しく設定する氏名を入力してください
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="lastName"
                        label="姓"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="firstName"
                        label="名"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setSubValue(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCloseDialog}>キャンセル</Button>
                    <Button onClick={
                        () => {changeData("last_name", value);
                        changeData("first_name", subValue);
                        onCloseDialog();}
                    }>保存</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={selectedItem === "email"} onClose={onCloseDialog}>
                <DialogTitle>メールアドレス</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        新しく設定するメールアドレスを入力してください
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="メールアドレス"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setValue(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCloseDialog}>キャンセル</Button>
                    <Button onClick={
                        () => {changeData("email", value);
                        onCloseDialog();}
                    }>保存</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={selectedItem === "storeName"} onClose={onCloseDialog}>
                <DialogTitle>店舗名</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        新しく設定する店舗名を入力してください
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="storeName"
                        label="店舗名"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCloseDialog}>キャンセル</Button>
                    <Button onClick={onCloseDialog}>保存</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={selectedItem === "phoneNumber"} onClose={onCloseDialog}>
                <DialogTitle>電話番号</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        新しく設定する電話番号を入力してください
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="phoneNumber"
                        label="電話番号"
                        type="tel"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setValue(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCloseDialog}>キャンセル</Button>
                    <Button onClick={() => {changeData("phone", value);
                                            onCloseDialog();}}>保存</Button>
                </DialogActions>
            </Dialog>
            

            <Dialog open={selectedItem === "address"} onClose={onCloseDialog}>
                <DialogTitle>店舗住所</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        新しく設定する店舗住所を入力してください
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="address"
                        label="住所"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCloseDialog}>キャンセル</Button>
                    <Button onClick={onCloseDialog}>保存</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={selectedItem === "storeID"} onClose={onCloseDialog}>
                <DialogTitle>店舗ID</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        店舗IDは変更できません。
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCloseDialog}>キャンセル</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}