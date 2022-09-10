import * as React from 'react';
import {useState, useLayoutEffect} from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PartTimeShiftList from './PartTimeShiftList';
import BottomNavbar from './BottomNavbar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';

const shifts = ['1月前半シフト', '1月後半シフト', '2月前半シフト', '2月前半シフト', '3月前半シフト', '3月後半シフト'];

export default function PartTimeHome() {

  const [users, setUsers] = useState(null)
  const [fk, setFK] = useState(null)
  const [ranges, setRanges] = useState(null)
  const navigate = useNavigate();
  let fk;

  useLayoutEffect(() => {
    let store_FK;
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
                    store_FK = res.data.store_FK;
                    setFK(store_FK)
                    console.log(res.data);
                    axios
                    .get('http://localhost:8000/api/shift_range/?store_FK='+store_FK,{
                        headers: {
                            'Authorization': `JWT ${localStorage.getItem('access')}`,
                        }
                    })
                    .then(res=>{setUsers(res.data);
                                console.log(res.data);
                                setRanges(res.data);
                            })
                    .catch(err=>{
                      console.log(err);
                      axios
                      .get('http://localhost:8000/api/shift_range/?store_FK='+store_FK,{
                          headers: {
                              'Authorization': `JWT ${localStorage.getItem('access')}`,
                          }
                      })
                      .then(res=>{setUsers(res.data);
                                  console.log(res.data);
                                  setRanges(res.data)
                              })
                      .catch(err=>{
                        console.log(err);
                        setRanges([])
                      });
                    });
                })
        .catch(err=>{
          console.log(err);

        });
  }, []);
  if (!users || !ranges) return null;
  // 店長アカウントははじく
  else if (users.is_manager === true) {
    return navigate("/*")
  }else if(ranges.length === 0){
    return(
      <Grid container spacing={0} alignItems='center' justifyContent='center' direction="column" style={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                  <AddBusinessIcon fontSize="large" sx={{ fontSize: 80, color: '#707070' }}/>
                </Grid>
                <Grid item xs={12}>
                    <p><Typography fontSize={24}><font color='#707070'>シフトがまだ作成されていません</font></Typography></p>
                </Grid>
                <Grid item xs={12}>
                    <font color='#707070' align='center'>
                      <p>店長がまだシフト範囲を決めていないようです<br/>
                      シフト範囲が作成されるのを待ちましょう！
                      </p>
                    </font>
                </Grid>
              </Grid>
    )
  }
  return (
    <>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Typography fontSize={20}>シフト一覧</Typography>

        {ranges.map((val) =>
          <PartTimeShiftList shiftName={val.shift_name} fk={val.id} />
        )}

      </Container>
    </>
  )
}