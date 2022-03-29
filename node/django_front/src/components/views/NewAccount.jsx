import React from 'react';
import Button from '@mui/material/Button'
import { ButtonGroup } from '@mui/material';


const NewAccount = () => {
  return (
    <ButtonGroup
    type="submit"
    fullWidth
    variant="contained"
    sx={{ mt: 3, mb: 2 }}
    >
      <Button variant="contained" >店舗アカウント作成</Button>
      <Button variant="contained" >アルバイトアカウント作成</Button>
    </ButtonGroup>
  )
};
export default NewAccount