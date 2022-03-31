import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ShiftList from './ShiftList';

const shifts = ['1月前半シフト','1月後半シフト','2月前半シフト','2月前半シフト','3月前半シフト','3月後半シフト'];

export default function StoreHome(){

  return(
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Typography fontSize={20}>シフト一覧</Typography>

        {shifts.map((val) => 
        <ShiftList shiftName={val} />
        )} 
        
      </Container>
  )
}