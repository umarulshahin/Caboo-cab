import React from 'react'
import Admin_header from '../../Components/Admin/Admin_header';
import Footer from '../../Components/Footer';
import Admin_home_page from '../../Components/Admin/Admin_home_pag';

const Admin_home = () => {
      
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

          <Admin_home_page />
        </div>
        <div>
            <Footer />
        </div>
    </div>
  )
}

export default Admin_home