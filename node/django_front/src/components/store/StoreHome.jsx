import * as React from 'react';
import axios from 'axios';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import StoreShiftList from './StoreShiftList';
import { Link as routerLink } from 'react-router-dom'

const shifts = ['1月前半シフト','1月後半シフト','2月前半シフト','2月前半シフト','3月前半シフト','3月後半シフト'];

export default function StoreHome(){
  const [users, setUsers] = useState(null)
  useLayoutEffect(() => {
    axios
        .get('http://localhost:8000/api-auth/users/me/',{
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`, // ここを追加
            }
        })
        .then(res=>{setUsers(res.data);
                    console.log(res.data);
                })
        .catch(err=>{console.log(err);});
  }, []);
  if (!users) return null; //処理が実行されていないときでもとりあえずnullを返すことでエラー回避
  return(
    <div>
      {(() => {
          if (!users.store_FK) {
            return(
              <Grid container spacing={0} alignItems='center' justifyContent='center' direction="column" style={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                  <AddBusinessIcon fontSize="large" sx={{ fontSize: 80, color: '#707070' }}/>
                </Grid>
                <Grid item xs={12}>
                    <p><Typography fontSize={24}><font color='#707070'>店舗を登録しましょう！</font></Typography></p>
                </Grid>
                <Grid item xs={12}>
                    <font color='#707070' align='center'>
                      <p>お使いのアカウントはまだ<br/>
                      店舗登録をお済ではありません。<br/>店舗登録ボタンを押して
                      <br/>店舗を作成しましょう！
                      </p>
                    </font>
                </Grid>
                <Grid item xs={12}>
                    <Box pt={3}>
                        <Button variant="outlined"
                          component={routerLink}
                          to="/storeRegister"
                        >
                            店舗登録
                        </Button>
                    </Box>
                </Grid>   
              </Grid>
            )
          } else {
            return(
              <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
                <Typography fontSize={20}>シフト一覧</Typography>
                {shifts.map((val) => 
                  <StoreShiftList shiftName={val} />
                )} 
              </Container>
            )
          }
        })()}
    </div>
  )
}