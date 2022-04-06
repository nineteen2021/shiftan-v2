import React from 'react';
import { Link as routerLink } from 'react-router-dom';
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid';

export default function NewAccountButton() {
  return (
    <Grid container 
    justifyContent="space-between"
    marginTop={2}
    >
    
    <Button 
      variant="contained"
      component={routerLink}
      to="/register"
      >店舗アカウント作成
    </Button>
    <Button 
      variant="contained"
      component={routerLink}
      to="/partTimeRegister"
      >アルバイトアカウント作成</Button>
    </Grid>
  )
};