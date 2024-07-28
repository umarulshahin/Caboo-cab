import React, { useEffect } from 'react'
import Driver_Header from '../../Components/Driver/Driver_Header'
import Footer from '../../Components/Footer'
import useGetUser from '../../Hooks/useGetUser'
import { Driver_data_urls } from '../../Utils/Constanse'
import { useSelector } from 'react-redux'

const Driver_home = () => {
 const {Get_data}=useGetUser()
 const driver = useSelector((state) => state.driver_data.driver_data);

 console.log(driver,'driver dataas')
//  useEffect(()=>{
//     Get_data(Driver_data_urls,email,"driver");
// },[])
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