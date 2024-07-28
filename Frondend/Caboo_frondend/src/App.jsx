import React from "react";
import LandingPage from "./Pages/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin_selection from "./Pages/Signin_selection";
import { appStore, persist } from "./Redux/Store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster, toast } from 'sonner'
import UserHome from "./Pages/user_side/UserHome";
import UserProfile from "./Pages/user_side/UserProfile";
import PrivatRoute from "./PrivatRoute";
import PrivatRoute_user from "./PrivatRoute_user";
import Admin_home from "./Pages/Admin/Admin_home";
import "./App.css";
import User_list from "./Pages/Admin/User_list";
import WaitingModal from "./Components/Driver/WaitingModal";
import Driver_list from "./Pages/Admin/Driver_list";
import Documents from "./Pages/Admin/Documents";
import Signup from "./Pages/Authentication/Signup";
import OtpForm from "./Components/Authentication/OtpFrom";
import Vehicle_doc from "./Pages/Authentication/Vehicle_doc";
import AdminPrivatRoute from "./AdminPrivatRoute";
import Admin_Signin from "./Pages/Authentication/Admin_Signin";
import Driver_home from "./Pages/Driver/Driver_home";
import Driver_PrivatRoute from "./Driver_PrivatRoute";


const App = () => {
  return (
    <div>
      <Provider store={appStore}>
        <PersistGate loading={null} persistor={persist}>
          <BrowserRouter>
          <Toaster position="bottom-center" richColors/>
            <Routes>

              <Route path="/" element={<PrivatRoute><LandingPage /></PrivatRoute>} />
              <Route path="/signin_selection" element={<PrivatRoute><Signin_selection /></PrivatRoute>} />
              <Route path="/signup" element={<PrivatRoute><Signup /></PrivatRoute>} />
              <Route path="/userhome" element={ <PrivatRoute_user><UserHome /></PrivatRoute_user> } />
              <Route path="/userprofile" element={ <PrivatRoute_user><UserProfile/></PrivatRoute_user>}/>
              <Route path="/otpverification" element={<OtpForm />} />

              <Route path="/admin" element={<AdminPrivatRoute><Admin_Signin /></AdminPrivatRoute>} />
              <Route path="/admin_home" element={<Admin_home />} />
              <Route path="/User_list" element={<User_list />} />
              <Route path="/Driver_list" element={<Driver_list />} />
              <Route path="/Documents" element={<Documents />} />

            
              <Route path='/vehicle_doc' element={<Vehicle_doc /> } />
              <Route path='/waitingModal' element={<WaitingModal /> } />

              <Route path="/driver_home" element={<Driver_PrivatRoute> <Driver_home /> </ Driver_PrivatRoute>} />

            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
};

export default App;
