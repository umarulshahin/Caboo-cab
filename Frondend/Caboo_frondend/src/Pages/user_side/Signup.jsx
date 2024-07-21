import React, { useEffect } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Signup_page from "../../Components/user_side/Signup_page";
import Cookies from "js-cookie"

const Signup = () => {

  
  const headprops = {
    ride: false,
    drive: false,
    user: false,
  };


  // useEffect(()=>{
  //   const cookie=Cookies.get('userTokens')
  //   if(cookie){

  //   }
  // },[])
  return (
    <div>
      <div>
      <Header headprops={headprops} />
      </div>
      <div>
         <Signup_page />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Signup;
