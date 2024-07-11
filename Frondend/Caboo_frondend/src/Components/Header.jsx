import React from 'react'
import logo from '../assets/Logo.png'
import { Link, NavLink } from 'react-router-dom'

const Header = (props) => {
  const{ride,drive,user}=props.headprops
  return (
    <div className=' flex '>
       <div className='flex items-center pl-6 pt-3 w-1/2'>
       <img  src={logo} alt="Logo" className="h-12" />
       <Link className='text-white font-extrabold pl-20 pt-2'>{ride ? 'Ride':''}</Link>
       <Link className='text-white font-extrabold pl-20 pt-2'>{drive ? 'Drive':""}</Link>
       <Link className='text-white font-extrabold pl-20 pt-2'>About</Link>

       </div>

       <div className='space-x-3 w-1/2 flex justify-end pt-8 pr-12'>
       <Link className='text-white font-extrabold pr-20 pt-2'>Help</Link>
       {!user && (
        <div className='space-x-3'>
        <button className='bg-white h-7 w-[70px] rounded-md font-bold'>
          Sign in
        </button>
        <button className='bg-yellow-500 h-7 w-[70px] rounded-md font-bold text-white'>
          Sign up
        </button>
        </div>
      ) }

        
       </div>
    </div>
  )
}

export default Header