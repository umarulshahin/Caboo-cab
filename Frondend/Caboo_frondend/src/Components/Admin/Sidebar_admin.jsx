import React from 'react'
import { NavLink } from "react-router-dom"

const Sidebar_admin = () => {
  return (
    <>  
        <div className="mt-14 flex flex-col items-center space-y-4 w-full max-w-xs mx-auto">
    <NavLink 
      to='/admin_home' 
      className="font-bold text-xl w-full text-center py-2 px-4  hover:bg-gray-300 rounded"
    >
      Dashboard
    </NavLink>
    <NavLink 
      to='/trip' 
      className="font-bold text-xl w-full text-center py-2 px-4  hover:bg-gray-300 rounded"
    >
      Trips
    </NavLink>
  
    <span className="font-bold text-2xl w-full px-4">
      Datas
    </span>
    <NavLink 
      to='/User_list' 
      className="font-bold text-xl w-full text-center py-2 px-4  hover:bg-gray-300 rounded"
    >
      Users
    </NavLink>
    <NavLink 
      to='/Driver_list' 
      className="font-bold text-xl w-full text-center py-2 px-4  hover:bg-gray-300 rounded"
    >
      Drivers
    </NavLink>
  </div>
  </>
  )
}

export default Sidebar_admin