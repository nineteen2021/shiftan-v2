import './App.css';
import MiniDrawer from './components/Navbar'
import SimpleNavbar from './components/SimpleNavbar';
import NewAccount from './components/views/NewAccount'
import SignUp from './components/RegisterStore';
import Login from './components/views/Login';

function App() {
  return (
    <>
      <Login />
    </> 
  );
}

export default App;

/*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button variant="outlined">Material-UI ボタン</Button>
      </header>
    </div>*/