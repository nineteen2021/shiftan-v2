import * as React from 'react';
import axios from 'axios';
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
import SimpleNavbar from '../function/SimpleNavbar';
import { Link as routerLink } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Terms from '../function/Terms';

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

export default function PartTimeRegister() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const [last_name ,setLast_name] = React.useState('')
  const [first_name ,setFirst_name] = React.useState('')
  const [email ,setEmail] = React.useState('')
  const [phone_number ,setPhone_number] = React.useState('')
  const [password ,setPassword] = React.useState('')
  const [re_password ,setRe_password] = React.useState('')
  const [selectedItem, setSelectedItem] = React.useState('')

    const onOpenDialog = (name) => {
        setSelectedItem(name)
    }

    const onCloseDialog = () => {
        setSelectedItem('')
    }

    const changeData = () => { //PATCHを利用しデータベースの値を変更する関数
      axios
      .post('http://localhost:8000/api-auth/users/',
          {
            username: email,
            email: email,
            first_name: first_name,
            last_name: last_name,
            phone: phone_number,
            password: password,
            re_password: re_password,
          } //変更したいキーと値
      ,{
          headers: {
              'Content-Type': 'application/json', 
          }
      })
      .then(res=>{console.log(res.data);})
      .catch(err=>{console.log(err);});
  }

  return (
    <>
    <SimpleNavbar/>
      <Container component="main" maxWidth="xs" sx={{mb:'80px'}}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Grid container justifyContent="flex-start">
            <Grid item sx={{ mt: 2 }}>
              <Typography component="h1" variant="h5">
                アルバイトアカウント作成
              </Typography>
            </Grid>
          </Grid>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="family-name"
                  name="lastName"
                  required
                  fullWidth
                  id="lastName"
                  label="姓"
                  onChange={(e) => setLast_name(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="firstName"
                  label="名"
                  name="firstName"
                  onChange={(e) => setFirst_name(e.target.value)}
                  autoComplete="given-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="メールアドレス"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="電話番号"
                  name="phoneNumber"
                  onChange={(e) => setPhone_number(e.target.value)}
                  autoComplete="phoneNumber"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="パスワード"
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}
              >
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="パスワード（確認のため再入力してください）"
                  type="password"
                  id="password"
                  onChange={(e) => setRe_password(e.target.value)}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid sx={{ ml: 2, mt: 2}}>
                <Link onClick={() => onOpenDialog("term")}>
                  利用規約
                </Link>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="利用規約に同意する"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              component={routerLink}
              onClick={changeData()}
              to="/partTimeHome"
            >
              アカウントを作成
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link 
                component={routerLink}
                to="/login"
                variant="body2"
                >
                  すでにアカウントを持っている方はこちら
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      <Dialog open={selectedItem === "term"}
              onClose={onCloseDialog}
              scroll="paper"
              fullWidth="true"
              maxWidth="md"
              sx={{mb:'60px'}}
      >
        <DialogTitle>利用規約</DialogTitle>
        <DialogContent>
            <DialogContentText>
                
            </DialogContentText>
                <Terms/>
            </DialogContent>
        <DialogActions>
            <Button onClick={onCloseDialog}>OK</Button>
        </DialogActions>
      </Dialog>
  </>
  );
}