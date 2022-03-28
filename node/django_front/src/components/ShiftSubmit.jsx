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

function createData(date, startTime, endTime) {
  return { date, startTime, endTime };
}

const rows = [
  createData('3月○日', 159, 6.0),
  createData('3月○日', 237, 9.0),
  createData('3月○日', 262, 16.0),
  createData('3月○日', 305, 3.7),
  createData('3月○日', 356, 16.0),
];

export default function ShiftSubmit() {
  const [value, setValue] = React.useState(new Date());
  return (
    <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center "
        spacing={5}
    >
      <Grid item>
        <TableContainer component={Paper} sx={{ minWidth: 550 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>日付</TableCell>
                <TableCell align="right">開始時刻</TableCell>
                <TableCell align="right">終了時刻</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.date}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.date}
                  </TableCell>
                  <TableCell align="right">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <TimePicker
                        label="Basic example"
                        value={value}
                        onChange={(newValue) => {
                          setValue(newValue);
                        }}
                        renderInput={(params) => <TextField sx={{maxWidth: 150}} {...params} />}
                      />
                    </LocalizationProvider>
                  </TableCell>
                  <TableCell align="right">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <TimePicker
                        label="Basic example"
                        value={value}
                        onChange={(newValue) => {
                          setValue(newValue);
                        }}
                        renderInput={(params) => <TextField sx={{maxWidth: 150}} {...params} />}
                      />
                    </LocalizationProvider>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item sx={{marginLeft: '22em'}}>
        <Button variant="contained" sx={{ml: 2}}>変更を破棄</Button>
        <Button variant="contained" sx={{ml: 2}}>保存</Button>
      </Grid>
    </Grid>
  );
}
