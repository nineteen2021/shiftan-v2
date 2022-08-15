import * as React from 'react';
import { useEffect, useLayoutEffect } from 'react';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import ja from 'date-fns/locale/ja'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import green from '@mui/material/colors/green';
import axios from 'axios';

const MakeShift = () => {
    const [shiftName, setShiftName] = React.useState(null)
    const [startValue, startSetValue] = React.useState(null);
    const [endValue, endSetValue] = React.useState(null);
    const [deadlineValue, deadlineSetValue] = React.useState(null);
    const [users, setUsers] = React.useState(null);
    const [storeFK, setStoreFK] = React.useState(null);
    const [shiftNameError, setShiftNameError] = React.useState(null);
    const [startValueError, setStartValueError] = React.useState(null);
    const [endValueError, setEndValueError] = React.useState(null);
    const [endValueErrorMessage, setEndValueErrorMessage] = React.useState(null);

    const navigate = useNavigate();

    // storeFKを取得
    useEffect(() => {
        axios
        .get('http://localhost:8000/api-auth/users/me/',{
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`, // ここを追加
            }
        })
        .then(res=>{setUsers(res.data);
            setStoreFK(res.data.store_FK);
            console.log(storeFK)
        })
        .catch(err=>{console.log(err);});
    }, []);

    const makeShiftPost = () => {
        console.log(shiftName)
        console.log(startValue)
        console.log(endValue)
        console.log(deadlineValue)

        // postできる値に変更
        const postStartValue = startValue.getFullYear() + '-' + ('00' + (startValue.getMonth() + 1)).slice(-2) + '-' + ('00' + startValue.getDate()).slice(-2)
        console.log(postStartValue)
        const postEndValue = endValue.getFullYear() + '-' + ('00' + (endValue.getMonth() + 1)).slice(-2) + '-' + ('00' + endValue.getDate()).slice(-2)
        console.log(postEndValue)
        const postDeadlineValue = deadlineValue.getFullYear() + '-' + ('00' + (deadlineValue.getMonth() + 1)).slice(-2) + '-' + ('00' + deadlineValue.getDate()).slice(-2)
        console.log(postDeadlineValue)

        // テキストボックスから各値を取得
        // const shiftTableName = data.get("shiftTableName")
        // const startDay = data.get("startDay")
        // const endDay = data.get("endDay")
        // const deadline = data.get("deadline")

        // console.log("storeFK:" + storeFK);
        // console.log(shiftTableName)
        // console.log(startDay)
        // console.log(endDay)
        // console.log(deadline)
        axios
        .post("http://localhost:8000/api/shift_range/",{
            store_FK:storeFK,
            shift_name:shiftName,
            start_date:postStartValue,
            stop_date:postEndValue,
            deadline_date:postDeadlineValue
        }
        ,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${window.localStorage.getItem('access')}`
            }
        })
        .then((res) => {
            console.log(res.data)
            navigate("/")
        })
        .catch(err=>{console.log(err);})
    }

    const styles = {
        mobiledialogprops: {
          '.PrivatePickersToolbar-dateTitleContainer .MuiTypography-root': 
            {
              fontSize: '1.5rem'
            }
        }
    }

    const formVaridation = () => {
        if(shiftName == "")setShiftNameError(true);
        else setShiftName(false)

        if(startValue=="")setStartValueError(true);
        else startSetValue(false)

        if(endValue==""){
            setEndValueError(true);
            setEndValueErrorMessage("");
        }
        else if(startValue>endValue){
            setEndValueError(true);
            setEndValueErrorMessage("開始日が終了日よりも前になるように設定する必要があります。");
        }
        else {
            endSetValue(false);
            setEndValueErrorMessage("");
        }

        if (shiftName == ""||startValue==""||endValue==""||startValue>endValue)return(false)
        else return(true)
    }
    // if (!fk ) return null;
  return (
    <>
    <LocalizationProvider dateAdapter={AdapterDateFns} utils locale={ja} dateFormats={{ monthAndYear: 'yyyy年MM月' }}>
        <Container component="main" maxWidth="xs"/>
        <CssBaseline />
            <Box>
                <Grid container justifyContent="flex-start">
                    <Grid item>
                        <Typography component="h1" variant="h5">
                            シフト作成
                        </Typography>
                    </Grid>
                </Grid>
                <Box component="form" onSubmit={makeShiftPost} noValidate sx={{ mt: 3 }}>
                    <Grid container
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                        spacing={2}
                    >
                        <Grid item>
                            <TextField
                                autoComplete="shift-table-name"
                                name="shiftTableName"
                                required
                                fullWidth
                                error={shiftNameError}
                                id="shiftTableName"
                                label="シフト表名称"
                                onChange={(e) => setShiftName(e.target.value)}
                            />
                        </Grid>
                        <Grid item>
                            <DatePicker
                                label="開始日"
                                inputFormat='yyyy年MM月dd日(E)'
                                mask="____年__月__日(E)"
                                value={startValue}
                                leftArrowButtonText="前月を表示"
                                rightArrowButtonText="次月を表示"
                                cancelText="キャンセル"
                                okText="選択"
                                toolbarFormat="M月d日(E)"
                                onChange={(newValue) => {
                                    startSetValue(newValue);
                                }}
                                DialogProps={{ sx: styles.mobiledialogprops }}
                                renderInput={(params) => <TextField {...params}
                                    error={startValueError}
                                    autoComplete="off"
                                    name="startDay"
                                    id="startDay"
                                    // onChange={(e) => startSetValue(e.target.value)}
                                    required
                                    fullWidth
                                />}

                            />
                        </Grid>
                        <Grid item>
                            <DatePicker
                                label="終了日"
                                value={endValue}
                                inputFormat='yyyy年MM月dd日(E)'
                                mask="____年__月__日(E)"
                                leftArrowButtonText="前月を表示"
                                rightArrowButtonText="次月を表示"
                                cancelText="キャンセル"
                                okText="選択"
                                toolbarFormat="M月d日(E)"
                                DialogProps={{ sx: styles.mobiledialogprops }}
                                onChange={(newValue) => {
                                    endSetValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params}
                                    error={endValueError}
                                    helperText={endValueErrorMessage}
                                    name="endDay"
                                    id="endDay"
                                    // onChange={(e) => endSetValue(e.target.value)}
                                    autoComplete="off"
                                    required
                                    fullWidth
                                />}
                            />
                        </Grid>
                        <Grid item>
                            <DatePicker
                                label="締切日"
                                value={deadlineValue}
                                inputFormat='yyyy年MM月dd日(E)'
                                mask="____年__月__日(_)"
                                leftArrowButtonText="前月を表示"
                                rightArrowButtonText="次月を表示"
                                cancelText="キャンセル"
                                okText="選択"
                                toolbarFormat="M月d日(E)"
                                DialogProps={{ sx: styles.mobiledialogprops }}
                                onChange={(newValue) => {
                                    deadlineSetValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params}
                                    name="deadline"
                                    id="deadline"
                                    // onChange={(e) => deadlineSetValue(e.target.value)}
                                    autoComplete="off"
                                    fullWidth
                                />}
                            />
                        </Grid>
                        <Grid item >
                            <Button
                                size="large"
                                variant="contained"
                                onClick={() => {
                                    if(formVaridation()){
                                        makeShiftPost();
                                    }
                                }}
                            >
                                シフト表を作成
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
    </LocalizationProvider>
    </>
  );
};

export default MakeShift;