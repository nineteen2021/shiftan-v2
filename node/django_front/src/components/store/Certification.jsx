import * as React from 'react';
import {useState, useLayoutEffect} from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { Link as routerLink } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'; 
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function createData(name, applicationDate) {
  return { name, applicationDate};
}

export default function Certification() {
  const [users, setUsers] = useState(null);
  const [storeFK, setStoreFK] = useState(null);
  const [untrustedUsers, setUntrustedUsers] = useState(null);
  const navigate = useNavigate();
  useLayoutEffect(() => {
    let fk;
    axios
        .get('http://localhost:8000/api-auth/users/me/',{
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`, // ここを追加
            }
        })
        .then(res=>{setUsers(res.data);
                  console.log(res.data);
                  fk=res.data.store_FK
                  setStoreFK(res.data.store_FK);
                  axios
                  .get('http://localhost:8000/api/user/?is_store=false&store_FK='+fk,{
                      headers: {
                          'Authorization': `JWT ${localStorage.getItem('access')}`, // ここを追加
                      }
                  })
                  .then(res=>{console.log('認証待ちのユーザーを取得');
                              setUntrustedUsers(res.data);
                              console.log(res.data);
                          })
                  .catch(err=>{
                    console.log('再試行');
                    axios
                    .get('http://localhost:8000/api/user/?is_store=false&store_FK='+fk,{
                        headers: {
                            'Authorization': `JWT ${localStorage.getItem('access')}`, // ここを追加
                        }
                    })
                    .then(res=>{console.log('認証待ちのユーザーを取得');
                                setUntrustedUsers(res.data);
                                console.log(res.data);
                            })
                    .catch(err=>{console.log(err);});
                  });
                })
        .catch(err=>{console.log(err);});
  }, []);

  const approval = (id) => {
    axios
    .patch('http://localhost:8000/api/user/' + id +'/',
        {
            is_store: true
        } //変更したいキーと値
    ,{
        headers: {
            // 'Authorization': `JWT ${localStorage.getItem('access')}`, 
            'Authorization': `JWT ${window.localStorage.getItem('access')}`
        }
    })
    .then(res=>{
                console.log('以下のユーザーを承認しました');
                console.log(res.data);
                axios
                    .get('http://localhost:8000/api/user/?is_store=false&store_FK='+storeFK,{
                        headers: {
                            'Authorization': `JWT ${localStorage.getItem('access')}`, // ここを追加
                        }
                    })
                    .then(res=>{console.log('認証待ちのユーザーを取得');
                                setUntrustedUsers(res.data);
                                console.log(res.data);
                            })
                    .catch(err=>{console.log(err);});
            })
    .catch(err=>{
        console.log(err);
    });
  }

  const rejection = (id) => {
    axios
    .patch('http://localhost:8000/api/user/' + id +'/',
        {
            store_FK: null
        } //変更したいキーと値
    ,{
        headers: {
            // 'Authorization': `JWT ${localStorage.getItem('access')}`, 
            'Authorization': `JWT ${window.localStorage.getItem('access')}`
        }
    })
    .then(res=>{
                console.log('以下のユーザーを拒否しました');
                console.log(res.data);
                axios
                    .get('http://localhost:8000/api/user/?is_store=false&store_FK='+storeFK,{
                        headers: {
                            'Authorization': `JWT ${localStorage.getItem('access')}`, // ここを追加
                        }
                    })
                    .then(res=>{console.log('認証待ちのユーザーを取得');
                                setUntrustedUsers(res.data);
                                console.log(res.data);
                            })
                    .catch(err=>{console.log(err);});
            })
    .catch(err=>{
        console.log(err);
    });
  }

  if (!users || !untrustedUsers) return null;
  // アルバイトアカウントだった時はじく
  else if (users.is_manager === false) {
    return navigate("/*")
  }
  else if (untrustedUsers.length == 0){
    return (
      <Grid container spacing={0} alignItems='center' justifyContent='center' direction="column" style={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
            <p><Typography fontSize={24}><font color='#707070'>申請してきたユーザーはいません</font></Typography></p>
        </Grid>
      </Grid>
    )
  }
  return (
    <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center "
        spacing={5}
    >
        <Grid item>
            <TableContainer component={Paper} sx={{ minWidth:  550 }}>
            <Table  aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="left"><b>名前</b></TableCell>
                    <TableCell align="left"></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {untrustedUsers.map((row) => (
                    <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >

                    <TableCell component="th" scope="row" align="left">
                        <font size="5">{row.last_name + ' ' + row.first_name}</font>
                    </TableCell>

                    <TableCell align="center">
                        <Button variant="contained" color="success" sx={{ml: 1}} onClick={() => approval(row.id)}>承認</Button>
                        <Button variant="contained" color="error" sx={{ml: 1}} onClick={() => rejection(row.id)}>拒否</Button>
                    </TableCell>

                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            <Grid item sx={{marginLeft: '30em', mt: '20px'}}>
              <Button variant="contained" component={routerLink} to="/staffManager" sx={{ml: 2}}>戻る</Button>
            </Grid>
        </Grid>
    </Grid>
  );
}
