import * as React from 'react';
import '../../App.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import Grid from '@mui/material/Grid';
import { Link as routerLink } from 'react-router-dom'

export default function BottomNavbar() {
  const [value, setValue] = React.useState(0);

  return (
    <Box className='bottomNavbar' sx={{ width: '100%', height: '56px', position: 'fixed', bottom: '0', background: '#586365' }}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Button 
        sx={{ mr: "5em", mb: 1 }} 
        className="bottomButton" 
        startIcon={<HomeIcon className="bottomIcon" />}
        component={routerLink}
        to="/partTimeHome">
          ホーム 
        </Button>
        <Button 
        sx={{ ml: "5em", mb: 1 }} 
        className="bottomButton" 
        startIcon={<SettingsIcon className="bottomIcon" />}
        component={routerLink}
        to="/partTimeSettings">
          設定 
        </Button>
      </Grid>
    </Box>
  );
}