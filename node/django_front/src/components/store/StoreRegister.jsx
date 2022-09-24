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
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
    const [stores, setStores] = React.useState()
    const [selectedItem, setSelectedItem] = React.useState('')
    const [store_name ,setStore_name] = React.useState('')
    const [address ,setAddress] = React.useState('')
    const [phone ,setPhone] = React.useState('')
    const [store_ID ,setStore_ID] = React.useState('')
    const [store_name_error ,setStore_name_error] = React.useState(false)
    const [address_error ,setAddress_error] = React.useState(false)
    const [phone_error ,setPhone_error] = React.useState(false)
    const [phone_error_message ,setPhone_error_message] = React.useState('')
    const [store_ID_error ,setStore_ID_error] = React.useState(false)
    const [store_ID_error_message ,setStore_ID_error_message] = React.useState('')
    const phonePattern = /^0[-0-9]{9,12}$/;
    const onOpenDialog = (name) => {
        setSelectedItem(name)
    }

    const onCloseDialog = () => {
        setSelectedItem('')
    }

    React.useLayoutEffect(() => {//ページを表示する前にストアのデータベースを持ってくる
      axios
        .get('http://localhost:8000/api/store/',{
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`, // ここを追加
            }
        })
        .then(res=>{setStores(res.data.map((obj) => obj.store_ID));// 持ってきたオブジェクトからstore_IDだけの配列にする。それをstoresに代入
                  console.log(stores);
                })
        .catch(err=>{console.log(err);});
    }, []);
    
    const changeStoreFK = (value) => {
      console.log('change関数実行！')
      axios
        .patch('http://localhost:8000/api-auth/users/me/',
            {
              store_FK: value,
              is_store: true
            } //変更したいキーと値
        ,{
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`, 
            }
        })
        .then(res=>{
                    console.log(res.data);})
        .catch(err=>{console.log(err);});
    };

    const changeData = () => { //バックエンドにデータを送り、データベースにデータを作成する関数
      let storeID;
      axios //店舗情報を送信
      .post('http://localhost:8000/api/store/',
          {
            store_name: store_name,
            address: address,
            phone: phone,
            store_ID: store_ID,
          }
      ,{
          headers: {
              'Content-Type': 'application/json', 
              'Authorization': `JWT ${localStorage.getItem('access')}`,
          }
      })
      .then(res=>{
        storeID = res.data;
        console.log(storeID.id);
        console.log('今から更新します')
        changeStoreFK(storeID.id);
      })
      .catch(err=>{console.log(err);})
    }

    const formValidation = () => {
      if(store_name == '') setStore_name_error(true);
      else setStore_name_error(false);
  
      if(phone == ''||!phonePattern.test(phone)) {
        setPhone_error(true);
        setPhone_error_message('正しい電話番号を入力してください');
      }
      else {
        setPhone_error(false);
        setPhone_error_message('');
      }

      if(address == '') setAddress_error(true);
      else setAddress_error(false);
  
      if(store_ID==""){
        setStore_ID_error(true);
        setStore_ID_error_message('');
      }else if(stores.includes(store_ID)){
        setStore_ID_error(true);
        setStore_ID_error_message("このIDはすでに使用されています");
      }else {
        setStore_ID_error(false);
        setStore_ID_error_message('');
      }
  
      if(store_name==""||store_ID==""||phone==""||address==""||!phonePattern.test(phone)||stores.includes(store_ID)) return(false);
      else return(true);
    }

    if (!stores) return null; //storeステートにデータが入るまでnullを返し続ける
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
                店舗登録
              </Typography>
            </Grid>
          </Grid>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>       
              <Grid item component="h3" sx={{ mr: 12 }}>
                <Typography component="h2">
                店舗情報
                </Typography>
              </Grid>
              <Grid item xs={12} >
                <TextField
                  error={store_name_error}
                  required
                  fullWidth
                  id="storeName"
                  label="店舗名"
                  name="storeName"
                  onChange={(e) => setStore_name(e.target.value)}
                  autoComplete="store-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={phone_error}//空欄かつ、電話番号の形式でないものはエラー
                  required
                  fullWidth
                  id="phoneNumber"
                  label="店舗電話番号"
                  name="phoneNumber"
                  helperText={phone_error_message}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="phone-number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                error={address_error}
                  required
                  fullWidth
                  id="address"
                  label="店舗住所"
                  name="address"
                  onChange={(e) => setAddress(e.target.value)}
                  autoComplete="address"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={store_ID_error}//空欄かつ、データベースから取ってきたものと一致した場合エラー
                  required
                  fullWidth
                  id="storeID"
                  label="店舗ID"
                  name="storeID"
                  helperText={store_ID_error_message}
                  onChange={(e) => setStore_ID(e.target.value)}
                  autoComplete="storeID"
                />
              </Grid>
              <Grid sx={{ ml: 2, mt: 2}}>
                <Link onClick={() => onOpenDialog("term")}>
                  利用規約
                </Link>
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                if(formValidation()){
                changeData();
              }}} 
            >
              店舗を登録
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