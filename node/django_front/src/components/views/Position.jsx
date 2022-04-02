import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, Button, Grid } from '@mui/material';
import ColorPicker from './ColorPicker';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';

function createData(position, member) {
  return {position, member};
}

const rows = [
    createData('ホール', 10),
    createData('キッチン', 8),
    createData('フリー', 3),
];

export default function PositionTable() {
    return (
        <>
        <Grid container>
            <Grid item><Typography sx={{ mb:2, ml:2 ,mr:1}}><TextField id="standard-basic" label="追加したいポジションを入力" variant="standard" /></Typography></Grid>
            <Grid item><Button variant="contained" sx={{ mt: 2 , mr:1}}>追加</Button></Grid>
        </Grid>
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 550 }} aria-label="caption table">
                <TableHead>
                    <TableRow>
                        <TableCell align='left'>色</TableCell>
                        <TableCell align='left'>ポジション名</TableCell>
                        <TableCell align='left'>所属従業員数</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow>
                            <TableCell>
                                <ColorPicker />
                            </TableCell>
                            <TableCell component="th" scope="row">{row.position}</TableCell>
                            <TableCell>{row.member}</TableCell>
                            <TableCell align="center">
                                <Button variant="outlined" color="secondary" startIcon={<DeleteIcon />}>
                                    消去
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    );
}
