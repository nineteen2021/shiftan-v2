import * as React from 'react';
import Typography from '@mui/material/Typography';
import SimpleNavbar from '../function/SimpleNavbar';
import { useLocation, Link as routerLink } from "react-router-dom"
import Button from '@mui/material/Button';


export default function FinishStoreRegister(props) {
    const search = useLocation().search;
    const query2 = new URLSearchParams(search);
    return (
        <>
            <SimpleNavbar />
            <Typography sx={{ mt: 10, mb: 3 }} variant="h4" gutterBottom align="center">
                店舗を登録しました
            </Typography>
            <Typography variant="body1" gutterBottom align="center">
                店舗登録が正常に完了しました。<br /><br/>
                <Button variant="outlined"
                    component={routerLink}
                    to="/storeHome"
                >
                    ホームへ戻る
                </Button>
            </Typography>
        </>
    )
}