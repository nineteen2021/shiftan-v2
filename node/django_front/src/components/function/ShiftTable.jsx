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

let storeFK;
let shiftFK;
let startDate;
let stopDate;
let originalDates = new Array();
let dates = new Array();
let betweenDates = 0;
// let formattedDates = [];
// let exDates = ["1月1日(土)", '1月2日(日)', '1月3日(月)', '1月4日(火)', '1月5日(水)', '1月6日(木)', '1月7日(金)', '1月8日(土)', '1月9日(日)', '1月10日(月)', '1月11日(火)', '1月12日(水)', '1月13日(木)', '1月14日(金)', '1月15日(土)', '1月16日(日)', '1月17日(月)', '1月18日(火)', '1月19日(水)', '1月20日(木)', '1月21日(金)', '1月22日(土)', '1月23日(日)', '1月24日(月)', '1月25日(火)', '1月26日(水)', '1月27日(木)', '1月28日(金)', '1月29日(土)', '1月30日(日)', '1月31日(月)'];
let exWorkSchedules = {"start_time":"17:00", "stop_time":"20:00"}

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

// axiosのworkSchedulesで受け取ったデータを整形する
const makeShiftTable = (getWorkSchedules, shiftRangeDatesList, shiftFK) => { // shiftRangeDatesListにはoriginalDatesを入れる
  let workSchedulesList = []; // 完成したシフトデータ配列

  // for user数✕shiftRangeDate数で2次元でループを回す
  for (const user of getWorkSchedules) {
    let schedules = [user.last_name + ' ' + user.first_name];
    for (const shiftDate of shiftRangeDatesList) {
      // shiftRangeDatesListの値とshiftRangeIdの同じデータのstartTimeを比べる、同じものがあればworkSchedulesListにstartTime ~ endTimeを、無ければundefinedを入れる
      let flag = false
      for (const workSchedules of user.work_schedules) {
        // workScheduleIDが同じものだけを検証する
        if (workSchedules.shift_range_FK === shiftFK) {
          if ((shiftDate.getFullYear() === new Date(workSchedules.start_time).getFullYear()) && (shiftDate.getMonth()+1 === new Date(workSchedules.start_time).getMonth()+1) && (shiftDate.getDate() === new Date(workSchedules.start_time).getDate())) {
            schedules.push(('0' + new Date(workSchedules.start_time).getHours()).slice(-2) + ':' + ('0' + new Date(workSchedules.start_time).getMinutes()).slice(-2) + '～' + ('0' + new Date(workSchedules.stop_time).getHours()).slice(-2) + ':' + ('0' + new Date(workSchedules.stop_time).getMinutes()).slice(-2));
            flag = true;
          }
        }
      }
      if (!flag) {schedules.push(undefined);}
    };
    console.log(schedules);
    workSchedulesList.push(schedules); 
  };
  
  console.log(workSchedulesList);
  return workSchedulesList;
};

export default function ShiftTable() {
  const classes = useStyles();
  
  const [shiftTable, setShiftTable] = useState(null)
  const [shiftDatesList, setShiftDatesList] = useState(null)
  const [workSchedules, setWorkSchedules] = useState(null)
  const [finishShiftTable, setFinishShiftTable] = useState(null)

  useEffect(() => {
    axios
    .get('http://localhost:8000/api-auth/users/me/',{
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    })
    .then(res=>{
      storeFK = res.data.store_FK;
      // console.log("storeFKは" + storeFK);
      
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
        console.log(res.data[0].stop_date)
        stopDate = new Date(res.data[0].stop_date);
        // console.log(date.start_date);
        originalDates = getDatesBetweenDates(startDate, stopDate); // 開始日から終了日までのdateオブジェクトの配列
        // console.log(dates)
        dates = originalDates.concat();
        setShiftDatesList(changeFormDates(dates)); // 配列を〇月〇日（〇曜日）に変換した配列
        // console.log(changeFormDates(dates))
        // console.log(shiftDatesList)
        // console.log(exDates)
        
        axios.get('http://localhost:8000/api/work_schedules/?store_FK=' + String(storeFK), {
          headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`
          }
        })
        .then(res=>{
          console.log(res.data);
          setWorkSchedules(res.data);
          setFinishShiftTable(makeShiftTable(res.data, originalDates, shiftFK))
        })
        .catch(err=>{console.log(err);})
      })
      .catch(err=>{console.log(err);})
      })
    .catch(err=>{console.log(err);})
  }, []);

  if(!shiftDatesList || !workSchedules || !shiftTable) return null
  
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
          {finishShiftTable?.map((table) => (
            <TableRow>
              <TableCell
                component="th" 
                scope="row"
                className={classes.sticky}
              >
                {table[0]}
              </TableCell>
                {table?.map((shift, index) => (
                  (index != 0) && <TableCell className={classes.cell}>{shift}</TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
};