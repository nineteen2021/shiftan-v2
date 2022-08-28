import { getBottomNavigationUtilityClass } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoutes = async() => {
    const auth = useAuth();
    const [users, setUsers] = useState(null)
    console.log(auth);
    let userMe
    // const getUser = new Promise((resolved, rejected) => {
    //     (() => {
            // axios.get('http://localhost:8000/api-auth/users/me/',{
            //     headers: {
            //     'Authorization': `JWT ${localStorage.getItem('access')}`, // ここを追加
            //     }
            // })
            // .then(res=>{
            //     setUsers(res.data)
            //     console.log(res.data)
            //     userMe = res.data
            // })
    //         .catch(err=>{console.log(err)})
    //     })();
    // })

    await axios.get('http://localhost:8000/api-auth/users/me/',{
                headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`, // ここを追加
                }
            })
            .then(res=>{
                setUsers(res.data)
                console.log(res.data)
                userMe = res.data
            })

    console.log('Private route works!');
    return(
        auth.accessToken != "undefined" ? <Outlet/> : <Navigate to='/login'/>,
        userMe.is_manager === false ? <Outlet/> : <Navigate to='/*'/>
    )
}
export default PrivateRoutes