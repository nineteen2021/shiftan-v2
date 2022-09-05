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
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LocalPhone from '@mui/icons-material/LocalPhone';
import axios from 'axios';

const testUser = {
    firstName: "太郎",
    lastName: "山田",
    phoneNumber: "000-1111-2222",
    mail: "hogehoge@gmail.com",
}

export default function PartTimeAccountSettings() {

    const [users, setUsers] = useState(null)
    const [form_firstname, setForm_firstname] = useState("");
    const [form_lastname, setForm_lastname] = useState("");
    const [form_email, setForm_email] = useState("");
    const [form_phone, setForm_phone] = useState("");
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
                    console.log(res.data);
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
    if (!users) return null;
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
                                    to="/certificationPassword"
                                >
                                    <ListItemIcon>
                                        <KeyIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="パスワード" secondary="パスワード再設定画面に移動します" />
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
        </>
    );
}