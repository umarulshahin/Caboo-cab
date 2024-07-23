import React from 'react'
import Admin_header from '../../Components/Admin/Admin_header';
import Footer from '../../Components/Footer';
import Documents_page from '../../Components/Admin/Documents_page';

const Documents = () => {
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
                 <Documents_page />
            </div>
            <div>
                <Footer />
            </div>
        </div>
      )
}

export default Documents