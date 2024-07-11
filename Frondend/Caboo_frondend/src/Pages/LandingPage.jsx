import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Landing_Form from "../Components/LandingPage_form";

const LandingPage = () => {
  const headprops={
     ride:true,
     drive:true,
    user:false

  }
  return (
    <div>
      <div className="h-20 bg-black">
      <Header headprops={headprops} />

      </div>
      <div className="h-screen bg-black flex">
        <Landing_Form />
      </div>

      <div className="h-screen">
      </div>

      <div className="h-screen "></div>
      <Footer />
    </div>
  );
};

export default LandingPage;
