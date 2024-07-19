import React from 'react'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import OtpForm from '../../Components/user_side/OtpFrom'

const OtpVerification = () => {
    const headprops={
        ride:false,
        drive:false,
       user:true
   
     }
  return (
    <div>
        <div>
        <Header headprops={headprops} />

        </div>
        <div className='h-screen flex items-center justify-center bg-black'>
             <OtpForm />
        </div>
        <>
        <Footer />

        </>
    </div>
  )
}

export default OtpVerification