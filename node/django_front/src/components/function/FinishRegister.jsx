import * as React from 'react';
import Typography from '@mui/material/Typography';
import SimpleNavbar from './SimpleNavbar';
import { useLocation } from "react-router-dom"


export default function FinishRegister(props) {
    const search = useLocation().search;
    const query2 = new URLSearchParams(search);
    return (
        <>
        <SimpleNavbar />
            <Typography sx={{mt: 10, mb: 3}} variant="h4" gutterBottom align="center">
                メールを送信しました
            </Typography>
            <Typography variant="body1" gutterBottom align="center">
                アカウント登録確認メールを"{query2.get('email')}"宛に送信しました。
                <br />メールをお受け取りになりましたら、メールに記載された<br />URLをクリックしアカウントを有効化してください。
                <br />メールが届かない場合は迷惑メールフィルターをご確認ください。
            </Typography>
        </>
    )
}