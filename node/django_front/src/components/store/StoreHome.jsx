import * as React from 'react';
import axios from 'axios';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import StoreShiftList from './StoreShiftList';
import { Link as routerLink, Navigate } from 'react-router-dom'

const shifts = ['1月前半シフト','1月後半シフト','2月前半シフト','2月前半シフト','3月前半シフト','3月後半シフト'];

export default function StoreHome(){
  const [users, setUsers] = useState(null)
  const [fk, setFK] = useState(null)
  const [ranges, setRanges] = useState(null)
  const navigate = useNavigate();
  useLayoutEffect(() => {
    let store_FK;
    axios
        .get('http://localhost:8000/api-auth/users/me/',{
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`, // ここを追加
            }
        })
        .then(res=>{setUsers(res.data);
                    store_FK = res.data.store_FK;
                    setFK(store_FK)
                    console.log(res.data);
                    axios
                    .get('http://localhost:8000/api/shift_range/?store_FK='+store_FK,{
                        headers: {
                            'Authorization': `JWT ${localStorage.getItem('access')}`,
                        }
                    })
                    .then(res=>{setUsers(res.data);
                                console.log(res.data);
                                setRanges(res.data);
                            })
                    .catch(err=>{
                      console.log(err);
                      axios
                      .get('http://localhost:8000/api/shift_range/?store_FK='+store_FK,{
                          headers: {
                              'Authorization': `JWT ${localStorage.getItem('access')}`,
                          }
                      })
                      .then(res=>{setUsers(res.data);
                                  console.log(res.data);
                                  setRanges(res.data);
                              })
                      .catch(err=>{
                        console.log(err);
                        setRanges([])
                      });
                    });
                })
        .catch(err=>{console.log(err);});
  }, []);
  if (!users || !ranges) return null; //処理が実行されていないときでもとりあえずnullを返すことでエラー回避
  return(
    <div>
      {(() => {
          // アルバイトアカウントだった時はじく
          if (users.is_manager === false) {
            return navigate("/*")
          }
          else if (!fk) {
            console.log(fk)
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
                      <p>お使いのアカウントはまだ店舗<br/>
                      登録をお済みではありません。<br/>店舗登録ボタンを押して店舗を
                      <br/>作成しましょう！
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
          } else if(ranges.length === 0){
            return(
              <Grid container spacing={0} alignItems='center' justifyContent='center' direction="column" style={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                  <AddBusinessIcon fontSize="large" sx={{ fontSize: 80, color: '#707070' }}/>
                </Grid>
                <Grid item xs={12}>
                    <p><Typography fontSize={24}><font color='#707070'>シフト範囲が作成されていません</font></Typography></p>
                </Grid>
                <Grid item xs={12}>
                    <font color='#707070' align='center'>
                      <p>シフト範囲が作成されていないようです。<br/>
                      シフト範囲を作成して、従業員にシフト希望<br/>を提出してもらいましょう!
                      </p>
                    </font>
                </Grid>
                <Grid item xs={12}>
                    <Box pt={3}>
                        <Button variant="outlined"
                          component={routerLink}
                          to="/makeShift"
                        >
                            シフト範囲を作成
                        </Button>
                    </Box>
                </Grid>   
              </Grid>
            )
          }else {
            return(
              <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
                <Typography fontSize={20}>シフト一覧</Typography>
                {ranges.map((val) => 
                  <StoreShiftList shiftName={val.shift_name} fk={val.id} />
                )} 
              </Container>
            )
          }
        })()}
    </div>
  )
}