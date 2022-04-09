import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import LogoImg from "../title.svg";
import "../../App.css"

export default function SimpleNavbar() {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{
          background: "#4DC0B2"
      }}>
        <Toolbar>
        <img src={LogoImg} alt="logo" className='App-logo'></img>
        </Toolbar>
      </AppBar>
    </Box>
  );
}