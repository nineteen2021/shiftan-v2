import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom'; 
import PartTimeNavbar from './components/partTime/PartTimeNavbar';
import Navbar from './components/store/Navbar';
import Login from './components/function/Login';
import SentPasswordMail from './components/function/SentPasswordMail';
import ResetPassword from './components/function/ResetPassword';
import FinishResetPassword from './components/function/FinishResetPassword';
import Register from './components/store/Register';
import StoreHome from './components/store/StoreHome';
import MakeShift from './components/store/MakeShift';
import StaffManager from './components/store/StaffManager';
import Settings from './components/store/Settings';
import PartTimeRegister from './components/partTime/PartTimeRegister';
import PartTimeHome from './components/partTime/PartTimeHome';
import ShiftSubmit from './components/partTime/ShiftSubmit';
import PartTimeSettings from './components/partTime/PartTimeSettings';
import Certification from './components/store/Certification';
import ButtomNavbar from './components/partTime/BottomNavbar'

const App = () => {
  return (
  <BrowserRouter>
    <div>
      <Routes>

        <Route path="/" element={<Login />}/>

        <Route path="login" element={<Login />} />

        <Route path="sentPasswordMail" element={<SentPasswordMail />} />

        <Route path="resetPassword" element={<ResetPassword />} /> {/*メールから飛ぶリンクのため未実装*/}

        <Route path="/finishResetPassword" element={<FinishResetPassword />}/>

        <Route path="register" element={<Register />} />

        <Route path="storeHome" element={<Navbar contents={<StoreHome />}/>} />

        <Route path="makeShift" element={<Navbar contents={<MakeShift />}/>} />

        <Route path="staffManager" element={<Navbar contents={<StaffManager />}/>} />

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