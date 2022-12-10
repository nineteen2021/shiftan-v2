import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate, useLocation } from "react-router-dom"

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Shiftan
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function JoinStore() {
    const navigate = useNavigate()
    const search = useLocation().search;
    const query2 = new URLSearchParams(search);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [store_id, setStore_id] = React.useState('');
    const [dialogFlag, setDialogFlag] = React.useState(false);
    const [successDialogFlag, setSuccessDialogFlag] = React.useState(false);
    const [store, setStore] = React.useState('');
    const [storeName, setStoreName] = React.useState('');
    const [storeFK, setStoreFK] = React.useState(null);

    const onCloseDialog = () => {
        setDialogFlag(false);
        setSuccessDialogFlag(false);
    };

    const application = () => {
        axios //入力されたストアIDからストアの情報を持ってくる
            .get(process.env.REACT_APP_API_URL + '/api/store/?store_ID=' + store_id, {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            })
            .then(res => {
                console.log('以下のストアの情報を取得しました');
                console.log(res.data);
                setStore(res.data[0]);
                if (res.data.length == 0) { //入力されたstoreIDに対するストアがなければ
                    setError(true);
                    setErrorMessage('入力された店舗IDに対応する店舗が見つかりませんでした');
                } else if (store_id == '') {
                    setError(true);
                    setErrorMessage('店舗IDを入力してください');
                } else {
                    setStoreName(res.data[0].store_name);
                    setStoreFK(res.data[0].id);
                    setError(false);
                    setDialogFlag(true);
                }
            })
            .catch(err => { console.log(err); });
    }

    const updateData = () => {
        axios
        .patch(process.env.REACT_APP_API_URL + '/api-auth/users/me/',
            {
                store_FK: storeFK,
                is_store: false
            } //変更したいキーと値
        ,{
            headers: {
                // 'Authorization': `JWT ${localStorage.getItem('access')}`, 
                'Authorization': `JWT ${window.localStorage.getItem('access')}`
            }
        })
        .then(res=>{
                    console.log('成功');
                    console.log(storeFK);
                    console.log(res.data);
                    setSuccessDialogFlag(true);
                })
        .catch(err=>{
            console.log(err);
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        application();
    }

    return (
        <>
            <Collapse in={error}>
                <Alert severity="error">{errorMessage}</Alert>
            </Collapse>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 16,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    所属する店舗のIDを入力してください
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="店舗ID"
                            name="store_id"
                            type="text"
                            error={error}
                            autoFocus
                            onChange={(e) => setStore_id(e.target.value)}
                        />

                        <Button
                            fullWidth
                            type='submit'
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            申請する
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 16, mb: 4 }} />
            </Container>

            <Dialog open={dialogFlag} onClose={onCloseDialog}>
                <DialogTitle>確認</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        以下の店舗に申請を送信します。よろしいですか？
                    </DialogContentText>
                    <DialogContentText sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        fontSize: '25px',

                    }}>
                        {String(storeName)}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        onCloseDialog();
                    }}>キャンセル</Button>
                    <Button onClick={() => {
                        updateData();
                    }}>OK</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={successDialogFlag} onClose={onCloseDialog}>
                <DialogTitle>成功</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        申請を送信しました
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        onCloseDialog();
                        navigate("/partTimeHome");
                    }}>OK</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}