import * as React from 'react';
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

const theme = createTheme({
  palette: {
    primary: green,
  },
});

const MakeShift = () => {
  const [startValue, startSetValue] = React.useState(null);
  const [endValue, endSetValue] = React.useState(null);
  const [closeValue, closeSetValue] = React.useState(null);

  return (
    <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container component="main" maxWidth="xs"/>
        <CssBaseline />
          <Box>
            <Grid container justifyContent="flex-start">
              <Grid item sx={{ mb: 2 }}>
                <Typography component="h1" variant="h5">
                シフト作成
                </Typography>
              </Grid>
            </Grid>
            <Box component="form" noValidate>
              <Grid container
              sx={{// grid containerに書かないと中央揃えできない？
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
              spacing={4}
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
                  />}
                />
                </Grid>
                <Grid item >
                <Button
                    variant="contained"
                >
                    シフト表を作成
                </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
    </LocalizationProvider>
    </ThemeProvider>
  );
};

export default MakeShift;