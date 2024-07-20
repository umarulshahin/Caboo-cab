import React from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import UserProfile_main from '../../Components/user_side/UserProfile_main';

const UserProfile = () => {
  const headprops = {
    ride: false,
    drive: false,
    user: true,
  };

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 w-full z-50">
        <Header headprops={headprops} />
      </div>
      <div className="bg-black min-h-screen pt-16"> {/* Added pt-16 for padding top */}
        <UserProfile_main />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default UserProfile;
