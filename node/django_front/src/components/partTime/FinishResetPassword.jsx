import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

export default function ResetPasswordMessage() {

    return (
        <>
         <Container component="main" maxWidth="xs">
            <Typography sx={{mt: 2, mb: 3}} variant="h4" gutterBottom align="center">
                パスワード再設定完了
            </Typography>
            <Typography variant="body1" gutterBottom align="center">
                パスワードの再設定が完了しました。
                <br />
                <br />新しいパスワードで再度ログインしてください。
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ログイン画面へ
            </Button>
        </Container>    
        </>
    )
}