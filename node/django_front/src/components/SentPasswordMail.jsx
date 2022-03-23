import * as React from 'react';
import Typography from '@mui/material/Typography';


export default function SentPasswordMail(props) {

    return (
        <Typography variant="body1" gutterBottom>
            パスワードの再設定メールを"{props.mail}"宛に送信しました。
            <br />メールが届かない場合は迷惑メールフィルターをご確認ください。
        </Typography>
    )
}