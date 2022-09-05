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
  const [shiftTables, setShiftTables] = useState(null);
  const navigate = useNavigate();
  let fk;

  useLayoutEffect(() => {
    axios
    .get('http://localhost:8000/api-auth/users/me/',{
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    })
    // fkの取得がうまく動作していない
    .then(res=>{
      fk = res.data.store_FK
      setUsers(res.data);
      console.log(res.data);
      console.log('http://localhost:8000/api/shift_range/?store_FK=' + String(fk))
      axios
        .get('http://localhost:8000/api/shift_range/?store_FK=' + String(fk),{
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        })
        .then(res=>{setShiftTables(res.data);
                    console.log(res.data);
                  }, [])
        .catch(err=>{
            console.log(err);
            console.log('再試行します');
            axios
            .get('http://localhost:8000/api/shift_range/?store_FK=' + String(fk),{
              headers: {
                  'Authorization': `JWT ${localStorage.getItem('access')}`
              }
            })
            .then(res=>{setShiftTables(res.data);
                        console.log(res.data);
                      }, [])
            .catch(err=>{console.log(err);})
          }
        )
    }, [])
    .catch(err=>{console.log(err);})
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

        {shiftTables?.map((shiftTable) =>
          <PartTimeShiftList shiftName={shiftTable.shift_name} />
        )}

      </Container>
    </>
  )
}