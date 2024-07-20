import React from 'react'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import UserHome_main from '../../Components/user_side/UserHome_main';

const UserHome = () => {
    const headprops = {
        ride: false,
        drive: false,
        user: true,
      };
  return (
    <div>
        <div>
        <Header headprops={headprops} />
        </div>
        <div className='h-screen bg-black flex justify-center items-center '>

            <UserHome_main />

        </div>
        <div>
            <Footer />
        </div>
    </div>
  )
}

export default UserHome