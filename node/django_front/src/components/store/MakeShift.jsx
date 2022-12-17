import * as React from 'react';
import { useEffect, useLayoutEffect } from 'react';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import ja from 'date-fns/locale/ja'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DatePicker from '@mui/lab/DatePicker';
import DatePicker , {registerLocale}from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';

registerLocale("ja", ja)

const MakeShift = () => {
    const [shiftName, setShiftName] = React.useState(null);
    const [startValue, startSetValue] = React.useState(null);
    const [endValue, endSetValue] = React.useState(null);
    const [deadlineValue, deadlineSetValue] = React.useState(null);
    const [users, setUsers] = React.useState(null);
    const [storeFK, setStoreFK] = React.useState(null);
    const [shiftNameError, setShiftNameError] = React.useState(null);
    const [startValueError, setStartValueError] = React.useState(null);
    const [endValueError, setEndValueError] = React.useState(null);
    const [endValueErrorMessage, setEndValueErrorMessage] = React.useState(null);

    let postStartValue;
    let postEndValue;
    let postDeadlineValue;

    const navigate = useNavigate();

    // storeFKを取得

    useLayoutEffect(() => {
    axios
        .get(process.env.REACT_APP_API_URL + '/api-auth/users/me/',{
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`, // ここを追加
            }
        })
        .then(res=>{setUsers(res.data);
                    setStoreFK(res.data.store_FK);
                    console.log(res.data);
                })
        .catch(err=>{console.log(err);});
    }, []);
    if (!users) return null;
    // アルバイトアカウントだった時はじく
    else if (users.is_manager === false) {
        return navigate("/*")
    }
    const makeShiftPost = async() => {
        console.log(shiftName)
        console.log(startValue)
        console.log(endValue)
        console.log(deadlineValue)

        // 各欄に値が入っていたらpostできる値に変更
        if (startValue !== null) {
            postStartValue =await startValue.getFullYear() + '-' + ('00' + (startValue.getMonth() + 1)).slice(-2) + '-' + ('00' + startValue.getDate()).slice(-2)
            console.log(postStartValue)
        }
        if (endValue !== null) {
            postEndValue =await endValue.getFullYear() + '-' + ('00' + (endValue.getMonth() + 1)).slice(-2) + '-' + ('00' + endValue.getDate()).slice(-2)
            console.log(postEndValue)
        }
        if (deadlineValue !== null){
            postDeadlineValue =await deadlineValue.getFullYear() + '-' + ('00' + (deadlineValue.getMonth() + 1)).slice(-2) + '-' + ('00' + deadlineValue.getDate()).slice(-2)
            console.log(postDeadlineValue)
        }

        // シフト範囲をPOST
        console.log(storeFK)
        await axios
        .post(process.env.REACT_APP_API_URL+"/api/shift_range/",{
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
            navigate("/storeHome")
        })
        .catch(err=>{console.log(err);})
    
    }

    // エラー処理
    const formVaridation = () => {
        if(shiftName == null || shiftName == "")setShiftNameError(true);
        else setShiftNameError(false)

        if(startValue==null)setStartValueError(true);
        else setStartValueError(false)

        if(endValue==null){
            setEndValueError(true);
            setEndValueErrorMessage("");
        }
        else if(startValue>endValue){
            setEndValueError(true);
            setEndValueErrorMessage("開始日が終了日よりも前になるように設定する必要があります。");
        }
        else {
            setEndValueError(false);
            setEndValueErrorMessage("");
        }

        if (shiftName == null|| shiftName == "" ||startValue==null||endValue==null||startValue>endValue)return(false)
        else return(true)
    }

    const onSubmit = (event) => {
        event.preventDefault()
        if(formVaridation()){
        makeShiftPost();
    }
    }

return (
    <>
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ja}> 
        <Container component="main" maxWidth="md"/>
            <Typography sx={{fontSize:20, position:'absolute', left:'100px'}}>シフト作成</Typography>
                <Box component="form" onSubmit={onSubmit} noValidate>
                    <Grid container
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            pt:"50px",
                        }}
                        spacing={2}
                    >
                        <Grid item>
                            <Typography component="h1" variant="h6">
                                シフト表名称*
                            </Typography>
                            <TextField
                                autoComplete="off"
                                name="shiftTableName"
                                required
                                fullWidth
                                error={shiftNameError}
                                id="shiftTableName"
                                placeholder="シフト表名称*"
                                onChange={(e) => setShiftName(e.target.value)}
                            />
                        </Grid>
                        <Grid item>
                            <Typography component="h1" variant="h6">
                                開始日*
                            </Typography>
                            <DatePicker
                            selected={startValue}
                            onChange={(date) => startSetValue(date)}
                            selectsStart
                            startDate={startValue}
                            endDate={endValue}
                            dateFormat="yyyy年MM月dd日(E)"
                            disabledKeyboardNavigation
                            placeholderText="開始日*"
                            locale="ja"
                            customInput={<TextField 
                                autoComplete="off"
                                error={startValueError}/>}
                        />
                        </Grid>
                        <Grid item>
                            <Typography component="h6" variant="h6">
                                終了日*
                            </Typography>
                            <DatePicker
                                selected={endValue}
                                onChange={(date) => endSetValue(date)}
                                selectsEnd
                                startDate={startValue}
                                endDate={endValue}
                                minDate={startValue}
                                dateFormat="yyyy年MM月dd日(E)"
                                disabledKeyboardNavigation
                                placeholderText="終了日*"
                                locale="ja"
                                customInput={<TextField 
                                    autoComplete="off"
                                    error={startValueError}/>}
                            />
                        </Grid>
                        <Grid>{endValueErrorMessage}</Grid>
                        <Grid item>
                            <Typography component="h1" variant="h6">
                            締切日
                            </Typography>
                            <DatePicker
                                selected={deadlineValue}
                                onChange={(date) => deadlineSetValue(date)} 
                                disabledKeyboardNavigation
                                dateFormat="yyyy年MM月dd日(E)"
                                placeholderText="締切日"
                                locale="ja"
                                customInput={<TextField 
                                    autoComplete="off"/>}
                            />
                        </Grid>
                        <Grid item >
                            <Button
                                type="submit"
                                size="large"
                                variant="contained"
                            >
                                シフト表を作成
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
    </LocalizationProvider>
    </>
  );
};

export default MakeShift;