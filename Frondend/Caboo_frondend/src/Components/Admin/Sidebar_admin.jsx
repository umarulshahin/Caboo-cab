import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faCar, faUsers, faUserTie } from '@fortawesome/free-solid-svg-icons';

const Sidebar_admin = () => {


  return (
    <div className=' mt-14 w-full max-w-xs mx-auto shadow-md rounded-md '>
      <div className="flex flex-col items-start space-y-4 p-4">
        <NavLink
          to='/admin_home'
          className="flex items-center font-bold text-lg w-full py-2 px-4 hover:bg-gray-200 rounded transition-colors duration-200"
          activeClassName="bg-gray-300"
        >
          <FontAwesomeIcon icon={faTachometerAlt} className="mr-3" />
          Dashboard
        </NavLink>
        <NavLink
          to='/trip'
          className="flex items-center font-bold text-lg w-full py-2 px-4 hover:bg-gray-200 rounded transition-colors duration-200"
          activeClassName="bg-gray-300"
        >
          <FontAwesomeIcon icon={faCar} className="mr-3" />
          Trips
        </NavLink>
        <div className="font-bold text-xl w-full px-4 py-2 text-gray-600">
          Data
        </div>
        <NavLink
          to='/User_list'
          className="flex items-center font-bold text-lg w-full py-2 px-4 hover:bg-gray-200 rounded transition-colors duration-200"
          activeClassName="bg-gray-300"
        >
          <FontAwesomeIcon icon={faUsers} className="mr-3" />
          Users
        </NavLink>
        <NavLink
          to='/Driver_list'
          className="flex items-center font-bold text-lg w-full py-2 px-4 hover:bg-gray-200 rounded transition-colors duration-200"
          activeClassName="bg-gray-300"
        >
          <FontAwesomeIcon icon={faUserTie} className="mr-3" />
          Drivers
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar_admin;
