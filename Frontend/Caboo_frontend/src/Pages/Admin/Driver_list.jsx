import React from 'react'
import Admin_header from '../../Components/Admin/Admin_header';
import Footer from '../../Components/Footer';
import Drivers_list_page from '../../Components/Admin/Drivers_list_page';

const Driver_list = () => {
 
      return (
        <div>
            <div>
            <Admin_header  />
    
            </div>
            <div className='bg-black'>
    
              <Drivers_list_page />
            </div>
            <div>
                <Footer />
            </div>
        </div>
      )
}

export default Driver_list