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

let usersval;
let storeFK;
let shiftFK;
let startDate;
let stopDate;
let originalDates = new Array();
let dates = new Array();
let betweenDates = 0;
let workSchedulesList = [];
let convertedWorkSchedulesList = [];
// let formattedDates = [];
// let exDates = ["1月1日(土)", '1月2日(日)', '1月3日(月)', '1月4日(火)', '1月5日(水)', '1月6日(木)', '1月7日(金)', '1月8日(土)', '1月9日(日)', '1月10日(月)', '1月11日(火)', '1月12日(水)', '1月13日(木)', '1月14日(金)', '1月15日(土)', '1月16日(日)', '1月17日(月)', '1月18日(火)', '1月19日(水)', '1月20日(木)', '1月21日(金)', '1月22日(土)', '1月23日(日)', '1月24日(月)', '1月25日(火)', '1月26日(水)', '1月27日(木)', '1月28日(金)', '1月29日(土)', '1月30日(日)', '1月31日(月)'];
let exWorkSchedules = {"start_time":"19:00", "stop_time":"22:00"}

const useStyles = makeStyles({
  table: {
    whiteSpace: "nowrap",
    borderCollapse:"separate"  // 
  },
  sticky: {
    position: "sticky", // 一列目固定
    left: 0,
    background: "white",
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
    dates = [...dates, new Date(theDate)];
    theDate.setDate(theDate.getDate() + 1);
    betweenDates++;
    // console.log(betweenDates)
  };
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

// userfkでuserIDごとの作成シフトの配列を作成→日付順にソート→for文を日数分（配列の長さ）回す→日付と一致した時に作成シフトの時間を代入する（一致しなかったら空の空白（×とか））→ユーザーの数だけ配列を回す、その中でできた配列（列分の長さのはず）を列分回す


const makeWorkSchedulesListByUser = (list, users) => {
  // userfkでuserIDごとの作成シフトの配列を作成
  // usersの数だけ配列をつくる
  let workSchedulesListByUser = new Array();
  let userFK;
  for (let i = 0; i < users.length; i++) {
    userFK = users[i].id;
    // console.log(userFK);
    let result = list.filter( function( value, index, array ) {
    if (value.user_FK === userFK) return value;
})
workSchedulesListByUser.push( result );
}
// console.log( workSchedulesListByUser );
return workSchedulesListByUser
}

const add0 = (date) => {
  date = String(date)
  if (date.length == 1){
    date = "0" + date
  }
  return date
}

const convertWorkSchedulesList = (list, dates) => {
  //日付順にソート(ユーザーの数ソートする)
  let dateOfA;
  let dateOfB;
  for (let i = 0; i < list.length; i++) {

    list[i] = list[i].sort(function(a, b) {
      dateOfA = new Date(a.start_time);
      dateOfB = new Date(b.start_time);
      // console.log(dateOfA, dateOfB);

    return (a.start_time < b.start_time) ? -1 : 1;  //オブジェクトの昇順ソート
  })};
  console.log(list); // ソートが完了
  
  //for文を日数分（配列の長さ）回す
  let month1;
  let date1;
  let month2;
  let date2;
  let newWorkScheduleList = new Array();
  console.log(newWorkScheduleList)

  let newWorkSchedule = {
    'start_time':null,
    'stop_time':null,
  }
  console.log(newWorkSchedule)

  for (let j = 0; j < betweenDates; j++){ // datesの配列を作成
    newWorkScheduleList.push(newWorkSchedule)
  }
  // console.log(newWorkScheduleList) 

  let newWorkScheduleUsersList = new Array()

  // console.log(newWorkScheduleUsersList)
  // console.log(list.length)

  for (let k = 0; k < list.length; k++){ // users * dateの空の配列を作成
    console.log("ok")
    newWorkScheduleUsersList.push(newWorkScheduleList)
  }
  console.log(newWorkScheduleUsersList)

  // console.log(dates)

  let workDate;
  // for (let user = 0; user < 1; user++){ //userの分、配列を回す
  //   console.log(user)
    // console.log(list.length)
    let user = 0; //テスト、userを0に指定し、1回だけ実行する
    workDate = 0; // workDateの初期化
    for (let date = 0; date < dates.length; date++){ // シフトの範囲だけ回す（4月シフトであれば30回）
      console.log(date)
      month1 = add0(dates[date].getMonth() + 1); // 日にちのみが入った30日分の配列から月、日を取得
      console.log(month1)
      date1 = add0(dates[date].getDate());
      console.log(date1)
      console.log(list[user][workDate])
      console.log(list)
      month2 = list[user][workDate].start_time.substr(5, 2) //作成シフトから月、日を取得
      console.log(month2)
      date2 = list[user][workDate].start_time.substr(8, 2);
      console.log(date2)

      if (month1 === month2 && date1 === date2) { // シフトの範囲の日付と作成シフトの日付を比較する
        // なぜか作成シフトの一番最後の値がuser * 日にち分代入された配列が生まれる

        console.log(newWorkScheduleUsersList[user][date].start_time)
        console.log(newWorkScheduleUsersList[user][date].stop_time)

        console.log(list[user][workDate].start_time)
        console.log(list[user][workDate].stop_time)

        newWorkScheduleUsersList[user][date].start_time = list[user][workDate].start_time // 作成シフトの時間を新しい配列にコピー
        newWorkScheduleUsersList[user][date].stop_time = list[user][workDate].stop_time
        workDate++

        console.log("ok")

        console.log(newWorkScheduleUsersList[user][date].start_time)
        console.log(newWorkScheduleUsersList[user][date].stop_time)

        console.log(newWorkScheduleUsersList[user][date - 2].start_time) // 代入した日付の2日前の時間も取得、nullが正しい
        console.log(newWorkScheduleUsersList[user][date - 2].stop_time)
        // if (workDate <= dates.length){
        //   console.log(list[user][workDate].start_time)
        //   console.log(list[user][workDate].stop_time)
        // }
      }
      else{
        newWorkScheduleUsersList[0][date].start_time = null // dates[1] = // 合わない場合はnullを代入
        newWorkScheduleUsersList[0][date].stop_time = null    
        console.log("not")
        console.log(newWorkScheduleUsersList[user][date].start_time)
        console.log(newWorkScheduleUsersList[user][date].stop_time)
      }
    }
    console.log(newWorkScheduleUsersList)
  // }  

}

export default function ShiftTable() {
  const classes = useStyles();
  const [users, setUsers] = useState(null)
  const [shiftTable, setShiftTable] = useState(null)
  const [shiftDatesList, setShiftDatesList] = useState(null)
  const [workSchedules, setWorkSchedules] = useState(null)
  
  // useEffect(() => {
  //   axiossetShiftDatesList
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
        storeFK = res.data.store_FK;
        console.log("storeFKは" + storeFK);
        axios
        .get('http://localhost:8000/api/user/?store_FK=' + String(storeFK),{ //店舗のuser情報を取得
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        })
        .then(res=>{
          setUsers(res.data);
          usersval = res.data;
          // console.log(res.data);
          // console.log(users); // 初回レンダリング時は出ない
          })
        .catch(err=>{console.log(err);
        })
        axios
        .get('http://localhost:8000/api/shift_range/?store_FK=' + String(storeFK),{ // 店舗のシフト表の情報を取得
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        })
        .then(res=>{
          shiftFK = res.data[0].id
          console.log("shiftFKは" + res.data[0].id)
          setShiftTable(res.data);
          // console.log(res.data);
          startDate = new Date(res.data[0].start_date); //結果が配列の中の一つとして返されるので[0]で指定する
          stopDate = new Date(res.data[0].stop_date);
          // console.log(date.start_date);
          originalDates = getDatesBetweenDates(startDate, stopDate); // 開始日から終了日までのdateオブジェクトの配列
          // console.log(dates)
          // startDate = res.data.start_date;
          // stopDate = res.data.stop_date;
          dates = originalDates.concat();
          setShiftDatesList(changeFormDates(dates)); // 配列を〇月〇日（〇曜日）に変換した配列
          // console.log(changeFormDates(dates))
          // console.log(shiftDatesList)
          // console.log(exDates) 
          
          axios
          .get('http://localhost:8000/api/work_schedule/?shift_range_FK=' + String(shiftFK),{ //取ってきたシフト表の作成シフトをとってくる
              headers: {
                  'Authorization': `JWT ${localStorage.getItem('access')}`
              }
          })
          .then(res=>{setWorkSchedules(res.data);
                      // console.log(users);
                      // console.log(workSchedules); // 最初は出ない
                      workSchedulesList = makeWorkSchedulesListByUser(res.data, usersval);
                      // console.log(workSchedulesList)
                      // console.log(originalDates)
                      convertedWorkSchedulesList = convertWorkSchedulesList(workSchedulesList, originalDates, usersval);
                      })
          .catch(err=>{console.log(err);})         
          })
        .catch(err=>{console.log(err);})
        })
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
    <TableContainer 
      component={Paper}
      sx={{ display: "grid" }}
    >
      <Table 
          sx={{ minWidth: 300 }}
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