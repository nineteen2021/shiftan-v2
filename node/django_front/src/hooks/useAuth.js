import { createContext, useContext, useMemo } from "react";
import axios from "axios";
import { useAccessToken } from "./useAccessToken";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useAccessToken();
    // const [refreshToken, setRefreshToken]

    const login = async (email, password) => {
        let flag;
        const res = await axios.post(process.env.REACT_APP_API_URL + '/api-auth/jwt/create/', {
            email: email,
            password: password
        })
        .then(res=>{
            setAccessToken(res.data.access);
            window.localStorage.setItem("access", res.data.access);
            window.localStorage.setItem("refresh", res.data.refresh);
            return flag=true;
        })
        // TODO: エラー処理。現時点では正常系のみ想定したコードになっている
        .catch((error) => {
            console.log(error);
            alert("メールアドレスかパスワードが違います。");
            return flag=false;
        })
        return flag;
    };

    const logout = () => {
        window.localStorage.clear()
    };

    // useMemoで何度も関数が繰り返されるのを防ぐ
    const value = useMemo(
        () => ({
            accessToken,
            login,
            logout
        }),
        [accessToken]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};