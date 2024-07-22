import React from 'react'
import Admin_header from '../../Components/Admin/Admin_header';
import User_list_page from '../../Components/Admin/User_list_page';
import Footer from '../../Components/Footer';

const User_list = () => {
    const headprops = {
        ride: false,
        drive: false,
        user: false,
      };
    
      return (
        <div>
            <div>
            <Admin_header headprops={headprops} />
    
            </div>
            <div className='bg-black'>
    
              <User_list_page />
            </div>
            <div>
                <Footer />
            </div>
        </div>
      )
}

export default User_list