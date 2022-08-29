import * as React from 'react';
import {useState, useLayoutEffect} from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PartTimeShiftList from './PartTimeShiftList';
import BottomNavbar from './BottomNavbar';

const shifts = ['1月前半シフト', '1月後半シフト', '2月前半シフト', '2月前半シフト', '3月前半シフト', '3月後半シフト'];

export default function PartTimeHome() {

  const [users, setUsers] = useState(null)
  const navigate = useNavigate();
  useLayoutEffect(() => {
    axios
        .get('http://localhost:8000/api-auth/users/me/',{
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`, // ここを追加
            }
        })
        .then(res=>{setUsers(res.data);
                    console.log(res.data);
                })
        .catch(err=>{console.log(err);});
  }, []);
  if (!users) return null;
  // 店長アカウントははじく
  else if (users.is_manager === true) {
    return navigate("/*")
  }
  return (
    <>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Typography fontSize={20}>シフト一覧</Typography>

        {shifts.map((val) =>
          <PartTimeShiftList shiftName={val} />
        )}

      </Container>
    </>
  )
}