import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import logo from "../../assets/Logo.png";
import avatar from "../../assets/profile_img.png";
import { addDriver_data, addDriver_token } from "../../Redux/DriverSlice";
import { backendUrl } from "../../Utils/Constanse"; 

const Driver_Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profile, setProfile] = useState('');
  const [username, setUsername] = useState('');
  const data = useSelector((state) => state.driver_data.driver_data);

  useEffect(() => {
    if (data && data[0]) {
      const { profile, username } = data[0].customuser;
      setProfile(profile);
      setUsername(username);
    }
  }, [data]);
  
  useEffect(()=>{
    const token = Cookies.get('DriverTokens')
    if (!token){
      navigate("/");
    }else{
      navigate('/driver_home')
    }
  },[])
  const handleLogout = () => {
    dispatch(addDriver_data(null));
    dispatch(addDriver_token(null));
    Cookies.remove('DriverTokens');
    navigate("/");
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-black">
    <div className="flex flex-wrap items-center justify-between p-4">
      <div className="flex items-center space-x-8">
      <Link to='/driver_home'>
      <img src={logo} alt="Logo" className="h-12" />
        </Link>

          {/* Links */}
          <div className="hidden sm:flex space-x-6">
            <Link to="/ride_request" className="text-white font-extrabold hover:text-yellow-500">
              Ride Request
            </Link>
            <Link to="/about" className="text-white font-extrabold hover:text-yellow-500">
              About
            </Link>
            <Link to="/help" className="text-white font-extrabold hover:text-yellow-500">
              Help
            </Link>
          </div>
        </div>

        {/* Right Side: Profile Section */}
        <div className="flex items-center space-x-4">
          {data && (
            <div className="relative flex items-center space-x-2 mr-14">
              <img
                src={profile ? `${backendUrl}${profile}` : avatar}
                alt="Profile"
                className="h-8 w-8 rounded-full object-cover cursor-pointer"
                onClick={toggleDropdown}
              />
              <span className="text-white font-bold cursor-pointer" onClick={toggleDropdown}>
                {username}
              </span>

              {/* Dropdown Menu */}
              {dropdownOpen && (
               <div className="relative">
               <div className="absolute right-0 flex flex-col items-center mt-8 w-48 bg-black font-bold text-white rounded-lg shadow-lg">
                 <Link
                   to="/profile" 
                   className="block px-4 py-2 w-full text-center hover:bg-gray-700 transition duration-150 ease-in-out"
                 >
                   Profile
                 </Link>
                 <Link
                   to="/settings" 
                   className="block px-4 py-2 w-full text-center hover:bg-gray-700 transition duration-150 ease-in-out"
                 >
                   Settings
                 </Link>
                 <button
                   onClick={handleLogout}
                   className="block px-4 py-2 w-full text-center bg-red-600 hover:bg-red-700 text-white transition duration-150 ease-in-out"
                 >
                   Logout
                 </button>
               </div>
             </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="block sm:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="w-full block sm:hidden">
            <div className="flex flex-col items-center space-y-2 pt-4">
              <Link to="/ride_request" className="text-white font-extrabold hover:text-yellow-500" onClick={() => setMenuOpen(false)}>
                Ride Request
              </Link>
              <Link to="/about" className="text-white font-extrabold hover:text-yellow-500" onClick={() => setMenuOpen(false)}>
                About
              </Link>
              <Link to="/help" className="text-white font-extrabold hover:text-yellow-500" onClick={() => setMenuOpen(false)}>
                Help
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Driver_Header;