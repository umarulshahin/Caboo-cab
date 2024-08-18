
import React from 'react'
import User_header from '../../Components/user_side/User_header'
import Footer from '../../Components/Footer'
import UserRide_page from '../../Components/user_side/UserRide_page'

const UserRide = () => {
  return (
    <div>
        <User_header />

        <div>
            <UserRide_page />
        </div>
        <Footer />
    </div>
  )
}

export default UserRide