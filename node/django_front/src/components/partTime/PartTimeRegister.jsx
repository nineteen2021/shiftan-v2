import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SimpleNavbar from '../function/SimpleNavbar';
import green from '@mui/material/colors/green';
import { Link as routerLink } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Terms from '../Terms';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Shiftan
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({
  palette: {
    primary: green,
  },
});

export default function PartTimeRegister() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const [selectedItem, setSelectedItem] = React.useState('')

    const onOpenDialog = (name) => {
        setSelectedItem(name)
    }

    const onCloseDialog = () => {
        setSelectedItem('')
    }

  return (
    <>
    <SimpleNavbar/>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Grid container justifyContent="flex-start">
            <Grid item sx={{ mt: 2 }}>
              <Typography component="h1" variant="h5">
                アルバイトアカウント作成
              </Typography>
            </Grid>
          </Grid>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="userID"
                  label="ユーザーID（後から変更不可）"
                  name="userID"
                  autoComplete="userID"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="family-name"
                  name="lastName"
                  required
                  fullWidth
                  id="lastName"
                  label="苗字"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="firstName"
                  label="名前"
                  name="firstName"
                  autoComplete="given-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="メールアドレス"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="パスワード"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}
              >
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="パスワード（確認のため再入力してください）"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid sx={{ ml: 2, mt: 2}}>
                <Link onClick={() => onOpenDialog("term")}>
                  利用規約
                </Link>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="利用規約に同意する"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              component={routerLink}
              to="/partTimeHome"
            >
              アカウントを作成
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link 
                component={routerLink}
                to="/login"
                variant="body2"
                >
                  すでにアカウントを持っている方はこちら
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
    <Dialog open={selectedItem === "term"}
            onClose={onCloseDialog}
            scroll="paper"
            fullWidth="true"
            maxWidth="md"
    >
      <DialogTitle>利用規約</DialogTitle>
      <DialogContent>
          <DialogContentText>
              
          </DialogContentText>
              <Terms/>
          </DialogContent>
      <DialogActions>
          <Button onClick={onCloseDialog}>OK</Button>
      </DialogActions>
    </Dialog>
  </>
  );
}