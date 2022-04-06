import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'; 
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

        <Route path="/" />

        <Route path="login" element={<Login />} />

        <Route path="sentPasswordMail" element={<SentPasswordMail />} />

        <Route path="resetPassword" element={<ResetPassword />} />

        <Route path="staffManager" element={<StaffManager />} />

        <Route path="register" element={<Register />} />

        <Route path="storeHome" element={<StoreHome />} />

        <Route path="makeShift" element={<MakeShift />} />

        <Route path="settigns" element={<Settings />} />

        <Route path="shiftEditorDay" element={<ShiftEditorDay />} />

        <Route path="checkStore" element={<CheckStore />} />

        <Route path="partTimeAccountSettings" element={<PartTimeAccountSettings />} />

        <Route path="partTimeHome" element={<PartTimeHome />} />

        <Route path="partTimeRegister" element={<PartTimeRegister />} />

        <Route path="partTimeSettings" element={<PartTimeSettings />} />

        <Route path="shiftSubmit" element={<ShiftSubmit />} />
        
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;