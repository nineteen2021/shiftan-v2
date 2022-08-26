import * as React from 'react';
import { Fragment, useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';

// function createData(name, first, second, third) {
//   return { name, first, second, third};
// }

let fk;
let startDate;
let stopDate;
let dates = [];
let betweenDates = 0;
// let formattedDates = [];
// let exDates = ["1月1日(土)", '1月2日(日)', '1月3日(月)', '1月4日(火)', '1月5日(水)', '1月6日(木)', '1月7日(金)', '1月8日(土)', '1月9日(日)', '1月10日(月)', '1月11日(火)', '1月12日(水)', '1月13日(木)', '1月14日(金)', '1月15日(土)', '1月16日(日)', '1月17日(月)', '1月18日(火)', '1月19日(水)', '1月20日(木)', '1月21日(金)', '1月22日(土)', '1月23日(日)', '1月24日(月)', '1月25日(火)', '1月26日(水)', '1月27日(木)', '1月28日(金)', '1月29日(土)', '1月30日(日)', '1月31日(月)'];
let exWorkSchedules = {"start_time":"19:00", "stop_time":"22:00"}

const useStyles = makeStyles({
  table: {
    whiteSpace: "nowrap"
  },
  sticky: {
    position: "sticky",
    left: 0,
    background: "white",
    boxShadow: "5px 2px 5px grey",
    borderRight: "2px solid black",
    width: "150px"
  },
  cell: {
    background: "white",
    borderRight: "0.5px solid gray",
    width: "150px",
    textAlign: "center"
  }
});

const getDatesBetweenDates = (startDate, endDate) => { // dateオブジェクトの開始日と終了日を引数に取る
  const theDate = new Date(startDate)
  while (theDate <= endDate) { // 開始日から最終日まで開始日に+1日していきそれを配列に入れていく
    dates = [...dates, new Date(theDate)]
    theDate.setDate(theDate.getDate() + 1)
    betweenDates++
    // console.log(betweenDates)
  }
  // console.log(dates)
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
  for(let i = 0; i < betweenDates; i++){ // getDatesBetweenDates関数でカウントした日にちの数ループ
    // console.log(dates[i]);
    dates[i] = new Date(dates[i]) // 一日ずつdateオブジェクトとして指定し、月、日、曜日を取得
    month = dates[i].getMonth() + 1;
    date = dates[i].getDate();
    // console.log(date);
    day = dates[i].getDay();
    // console.log(day);
    // console.log(month + '月' + date + '日' + "(" + dayStr[day] + ")");
    dates[i] = month + '月' + date + '日' + "(" + dayStr[day] + ")"; // 取得したデータを埋め込む、曜日は日付で取得するので漢字に変換
    // console.log(dates);
  }
  // console.log(dates);
  return dates;
}


export default function ShiftTable() {
  const classes = useStyles();
  const [users, setUsers] = useState(null)
  const [shiftTable, setShiftTable] = useState(null)
  const [shiftDatesList, setShiftDatesList] = useState(null)
  
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
        .get('http://localhost:8000/api/user/?store_FK=' + String(fk),{ //店舗のuser情報を取得
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
        .get('http://localhost:8000/api/shift_range/?store_FK=' + String(fk),{ // 店舗のシフト表の情報を取得
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        })
        .then(res=>{setShiftTable(res.data);
                    console.log(res.data);
                    startDate = new Date(res.data[0].start_date); //結果が配列の中の一つとして返されるので[0]で指定する
                    stopDate = new Date(res.data[0].stop_date);
                    // console.log(date.start_date);
                    dates = getDatesBetweenDates(startDate, stopDate); // 開始日から終了日までのdateオブジェクトの配列
                    // startDate = res.data.start_date;
                    // stopDate = res.data.stop_date;
                    setShiftDatesList(changeFormDates(dates)); // 配列を〇月〇日（〇曜日）に変換した配列
                    // console.log(changeFormDates(dates))
                    // console.log(shiftDatesList)
                    // console.log(exDates)
                  
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
  if(!shiftDatesList || !users || !shiftTable) return null
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }}
          className={classes.table}
          aria-label="simple table"
          style={{ tableLayout: "fixed" }}>
        <TableHead>
          <TableRow>
            <TableCell
              className={classes.sticky}
              sx={{ borderBottom: "2px solid black"}}
            >
              {shiftTable[0].shift_name}
            </TableCell>            
            {shiftDatesList?.map((date) => (
            <TableCell 
              align="right" 
              className={classes.cell}
              sx={{borderBottom: "2px solid black"}}
            >{date}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((user) => (
            <TableRow
              key={user.last_name + " " + user.first_name}
              // sx={{ '&:last-child td, &:last-child th': { border: 0 }}} //最後の子要素のみ属性を（border:0に）指定
              // className={classes.tableRaw}
            >
              <TableCell 
                component="th" 
                scope="row" 
                className={classes.sticky}
              >
                {user.last_name + " " + user.first_name}
              </TableCell>
          {/* {exWorkSchedules?.map((workSchedule) =>( */}
              <TableCell className={classes.cell}>{exWorkSchedules.start_time + "~" + exWorkSchedules.stop_time}</TableCell>
              <TableCell className={classes.cell}>{exWorkSchedules.start_time + "~" + exWorkSchedules.stop_time}</TableCell>
              <TableCell className={classes.cell}>{exWorkSchedules.start_time + "~" + exWorkSchedules.stop_time}</TableCell>
              <TableCell className={classes.cell}>{exWorkSchedules.start_time + "~" + exWorkSchedules.stop_time}</TableCell>
              <TableCell className={classes.cell}>{exWorkSchedules.start_time + "~" + exWorkSchedules.stop_time}</TableCell>
              <TableCell className={classes.cell}>{exWorkSchedules.start_time + "~" + exWorkSchedules.stop_time}</TableCell>
              <TableCell className={classes.cell}>{exWorkSchedules.start_time + "~" + exWorkSchedules.stop_time}</TableCell>
              <TableCell className={classes.cell}>{exWorkSchedules.start_time + "~" + exWorkSchedules.stop_time}</TableCell>
              <TableCell className={classes.cell}>{exWorkSchedules.start_time + "~" + exWorkSchedules.stop_time}</TableCell>
          {/* ))} */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
};