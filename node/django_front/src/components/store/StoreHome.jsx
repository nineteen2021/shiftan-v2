import * as React from 'react';
import axios from 'axios';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import StoreShiftList from './StoreShiftList';
import { Link as routerLink, Navigate } from 'react-router-dom'

// const shifts = ['1月前半シフト','1月後半シフト','2月前半シフト','2月前半シフト','3月前半シフト','3月後半シフト'];

export default function StoreHome(){

  const [shiftTables, setShiftTables] = useState(null);
  let fk;

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
        .get('http://localhost:8000/api/shift_range/?store_FK=2' ,{
          // 'http://localhost:8000/api/shift_range/?store_FK=' + String(fk),{
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

  return(
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Typography fontSize={20}>シフト一覧</Typography>

        {shiftTables?.map((shiftTable) => 
        <StoreShiftList shiftName={shiftTable} />
        )} 
        
      </Container>
  )
}