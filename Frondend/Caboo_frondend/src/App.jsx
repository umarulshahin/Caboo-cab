import React from "react";
import LandingPage from "./Pages/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing_Form from "./Components/LandingPage_layer1";
import LandingPage_layer2 from "./Components/LandingPage_layer2";
import Signin_selection from "./Pages/Signin_selection";
import Signup from "./Pages/user_side/Signup";
import { appStore, persist } from "./Redux/Store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster, toast } from 'sonner'
import UserHome from "./Pages/user_side/UserHome";
import UserProfile from "./Pages/user_side/UserProfile";
import PrivatRoute from "./PrivatRoute";
import PrivatRoute_user from "./PrivatRoute_user";
import Admin_Signin from "./Pages/Admin/Admin_Signin";
import Admin_home from "./Pages/Admin/Admin_home";
import "./App.css";
import User_list from "./Pages/Admin/User_list";
import Vehicle_doc from "./Pages/Driver/Vehicle_doc";
import WaitingModal from "./Components/Driver/WaitingModal";
import Driver_list from "./Pages/Admin/Driver_list";
import Documents from "./Pages/Admin/Documents";


const App = () => {
  return (
    <div>
      <Provider store={appStore}>
        <PersistGate loading={null} persistor={persist}>
          <BrowserRouter>
          <Toaster position="bottom-center" richColors/>
            <Routes>

              <Route path="/" element={<PrivatRoute><LandingPage /></PrivatRoute>} />
              {/* <Route path="/first_layout" element={<Landing_Form />} />
              <Route path="/second_layout" element={<LandingPage_layer2 />} /> */}
              <Route path="/signin_selection" element={<PrivatRoute><Signin_selection /></PrivatRoute>} />
              <Route path="/signup" element={<PrivatRoute><Signup /></PrivatRoute>} />
              <Route path="/userhome" element={ <PrivatRoute_user><UserHome /></PrivatRoute_user> } />
              <Route path="/userprofile" element={ <PrivatRoute_user><UserProfile/></PrivatRoute_user>}/>


              <Route path="/admin" element={<PrivatRoute><Admin_Signin /></PrivatRoute>} />
              <Route path="/admin_home" element={<Admin_home />} />
              <Route path="/User_list" element={<User_list />} />
              <Route path="/Driver_list" element={<Driver_list />} />
              <Route path="/Documents" element={<Documents />} />

              



              <Route path='/vehicle_doc' element={<Vehicle_doc /> } />
              <Route path='/waitingModal' element={<WaitingModal /> } />







            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
};

export default App;
