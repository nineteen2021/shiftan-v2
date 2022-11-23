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
// import ChangeColor from '../function/ChangeColor';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

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
                 'Content-Type': 'application/json', 
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
    
    const url = 'http://localhost:8000/api/group/'  ;

    const deleteGroup = (index) => {
        const newGroup = [...groups]
        if(window.confirm('削除してよろしいですか?')){
        axios.delete(url + groups[index].id + "/"
        ,{
            headers: {
               'Content-Type': 'application/json', 
               'Authorization': `JWT ${localStorage.getItem('access')}`, 
            }
        })
         .then(() => {
            newGroup.splice(index, 1);
            setGroups(newGroup);
        })
         .catch(error => {
             console.log(error);
       });
    }else{console.log('キャンセル')}
    }
    
     return (
        <>
            <Fragment>
                <Grid container>
                    <Grid item><Typography sx={{ mb:2, ml:2 ,mr:1}}><TextField sx={{minWidth: 230 }} id="standard-basic" label="追加したいポジションを入力" variant="standard" onChange={handleNewName}/></Typography></Grid>
                    <Grid item><Button variant="contained" sx={{ mt: 2 , mr:1}} onClick={createNewGroup}>追加</Button></Grid>
                </Grid>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 450}} aria-label="caption table">
                        <TableHead>
                            <TableRow>
                                {/* <TableCell align='left'>色</TableCell> */}
                                <TableCell align='center'>ポジション名</TableCell>
                                <TableCell align='center'>削除</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {groups?.map((group, index) => (
                                <TableRow>
                                    {/* <TableCell> */}
                                        {/* group.group_color */}
                                        {/* <ChangeColor color={group.color} id={group.id}/> */}
                                    {/* </TableCell> */}
                                    <TableCell component="th" scope="row" align='center'>{group.group_name}</TableCell>
                                    <TableCell key={index} align='center'>
                                        <Button variant="outlined" startIcon={<DeleteIcon />} 
                                                onClick={() => {
                                                    deleteGroup(index);}}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Fragment>
        </>
    );
}
