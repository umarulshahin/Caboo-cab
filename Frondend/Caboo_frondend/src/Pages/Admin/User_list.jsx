import React from 'react'
import Admin_header from '../../Components/Admin/Admin_header';
import User_list_page from '../../Components/Admin/User_list_page';
import Footer from '../../Components/Footer';

const User_list = () => {

    
      return (
        <div>
            <div>
            <Admin_header  />
    
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