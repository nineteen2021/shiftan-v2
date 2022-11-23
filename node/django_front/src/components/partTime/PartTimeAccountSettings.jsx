import * as React from 'react';
import { Fragment, useState, useEffect } from 'react';
import { Link as routerLink } from 'react-router-dom';
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

export default function AccountSettings() {

    const [users, setUsers] = useState(null)
    const [stores, setStores] = useState(null)
    const [form_firstname, setForm_firstname] = useState("");
    const [form_lastname, setForm_lastname] = useState("");
    const [form_email, setForm_email] = useState("");
    const [form_phone, setForm_phone] = useState("");
    const [form_storename, setForm_storename] = useState("");
    const [form_storeaddress, setForm_storeaddress] = useState("");
    const [form_storephone, setForm_storephone] = useState("");
    const [formError, setFormError] = useState("");
    const emailPattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;
    const phonePattern = /^0[-0-9]{9,12}$/;

    const checknull = (value) => {//valueとして与えられた情報が空欄かどうか判別し、エラーをセットする関数
        if(value == ''){
            setFormError('適切な値を入力してください');
            return true
        }else{
            setFormError('');
            return false
        }
    }

    const checkphone = (value) => {//valueとして渡された電話番号が、適切な形式になっているか確認する関数
        if(!phonePattern.test(value)){
            setFormError('適切な値を入力してください');
            return true
        }else{
            setFormError('');
            return false
        }
    }

    useEffect(() => {
        axios
        .get('http://localhost:8000/api-auth/users/me/',{
            headers: {
                'Authorization': `JWT ${window.localStorage.getItem('access')}`, // ここを追加
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
                // 'Authorization': `JWT ${localStorage.getItem('access')}`, 
                'Authorization': `JWT ${window.localStorage.getItem('access')}`
            }
        })
        .then(res=>{setUsers(res.data);
                    console.log(res.data);
                    console.log('patch完了' + key + value);    
                })
        .catch(err=>{
            console.log(err);
            console.log('patch失敗' + key + value);
        });
    }

    const changeName = (last, first) => { //PATCHを利用しデータベースの値を変更する関数。氏名変更専用。
        axios
        .patch('http://localhost:8000/api-auth/users/me/',
            {
                last_name: last,
                first_name: first
            } //変更したいキーと値
        ,{
            headers: {
                // 'Authorization': `JWT ${localStorage.getItem('access')}`, 
                'Authorization': `JWT ${window.localStorage.getItem('access')}`
            }
        })
        .then(res=>{setUsers(res.data);
                    console.log(res.data);
                    console.log('patch完了' + last + first);    
                })
        .catch(err=>{
            console.log(err);
            console.log('patch失敗' + last + first);
        });
    }

    const changeStoreData = (key, value) => {//ユーザーの店舗FKを取得してから、それを利用してストアの情報を変更する関数
        let fk;
        axios
        .get('http://localhost:8000/api-auth/users/me/',{
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            }
        })
        .then(res=>{setUsers(res.data);
                    fk = res.data.store_FK;
                    axios
                    .patch('http://localhost:8000/api/store/' + String(fk) + '/',
                    {
                        [key]: value
                    },
                    {
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
    }

    const sendResetEmail = (email) => {//メールアドレス変更メールを送信する関数
        axios
        .post('http://localhost:8000/api-auth/users/reset_email/',
        {email: email},
        {
            headers: {
                'Authorization': `JWT ${window.localStorage.getItem('access')}`,
            }
        })
        .then(res=>{})
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
                                    <ListItemText primary="電話番号" secondary={users.phone} />
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
                                <ListItemButton 
                                    component={routerLink}
                                    to="/changePassword"
                                >
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
                                <ListItemButton onClick={() => onOpenDialog("storePhoneNumber")}>
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

            <Dialog open={selectedItem === "name"} onClose={() => {
                    onCloseDialog();
                    setFormError('');
                    setForm_firstname('');
                    setForm_lastname('');
                }}>
                <DialogTitle>氏名</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        新しく設定する氏名を入力してください
                    </DialogContentText>
                    <TextField
                        autoFocus
                        error={formError}
                        helpertext={formError}
                        margin="dense"
                        id="lastName"
                        label="姓"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setForm_lastname(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="firstName"
                        error={formError}
                        label="名"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setForm_firstname(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        onCloseDialog();
                        setFormError('');
                        setForm_firstname('');
                        setForm_lastname('');
                    }}>キャンセル</Button>
                    <Button onClick={
                        () => {
                            if(!checknull(form_firstname) && !checknull(form_lastname)){
                                changeName(form_lastname,form_firstname)
                                setForm_firstname('');
                                setForm_lastname('');
                                onCloseDialog();
                            } 
                        }
                    }>保存</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={selectedItem === "email"} onClose={() => {
                    onCloseDialog();
                }}>
                <DialogTitle>メールアドレス</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        現在お使いのメールアドレスにメールアドレス変更メールを送信します。<br/>
                        よろしいですか？
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        onCloseDialog();
                    }}>キャンセル</Button>
                    <Button onClick={
                        () => {
                                sendResetEmail(users.email);
                                onCloseDialog();
                                onOpenDialog("emailFinished");
                        }
                    }>OK</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={selectedItem === "emailFinished"} onClose={() => {
                    onCloseDialog();
                }}>
                <DialogTitle>完了</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        メールアドレス変更メールを送信しました。<br/>
                        メールボックスをご確認ください。
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={
                        () => {
                                onCloseDialog();
                        }
                    }>OK</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={selectedItem === "storeName"} onClose={() => {
                    onCloseDialog();
                    setForm_storename('');
                    setFormError('');
                }}>
                <DialogTitle>店舗名</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        新しく設定する店舗名を入力してください
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        error={formError}
                        id="storeName"
                        label="店舗名"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setForm_storename(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        onCloseDialog();
                        setForm_storename('');
                        setFormError('');
                    }}>キャンセル</Button>
                    <Button onClick={() => {
                        if(!checknull(form_storename)){
                            changeStoreData("store_name", form_storename);
                            onCloseDialog();
                        }
                    }}>保存</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={selectedItem === "phoneNumber"} onClose={() => {
                    onCloseDialog();
                    setFormError('');
                    setForm_phone('');
                }}>
                <DialogTitle>電話番号</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        新しく設定する電話番号を入力してください
                    </DialogContentText>
                    <TextField
                        autoFocus
                        error={formError}
                        margin="dense"
                        id="phoneNumber"
                        label="電話番号"
                        type="tel"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setForm_phone(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        onCloseDialog();
                        setFormError('');
                        setForm_phone('');
                    }}>キャンセル</Button>
                    <Button onClick={() => {
                        if(!checkphone(form_phone)&&!checknull(form_phone)){
                            changeData("phone", form_phone);
                            setForm_phone('');
                            onCloseDialog();
                        }
                    }}>保存</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={selectedItem === "storePhoneNumber"} onClose={() => {
                    onCloseDialog();
                    setFormError('');
                    setForm_storephone('');
                }}>
                <DialogTitle>店舗電話番号</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        新しく設定する電話番号を入力してください
                    </DialogContentText>
                    <TextField
                        autoFocus
                        error={formError}
                        margin="dense"
                        id="phoneNumber"
                        label="電話番号"
                        type="tel"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setForm_storephone(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        onCloseDialog();
                        setFormError('');
                        setForm_storephone('');
                    }}>キャンセル</Button>
                    <Button onClick={() => {
                        if(!checkphone(form_storephone)&&!checknull(form_storephone)){
                            changeStoreData("phone", form_storephone);
                            setForm_storephone('');
                            onCloseDialog();
                        }
                    }}>保存</Button>
                </DialogActions>
            </Dialog>
            

            <Dialog open={selectedItem === "address"} onClose={() => {
                    onCloseDialog();
                    setFormError('');
                    setForm_storeaddress('');
                }}>
                <DialogTitle>店舗住所</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        新しく設定する店舗住所を入力してください
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        error={formError}
                        id="address"
                        label="住所"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setForm_storeaddress(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        onCloseDialog();
                        setFormError('');
                        setForm_storeaddress('');
                    }}>キャンセル</Button>
                    <Button onClick={() => {
                        if(!checknull(form_storeaddress)){
                            changeStoreData("address", form_storeaddress);
                            onCloseDialog();
                        }}
                    }>保存</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={selectedItem === "storeID"} onClose={() => {
                    onCloseDialog();
                    setFormError('');
                }}>
                <DialogTitle>店舗ID</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        店舗IDは変更できません。
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        onCloseDialog();
                        setFormError('');
                    }}>キャンセル</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}