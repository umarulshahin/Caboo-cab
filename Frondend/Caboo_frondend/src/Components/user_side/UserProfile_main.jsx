import React, { useState } from "react";
import profile_img_placeholder from "../../assets/profile_img.png";
import useGetUser from "../../Hooks/useGetUser";
import { useSelector } from "react-redux";
import { backendUrl } from "../../Utils/Constanse";

const UserProfile_main = () => {
  const [profile_img, setProfileImage] = useState("");
  const { img_validate } = useGetUser();
  const data = useSelector((state) => state.user_data.user_data);
  const { profile, username, email, phone } = data[0];

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

  return (
    <div className="flex min-h-screen mt-16"> {/* Added mt-16 for margin top */}
      <div className="w-1/6 bg-white">{/* Sidebar content here */}</div>
      <div className="w-5/6 mt-10 pl-10 flex flex-col">
        <span className="text-4xl text-white font-bold">Account info</span>
        <img
          src={profile ? `${backendUrl}${profile}` : profile_img_placeholder}
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

        <button className="bg-white text-black px-4 py-2 rounded-md font-bold mt-6 self-start">
          Edit
        </button>
      </div>
    </div>
  );
};

export default UserProfile_main;
