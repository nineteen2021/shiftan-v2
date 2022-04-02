import * as React from 'react';
import Typography from '@mui/material/Typography';


export default function SentPasswordMail(props) {

    return (
        <>
            <Typography sx={{mt: 2, mb: 3}} variant="h4" gutterBottom align="center">
                メールを送信しました
            </Typography>
            <Typography variant="body1" gutterBottom align="center">
                パスワードの再設定メールを"{props.mail}"宛に送信しました。
                <br />メールをお受け取りになりましたら、メールに記載された<br />URLをクリックしパスワードを再設定してください。
                <br />メールが届かない場合は迷惑メールフィルターをご確認ください。
            </Typography>
        </>
    )
}