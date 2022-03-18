import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        しふたん
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function ResetPassword() {

    const [error, setError] = React.useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
            password: data.get('password'),
            password2: data.get('password2'),
        });
        
        if (data.get('password') === data.get('password2')){
            //もしパスワードと再確認用のパスワードが一致したら
            console.log("一致");
            setError(false);
        } else {
            //もしパスワードと再確認用のパスワードが一致しなかったら
            setError(true);
            console.log("不一致");
        }
    };

  return (
    <ThemeProvider theme={theme}>
    <Collapse in={error}>
    <Alert severity="error">パスワードが一致しません</Alert>
    </Collapse>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 16,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          再設定するパスワードを入力してください
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="パスワード"
              name="password"
              type="password"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password2"
              label="パスワード(再確認)"
              type="password"
              id="password2"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              パスワードを再設定
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 16, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}