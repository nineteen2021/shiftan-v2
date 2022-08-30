import * as React from 'react';
import { Fragment, useState, useEffect } from 'react';
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
import axios from 'axios';


const rows = [];


export default function Position() {
    const [users, setUsers] = useState(null)
    const [groups, setGroups] = useState(null)
    const [name, setName] = useState('');
    
    useEffect(() => {
        axios
        .get('http://localhost:8000/api/group/',{
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`, // ここを追加
            }
        })
        .then(res=>{setGroups(res.data);
                    console.log(res.data);})
        .catch(err=>{console.log(err);});
    }, []);
    
    useEffect(() => {
        axios
        .get('http://localhost:8000/api-auth/users/me/',{
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`, // ここを追加
            }
        })
        .then(res=>{setUsers(res.data);
                    console.log(res.data);})
        .catch(err=>{console.log(err);});
    }, []);

    const handleNewName = (e) => {
            setName(e.target.value)
    }
    
    const createNewGroup = () => {
        console.log(users.store_FK)
        axios.post('http://localhost:8000/api/group/', {
            store_FK: users.store_FK,
            group_name: name,
            color: "#FFFFFF",
        }
        ,{
            headers: {
                // 'Content-Type': 'application/json', 
                'Authorization': `JWT ${localStorage.getItem('access')}`, 
            }
        })
            .then(response => {
                setGroups([...groups, response.data])
                console.log(response.data)
            })
            .catch(error => {
                console.log(error);
            });
        }
    
    const url = 'http://localhost:8000/api/group/5/'  
    const payload = { id : '5'}

    const deleteGroup = () => {
        axios.delete(url
        ,{
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `JWT ${localStorage.getItem('access')}`, 
            }
        })
        .then(response => {
            setGroups([...groups, response.data])
            // console.log(res.data);
        })
        .catch(error => {
            console.log(error);
        });
    }
        
     return (
        <>
            <Fragment>
                <Grid container>
                    <Grid item><Typography sx={{ mb:2, ml:2 ,mr:1}}><TextField sx={{minWidth: 230 }} id="standard-basic" label="追加したいポジションを入力" variant="standard" onChange={handleNewName}/></Typography></Grid>
                    <Grid item><Button variant="contained" sx={{ mt: 2 , mr:1}} onClick={createNewGroup}>追加</Button></Grid>
                    <Grid item><Button variant="contained" sx={{ mt: 2 , mr:1}} onClick={deleteGroup}>削除</Button></Grid>
                </Grid>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 550 }} aria-label="caption table">
                        <TableHead>
                            <TableRow>
                                <TableCell align='left'><Checkbox></Checkbox></TableCell>
                                <TableCell align='left'>色</TableCell>
                                <TableCell align='left'>ポジション名</TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {groups?.map((group,index) => (
                                <TableRow>
                                    <TableCell>
                                        <Checkbox></Checkbox>
                                    </TableCell>
                                    <TableCell>
                                        {/* group.group_color */}
                                        <ColorPicker />
                                    </TableCell>
                                    <TableCell component="th" scope="row" >{group.group_name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Fragment>
        </>
        
    );
}
