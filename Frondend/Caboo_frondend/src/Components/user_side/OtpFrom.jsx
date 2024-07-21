import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useFormsubmition from '../../Hooks/useFormsubmition';
import { Otpverify_url } from '../../Utils/Constanse';
import Cookies from "js-cookie"

const OtpForm = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const [errormessage,seterrormessage]=useState('')

  const email=useSelector((state)=>state.signup_data.email)
  const { otpverify } = useFormsubmition()
  
  useEffect(()=>{

  
   const user_token=Cookies.get("User_Tokens")
   if(user_token){

    Navigate(-1)

   }

    },[])
  

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus on next input
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move to previous input if backspace is pressed
    if (e.key === "Backspace" && !otp[index] && index !== 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = () => {
    const otpValue = otp.join("");
    console.log(otpValue.length)
    if(otpValue.length !== 6){
      seterrormessage('OTP must be 6 digits long and all fields must be filled.')
      return
    }
      seterrormessage('')
      const data={
        otp:otpValue,
        email:email
      }
      console.log(data)
      otpverify(data,Otpverify_url,seterrormessage)
    
    
  };

  return (
    <div className="flex flex-col items-center mt-10">
        <div className='text-black flex flex-col items-center '>
            <span className='font-bold text-2xl'>OTP Verification</span>
            <br />
            <span className='pt-2'>One Time Password (OTP) has been sent via mail to 
             </span>
             <span className='p-2'>{email}</span>
        </div>
      <div className="flex space-x-2">
        {otp.map((data, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={data}
            ref={(el) => (inputRefs.current[index] = el)}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onFocus={(e) => e.target.select()}
            className="w-10 h-10 border border-gray-300 text-center text-xl rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            
          />
        ))}

      </div>
      <span className='text-red-500 pt-2 '>{errormessage ? errormessage:""}</span>

      <button 
        onClick={handleSubmit}
        className="mt-5 px-4 py-2 bg-black text-white rounded hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
      >
        Verify OTP
      </button>
    </div>
  );
};

export default OtpForm;
