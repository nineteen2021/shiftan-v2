import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate, useLocation, Link as routerLink } from "react-router-dom"

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

export default function ChangePassword() {
    const navigate = useNavigate()
    const search = useLocation().search;
    const query2 = new URLSearchParams(search);
    const [error, setError] = React.useState(false);
    const [re_error, setRe_error] = React.useState(false);
    const [current_error, setCurrent_error] = React.useState(false);
    const [current_error_detail, setCurrent_error_detail] = React.useState(false);
    const [current_field_error, setCurrent_field_error] = React.useState(false);
    const [new_field_error, setNew_field_error] = React.useState(false);
    const [password, setPassword] = React.useState("");
    const [re_password, setRe_password] = React.useState("");
    const [current_password, setCurrent_password] = React.useState("");
    const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9.?/-]{8,24}$/;

    const resetPassword = () => {
        axios
            .post(process.env.REACT_APP_API_URL + '/api-auth/users/set_password/',
                {
                    new_password: password,
                    re_new_password: re_password,
                    current_password: current_password
                } //変更したいキーと値
                , {
                    headers: {
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                        'Content-Type': 'application/json',
                    }
                })
            .then(res => {
                console.log(res.data);
                navigate("/finishResetPassword");
            })
            .catch(err => {
                console.log(err);
                setCurrent_error(true);
                if(String(err.response.data.new_password)=='このパスワードは email_address と似すぎています。'){
                    setCurrent_error_detail('新規パスワードはメールアドレスと似すぎています。')
                    setNew_field_error(true);
                    setCurrent_field_error(false);
                }else if(String(err.response.data.new_password)=='このパスワードは ユーザー名 と似すぎています。'){
                    setCurrent_error_detail('新規パスワードはユーザー名と似すぎています。')
                    setNew_field_error(true);
                    setCurrent_field_error(false);
                }else if(String(err.response.data.current_password)=='Invalid password.'){
                    setCurrent_error_detail('現在のパスワードが一致しません。')
                    setCurrent_field_error(true);
                    setNew_field_error(false);
                }
            });
    }

    const handleSubmit = () => {

        if (password == '' || !passwordPattern.test(password)) {
            setError(true);
            setNew_field_error(true);
        } else {
            setError(false);
            setNew_field_error(false);
        }

        if (password === re_password) {
            //もしパスワードと再確認用のパスワードが一致したら
            console.log("一致");
            setRe_error(false);
            setNew_field_error(false);
        } else {
            //もしパスワードと再確認用のパスワードが一致しなかったら
            setRe_error(true);
            setNew_field_error(true);
            console.log("不一致");
        }

        if (password == '' || !passwordPattern.test(password) || password != re_password) {
            return (false)
        } else {
            return (true)
        }
    };

    return (
        <>
            <Collapse in={error}>
                <Alert severity="error">パスワードは8文字以上で大文字と数字を含める必要があります</Alert>
            </Collapse>
            <Collapse in={re_error}>
                <Alert severity="error">パスワードが一致しません</Alert>
            </Collapse>
            <Collapse in={current_error}>
                <Alert severity="error">{String(current_error_detail)}</Alert>
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
                    現在のパスワード、再設定するパスワードを入力してください
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="現在のパスワード"
                            name="password"
                            type="password"
                            error={current_field_error}
                            autoFocus
                            onChange={(e) => setCurrent_password(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="新規パスワード"
                            name="password"
                            type="password"
                            error={new_field_error}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password2"
                            label="新規パスワード(再確認)"
                            type="password"
                            error={new_field_error}
                            id="password2"
                            onChange={(e) => setRe_password(e.target.value)}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => {
                                console.log(handleSubmit());
                                if (handleSubmit()) {
                                    resetPassword();
                                }
                            }}
                        >
                            パスワードを再設定
                        </Button>
                        <Link
                            component={routerLink}
                            to="/passwordSentMail"
                            variant="body2">
                            {"パスワードを忘れた場合"}
                        </Link>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 16, mb: 4 }} />
            </Container>
        </>
    );
}