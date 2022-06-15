import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    let auth = {'token':false}  // tokenがあるかないかtrue false

    // ここまだ実装できてない


    console.log('Private route works!')
    return(
            auth.token ? <Outlet/> : <Navigate to='/login'/>
    )
}
export default PrivateRoutes