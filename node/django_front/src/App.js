import MiniDrawer from './components/Navbar'
import SimpleNavbar from './components/SimpleNavbar';
import NewAccount from './components/views/NewAccount'
import SignUp from './components/RegisterStore';
import Login from './components/views/Login';
import Settings from './components/Settings';
import AccountSettings from './components/AccountSettings';

//colorは濃い緑#37AB9D, 緑#4DC0B2, 黄色#FFC042, 黒#586365を使って合わせること

function App() {
  return (
    <>
      <MiniDrawer title="テスト" contents={<Settings />} />
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