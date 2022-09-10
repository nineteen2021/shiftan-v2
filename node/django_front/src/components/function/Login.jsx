import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SimpleNavbar from './SimpleNavbar'
import NewAccountButton from './NewAccountButton';
import { Link as routerLink } from 'react-router-dom'
import axios from 'axios';

import { useAuth } from "../../hooks/useAuth";


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        しふたん
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const auth = useAuth();
  // console.log(auth);
  const [users, setUsers] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    // テキストボックスからメールアドレスとパスワードを取得
    const email = data.get("email");
    const password = data.get("password");

    // eslint-disable-next-line no-console
    console.log({ email, password });
    
    // useAuth.jsのログイン関数を呼び出してログイン
    auth.login(email, password).then((res) => {
      let userMe;
      if(res === true) {
        const distribute = new Promise((resolved, rejected) => {
          (() => {
            axios
            .get('http://localhost:8000/api-auth/users/me/',{
              headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`, // ここを追加
              }
            })
            .then(res=>{
              setUsers(res.data);
              userMe=res.data
              console.log("user/me取得")
              console.log(res.data);
            })
            .then(res=>{
              console.log("is_manager判別")
              console.log(userMe.is_manager)
              if(userMe.is_manager === true) {
                console.log("店長アカウントです")
                navigate("/")
              }
              else if (userMe.is_manager === false) {
                console.log("アルバイトアカウントです")
                navigate("/partTimeHome")
              }
              else {
                console.log("アカウント振り分けでエラーが起こりました")
              }
            })
            .catch(err=>{console.log(err);});
          })();
        })
      }
    })
  };

  return (
    <>
      {/* ログインしている場合はリダイレクト */}
      {/* {auth.accessToken != "undefined" && <Navigate to="/" />} */}
      <SimpleNavbar/>
      <Container component="main" maxWidth="xs">

        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="メールアドレス"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="パスワード"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ログイン
            </Button>
            <Grid container>
              <Grid item>
                <Link
                component={routerLink}
                to="/sentPasswordMail"
                variant="body2">
                  {"パスワードを忘れた場合"}
                </Link>
              </Grid>
            </Grid>
            <Grid container sx={{ mt: 3}} >
              <Grid item xs={12} textAlign="center">
                <Typography>アカウント作成がまだの方はこちらから</Typography>
              </Grid>
            </Grid>
            <NewAccountButton />
          </Box>
        </Box>
        <Copyright sx={{ mt: 16, mb: 4 }} />
      </Container>
    </>
  );
}