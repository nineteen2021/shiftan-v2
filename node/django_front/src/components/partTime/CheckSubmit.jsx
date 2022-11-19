import * as React from 'react';
import { useState, useLayoutEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Link as routerLink } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function createData(startTime, endTime) {
    let isDisable = true
    let error = false
    return { startTime, endTime, isDisable, error };
}

export default function CheckSubmit() {
    const [dates, setDates] = React.useState(null);
    const [users, setUsers] = useState(null);
    const [range, setRange] = useState(null);
    const [submited, setSubmited] = useState(false);
    const search = useLocation().search;
    const query2 = new URLSearchParams(search); //shift_rangeFKをquery2.get('idでもってくる')
    const navigate = useNavigate();
    const dayStr = ["日", "月", "火", "水", "木", "金", "土"];

    useLayoutEffect(() => {
        let storeFK;
        let userFK;
        axios //ユーザーの情報を取得
            .get('http://localhost:8000/api-auth/users/me/', {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                }
            })
            .then(res => {
                setUsers(res.data);
                console.log(res.data);
                storeFK = res.data.store_FK;
                userFK = res.data.id;
                axios //shift_rangeを取得
                    .get('http://localhost:8000/api/shift_range/' + query2.get('id') + '/', {
                        headers: {
                            'Authorization': `JWT ${localStorage.getItem('access')}`,
                        }
                    })
                    .then(res => {
                        setRange(res.data);
                        console.log(res.data);
                        console.log("シフト範囲を取得");
                        let dateList = new Array();
                        for (var d = new Date(res.data.start_date); d <= new Date(res.data.stop_date); d.setDate(d.getDate() + 1)) {
                            console.log(d);
                            console.log(d.getFullYear() + '-' + (d.getMonth() + 1).toString().padStart(2, "0") + '-' + d.getDate().toString().padStart(2, "0"));
                            let formatedDate = createData(new Date(d.getFullYear() + '-' + (d.getMonth() + 1).toString().padStart(2, "0") + '-' + d.getDate().toString().padStart(2, "0") + "T00:00:00"), new Date(d.getFullYear() + '-' + (d.getMonth() + 1).toString().padStart(2, "0") + '-' + d.getDate().toString().padStart(2, "0") + "T00:00:00"));
                            dateList.push(formatedDate);
                        }
                        axios //既存のシフト希望を取得（あとから編集できるようにするため）
                            .get('http://localhost:8000/api/tmp_work_schedule/?store_FK=' + storeFK + '&user_FK=' + userFK + '&shift_range_FK=' + query2.get('id'), {
                                headers: {
                                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                                }
                            })
                            .then(res => {
                                console.log(res.data)
                                if (res.data.length > 0) {
                                    console.log('シフト提出済み')
                                    setSubmited(true);
                                }
                                for (let i = 0; i < res.data.length; i++) { //tmp_work_scheduleから持ってきたデータを反映させる
                                    for (let j = 0; j < dateList.length; j++) {
                                        let year1 = dateList[j].startTime.getFullYear();
                                        let month1 = dateList[j].startTime.getMonth() + 1;
                                        let day1 = dateList[j].startTime.getDate();
                                        let year2 = new Date(res.data[i].start_time).getFullYear();
                                        let month2 = new Date(res.data[i].start_time).getMonth() + 1;
                                        let day2 = new Date(res.data[i].start_time).getDate();
                                        if (year1 == year2 && month1 == month2 && day1 == day2) {
                                            dateList[j].startTime = new Date(res.data[i].start_time);
                                            dateList[j].endTime = new Date(res.data[i].stop_time);
                                            dateList[j].isDisable = false;
                                        }
                                    }
                                }
                                setDates(dateList);
                            })
                            .catch(err => { console.log(err); });
                    })
                    .catch(err => { console.log(err); });
            })
            .catch(err => { console.log(err); });
    }, []);

    if (!users || !range || !dates) return null;
    else if (users.is_manager === true) {
        return navigate("/*")
    }
    console.log(dates);
    if (submited) {
        return (
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center "
                spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
            >
                <Grid item xs={6}>
                    <Typography sx={{ fontSize: 20, position: 'fixed', left: '20px', top: '90px' }}>希望シフト一覧</Typography>
                    <Box sx={{ pt: "50px" }}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 50 }} aria-label="シフト希望">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><Typography sx={{ fontSize: '1.275rem' }}>日付</Typography></TableCell>
                                        <TableCell><Typography sx={{ fontSize: '1.275rem' }}>シフト開始時間</Typography></TableCell>
                                        <TableCell><Typography sx={{ fontSize: '1.275rem' }}>シフト終了時間</Typography></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dates.filter(data => data.isDisable === false && data.error === false).map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <Typography sx={{ fontSize: '1.275rem' }}>
                                                    {String(row.startTime.getMonth() + 1) + "月" + String(row.startTime.getDate()) + "日" + "(" + dayStr[row.startTime.getDay()] + ")"}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography sx={{ fontSize: '1.275rem' }}>
                                                    {String(row.startTime.getHours()) + '時' + String(row.startTime.getMinutes()) + '分'}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography sx={{ fontSize: '1.275rem' }}>
                                                    {String(row.endTime.getHours()) + '時' + String(row.endTime.getMinutes()) + '分'}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Grid>
                <Grid item sx={{ marginLeft: '15em' }}>
                    <Button
                        variant="contained"
                        component={routerLink}
                        to={"/shiftSubmit?id=" + query2.get('id')}
                        sx={{ ml: 9 }}>
                        編集
                    </Button>
                </Grid>
            </Grid>
        );
    } else {
        return (
            <>
                <Typography sx={{ fontSize: 20, position: 'fixed', left: '20px', top: '90px' }}>希望シフト一覧</Typography>
                <Grid container spacing={0} alignItems='center' justifyContent='center' direction="column" style={{ minHeight: '100vh' }}>
                    <Grid item xs={12}>
                        <AddBusinessIcon fontSize="large" sx={{ fontSize: 80, color: '#707070' }} />
                    </Grid>
                    <Grid item xs={12}>
                        <p><Typography fontSize={24}><font color='#707070'>シフト希望なし</font></Typography></p>
                    </Grid>
                    <Grid item xs={12}>
                        <font color='#707070' align='center'>
                            <p>
                                シフト希望を提出しましょう
                            </p>
                        </font>
                    </Grid>
                    <Grid item xs={12}>
                        <Box pt={3}>
                            <Button variant="outlined"
                                component={routerLink}
                                to={"/shiftSubmit?id=" + query2.get('id')}
                            >
                                シフト登録へ
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </>
        );
    }
}