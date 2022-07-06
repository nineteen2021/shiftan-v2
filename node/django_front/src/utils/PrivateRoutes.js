import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoutes = () => {
    const auth = useAuth();
    console.log(auth);

    console.log('Private route works!');
    return(
        auth.accessToken != null ? <Outlet/> : <Navigate to='/login'/>
    )
}
export default PrivateRoutes