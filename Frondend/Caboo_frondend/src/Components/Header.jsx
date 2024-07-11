import React, { useState } from 'react';
import logo from '../assets/Logo.png';
import { Link, NavLink } from 'react-router-dom';

const Header = (props) => {
  const { ride, drive, user } = props.headprops;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className='flex flex-wrap items-center justify-between p-4 bg-black'>
      <div className='flex items-center'>
        <img src={logo} alt="Logo" className="h-12" />
        <div className='hidden sm:flex sm:space-x-8 pl-6'>
          {ride && <Link className='text-white font-extrabold'>{ride ? 'Ride' : ''}</Link>}
          {drive && <Link className='text-white font-extrabold'>{drive ? 'Drive' : ''}</Link>}
          <Link className='text-white font-extrabold'>About</Link>
        </div>
      </div>

      <div className='flex px-8'>
        <Link className='text-white font-extrabold hidden sm:block pr-6'>Help</Link>
        {!user && (
          <div className='flex space-x-3'>
            <button className='bg-white h-7 w-[70px] rounded-md font-bold'>
              Sign in
            </button>
            <button className='bg-yellow-500 h-7 w-[70px] rounded-md font-bold text-white'>
              Sign up
            </button>
          </div>
        )}
      </div>

      <div className='block sm:hidden'>
        <button onClick={() => setMenuOpen(!menuOpen)} className='text-white'>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className='w-full block sm:hidden'>
          <div className='flex flex-col items-end space-y-2 pt-4'>
            {ride && <Link className='text-white font-extrabold'>{ride ? 'Ride' : ''}</Link>}
            {drive && <Link className='text-white font-extrabold'>{drive ? 'Drive' : ''}</Link>}
            <Link className='text-white font-extrabold'>About</Link>
            <Link className='text-white font-extrabold'>Help</Link>
           
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
