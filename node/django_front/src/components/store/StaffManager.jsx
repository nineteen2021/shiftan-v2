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
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import PositionTable from './Position';
import Container from '@mui/material/Container';

function PositionDialog(props) {
    const { onClose, selectedValue, open } = props;
  
    const handleClose = () => {
      onClose(selectedValue);
    };
    const [users, setUsers] = useState(null)
    const navigate = useNavigate();
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
  if (!users) return null;
  // アルバイトアカウントだった時はじく
  else if (users.is_manager === false) {
    return navigate("/*")
  }
    //ポジション編集画面のレイアウト
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>ポジション編集</DialogTitle>
        <PositionTable/>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    );
}

PositionDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function StaffManager() {
  //ポジション編集画面のポップアップ
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = React.useState(null);
  const [positions, setPositions] = React.useState(null);
  const handleClickOpen = () => {
      setOpen(true);
      
  };
  const handleClose = (value) => {
      setOpen(false);
  };

  // ポジション名が未設定の場合を考慮する
  // 197、199行目のvalueを引数にとる
  const positionChange = (position_FK, id) => {
    if(position_FK=='未設定') {
      axios.patch('http://localhost:8000/api/user/'+id+'/',{
        group_FK: null
      }
      ,{
        headers: {
          'Authorization': `JWT ${window.localStorage.getItem('access')}`
        }
      })
      .then((res)=>{console.log(res.data);})
      .catch((err)=>{console.log(err);})
    }
    else {
      axios.patch('http://localhost:8000/api/user/'+id+'/',{
        group_FK: position_FK
      }
      ,{
        headers: {
          'Authorization': `JWT ${window.localStorage.getItem('access')}`
        }
      })
      .then((res)=>{console.log(res.data);})
      .catch((err)=>{console.log(err);})
    }
  }

  const checkGroupFK = (group_FK) => {
    if (group_FK == null) return '未設定';
    else return group_FK;
  }

  useLayoutEffect(() => {
    let store_FK;
    axios.get('http://localhost:8000/api-auth/users/me/',{
      headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`, // ここを追加
      }
    })
    .then(res=>{
      store_FK = res.data.store_FK;
      console.log(store_FK);
      axios.get('http://localhost:8000/api/user/?is_store=true&store_FK='+store_FK,{
        headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`, // ここを追加
        }
      })
      .then(res=>{
        setUsers(res.data);
        console.log(res.data);
      })
      .catch(err=>{
        console.log(err);
      })
      axios.get('http://localhost:8000/api/group/?store_FK='+store_FK,{
        headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
      })
      .then(res=>{
        setPositions(res.data);
        console.log(res.data);
      })
      .catch(err=>{console.log(err);})
    })
    .catch(err=>{
      console.log(err);
    })
  }, [open])

  if(!users || !positions) return null;
  return (
    <Container component="main" maxWidth="md">
      <Typography sx={{fontSize:20, position:'absolute', left:'100px'}}>スタッフ管理</Typography>
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt:"50px",
          }}
          spacing={2}
        >
            <Grid item>
                <TableContainer component={Paper} sx={{ minWidth:  550 }}>
                <Table  aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="left"><b>名前</b></TableCell>
                        <TableCell align="left"><b>ポジション名</b></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {users.map((user) => (
                        <TableRow
                        key={user.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row" align="left">
                            <font size="5">{user.last_name + ' ' + user.first_name}</font>
                        </TableCell>
                        <TableCell align="left">
                            <FormControl variant="standard" sx={{ mt: 1, mb: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                                <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                defaultValue={checkGroupFK(user.group_FK)}
                                onChange={(event) => {
                                  positionChange(event.target.value, user.id);
                                }}
                                label="ポジション"
                                >
                                  <MenuItem key={null} value='未設定'>未設定</MenuItem>
                                {positions.map((position) => (
                                  <MenuItem key={position.id} value={position.id}>{position.group_name}</MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </Grid>
            <Grid item sx={{ml: '15em', mt: '15px'}}>
                <Button variant="contained" component={routerLink} to="/certification" sx={{ml: 2}}>認証</Button>
                <Button variant="contained" sx={{ml: 2}} onClick={handleClickOpen}>ポジション編集</Button>
                <PositionDialog
                    open={open}
                    onClose={handleClose}
                />
            </Grid>
        </Grid>
    </Container>
  );
}
