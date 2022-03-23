import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'; 
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function createData(name, applicationDate) {
  return { name, applicationDate};
}

//無理やり入れる
const rows = [
  createData('山田 太郎', "2222/3/10"),
  createData('山口 太郎', "2222/5/14"),
  createData('松岡 太郎', "2222/5/14"),
  createData('小林 太郎', "2222/5/14"),
  createData('森田 太郎', "2222/5/14"),
];

export default function Certification() {

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
                    <TableCell align="left"><b>申請日時</b></TableCell>
                    <TableCell align="left"></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >

                    <TableCell component="th" scope="row" align="left">
                        <font size="5">{row.name}</font>
                    </TableCell>

                    <TableCell align="left">{row.applicationDate}</TableCell>

                    <TableCell align="center">
                        <Button variant="contained" color="success" sx={{ml: 1}}>承認</Button>
                        <Button variant="contained" color="error" sx={{ml: 1}}>拒否</Button>
                    </TableCell>

                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Grid>
    </Grid>
  );
}
