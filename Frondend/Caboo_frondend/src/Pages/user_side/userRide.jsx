
import React from 'react'
import User_header from '../../Components/user_side/User_header'
import Footer from '../../Components/Footer'
import UserRide_page from '../../Components/user_side/UserRide_page'
import { useSelector } from 'react-redux'
import { useState } from "react";

const UserRide = () => {
  const ridedriver = useSelector((state) => state.ride_data.rideDriverdetails);
  
  // State for managing active tab
  const [selectedTab, setSelectedTab] = useState('Current Ride');


  return (
    <div className='min-h-screen'>
      <User_header />
      <div className="container body flex flex-row items-start ml-10 mt-36 ">
      <div className="tabs flex space-x-4 p-3 bg-black rounded-md">
        <input

          type="radio"
          id="Current Ride"
          name="fav_language"
          value="Current Ride"
          checked={selectedTab === 'Current Ride'}
          onChange={() => setSelectedTab('Current Ride')}
          className="hidden"
        />
        <label
          htmlFor="Current Ride"
          className={`cursor-pointer py-1 px-6 font-bold rounded-lg transition-colors ${
            selectedTab === 'Current Ride' ? 'text-black bg-white' : 'text-gray-500 hover:bg-gray-400'
          }`}
        >
         Current Ride
        </label>

        <input
          type="radio"
          id="Ride History"
          name="fav_language"
          value="Ride History"
          checked={selectedTab === 'Ride History'}
          onChange={() => setSelectedTab('Ride History')}
          className="hidden"
        />
        <label
          htmlFor="Ride History"
          className={`cursor-pointer py-1 px-6 rounded-lg font-bold  transition-colors ${
            selectedTab === 'Ride History' ? 'bg-white text-black' :  'text-gray-500 hover:bg-gray-400'
          }`}
        >
          Ride History
        </label>
      </div>
    </div>
      
       {ridedriver && 
         <div className="w-screen  ">
         {selectedTab === 'Current Ride' && <UserRide_page />} 
       </div>
        }
       
      <Footer />
    </div>
  );
};

export default UserRide;
