import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'; 
import PartTimeNavbar from './components/partTime/PartTimeNavbar'
import Navbar from './components/store/Navbar'
import Login from './components/function/Login';
import SentPasswordMail from './components/function/SentPasswordMail';
import ResetPassword from './components/function/ResetPassword';
import StaffManager from './components/store/StaffManager';
import Register from './components/store/Register';
import StoreHome from './components/store/StoreHome';
import MakeShift from './components/store/MakeShift';
import Settings from './components/store/Settings';
import ShiftEditorDay from './components/store/ShiftEditorDay';
import CheckStore from './components/partTime/CheckStore';
import PartTimeAccountSettings from './components/partTime/PartTimeAccountSettings';
import PartTimeHome from './components/partTime/PartTimeHome';
import PartTimeRegister from './components/partTime/PartTimeRegister';
import PartTimeSettings from './components/partTime/PartTimeSettings';
import ShiftSubmit from './components/partTime/ShiftSubmit';



const App = () => {
  return (
  <BrowserRouter>
    <div>
      <Routes>

        <Route path="/" element={<Login />}/>

        <Route path="login" element={<Login />} />

        <Route path="sentPasswordMail" element={<SentPasswordMail />} />

        <Route path="resetPassword" element={<ResetPassword />} /> //後回し

        <Route path="staffManager" element={<Navbar contents={<StaffManager />}/>} /> //後回し

        <Route path="register" element={<Register />} />

        <Route path="storeHome" element={<Navbar contents={<StoreHome />}/>} />

        <Route path="makeShift" element={<Navbar contents={<MakeShift />}/>} />

        <Route path="settings" element={<Navbar contents={<Settings />}/>} />

        <Route path="shiftEditorDay" element={<Navbar contents={<ShiftEditorDay />}/>} />

        <Route path="checkStore" element={<PartTimeNavbar contents={<CheckStore />}/>} />

        <Route path="partTimeAccountSettings" element={<PartTimeNavbar contents={<PartTimeAccountSettings />}/>} />

        <Route path="partTimeHome" element={<PartTimeNavbar contents={<PartTimeHome />}/>} />

        <Route path="partTimeRegister" element={<PartTimeRegister />} />

        <Route path="partTimeSettings" element={<PartTimeNavbar contents={<PartTimeSettings />}/>} />

        <Route path="shiftSubmit" element={<PartTimeNavbar contents={<ShiftSubmit />}/>} />
        
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;