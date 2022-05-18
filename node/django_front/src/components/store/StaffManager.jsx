import * as React from 'react';
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

const testPos = [
    "厨房",
    "ホール"
]

function createData(name, position, color) {
  return { name, position, color};
}

//無理やり入れる
const rows = [
  createData('山田 太郎', 0, '#00ff00'),
  createData('山口 太郎', 1, '#0000ff'),
  createData('松岡 太郎', 0, '#00ff00'),
  createData('小林 太郎', 0, '#00ff00'),
  createData('森田 太郎', 0, '#00ff00'),
];

function PositionDialog(props) {
    const { onClose, selectedValue, open } = props;
  
    const handleClose = () => {
      onClose(selectedValue);
    };
    
    //ポジション編集画面のレイアウト
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>ポジション編集</DialogTitle>
        <PositionTable/>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
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

    const [pos, setPos] = React.useState('');

    //プルダウンメニューから値が変更されたときの処理
    const handleChange = (event) => {
    setPos(event.target.value);
    };

    //ポジション編集画面のポップアップ
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
        
    };
    const handleClose = (value) => {
        setOpen(false);
    };

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
                    <TableCell align="left"><b>ポジション名</b></TableCell>
                    <TableCell align="left"><b>色</b></TableCell>
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
                    <TableCell align="left">
                        <FormControl variant="standard" sx={{ mt: 1, mb: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                            <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={row.position}
                            onChange={handleChange}
                            label="ポジション"
                            >
                            <MenuItem value="">
                                <em>未設定</em>
                            </MenuItem>
                            <MenuItem value={0}>{testPos[0]}</MenuItem>
                            <MenuItem value={1}>{testPos[1]}</MenuItem>
                            </Select>
                        </FormControl>

                    </TableCell>
                    <TableCell align="left"><Typography variant="h4" style={{color: row.color}}>■</Typography></TableCell>
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
  );
}
