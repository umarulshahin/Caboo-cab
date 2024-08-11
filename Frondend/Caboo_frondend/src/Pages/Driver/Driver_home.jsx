import React, { useEffect } from 'react'
import Driver_Header from '../../Components/Driver/Driver_Header'
import Footer from '../../Components/Footer'
import useGetUser from '../../Hooks/useGetUser'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import useDriverWebSocket from '../../Socket/DriverSocket'

const Driver_home = () => {

  useDriverWebSocket()

 const {Get_data}=useGetUser()
 const driver = useSelector((state) => state.driver_data.driver_data);
 useEffect(() => {
  const message = localStorage.getItem('loginMessage');

  if (message) {
    toast.success(message);

    localStorage.removeItem('loginMessage');
  }

}, []);



  return (
    <div>
        <div>
           <Driver_Header />

        </div>
        <div className='h-screen bg-black'>
         
        </div>
        <div>
            <Footer />
        </div>
    </div>
  )
}

export default Driver_home