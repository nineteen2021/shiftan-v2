import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#37AB9D',
      contrastText: "#fff",
    },
    secondary: {
      main: '#FFC042',
    },
  },
});

/*
基本的にコンポーネントは緑色になります（primaryなので）
テーマのsecondaryの色（黄色）を使いたい場合はタグの中にcolor="secondary"を記述する
*/

ReactDOM.render(

  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
