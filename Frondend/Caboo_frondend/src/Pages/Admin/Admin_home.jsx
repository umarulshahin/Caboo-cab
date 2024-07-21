import React from 'react'
import Admin_header from '../../Components/Admin/Admin_header';
import Footer from '../../Components/Footer';

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
        <div className='h-screen bg-white'>

        </div>
        <div>
            <Footer />
        </div>
    </div>
  )
}

export default Admin_home