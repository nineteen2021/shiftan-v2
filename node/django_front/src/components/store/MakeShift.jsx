import * as React from 'react';
import {useState, useLayoutEffect} from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
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

const MakeShift = () => {
  const [startValue, startSetValue] = React.useState(null);
  const [endValue, endSetValue] = React.useState(null);
  const [closeValue, closeSetValue] = React.useState(null);

  const [users, setUsers] = useState(null)
  const navigate = useNavigate();
  useLayoutEffect(() => {
    axios
        .get('http://localhost:8000/api-auth/users/me/',{
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`, // ここを追加
            }
        })
        .then(res=>{setUsers(res.data);
                    console.log(res.data);
                })
        .catch(err=>{console.log(err);});
  }, []);
  if (!users) return null;
  // アルバイトアカウントだった時はじく
  else if (users.is_manager === false) {
    return navigate("/*")
  }
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
            <Box component="form" noValidate sx={{ mt: 3 }}>
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
                    value={startValue}
                    onChange={(newValue) => {
                      startSetValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} 
                    autoComplete="off"
                    fullWidth
                    />}

                     />
                  </Grid>
                <Grid item>
                  <DatePicker
                    label="終了日"
                    value={endValue}
                    onChange={(newValue) => {
                      endSetValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params}
                    autoComplete="off"
                    fullWidth
                    />}
                />
                </Grid>
                <Grid item>
                  <DatePicker
                    label="締切日"
                    value={closeValue}
                    onChange={(newValue) => {
                      closeSetValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} 
                    autoComplete="off"
                    fullWidth
                    />}
                  />
                </Grid>
                <Grid item >
                <Button
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