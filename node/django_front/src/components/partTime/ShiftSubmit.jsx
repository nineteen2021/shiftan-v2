import * as React from 'react';
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
          <Typography sx={{ mb: 1 }}>????????????????????????????????????????????????????????????????????????????????????</Typography>
          <TableContainer component={Paper} >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>??????</TableCell>
                  <TableCell align="right">????????????</TableCell>
                  <TableCell align="right">????????????</TableCell>
                  <TableCell align="right">??????</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow
                    key={row.date}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <font size="4">{String(row.startTime.getMonth()+1)+ "???" + String(row.startTime.getDate()) + "???"}</font>
                    </TableCell>
                    <TableCell align="right">
                      <LocalizationProvider dateAdapter={AdapterDateFns} locale={ja}>
                        <TimePicker
                          label="??????"
                          value={row.startTime}
                          disabled={row.isDisable}
                          onChange={(newValue) => {
                            const newRow = rows.slice(0, rows.length); //???????????????????????????const newRow=rows?????????????????????????????????NG
                            newRow[index].startTime = newValue; //????????????????????????????????????
                            setRows(newRow); //????????????????????????setState??????
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
                          label="??????"
                          value={row.endTime}
                          disabled={row.isDisable}
                          onChange={(newValue) => {
                            const newRow = rows.slice(0, rows.length); //???????????????????????????const newRow=rows?????????????????????????????????NG
                            newRow[index].endTime = newValue; //????????????????????????????????????
                            setRows(newRow); //????????????????????????setState??????
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
                          const newRow = rows.slice(0, rows.length); //???????????????????????????const newRow=rows?????????????????????????????????NG
                          newRow[index].isDisable = !e.target.checked;//????????????????????????????????????
                          setRows(newRow);//????????????????????????setState??????
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
          <Button onClick={handleClickOpen} variant="contained" sx={{ ml: 2 }}>??????</Button>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={onCloseDialog}>
        <DialogTitle>??????</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ???????????????????????????????????????
          </DialogContentText>
          {rows.filter(data => data.isDisable === false).map((row, index) => <li key={row.date}>{row.date}???{row.startTime}???{row.endTime}</li>)}
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseDialog}>???????????????</Button>
          <Button onClick={onCloseDialog}>??????</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
