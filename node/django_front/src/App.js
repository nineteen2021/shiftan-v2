import './App.css';
import MiniDrawer from './components/Navbar'
import SimpleNavbar from './components/SimpleNavbar';
import SignUp from './components/views/RegisterStore';
import MakeShift from './components/views/MakeShift';

function App() {
  return (
    <>
      <MiniDrawer title = "絶対登録するな" contents= {<MakeShift />}/>
      
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
      </header>
    </div>*/