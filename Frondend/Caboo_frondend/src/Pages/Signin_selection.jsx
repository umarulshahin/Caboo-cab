import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { Link, useLocation } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'; // Import the arrow icon

const Signin_selection = () => {
    const headprops={
        ride:false,
        drive:false,
       user:false
   
     }

     let { state } = useLocation();
     const {signin}=state

  return (
    <div>
        <div>
        <Header headprops={headprops} />

        </div>
        {
        signin ?(
        <div className='h-screen bg-black text-white space-x-80 flex justify-center items-center font-medium text-xl underline' >
        <Link to="/" className='flex items-center'>
        Sign in to Ride <FaArrowRight className='ml-4 mt-2' />
      </Link>

      <Link to="/" className='flex items-center'>
        Sign in to Drive <FaArrowRight className="ml-4 mt-2" />
      </Link>

        </div>):

        (<div className='h-screen bg-black text-white space-x-80 flex justify-center items-center font-medium text-xl underline' >
        <Link to="/signup" className='flex items-center'>
        Sign up to Ride <FaArrowRight className='ml-4 mt-2' />
      </Link>

      <Link to="/" className='flex items-center'>
        Sign up to Drive <FaArrowRight className="ml-4 mt-2" />
      </Link>

        </div>)}
        
        <div>
          <Footer />
        </div>
    </div>
  )
}

export default Signin_selection