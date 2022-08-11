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
    const [selectedItem, setSelectedItem] = React.useState('')
    const [store_name ,setStore_name] = React.useState('')
    const [address ,setAddress] = React.useState('')
    const [phone ,setPhone] = React.useState('')
    const [store_ID ,setStore_ID] = React.useState('')
    const is_manager = true
    const onOpenDialog = (name) => {
        setSelectedItem(name)
    }

    const onCloseDialog = () => {
        setSelectedItem('')
    }

    const changeData = () => { //バックエンドにデータを送り、データベースにデータを作成する関数
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
      .then(res=>{console.log(res.data);})
      .catch(err=>{console.log(err);});
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
          <Box component="form" noValidate onSubmit={changeData} sx={{ mt: 3 }}>
            <Grid container spacing={2}>       
              <Grid item component="h3" sx={{ mr: 12 }}>
                <Typography component="h2">
                店舗情報登録
                </Typography>
              </Grid>
              <Grid item xs={12} >
                <TextField
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
                  required
                  fullWidth
                  id="phoneNumber"
                  label="店舗電話番号"
                  name="phoneNumber"
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="phone-number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
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
                  required
                  fullWidth
                  id="storeID"
                  label="店舗ID"
                  name="storeID"
                  onChange={(e) => setStore_ID(e.target.value)}
                  autoComplete="storeID"
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