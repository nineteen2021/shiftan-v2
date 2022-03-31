import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import ColorPicker from './ColorPicker';

function createData(color, position, member) {
  return {color, position, member};
}

const rows = [
    createData('#00ff00', 'ホール', 10),
    createData('#0000ff', 'キッチン', 8),
    createData('#ff0000', 'フリー', 3),
];

export default function positionTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 550 }} aria-label="caption table">
                <caption>ここに入力スペースが入る</caption>
                <TableHead>
                    <TableRow>
                        <TableCell align='left'>色</TableCell>
                        <TableCell align='left'>ポジション名</TableCell>
                        <TableCell align='left'>所属従業員数</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.color}>
                            <TableCell>
                                <ColorPicker /> 
                            </TableCell>
                            <TableCell component="th" scope="row">{row.position}</TableCell>
                            <TableCell>{row.member}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
