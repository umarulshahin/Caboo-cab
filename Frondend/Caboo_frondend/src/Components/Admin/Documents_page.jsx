import React, { useEffect, useState } from "react";
import useAdmin from "../../Hooks/useAdmin";
import {
  backendUrl,
  DriverManagement_url,
  get_Driver_url,
} from "../../Utils/Constanse";
import Sidebar_admin from "./Sidebar_admin";
import { useLocation } from "react-router-dom";
import ImageModal from "./ImageModal";
import DeclineModal from "./DeclineModal";

const Documents_page = () => {
  const { state } = useLocation();
  const { driver } = state;
  const { Usermanagement, GetUsers } = useAdmin();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);

  useEffect(() => {

    GetUsers(get_Driver_url, "driver");

  }, []);

  const handleDriver = () => {

    const value = { id: driver.id,
                   status : "active"
     };
    Usermanagement(DriverManagement_url, value);
  };

  const openImageModal = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const openDeclineModal = () => {
    setIsDeclineModalOpen(true);
  };

  const closeDeclineModal = () => {
    setIsDeclineModalOpen(false);
  };

  const handleDeclineConfirm = (reason, comments) => {
  
    const value ={
      id:driver.id,
      status:'decline',
      reason:reason,
      comments:comments

    }

    Usermanagement(DriverManagement_url, value);
    

  };

  return (
    <div className="flex min-h-screen mt-16">
      <div className="w-1/6 bg-white shadow-lg min-h-screen">
        <Sidebar_admin />
      </div>
      <div className="flex flex-col items-center justify-center w-5/6 p-10 bg-black">
        <div className="bg-white p-6 rounded-md w-full max-w-4xl">
          <header className="mb-8 text-center">
            <h1 className="text-black text-4xl font-bold mb-2">Driver Documents</h1>
            <p className="text-gray-400 text-lg">View and manage driver's documents</p>
          </header>

          <div className="flex justify-center mb-8">
            <div className="flex flex-col items-center">
              {/* <span className="text-black font-bold text-2xl mb-4">Profile:</span> */}
              <img
                src={`${backendUrl}${driver.customuser.profile}`}
                alt="User Profile"
                className="h-32 w-32 rounded-full object-cover border-2 border-gray-300 cursor-pointer"
                onClick={() => openImageModal(`${backendUrl}${driver.customuser.profile}`)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-start">
              <span className="text-gray-500 font-bold text-xl mb-2">Name</span>
              <span className="text-black  text-2xl font-medium px-4 py-2 rounded-lg border border-gray-600 w-full max-w-sm">
                {driver.customuser.username}
              </span>
            </div>

            <div className="flex flex-col items-start">
              <span className="text-gray-500 font-bold text-xl mb-2">Aadhaar</span>
              <span className="text-black text-2xl font-medium px-4 py-2 rounded-lg border border-gray-600 w-full max-w-sm">
                {driver.aadhaar}
              </span>
            </div>

            <div className="flex flex-col items-start">
              <span className="text-gray-500 font-bold text-xl mb-2">Vehicle Number</span>
              <span className="text-black text-2xl font-medium px-4 py-2 rounded-lg border border-gray-600 w-full max-w-sm">
                {driver.vehicle_no}
              </span>
            </div>

            <div className="flex flex-col items-start">
              <span className="text-gray-500 font-bold text-xl mb-2">Vehicle</span>
              <span className="text-black text-2xl px-4 py-2 rounded-lg border border-gray-600 w-full max-w-sm">
                {driver.vehicle_name}
              </span>
            </div>

            <div className="flex flex-col items-start">
              <span className="text-gray-500 font-bold text-xl mb-2">Insurance</span>
              <img
                src={`${backendUrl}${driver.insurance}`}
                alt="Insurance"
                className="h-44 w-80 object-cover border-2 border-gray-300 cursor-pointer"
                onClick={() => openImageModal(`${backendUrl}${driver.insurance}`)}
              />
            </div>

            <div className="flex flex-col items-start">
              <span className="text-gray-500 font-bold text-xl mb-2">License</span>
              <img
                src={`${backendUrl}${driver.license}`}
                alt="License"
                className="h-44 w-80 object-cover border-2 border-gray-300 cursor-pointer"
                onClick={() => openImageModal(`${backendUrl}${driver.license}`)}
              />
            </div>

            <div className="flex flex-col items-start">
              <span className="text-gray-500 font-bold text-xl mb-2">Rc Document</span>
              <img
                src={`${backendUrl}${driver.rc_img}`}
                alt="Rc Document"
                className="h-44 w-80 object-cover border-2 border-gray-300 cursor-pointer"
                onClick={() => openImageModal(`${backendUrl}${driver.rc_img}`)}
              />
            </div>

            <div className="flex flex-col items-start">
              <span className="text-gray-500 font-bold text-xl mb-2">Vehicle Photo</span>
              <img
                src={`${backendUrl}${driver.vehicle_photo}`}
                alt="Vehicle Photo"
                className="h-44 w-80 object-cover border-2 border-gray-300 cursor-pointer"
                onClick={() => openImageModal(`${backendUrl}${driver.vehicle_photo}`)}
              />
            </div>
          </div>

          <div className="flex justify-center mt-16 space-x-4">
            <button
              onClick={handleDriver}
              className="px-8 py-3 rounded-full bg-white text-black border border-black font-bold transition duration-500 hover:bg-black hover:text-white transform hover:scale-110 active:bg-gray-800 active:text-white active:duration-250 active:shadow-none active:scale-95"
            >
              Approve
            </button>
            <button
              onClick={openDeclineModal}
              className="px-8 py-3 rounded-full bg-red-600 text-white font-bold transition duration-500 hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/50 transform hover:scale-110 active:bg-red-700 active:duration-250 active:shadow-none active:scale-95"
            >
              Decline
            </button>
          </div>

          {/* Image Modal */}
          <ImageModal
            show={selectedImage !== null}
            imageSrc={selectedImage}
            onClose={closeModal}
          />

          {/* Decline Modal */}
          <DeclineModal
            show={isDeclineModalOpen}
            onClose={closeDeclineModal}
            onConfirm={handleDeclineConfirm}
          />
        </div>
      </div>
    </div>
  );
};

export default Documents_page;
