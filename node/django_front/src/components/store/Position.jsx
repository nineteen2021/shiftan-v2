import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, Button, Grid, Checkbox } from '@mui/material';
import ColorPicker from '../function/ColorPicker';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import { areArraysEqual } from '@mui/material/node_modules/@mui/base';


const rows = [];

function AddPos() {
    const input = document.getElementById("standard-basic");
    rows.push(input.value);
    console.log(rows)
}

function DelPos() {
    if(select.current.length == 0) return;
    const newRows = rows.filter(v => select.current.indexOf(v) == -1); 
    setRows(newRows);
    rows = newRows; 
}

export default function Position() {
     return (
        <>
        <Grid container>
            <Grid item><Typography sx={{ mb:2, ml:2 ,mr:1}}><TextField sx={{minWidth: 230 }} id="standard-basic" label="追加したいポジションを入力" variant="standard" /></Typography></Grid>
            <Grid item><Button variant="contained" sx={{ mt: 2 , mr:1}} onClick={AddPos}>追加</Button></Grid>
            <Grid item><Button variant="contained" sx={{ mt: 2 , mr:1}} onClick={DelPos}>削除</Button></Grid>
        </Grid>
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 550 }} aria-label="caption table">
                <TableHead>
                    <TableRow>
                        <TableCell align='left'>□</TableCell>
                        <TableCell align='left'>色</TableCell>
                        <TableCell align='left'>ポジション名</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((rows,index) => (
                        <TableRow>
                            <TableCell>
                                <Checkbox 
                                disableSelectionOnClick
                                onSelectionModelChange={(v) => select.current = v}/>
                            </TableCell>
                            <TableCell>
                                <ColorPicker />
                            </TableCell>
                            <TableCell component="th" scope="row">{rows}</TableCell>
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
