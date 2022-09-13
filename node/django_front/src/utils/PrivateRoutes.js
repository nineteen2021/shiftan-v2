import { getBottomNavigationUtilityClass } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoutes = () => {
    const auth = useAuth();
    console.log(auth);
    console.log('Private route works!');
    return(
        auth.accessToken != "undefined" ? <Outlet/> : <Navigate to='/login'/>
    )
}
export default PrivateRoutes