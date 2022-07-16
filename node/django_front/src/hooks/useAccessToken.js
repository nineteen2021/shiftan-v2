import { Refresh } from "../components/function/endPoint/Refresh";
import { Verify } from "../components/function/endPoint/Verify";
import { useLocalStorage } from "./useLocalStorage";

export const useAccessToken = () => {
    // TODO: アクセストークンの有効期限チェック
    const accessCheck = Verify(window.localStorage.getItem('access'))
    console.log("Verify:" + accessCheck);
    // TODO: リフレッシュトークンを用いたアクセストークンの自動再取得
    // if (accessCheck === false) {
    //     // refreshが使えれば新しいアクセストークンとリフレッシュトークンを保存し、使えなければトークンをundefinedにする
    //     console.log("Refresh実行")
    //     Refresh(window.localStorage.getItem('refresh'))
    // }
    const access = useLocalStorage("access", "undefined")
        console.log("access:" + window.localStorage.getItem('access'))
        useLocalStorage("refresh", "undefined")
        console.log("refresh:" + window.localStorage.getItem('refresh'))
    
    return (
        access
        );
    
    // undefinedを返せば、呼び出し元は未ログインと認識する
}