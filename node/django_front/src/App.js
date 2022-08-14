import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom'; 
import PartTimeNavbar from './components/partTime/PartTimeNavbar';
import Navbar from './components/store/Navbar';
import Login from './components/function/Login';
import SentPasswordMail from './components/function/SentPasswordMail';
import ResetPassword from './components/function/ResetPassword';
import FinishResetPassword from './components/function/FinishResetPassword';
import Register from './components/store/Register';
import StoreRegister from './components/store/StoreRegister';
import StoreHome from './components/store/StoreHome';
import MakeShift from './components/store/MakeShift';
import StaffManager from './components/store/StaffManager';
import Settings from './components/store/Settings';
import PartTimeRegister from './components/partTime/PartTimeRegister';
import PartTimeHome from './components/partTime/PartTimeHome';
import ShiftSubmit from './components/partTime/ShiftSubmit';
import PartTimeSettings from './components/partTime/PartTimeSettings';
import Certification from './components/store/Certification';
import BottomNavbar from './components/partTime/BottomNavbar';
import Activate from './components/function/Activate';

const App = () => {
  return (
    <AuthProvider>
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="storeRegister" element={<StoreRegister />} />
          <Route path="activate" element={<Activate />} />
          <Route path="partTimeRegister" element={<PartTimeRegister />} />
          <Route path="*" element={<NoMatch />}/>

          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Navbar contents={<StoreHome />}/>}/> {/* exact ... 部分一致を防ぐ */}

            <Route path="sentPasswordMail" element={<SentPasswordMail />} />

            <Route path="resetPassword" element={<ResetPassword />} /> {/*メールから飛ぶリンクのため未実装*/}

            <Route path="finishResetPassword" element={<FinishResetPassword />}/>

            {/* <Route path="storeHome" element={<Navbar contents={<StoreHome />}/>} /> */}

            <Route path="makeShift" element={<Navbar contents={<MakeShift />}/>} />

            <Route path="staffManager" element={<Navbar contents={<StaffManager />}/>} />

            <Route path="certification" element={<Navbar contents={<Certification />}/>}/>

            <Route path="settings" element={<Navbar contents={<Settings />}/>} />

            <Route path="partTimeHome"
              element={ 
                <>
                <PartTimeNavbar contents={<PartTimeHome />}/>
                <BottomNavbar/>
                </>
              }
            />

            <Route path="shiftSubmit" 
              element={ 
                <>
                <PartTimeNavbar contents={<ShiftSubmit />}/>
                <BottomNavbar/>
                </>
              }
            /> {/*未実装*/}

            <Route path="partTimeSettings" 
            element={ 
              <>
              <PartTimeNavbar contents={<PartTimeSettings />}/>
              <BottomNavbar/>
              </>
            }
            />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  </AuthProvider>
  );
}

export default App;