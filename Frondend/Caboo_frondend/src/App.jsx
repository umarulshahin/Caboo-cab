import React from "react";
import LandingPage from "./Pages/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing_Form from "./Components/LandingPage_layer1";
import LandingPage_layer2 from "./Components/LandingPage_layer2";
import Signin_selection from "./Pages/Signin_selection";
import Signup from "./Pages/Signup";
import { appStore, persist } from "./Redux/Store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import OtpVerification from "./Pages/OtpVerification";

const App = () => {
  return (
    <div>
      <Provider store={appStore}>
        <PersistGate loading={null} persistor={persist}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/first_layout" element={<Landing_Form />} />
              <Route path="/second_layout" element={<LandingPage_layer2 />} />
              <Route path="/signin_selection" element={<Signin_selection />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/otpverify" element={<OtpVerification />} />

            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
};

export default App;
