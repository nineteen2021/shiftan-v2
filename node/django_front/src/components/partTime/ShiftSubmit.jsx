import * as React from 'react';
import ReactDOM from 'react-dom';
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

function createData(date, startTime, endTime) {
  let isDisable = false
  return { date, startTime, endTime, isDisable };
}

export default function ShiftSubmit() {
  const [rows, setRows] = React.useState([
    createData('3月○日', "13:00", "14:00"),
    createData('3月○日', "18:30", "19:00"),
    createData('3月○日', "18:30", "18:30"),
    createData('3月○日', "18:30", "18:30"),
    createData('3月○日', "18:30", "18:30"),
  ]);

  const [value, setValue] = React.useState(new Date);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const onCloseDialog = () => {
    setOpen(false);
  };

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
                      <font size="4">{row.date}</font>
                    </TableCell>
                    <TableCell align="right">
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                          label="開始"
                          value={value}
                          disabled={row.isDisable}
                          onChange={(newValue) => {
                            setValue(newValue);
                          }}
                          renderInput={(params) => <TextField sx={{ maxWidth: 150 }} {...params} />}
                        />
                      </LocalizationProvider>
                    </TableCell>
                    <TableCell align="right">
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                          label="終了"
                          value={value}
                          disabled={row.isDisable}
                          onChange={(newValue) => {
                            setValue(newValue);
                          }}
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
