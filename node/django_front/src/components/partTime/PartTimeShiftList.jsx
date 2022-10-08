import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as routerLink } from 'react-router-dom'

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

export default function PartTimeShiftList(props) {

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={3} sx={{ background: "#4DC0B2", my: { xs: 3, md: 3 }, p: { xs: 2, md: 3 } }}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography><font size="5" color="#fff">{props.shiftData.shift_name}</font></Typography>
          <Grid item>
            <Button 
              variant="contained" 
              color="whiteButton" 
              sx={{ mr: 1, ml:1 }}
              component={routerLink}
              to={"/partTimeShiftTable?id=" + props.shiftData.id}
              state={{ shiftData: props.shiftData }}
            >
              確認
            </Button>
            <Button variant="contained" sx={{ mr: 1, ml:1 }}>希望確認</Button>
            <Button 
              variant="contained" 
              color="yellowButton" 
              sx={{ ml: 1 }}
              component={routerLink}
              to={"/shiftSubmit?id=" + props.shiftData.id}
              state={{ shiftData: props.shiftData }}
            >
              編集
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </ThemeProvider>
  )
}