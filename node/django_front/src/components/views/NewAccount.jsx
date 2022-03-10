import React from 'react';
import Link from 'react-router-dom';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

const NewAccount = () => {
  return (
    <Box sx={{ '& button': { m: 3 } }}>
    <div>
      <Button variant="contained" size="large">店舗アカウント</Button>
      <Button variant="contained" size="large">アルバイトアカウント</Button>
    </div>
    </Box>
  );
};
export default NewAccount