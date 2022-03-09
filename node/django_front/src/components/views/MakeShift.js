import * as React from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const MakeShift = ({ selectedDate, setSelectedDate }) => {
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Container component="main"/>
        <CssBaseline />
        <Box>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container 
              direction="column" 
              alignItems="center"
              spacing={3}
              >
              <Grid item xs={6}>
                <TextField
                  autoComplete="shift-table-name"
                  name="shiftTableName"
                  required
                  fullWidth
                  id="shiftTableName"
                  label="シフト表名称"
                  autoFocus
                />
              </Grid>
              <Grid item xs={6}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="yyyy/MM/dd"
                value={selectedDate}
                onChange={handleDateChange}
                label="開始日"
              />
              </Grid>
              <Grid item xs={6}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="yyyy/MM/dd"
                value={selectedDate}
                onChange={handleDateChange}
                label="終了日"
              />
              </Grid>
              <Grid item xs={6}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="yyyy/MM/dd"
                value={selectedDate}
                onChange={handleDateChange}
                label="希望シフトの提出締切"
              />
              </Grid>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 5, mb: 3 }}
              >
                シフト表を作成
              </Button>
            </Grid>
          </Box>
        </Box>
    </MuiPickersUtilsProvider>
  );
};

export default MakeShift;