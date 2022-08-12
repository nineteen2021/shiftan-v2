import * as React from 'react';
import { useEffect, useLayoutEffect } from 'react';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
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
    const [startValue, startSetValue] = React.useState(null);
    const [endValue, endSetValue] = React.useState(null);
    const [closeValue, closeSetValue] = React.useState(null);
    const [users, setUsers] = React.useState(null);
    const [storeFK, setStoreFK] = React.useState(null);

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

    const makeShiftPost = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        // テキストボックスから各値を取得
        const shiftTableName = data.get("shiftTableName")
        const startDay = data.get("startDay")
        const endDay = data.get("endDay")
        const deadline = data.get("deadline")

        console.log("storeFK:" + storeFK);
        console.log(shiftTableName)
        console.log(startDay)
        console.log(endDay)
        console.log(deadline)

        axios
        .post("http://localhost:8000/api/shift_range/",{
            store_FK:storeFK,
            shift_name:shiftTableName,
            start_date:startDay,
            stop_date:endDay,
            deadline_date:deadline
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
    // if (!fk ) return null;
  return (
    <>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                    id="shiftTableName"
                    label="シフト表名称"
                  />
                </Grid>
                <Grid item>
                  <DatePicker
                    label="開始日"
                    inputFormat='yyyy-MM-dd'
                    mask="____-__-__"
                    value={startValue}
                    onChange={(newValue) => {
                      startSetValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} 
                      autoComplete="off"
                      name="startDay"
                      id="startDay"
                      fullWidth
                    />}

                     />
                  </Grid>
                <Grid item>
                  <DatePicker
                    label="終了日"
                    value={endValue}
                    inputFormat='yyyy-MM-dd'
                    mask="____-__-__"
                    onChange={(newValue) => {
                      endSetValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params}
                    name="endDay"
                    id="endDay"
                    autoComplete="off"
                    fullWidth
                    />}
                />
                </Grid>
                <Grid item>
                  <DatePicker
                    label="締切日"
                    value={closeValue}
                    inputFormat='yyyy-MM-dd'
                    mask="____-__-__"
                    onChange={(newValue) => {
                      closeSetValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params}
                    name="deadline"
                    id="deadline"
                    autoComplete="off"
                    fullWidth
                    />}
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
          </Box>
    </LocalizationProvider>
    </>
  );
};

export default MakeShift;