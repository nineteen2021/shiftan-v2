import * as React from 'react';
import { Fragment, useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

// function createData(name, first, second, third) {
//   return { name, first, second, third};
// }

// const rows = [
//   createData('テスト1', "15:00~20:00", "15:00~20:00", "15:00~20:00"),
//   // createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   // createData('Eclair', 262, 16.0, 24, 6.0),
//   // createData('Cupcake', 305, 3.7, 67, 4.3),
//   // createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function ShiftTable() {

  const [users, setUsers] = useState(null)
  const [shiftTables, setShiftTables] = useState(null)
  let fk;

  // useEffect(() => {
  //   axios
  //   .get('http://localhost:8000/api-auth/users/',{
  //       headers: {
  //           'Authorization': `JWT ${localStorage.getItem('access')}`,
  //       }
  //   })

  //   .then(res=>{setUsers(res.data);
  //     console.log(res.data);})

  //   .catch(err=>{console.log(err);});
  //   }, []);

    useEffect(() => {
      axios
      .get('http://localhost:8000/api-auth/users/me/',{
          headers: {
              'Authorization': `JWT ${localStorage.getItem('access')}`,
          }
      })
      .then(res=>{
        fk = res.data.store_FK;
        console.log(fk);
        axios
        .get('http://localhost:8000/api/user/?store_FK=' + String(fk),{
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        })
        .then(res=>{setUsers(res.data);
                    console.log(res.data);
                    })
        .catch(err=>{console.log(err);
      })
      axios
        .get('http://localhost:8000/api/shift_range/?store_FK=' + String(fk),{
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        })
        .then(res=>{setShiftTables(res.data);
                    console.log(res.data);
                    }, [])
        .catch(err=>{console.log(err);})
    }, [])
  .catch(err=>{console.log(err);})
}, []);

    // useEffect(() => {
    //   axios
    //   .get('http://localhost:8000/api/shift_range/?store_FK=' + String(fk),{
    //       headers: {
    //           'Authorization': `JWT ${localStorage.getItem('access')}`
    //       }
    //   })
    //   .then(res=>{setShiftTables(res.data);
    //               console.log(res.data);
    //              }, [])
    //   .catch(err=>{console.log(err);})
    //   }, []);

    //curl -H POST 'http://127.0.0.1:8000/api/shift_range/?' -H 'Content-Type:application/json;charset=utf-8' -H 'Authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYwMjY2MDQyLCJpYXQiOjE2NjAyNjQyNDIsImp0aSI6IjgyNTQzYTViMmJlZTQ0ZGQ5YTYxMGMwMWY1YThlMWQzIiwidXNlcl9pZCI6MX0.NPIsUgYDVArPoO4yPUpAp93ca3Au4GfxHCY1dm6-XoI'

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
        {shiftTables?.map((shiftTable) => (
          <TableRow>
            <TableCell>5月シフト</TableCell>
            {/* 一旦取ってきたシフト一覧（●月）を横に並べるように表示させたい */}
            <TableCell>{shiftTable.shift_name}</TableCell> 
          </TableRow>
        ))}
        </TableHead>
        <TableBody>
          {users?.map((user) => (
            <TableRow
              // key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{user.last_name + " " + user.first_name}</TableCell>
              {/* <TableCell align="right">{row.first}</TableCell>
              <TableCell align="right">{row.second}</TableCell>
              <TableCell align="right">{row.third}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
};