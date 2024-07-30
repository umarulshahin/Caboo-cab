import React, { useEffect } from 'react'
import Footer from '../../Components/Footer'
import UserHome_main from '../../Components/user_side/UserHome_main';
import useGetUser from '../../Hooks/useGetUser';
import { user_data_url } from '../../Utils/Constanse';
import User_header from '../../Components/user_side/User_header';

const UserHome = () => {
  
      const {Get_data}=useGetUser()
    
      useEffect(()=>{
        Get_data(user_data_url)
      },[])
  return (
    <div>
        <div>
          <User_header />
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