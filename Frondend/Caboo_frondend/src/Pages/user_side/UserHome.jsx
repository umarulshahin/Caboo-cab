import React, { useEffect } from 'react'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import UserHome_main from '../../Components/user_side/UserHome_main';
import useGetUser from '../../Hooks/useGetUser';
import { user_data_url } from '../../Utils/Constanse';
const UserHome = () => {
    const headprops = {
        ride: false,
        drive: false,
        user: true,
      };
      const {Get_data}=useGetUser()
    
      useEffect(()=>{
        Get_data(user_data_url)
      },[])
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