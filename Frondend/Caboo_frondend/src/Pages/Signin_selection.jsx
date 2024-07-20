import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Link, useLocation } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa'; 
import Modal from '../Components/user_side/Modal';
import Signin_form from '../Components/user_side/Signin_form';
import OtpForm from '../Components/user_side/OtpFrom';
import Password from '../Components/user_side/Password';


const Signin_selection = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  let { state } = useLocation();
  const { signin,modal } = state || { signin: true };


  const openModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
  };

  useEffect(()=>{
    if(modal){
      openModal(modal)
    }
  },[modal])
 
  const headprops = {
    ride: false,
    drive: false,
    user: false,
  };


  return (
    <div>
      <div>
        <Header headprops={headprops} />
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
            {modalContent === 'ride' && <Signin_form />}
            {modalContent === 'OTP verify' && <OtpForm /> }
            {modalContent === 'password' && <Password /> }

      </Modal>
      {signin ? (
        <div className="h-screen bg-black text-white space-x-80 flex justify-center items-center font-medium text-xl underline">
          <Link to="#" onClick={() => openModal('ride')} className="flex items-center">
            Sign in to Ride <FaArrowRight className="ml-4 mt-2" />
          </Link>

          <Link to="/" className="flex items-center">
            Sign in to Drive <FaArrowRight className="ml-4 mt-2" />
          </Link>
        </div>
      ) : (
        <div className="h-screen bg-black text-white space-x-80 flex justify-center items-center font-medium text-xl underline">
          <Link to="/signup" className="flex items-center">
            Sign up to Ride <FaArrowRight className="ml-4 mt-2" />
          </Link>
          <Link to="/" className="flex items-center">
            Sign up to Drive <FaArrowRight className="ml-4 mt-2" />
          </Link>
        </div>
      )}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Signin_selection;
