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
  let startDate;  
  let stopDate;
  let dates = [];
  let betweenDates = 0;
  let formattedDates = [];
  let sumple = ["1月1日(土)", "1月2日(日)", "1月3日(月)"];

  const splitByHyphen = (date) => {
    // 区切り文字に「-（ハイフン）」を指定
    // console.log(date); 
    let result = date.split( '-' );
    // console.log(result)
    date = new Date(result[0], result[1] - 1, result[2]);
    // console.log(date.toString());
    return date;
  }

  const getDatesBetweenDates = (startDate, endDate) => {
    const theDate = new Date(startDate)
    while (theDate <= endDate) {
      dates = [...dates, new Date(theDate)]
      theDate.setDate(theDate.getDate() + 1)
      betweenDates++
      // console.log(betweenDates)
    }
    console.log(dates)
    return dates;
  }

  const changeFormDates = (dates) => {
    let month
    let date
    let day
    const dayStr = [ "日", "月", "火", "水", "木", "金", "土" ] ;
    //   let startYear = startDate.getFullYear();
    //   let startMonth = startDate.getMonth() + 1;
    //   let startDay = startDate.getDate();
    //   console.log("開始日は" + startYear + '年' + startMonth + '月' + startDay + '日');
    for(let i = 0; i < betweenDates; i++){
      // console.log(dates[i]);
      dates[i] = new Date(dates[i])
      month = dates[i].getMonth() + 1;
      date = dates[i].getDate();
      // console.log(date);
      day = dates[i].getDay();
      // console.log(day);
      // console.log(month + '月' + date + '日' + "(" + dayStr[day] + ")");
      dates[i] = month + '月' + date + '日' + "(" + dayStr[day] + ")";
      console.log(dates[i]);
    }
    console.log(dates);
    return dates;
  }

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
                    startDate = res.data[0].start_date;
                    stopDate = res.data[0].stop_date;
                    // console.log(date.start_date);
                    dates = getDatesBetweenDates(splitByHyphen("2022-01-01"), splitByHyphen("2022-01-31"));
                    // startDate = res.data.start_date;
                    // stopDate = res.data.stop_date;
                    formattedDates = changeFormDates(dates);
                    // console.log(changeFormDates(dates))
                    console.log(formattedDates)
                  
                    })
        .catch(err=>{console.log(err);})
    }, [])
  .catch(err=>{console.log(err);})
}, []);

// const today = new Date()
// const oneMonthFromNow = new Date(today)
// oneMonthFromNow.setDate( oneMonthFromNow.getDate() + 31)
// getDatesBetweenDates(today, oneMonthFromNow)

// for (let i = 1; i <= betweenDates + 2; i++){
//   
// }

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

    //curl -H POST 'http://127.0.0.1:8000/api/shift_range/?store_FK=2 ' -H 'Content-Type:application/json;charset=utf-8' -H 'Authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYwMjY5NjkwLCJpYXQiOjE2NjAyNjc4OTAsImp0aSI6IjZmZGJkZDk5ZGI2OTRjNDQ4NGIxOGYxYWRkOWQ1YWM2IiwidXNlcl9pZCI6MX0.ViyTWO98DgWL82ttsZXHdsgXkZVMsQDOd9Ep1doOZdw'
  if(!formattedDates) return null
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>

          <TableRow>

            {/* <TableCell>{shiftTables.shift_name}</TableCell> */}

            <TableCell>シフト名</TableCell>
            
            {formattedDates?.map((date) => (
            
            <TableCell align="right">{date}</TableCell>
            ))}
            
          </TableRow>

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