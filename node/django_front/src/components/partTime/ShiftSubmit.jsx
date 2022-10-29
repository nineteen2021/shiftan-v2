import * as React from 'react';
import { useState, useLayoutEffect } from 'react'
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
import { useLocation } from 'react-router-dom';

function createData(startTime, endTime) {
  let isDisable = true
  let error = false
  return { startTime, endTime, isDisable, error };
}

export default function ShiftSubmit() {
  const [dates, setDates] = React.useState(null);
  const search = useLocation().search;
  const query2 = new URLSearchParams(search); //shift_rangeFKをquery2.get('idでもってくる')

  const [open, setOpen] = React.useState(false);
  const [successDialog, setSuccessDialog] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const onCloseDialog = () => {
    setOpen(false);
    setSuccessDialog(false);
  };
  const [users, setUsers] = useState(null)
  const [range, setRange] = useState(null)
  const navigate = useNavigate();
  useLayoutEffect(() => {
    let storeFK;
    let userFK;
    axios //ユーザーの情報を取得
      .get('http://localhost:8000/api-auth/users/me/', {
        headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
      })
      .then(res => {
        setUsers(res.data);
        console.log(res.data);
        storeFK = res.data.store_FK;
        userFK = res.data.id;
        axios //shift_rangeを取得
        .get('http://localhost:8000/api/shift_range/'+ query2.get('id') + '/', {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            }
        })
        .then(res=>{setRange(res.data);
                    console.log(res.data);
                    console.log("シフト範囲を取得");
                    let dateList = new Array(); //ここでシフト範囲分の日付の配列を作成
                    for(var d = new Date(res.data.start_date); d <= new Date(res.data.stop_date); d.setDate(d.getDate()+1)) {
                      console.log(d);
                      console.log(d.getFullYear()+'-'+(d.getMonth()+1).toString().padStart(2, "0")+'-'+d.getDate().toString().padStart(2, "0"));
                      let formatedDate = createData(new Date(d.getFullYear()+'-'+(d.getMonth()+1).toString().padStart(2, "0")+'-'+d.getDate().toString().padStart(2, "0")+"T00:00:00"), new Date(d.getFullYear()+'-'+(d.getMonth()+1).toString().padStart(2, "0")+'-'+d.getDate().toString().padStart(2, "0")+"T00:00:00"));
                      dateList.push(formatedDate);
                    }
                    console.log(dateList)
                    axios //既存のシフト希望を取得（あとから編集できるようにするため）
                    .get('http://localhost:8000/api/tmp_work_schedule/?store_FK=' + storeFK + '&user_FK=' + userFK, {
                        headers: {
                            'Authorization': `JWT ${localStorage.getItem('access')}`,
                        }
                    })
                    .then(res=>{
                      console.log(res.data)
                      for(let i = 0; i < res.data.length; i++){ //tmp_work_scheduleから持ってきたデータを反映させる
                        for(let j = 0; j < dateList.length; j++){
                          let year1 = dateList[j].startTime.getFullYear();
                          let month1 = dateList[j].startTime.getMonth() + 1;
                          let day1 = dateList[j].startTime.getDate();
                          let year2 = new Date(res.data[i].start_time).getFullYear();
                          let month2 = new Date(res.data[i].start_time).getMonth() + 1;
                          let day2 = new Date(res.data[i].start_time).getDate();
                          if(year1==year2 && month1==month2 && day1==day2){
                            dateList[j].startTime = new Date(res.data[i].start_time);
                            dateList[j].endTime = new Date(res.data[i].stop_time);
                            dateList[j].isDisable = false;
                          }
                        }
                      }
                      setDates(dateList);
                    })
                    .catch(err=>{console.log(err);});
                })
        .catch(err=>{console.log(err);});
      })
      .catch(err => { console.log(err); });
  }, []);

  const submit = () => { //シフト希望をデーターベースに反映する
    let submitDate = dates.filter(data => data.isDisable === false && data.error === false);
    let result = new Array(); //postする空の配列
    for(let i = 0; i < submitDate.length; i++){ //シフト希望をバックエンドで使われている形式に変換
      let tmp = {
        'shift_range_FK': query2.get('id'),
        'user_FK': users.id,
        'start_time':submitDate[i].startTime,
        'stop_time':submitDate[i].endTime,
      }
      result.push(tmp); //resurtに追加していく
    }
    console.log('以下をpostします');
    console.log(result);
    axios //まずは消す
      .delete('http://localhost:8000/api/tmp_work_schedule/?fk=' + query2.get('id'),
      {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `JWT ${window.localStorage.getItem('access')}`,
          }
      })
      .then(
        res=>{console.log(res.data);
        console.log('削除しました')
        axios //ユーザー情報を送信
        .post('http://localhost:8000/api/tmp_work_schedule/',
            
          result
            
        ,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${window.localStorage.getItem('access')}`,
            }
        })
        .then(
          res=>{console.log(res.data);
          console.log('書き込みが完了しました')
        })
        .catch(err=>{console.log(err);});
        })
      .catch(err=>{console.log(err);});
  }

  if (!users || !range || !dates) return null;
  // 店長アカウントだったときはじく
  else if (users.is_manager === true) {
    return navigate("/*")
  }
  console.log(dates)
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
                {dates.map((row, index) => (
                  <TableRow
                    key={row.date}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <font size="4">{String(row.startTime.getMonth() + 1) + "月" + String(row.startTime.getDate()) + "日"}</font>
                    </TableCell>
                    <TableCell align="right">
                      <LocalizationProvider dateAdapter={AdapterDateFns} locale={ja}>
                        <TimePicker
                          label="開始"
                          value={row.startTime}
                          disabled={row.isDisable}
                          onChange={(newValue) => {
                            if(newValue>row.endTime){
                              const newRow = dates.slice(0, dates.length); //配列のコピーを取るconst newRow=rowsでは参照渡しとなるのでNG
                              newRow[index].startTime = newValue; //コピーした配列を変更する
                              newRow[index].error = true; //コピーした配列を変更する
                              setDates(newRow); //コピーした配列をsetStateする
                            }else{
                              const newRow = dates.slice(0, dates.length); //配列のコピーを取るconst newRow=rowsでは参照渡しとなるのでNG
                              newRow[index].startTime = newValue; //コピーした配列を変更する
                              newRow[index].error = false; //コピーした配列を変更する
                              setDates(newRow); //コピーした配列をsetStateする
                            }
                          }}
                          inputFormat='HH:mm'
                          mask='__:__'
                          renderInput={(params) => <TextField sx={{ maxWidth: 150 }} {...params} error={row.startTime>row.endTime}/>}
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
                            if(row.startTime>newValue){
                              const newRow = dates.slice(0, dates.length); //配列のコピーを取るconst newRow=rowsでは参照渡しとなるのでNG
                              newRow[index].endTime = newValue; //コピーした配列を変更する
                              newRow[index].error = true; //コピーした配列を変更する
                              setDates(newRow); //コピーした配列をsetStateする
                            }else{
                              const newRow = dates.slice(0, dates.length); //配列のコピーを取るconst newRow=rowsでは参照渡しとなるのでNG
                              newRow[index].endTime = newValue; //コピーした配列を変更する
                              newRow[index].error = false; //コピーした配列を変更する
                              setDates(newRow); //コピーした配列をsetStateする
                            }
                          }}
                          inputFormat='HH:mm'
                          mask='__:__'
                          renderInput={(params, data = row) => <TextField sx={{ maxWidth: 150 }} {...params} error={row.startTime>row.endTime}/>}
                        />
                      </LocalizationProvider>
                    </TableCell>
                    <TableCell align="right">
                      <Checkbox
                        checked={!row.isDisable}
                        onChange={(e) => {
                          const newRow = dates.slice(0, dates.length); //配列のコピーを取るconst newRow=rowsでは参照渡しとなるのでNG
                          newRow[index].isDisable = !e.target.checked;//コピーした配列を変更する
                          setDates(newRow);//コピーした配列をsetStateする
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
            以下の内容で提出しますか？<br/>
            <font color="#ee0000">エラーが発生している箇所は提出されません</font><br/>
            {dates.filter(data => data.error === true).map((row, index) => <li key={row.date}><font color='#ee0000'>{String(row.startTime.getMonth() + 1) + "月" + String(row.startTime.getDate()) + "日"}　{String(row.startTime.getHours())+'時'+String(row.startTime.getMinutes())+'分'}～{String(row.endTime.getHours())+'時'+String(row.endTime.getMinutes())+'分'}</font></li>)}
            <br/>
          </DialogContentText>
          {dates.filter(data => data.isDisable === false && data.error === false).map((row, index) => <li key={row.date}>{String(row.startTime.getMonth() + 1) + "月" + String(row.startTime.getDate()) + "日"}　{String(row.startTime.getHours())+'時'+String(row.startTime.getMinutes())+'分'}～{String(row.endTime.getHours())+'時'+String(row.endTime.getMinutes())+'分'}</li>)}

        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseDialog}>キャンセル</Button>
          <Button onClick={() =>{
            submit();
            onCloseDialog();
            setSuccessDialog(true);
          }}>はい</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={successDialog} onClose={onCloseDialog}>
        <DialogTitle>完了</DialogTitle>
        <DialogContent>
          <DialogContentText>
            提出が完了しました！
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() =>{
            onCloseDialog();
          }}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
