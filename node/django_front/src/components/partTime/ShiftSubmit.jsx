import * as React from 'react';
import {useState, useLayoutEffect} from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TimePicker from '@mui/lab/TimePicker';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import ja from 'date-fns/locale/ja'

function createData(startTime, endTime) {
  let isDisable = false
  return { startTime, endTime, isDisable };
}

export default function ShiftSubmit() {
  const [rows, setRows] = React.useState([
    createData(new Date(2011, 0, 1, 0, 0, 0, 0), new Date(2011, 0, 1, 0, 0, 0, 0)),
    createData(new Date(2011, 0, 1, 0, 0, 0, 0), new Date(2011, 0, 1, 0, 0, 0, 0)),
    createData(new Date(2011, 0, 1, 0, 0, 0, 0), new Date(2011, 0, 1, 0, 0, 0, 0)),
    createData(new Date(2011, 0, 1, 0, 0, 0, 0), new Date(2011, 0, 1, 0, 0, 0, 0)),
    createData(new Date(2011, 0, 1, 0, 0, 0, 0), new Date(2011, 0, 1, 0, 0, 0, 0)),
  ]);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const onCloseDialog = () => {
    setOpen(false);
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
  // 店長アカウントだったときはじく
  else if (users.is_manager === true) {
    return navigate("/*")
  }
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center "
        spacing={5}
      >
        <Grid item>
          <Typography sx={{ mb: 1 }}>勤務可能な日付にチェックを入れ、シフトを提出してください</Typography>
          <TableContainer component={Paper} >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>日付</TableCell>
                  <TableCell align="right">開始時刻</TableCell>
                  <TableCell align="right">終了時刻</TableCell>
                  <TableCell align="right">勤務</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow
                    key={row.date}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <font size="4">{String(row.startTime.getMonth()+1)+ "月" + String(row.startTime.getDate()) + "日"}</font>
                    </TableCell>
                    <TableCell align="right">
                      <LocalizationProvider dateAdapter={AdapterDateFns} locale={ja}>
                        <TimePicker
                          label="開始"
                          value={row.startTime}
                          disabled={row.isDisable}
                          onChange={(newValue) => {
                            const newRow = rows.slice(0, rows.length); //配列のコピーを取るconst newRow=rowsでは参照渡しとなるのでNG
                            newRow[index].startTime = newValue; //コピーした配列を変更する
                            setRows(newRow); //コピーした配列をsetStateする
                          }}
                          inputFormat='HH:mm'
                          mask='__:__'
                          renderInput={(params) => <TextField sx={{ maxWidth: 150 }} {...params} />}
                        />
                      </LocalizationProvider>
                    </TableCell>
                    <TableCell align="right">
                      <LocalizationProvider dateAdapter={AdapterDateFns} locale={ja}>
                        <TimePicker
                          label="終了"
                          value={row.endTime}
                          disabled={row.isDisable}
                          onChange={(newValue) => {
                            const newRow = rows.slice(0, rows.length); //配列のコピーを取るconst newRow=rowsでは参照渡しとなるのでNG
                            newRow[index].endTime = newValue; //コピーした配列を変更する
                            setRows(newRow); //コピーした配列をsetStateする
                          }}
                          inputFormat='HH:mm'
                          mask='__:__'
                          renderInput={(params) => <TextField sx={{ maxWidth: 150 }} {...params} />}
                        />
                      </LocalizationProvider>
                    </TableCell>
                    <TableCell align="right">
                      <Checkbox
                        defaultChecked
                        onChange={(e) => {
                          const newRow = rows.slice(0, rows.length); //配列のコピーを取るconst newRow=rowsでは参照渡しとなるのでNG
                          newRow[index].isDisable = !e.target.checked;//コピーした配列を変更する
                          setRows(newRow);//コピーした配列をsetStateする
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item sx={{ marginLeft: '28em' }}>
          <Button onClick={handleClickOpen} variant="contained" sx={{ ml: 2 }}>保存</Button>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={onCloseDialog}>
        <DialogTitle>提出</DialogTitle>
        <DialogContent>
          <DialogContentText>
            以下の内容で提出しますか？
          </DialogContentText>
          {rows.filter(data => data.isDisable === false).map((row, index) => <li key={row.date}>{row.date}　{row.startTime}～{row.endTime}</li>)}
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseDialog}>キャンセル</Button>
          <Button onClick={onCloseDialog}>はい</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
