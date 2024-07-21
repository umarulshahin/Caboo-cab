import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../../assets/profile_img.png"
import { addToken_data, addUser } from "../../Redux/UserSlice";
import { backendUrl } from "../../Utils/Constanse";
import Cookies from "js-cookie"

const Admin_header = (props) => {
    const { ride, drive, user } = props.headprops;
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [profile,setprofile]=useState('')
    const [username,setUsername]=useState('')
    const data = useSelector((state) => state.admin_data.admin_data);
  
    useEffect(()=>{
      console.log(data,'data')
      if(data){
        const { profile, username, email, phone } = data[0];
        setprofile(profile)
        setUsername(username)
      }
      
    
    },[data])
  
   
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  
  
    const handleLogout=()=>{
  
      dispatch(addUser(null))
      dispatch(addToken_data(null))
      Cookies.remove('adminTokens')
      navigate("/admin")
    }
    
    return (
      <div className="fixed top-0 left-0 w-full z-50 bg-black">
    <div className="flex flex-wrap items-center justify-between p-4">
      <div className="flex items-center">
      <Link to="/Admin_home" >
      <img src={logo} alt="Logo" className="h-12" />
        </Link>
        <div className="hidden sm:flex sm:space-x-8 pl-6">
         
            <ScrollLink
              to="first_layout"
              smooth={true}
              duration={500}
              className="text-white font-extrabold cursor-pointer hover:text-yellow-500"
            >
              Ride
            </ScrollLink>
        
        
            <ScrollLink
              to="second_layout"
              smooth={true}
              duration={500}
              className="text-white font-extrabold cursor-pointer hover:text-yellow-500"
            >
              Drive
            </ScrollLink>
      
        </div>
      </div>
  
      <div className="flex items-center px-8 space-x-4">
      <Link className="text-white font-extrabold hidden sm:block pr-6">
          Help
        </Link>
        {/* Profile Section */}
        
            <div className="relative flex items-center space-x-2">
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
              <div className="absolute right-0 mt-40 w-48 font-bold bg-white text-black rounded-sm shadow-lg">
                <Link to="#" className="block px-4 py-2 hover:bg-gray-200">Profile</Link>
                <Link to="/settings" className="block px-4 py-2 hover:bg-gray-200">Settings</Link>
                <button onClick={handleLogout}  className="block w-full px-4 py-2 text-left hover:bg-gray-200">Logout</button>
              </div>
            )}
          </div>
            
       
      </div>
  
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
  
      {menuOpen && (
        <div className="w-full block sm:hidden">
          <div className="flex flex-col items-end space-y-2 pt-4">
            {ride && (
              <Link className="text-white font-extrabold">
                Ride
              </Link>
            )}
            {drive && (
              <Link className="text-white font-extrabold">
                Drive
              </Link>
            )}
            <Link className="text-white font-extrabold">About</Link>
            <Link className="text-white font-extrabold">Help</Link>
          </div>
        </div>
      )}
    </div>
  </div>
    )
}

export default Admin_header