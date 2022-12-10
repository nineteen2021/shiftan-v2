import * as React from 'react';
import { useState, useLayoutEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { Link as routerLink } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Container from '@mui/material/Container';

export default function Management() {
    const [users, setUsers] = useState(null);
    const [storeFK, setStoreFK] = useState(null);
    const [store, setStore] = useState(null);
    const [trustedUsers, setTrustedUsers] = useState(null);
    const [dialogFlag, setDialogFlag] = useState(false);
    const [deleteUsername, setDeleteUsername] = useState({
        name: '',
        id: ''
    });
    const navigate = useNavigate();
    useLayoutEffect(() => {
        let fk;
        axios
            .get(process.env.REACT_APP_API_URL + '/api-auth/users/me/', {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`, // ここを追加
                }
            })
            .then(res => {
                setUsers(res.data);
                console.log(res.data);
                fk = res.data.store_FK
                setStoreFK(res.data.store_FK);
                axios
                    .get(process.env.REACT_APP_API_URL + '/api/user/?is_store=true&store_FK=' + fk, {
                        headers: {
                            'Authorization': `JWT ${localStorage.getItem('access')}`, // ここを追加
                        }
                    })
                    .then(res => {
                        console.log('認証済みのユーザーを取得');
                        setTrustedUsers(res.data);
                        console.log(res.data);
                        axios
                            .get(process.env.REACT_APP_API_URL + '/api/store/' + fk + '/', {
                                headers: {
                                    'Authorization': `JWT ${localStorage.getItem('access')}`, // ここを追加
                                }
                            })
                            .then(res => {
                                console.log('ストアを取得');
                                setStore(res.data);
                                console.log(res.data);
                            })
                            .catch(err => { console.log(err); });
                    })
                    .catch(err => {
                        console.log('再試行');
                        axios
                            .get(process.env.REACT_APP_API_URL + '/api/user/?is_store=true&store_FK=' + fk, {
                                headers: {
                                    'Authorization': `JWT ${localStorage.getItem('access')}`, // ここを追加
                                }
                            })
                            .then(res => {
                                console.log('認証済みのユーザーを取得');
                                setTrustedUsers(res.data);
                                console.log(res.data);
                                axios
                                    .get(process.env.REACT_APP_API_URL + '/api/store/' + fk + '/', {
                                        headers: {
                                            'Authorization': `JWT ${localStorage.getItem('access')}`, // ここを追加
                                        }
                                    })
                                    .then(res => {
                                        console.log('ストアを取得');
                                        setStore(res.data);
                                        console.log(res.data);
                                    })
                                    .catch(err => { console.log(err); });
                            })
                            .catch(err => { console.log(err); });
                    });
            })
            .catch(err => { console.log(err); });
    }, []);

    const onCloseDialog = () => {
        setDialogFlag(false);
        setDeleteUsername('');
    }

    const deleteUser = (id) => {
        axios
            .patch(process.env.REACT_APP_API_URL + '/api/user/' + id + '/',
                {
                    store_FK: null,
                    is_store: false
                } //変更したいキーと値
                , {
                    headers: {
                        // 'Authorization': `JWT ${localStorage.getItem('access')}`, 
                        'Authorization': `JWT ${window.localStorage.getItem('access')}`
                    }
                })
            .then(res => {
                console.log('以下のユーザーを削除しました');
                console.log(res.data);
                axios
                    .get(process.env.REACT_APP_API_URL + '/api/user/?is_store=true&store_FK=' + storeFK, {
                        headers: {
                            'Authorization': `JWT ${localStorage.getItem('access')}`, // ここを追加
                        }
                    })
                    .then(res => {
                        console.log('認証済みのユーザーを取得');
                        setTrustedUsers(res.data);
                        console.log(res.data);
                    })
                    .catch(err => { console.log(err); });
            })
            .catch(err => {
                console.log(err);
            });
    }

    if (!users || !trustedUsers || !store) return null;
    // アルバイトアカウントだった時はじく
    else if (users.is_manager === false) {
        return navigate("/*")
    }
    else if (trustedUsers.length == 0) {
        return (
            <Grid container spacing={0} alignItems='center' justifyContent='center' direction="column" style={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <p><Typography fontSize={24}><font color='#707070'>メンバーはいません</font></Typography></p>
                </Grid>
            </Grid>
        )
    }
    return (
        <>
        <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
            <Typography sx={{fontSize:20, position:'absolute', left:'100px'}}>従業員管理</Typography>
            <Grid sx={{
                direction:"column",
                justifyContent:"center",
                alignItems:"center ",
                spacing:5,
                pt:"50px",
                }}
            >
                <Grid item>
                    <TableContainer component={Paper} sx={{ minWidth: 550 }}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left"><b>名前</b></TableCell>
                                    <TableCell align="left"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {trustedUsers.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >

                                        <TableCell component="th" scope="row" align="left">
                                            <font size="5">{row.last_name + ' ' + row.first_name}</font>
                                        </TableCell>

                                        <TableCell align="center">
                                            {!(row.id == users.id) &&
                                                <Button variant="contained" color="error" sx={{ ml: 1 }} onClick={() => {
                                                    setDeleteUsername({
                                                        name: row.last_name + ' ' + row.first_name,
                                                        id: row.id
                                                    })
                                                    setDialogFlag(true);
                                                }} >削除</Button>
                                            }
                                            {(row.id == users.id) &&
                                                <Typography>管理者</Typography>
                                            }
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Grid item sx={{ marginLeft: '30em', mt: '20px' }}>
                        <Button variant="contained" component={routerLink} to="/settings" sx={{ml: '22em'}}>戻る</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Dialog open={dialogFlag} onClose={onCloseDialog}>
                <DialogTitle>確認</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {deleteUsername.name + 'さんを削除しますか？'}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        onCloseDialog();
                    }}>いいえ</Button>
                    <Button onClick={() => {
                        deleteUser(deleteUsername.id);
                        onCloseDialog();
                    }}>はい</Button>
                </DialogActions>
            </Dialog>
        </Container>
        </>
    );
}
