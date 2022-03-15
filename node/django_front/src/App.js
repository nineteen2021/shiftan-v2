import './App.css';
import MiniDrawer from './components/Navbar'
import SimpleNavbar from './components/SimpleNavbar';
import SignUp from './components/RegisterStore';
import StaffManager from './components/StaffManager'

function App() {
  return (
    <>
      <MiniDrawer title="テスト" contents={<StaffManager />} />
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