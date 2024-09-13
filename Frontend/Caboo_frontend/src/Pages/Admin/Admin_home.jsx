import React from 'react'
import Admin_header from '../../Components/Admin/Admin_header';
import Footer from '../../Components/Footer';
import Admin_home_page from '../../Components/Admin/Admin_home_pag';

const Admin_home = () => {
      

  return (
    <div>
        <div>
        <Admin_header />

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