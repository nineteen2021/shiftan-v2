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

export default function ResetPassword() {
  const navigate = useNavigate()
  const search = useLocation().search;
  const query2 = new URLSearchParams(search);
  const [error, setError] = React.useState(false);
  const [re_error, setRe_error] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [re_password, setRe_password] = React.useState("");
  const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9.?/-]{8,24}$/;

  const resetPassword = () => {
    axios
    .post(process.env.REACT_APP_API_URL + '/api-auth/users/reset_password_confirm/',
        {
          uid: query2.get('uid'),
          token: query2.get('token'),
          new_password: password,
          re_new_password: re_password
        } //変更したいキーと値
    ,{
        headers: {
            'Content-Type': 'application/json', 
        }
    })
    .then(res=>{console.log(res.data);})
    .catch(err=>{console.log(err);});
  }

  const handleSubmit = () => {  

    if (password == ''||!passwordPattern.test(password)){
      setError(true);
    } else {
      setError(false)
    }

    if (password === re_password) {
      //もしパスワードと再確認用のパスワードが一致したら
      console.log("一致");
      setRe_error(false);
    } else {
      //もしパスワードと再確認用のパスワードが一致しなかったら
      setRe_error(true);
      console.log("不一致");
    }

    if(password == ''|| !passwordPattern.test(password) || password != re_password){
      return(false)
    }else{
      return(true)
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
          再設定するパスワードを入力してください
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="新規パスワード"
              name="password"
              type="password"
              error={error}
              autoFocus
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password2"
              label="新規パスワード(再確認)"
              type="password"
              error={re_error}
              id="password2"
              onChange={(e) => setRe_password(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                console.log(handleSubmit());
                if(handleSubmit()){
                  resetPassword();
                  navigate("/finishResetPassword");
                }
              }}
            >
              パスワードを再設定
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 16, mb: 4 }} />
      </Container>
    </>
  );
}