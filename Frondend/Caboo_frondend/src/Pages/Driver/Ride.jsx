import React from 'react';
import Driver_Header from '../../Components/Driver/Driver_Header';
import Footer from '../../Components/Footer';
import DriverMap from '../../Components/Driver/DriverMap';

const Ride = () => {
  return (
    <div>
      <Driver_Header />
      <div className='w-screen mt-40 mb-10 h-[700px]'>
        <DriverMap />
      </div>
      <Footer />
    </div>
  );
};

export default Ride;
