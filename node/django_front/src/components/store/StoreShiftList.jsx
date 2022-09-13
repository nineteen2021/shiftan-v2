import * as React from 'react';
import { Fragment, useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as routerLink } from 'react-router-dom'
import axios from 'axios';

const theme = createTheme({
  palette: {
    whiteButton: {
      main: '#ffffff',
      contrastText: '#4DC0B2',
    },
    yellowButton: {
      main: '#FFC042',
      contrastText: '#000000',
    },
  },
});

export default function StoreShiftList(props){

  return(
    <ThemeProvider theme={theme}>
      <Paper elevation={3} sx={{ background: "#4DC0B2", my: { xs: 3, md: 3 }, p: { xs: 2, md: 3 } }}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography><font size="5" color="#fff">{props.shiftName.shift_name}</font></Typography>
          <Grid item>
            <Button variant="contained"
                    color="whiteButton" 
                    sx={{mr: 1}}
                    component={routerLink}
                    to="/shiftTable"
            >確認</Button>
            <Button variant="contained" 
                    color="yellowButton" 
                    sx={{ml: 1}}
                    component={routerLink}
                    to="/shiftTable"
            >編集</Button>
          </Grid>
        </Grid>
      </Paper>
    </ThemeProvider>
  )
}