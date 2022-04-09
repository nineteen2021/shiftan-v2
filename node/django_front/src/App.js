import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom'; 
import PartTimeNavbar from './components/partTime/PartTimeNavbar';
import Navbar from './components/store/Navbar';
import Login from './components/function/Login';
import SentPasswordMail from './components/function/SentPasswordMail';
import ResetPassword from './components/function/ResetPassword';
import StaffManager from './components/store/StaffManager';
import Register from './components/store/Register';
import StoreHome from './components/store/StoreHome';
import MakeShift from './components/store/MakeShift';
import Settings from './components/store/Settings';
import PartTimeAccountSettings from './components/partTime/PartTimeAccountSettings';
import PartTimeHome from './components/partTime/PartTimeHome';
import PartTimeRegister from './components/partTime/PartTimeRegister';
import PartTimeSettings from './components/partTime/PartTimeSettings';
import ShiftSubmit from './components/partTime/ShiftSubmit';
import Certification from './components/store/Certification';
import ButtomNavbar from './components/partTime/BottomNavbar'



const App = () => {
  return (
  <BrowserRouter>
    <div>
      <Routes>

        <Route path="/a" element={<Certification />}/> {/*テスト*/}

        <Route path="/" element={<Login />}/>

        <Route path="login" element={<Login />} />

        <Route path="sentPasswordMail" element={<SentPasswordMail />} />

        <Route path="resetPassword" element={<ResetPassword />} /> {/*未実装*/}

        <Route path="staffManager" element={<Navbar contents={<StaffManager />}/>} />

        <Route path="register" element={<Register />} />

        <Route path="storeHome" element={<Navbar contents={<StoreHome />}/>} />

        <Route path="makeShift" element={<Navbar contents={<MakeShift />}/>} />

        <Route path="settings" element={<Navbar contents={<Settings />}/>} />

        <Route path="partTimeAccountSettings" 
          element={ 
            <>
            <PartTimeNavbar contents={<PartTimeAccountSettings />}/>
            <ButtomNavbar/>
            </>
          }
        />

        <Route path="partTimeHome"
          element={ 
            <>
            <PartTimeNavbar contents={<PartTimeHome />}/>
            <ButtomNavbar/>
            </>
          }
        />

        <Route path="partTimeRegister" element={<PartTimeRegister />} />

        <Route path="partTimeSettings" 
        element={ 
          <>
          <PartTimeNavbar contents={<PartTimeSettings />}/>
          <ButtomNavbar/>
          </>
        }
        />

        <Route path="shiftSubmit" 
          element={ 
            <>
            <PartTimeNavbar contents={<ShiftSubmit />}/>
            <ButtomNavbar/>
            </>
          }
        /> {/*未実装*/}
        
      </Routes>
    </div>
    
  </BrowserRouter>
  );
}

export default App;