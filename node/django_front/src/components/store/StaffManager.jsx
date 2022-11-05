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
    const handleClickOpen = () => {
        setOpen(true);
        
    };
    const handleClose = (value) => {
        setOpen(false);
    };

    const [pos, setPos] = React.useState([
      {id:1, name:"未設定", color:'#000000'},
      {id:2, name:"厨房", color:'#00ff00'},
      {id:3, name:"ホール", color:'#ff0000'},
    ]);

    const [rows, setRows] = React.useState([
      {id:1,name:'山田太郎', position:2},
      {id:2,name:'山田太郎', position:2},
      {id:3,name:'山田太郎', position:2},
      {id:4,name:'山田太郎', position:2},
      {id:5,name:'山田太郎', position:3},
      {id:6,name:'山田太郎', position:3},
      {id:7,name:'山田太郎', position:3},
    ]);

  return (
    <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
      <Typography fontSize={20} sx={{ ml:-22 }}>スタッフ管理</Typography>
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
                        <TableCell align="left"><b>ポジション名</b></TableCell>
                        <TableCell align="left"><b>色</b></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row, index) => (
                        <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row" align="left">
                            <font size="5">{row.name}</font>
                        </TableCell>
                        <TableCell align="left">
                            <FormControl variant="standard" sx={{ mt: 1, mb: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                                <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                defaultValue={row.position}
                                onChange={(event, row) => {
                                  const newRow = rows;
                                  console.log(row);
                                  newRow[index].position = event.target.value;
                                  console.log(newRow);
                                  setRows(newRow);
                                }}
                                label="ポジション"
                                >
                                {pos.map((poss, index) => (
                                  <MenuItem key={poss.id} value={poss.id}>{poss.name}</MenuItem>
                                ))}
                                </Select>
                            </FormControl>

                        </TableCell>
                        <TableCell align="left"><Typography variant="h4" style={{color: pos[(row.position)-1].color}}>■</Typography></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </Grid>
            <Grid item sx={{marginLeft: '15em'}}>
                <Button variant="contained" component={routerLink} to="/certification" sx={{ml: 2}}>認証</Button>
                <Button variant="contained" sx={{ml: 2}} onClick={handleClickOpen}>ポジション編集</Button>
                <Button variant="contained" sx={{ml: 2}}>保存</Button>
                <PositionDialog
                    open={open}
                    onClose={handleClose}
                />
            </Grid>
        </Grid>
    </Container>
  );
}
