import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Create from '../function/endPoint/Create'
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
import lightGreen from '@mui/material/colors/lightGreen';
import { Link as routerLink } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
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


export default function Register() {
  const navigate = useNavigate()
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
    const [accept, setAccept] = React.useState(false)
    const [last_name_error, setLast_name_error] = React.useState(false)
    const [first_name_error, setFirst_name_error] = React.useState(false)
    const [email_error, setEmail_error] = React.useState(false)
    const [phome_number_error, setPhone_number_error] = React.useState(false)
    const [phome_number_error_message, setPhone_number_error_message] = React.useState('')
    const [password_error, setPassword_error] = React.useState(false)
    const [password_error_message, setPassword_error_message] = React.useState('')
    const [re_password_error, setRe_password_error] = React.useState(false)
    const [re_password_error_message, setRe_password_error_message] = React.useState('')
    const is_manager = true
    const emailPattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;
    const phonePattern = /^0[-0-9]{9,12}$/;
    const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9.?/-]{8,24}$/;

    const onOpenDialog = (name) => {
        setSelectedItem(name)
    }

    const onCloseDialog = () => {
        setSelectedItem('')
    }
    
    //チェックボックスの値に応じてstateを切り替え
    const changeAccept = (value) => {
      if(value === false) {
        setAccept(true);
      }else{
        setAccept(false);
      }
    }

    const changeData = () => { //バックエンドにデータを送り、データベースにデータを作成する関数
      axios //ユーザー情報を送信
      .post('http://localhost:8000/api-auth/users/',
          {
            username: email,
            email: email,
            first_name: first_name,
            last_name: last_name,
            phone: phone_number,
            password: password,
            re_password: re_password,
            is_manager: is_manager,
          }
      ,{
          headers: {
              'Content-Type': 'application/json', 
          }
      })
      .then(
        res=>{console.log(res.data);
      })
      .catch(err=>{console.log(err);});
    }

    const formValidation = () => {
      if(last_name == '') setLast_name_error(true);
      else setLast_name_error(false);
  
      if(first_name == '') setFirst_name_error(true);
      else setFirst_name_error(false)
  
      if(email == ''||!emailPattern.test(email)) setEmail_error(true);
      else setEmail_error(false);
  
      if(phone_number == ''||!phonePattern.test(phone_number)) {
        setPhone_number_error(true);
        setPhone_number_error_message('正しい電話番号を入力してください');
      }
      else {
        setPhone_number_error(false);
        setPhone_number_error_message('');
      }
  
      if(password == ''||!passwordPattern.test(password)){
        setPassword_error(true);
        setPassword_error_message("パスワードは8文字以上で大文字と数字を含める必要があります");
      }
      else {
        setPassword_error(false);
        setPassword_error_message('');
      }
  
      if(re_password == ''||password != re_password) {
        setRe_password_error(true);
        setRe_password_error_message("パスワードが一致しません");
      }
      else {
        setRe_password_error(false);
        setRe_password_error_message('');
      }
  
      if(last_name == ''||first_name == ''||email == ''||!emailPattern.test(email)||phone_number == ''||!phonePattern.test(phone_number)||password == ''||!passwordPattern.test(password)||re_password == ''||password != re_password ) return(false);
      else return(true);
    }

  return (
    <>
    <SimpleNavbar/>
    <Grid container justifyContent="flex-start" >
      <Grid item sx={{ mb: 2 }}>
        {/* <Typography component="h1" variant="h5">
        店舗アカウント登録
        </Typography> */}
      </Grid>
    </Grid>
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
                店舗アカウント作成
              </Typography>
            </Grid>
          </Grid>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item>
              <Typography component="h2" sx={{ mr: 6 }}>
              店舗管理者情報登録
              </Typography>
            </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={last_name_error}
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
                  error={first_name_error}
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
                  error={email_error}//空欄かつメールアドレスの形式でないときにエラー
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
                  error={phome_number_error}//空欄かつ、電話番号の形式でないものはエラー
                  required
                  fullWidth
                  id="phoneNumber"
                  label="電話番号"
                  name="phoneNumber"
                  helperText={phome_number_error_message}
                  onChange={(e) => setPhone_number(e.target.value)}
                  autoComplete="phoneNumber"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={password_error}//空欄かつ、パスワードの正規表現に一致していなかったらエラー
                  required
                  fullWidth
                  name="password"
                  label="パスワード"
                  type="password"
                  id="password"
                  helperText={password_error_message}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}
              sx={{ mb:5 }}
              >
                <TextField
                  error={re_password_error}
                  required
                  fullWidth
                  name="password"
                  label="パスワード（確認のため再入力してください）"
                  type="password"
                  id="password"
                  helperText={re_password_error_message}
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
                  control={<Checkbox value="allowExtraEmails" color="primary" onChange={(e) => changeAccept(!e.target.checked)} />}
                  label="利用規約に同意する"
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                if(formValidation()){
                changeData();
                navigate("/finishRegister?email="+email);
              }}} 
              sx={{ mt: 3, mb: 2 }}
              disabled={ !accept }
              //チェックボックスにチェックが入っていない場合グレーアウト
            >
              店舗アカウントを登録
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