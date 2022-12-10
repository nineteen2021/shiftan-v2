import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SimpleNavbar from './SimpleNavbar';
import { useNavigate } from "react-router-dom"

const emailPattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;

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

export default function PasswordSentMail() {
  const navigate = useNavigate()
  const [email ,setEmail] = React.useState('')
  const [email_error ,setEmail_error] = React.useState(false)

  const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      // eslint-disable-next-line no-console

  };

  const formValidation = () => {
    if(email == ''||!emailPattern.test(email)){
      setEmail_error(true);
      return(false);
    } else {
      setEmail_error(false);
      return(true);
    }
  }

    const submitEmail = () => {
      axios
      .post(process.env.REACT_APP_API_URL + '/api-auth/users/reset_password/',
      {
        email: email
      },
      {
          headers: {
              'Content-Type': 'application/json', // ここを追加
          }
      })
      .then(res=>{
          console.log(res.data);
      })
      .catch(err=>{console.log(err);});
    }

  return (
    <>
      <SimpleNavbar />
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
          パスワードを再設定したいアカウントのメールアドレスを入力してください。パスワードを再設定するためのリンクをメールへ送信します。
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="メールアドレス"
              name="email"
              type="email"
              autoFocus
              error={email_error}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              // component={routerLink}
              // to="/sentPasswordMail"
              onClick={() => {
                if(formValidation()){
                  submitEmail();
                  navigate("/sentPasswordMail?email="+email);
                }}}
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