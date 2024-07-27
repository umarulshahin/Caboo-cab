import React, { useEffect, useState } from "react";
import profile_img_placeholder from "../../assets/profile_img.png";
import useGetUser from "../../Hooks/useGetUser";
import { useSelector } from "react-redux";
import { backendUrl } from "../../Utils/Constanse";
import { user_data_url } from "../../Utils/Constanse";
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserEdit from "./UserEdit";
import { profileUpdate_url } from "../../Utils/Constanse";



const UserProfile_main = () => {


  const [profile_img, setProfileImage] = useState("");
  const { img_validate } = useGetUser();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [id,setid] = useState("")
  const data = useSelector((state) => state.user_data.user_data);
  const {Get_data,ProfilUpdate}=useGetUser()
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // useEffect(()=>{

  //  Get_data(user_data_url,null)
      
  // },[])

  useEffect(()=>{
    
    if(data){

      const { profile, username, email, phone,id } = data[0];
      setProfileImage(profile)
      setEmail(email)
      setPhone(phone)
      setUsername(username)
      setid(id)

    }
    
  },[data])
    
    const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      const allowedExtensions = /.(jpg|jpeg|png|gif|webp)$/;
      if (!allowedExtensions.test(file.name)) {
        toast.warning(
          "Please upload an image file (JPEG, JPG, PNG, GIF,webp)."
        );
        return;
      } else {
        reader.onload = (e) => {
          img_validate(file);
        };

        reader.readAsDataURL(file);
      }
    }
  };

  const handleEditClick = () => {
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  const handleSave = (updatedData) => {
    // Handle saving updated data
    console.log("Updated data:", updatedData);
    updatedData["id"]=id
    ProfilUpdate(updatedData,profileUpdate_url)
  };
  return (
    <div className="flex min-h-screen mt-16"> {/* Added mt-16 for margin top */}
      <div className="w-1/6 bg-white">{/* Sidebar content here */}</div>
      <div className="w-5/6 mt-10 pl-10 flex flex-col">
        <span className="text-4xl text-white font-bold">Account info</span>
        <img
          src={profile_img ? `${backendUrl}${profile_img}` : profile_img_placeholder}
          alt="User Profile"
          className="h-32 w-32 rounded-full object-cover cursor-pointer border-2 border-gray-500 my-6"
          onClick={() => document.getElementById("fileInput").click()}
        />
        <input
          type="file"
          accept="image/*"
          id="fileInput"
          className="hidden border"
          onChange={handleImageChange}
        />
       <span className="text-4xl text-white font-bold my-6">Basic info</span>
        <div className="mb-6">
          <span className="text-white font-bold text-xl block">Name</span>
          <div className="border border-gray-300 p-2 rounded mt-2 ml-4 w-64">
            <span className="text-white font-medium ">{username}</span>
          </div>
        </div>
        <div className="mb-6">
          <span className="text-white font-bold text-xl block">Email</span>
          <div className="border border-gray-300 p-2 rounded mt-2 ml-4 w-64">
            <span className="text-white font-medium ">{email}</span>
          </div>
        </div>
      
        
        <div className="mb-6">
          <span className="text-white font-bold text-xl block">Phone</span>
          <div className="border border-gray-300 p-2 rounded mt-2 ml-4 w-64">
            <span className="text-white font-medium ">{phone}</span>
          </div>
        </div>
        
        <button
          className="bg-white text-black px-4 py-2 ml-24 rounded-md font-bold my-6 self-start flex items-center"
          onClick={handleEditClick}
        >
          <FontAwesomeIcon icon={faEdit} className="mr-2" />
          Edit
        </button>
        <UserEdit
        isOpen={modalIsOpen}
        onClose={handleModalClose}
        user={{ username, email, phone }}
        onSave={handleSave}
      />
        
      </div>
    </div>
  );
};

export default UserProfile_main;
