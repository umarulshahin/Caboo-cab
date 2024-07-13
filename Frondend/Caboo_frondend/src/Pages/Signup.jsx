import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Signup_page from "../Components/Signup_page";

const Signup = () => {
  const headprops = {
    ride: false,
    drive: false,
    user: false,
  };
  return (
    <div>
      <div>
      <Header headprops={headprops} />
      </div>
      <div>
         <Signup_page></Signup_page>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Signup;
