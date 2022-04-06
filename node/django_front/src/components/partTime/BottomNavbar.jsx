import * as React from 'react';
import '../../App.css'
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function BottomNavbar() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: '100%', height: '56px', position: 'fixed', bottom: '0', background: '#586365' }}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Button sx={{ mr: "5em", mb: 1 }} className="bottomButton" startIcon={<HomeIcon className="bottomIcon" />}>
          ホーム 
        </Button>
        <Button sx={{ ml: "5em", mb: 1 }} className="bottomButton" startIcon={<SettingsIcon className="bottomIcon" />}>
          設定 
        </Button>
      </Grid>
    </Box>
  );
}