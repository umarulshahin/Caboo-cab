import React, { useEffect } from 'react';
import Footer from '../../Components/Footer';
import UserHome_main from '../../Components/user_side/UserHome_main';
import useGetUser from '../../Hooks/useGetUser';
import { user_data_url } from '../../Utils/Constanse';
import User_header from '../../Components/user_side/User_header';

const UserHome = () => {
  const { Get_data } = useGetUser();

  useEffect(() => {
    Get_data(user_data_url);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <User_header />
      </header>
      <main className="flex-grow flex justify-center items-center">
        <UserHome_main />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default UserHome;
