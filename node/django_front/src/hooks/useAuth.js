import { createContext, useContext, useMemo } from "react";
import axios from "axios";
import { useAccessToken } from "./useAccessToken";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useAccessToken();

    const login = async (email, password) => {
        const res = await axios.post('http://localhost:8000/api-auth/jwt/create/', {
            email: email,
            password: password
        })
        // TODO: エラー処理。現時点では正常系のみ想定したコードになっている
        .catch((error) => {
            console.log(error);
            alert("メールアドレスかパスワードが違います。");
        })

        // TODO: リフレッシュトークンをLocalStorageなどに保存
        // リフレッシュトークンの保存はここではなくuseAccessToken内で行う
        setAccessToken(res.data.access);
        return true;
    };

    const logout = () => {
        setAccessToken(undefined);
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