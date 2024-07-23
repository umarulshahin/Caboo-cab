import { useEffect } from "react";
import useAdmin from "../../Hooks/useAdmin";
import { backendUrl,DriverManagement_url, get_Driver_url } from "../../Utils/Constanse";
import Sidebar_admin from "./Sidebar_admin";
import { useLocation } from "react-router-dom";

const Documents_page = () => {
  const { state } = useLocation();
  const { driver } = state;
const {Usermanagement,GetUsers}=useAdmin()
useEffect(() => {
    
    console.log("Fetching users");
    GetUsers(get_Driver_url, "driver");

  }, []); 
  
const handleDriver=()=>{
     
    const value={
        "id":driver.id
    }
    Usermanagement(DriverManagement_url,value)
}
   



  return (
    <div className="flex min-h-screen mt-16">
      <div className="w-1/6 bg-white h-screen">
        <Sidebar_admin />
      </div>
      <div className="w-5/6 pl-10 mt-10">
        <span className="text-white text-4xl font-bold">Documents</span>

        <div className="flex flex-row items-center mt-8 space-x-[200px] ">
          <span className="text-white font-bold text-2xl mr-8 ">Profile</span>
          <img
            src={`${backendUrl}${driver.profile}`}
            alt="User Profile"
            className="h-32 w-32   rounded-full object-cover border-2 border-gray-500"
          />
        </div>

        <div className="flex flex-row items-center mt-8 space-x-[192px]">
          <span className="text-white font-bold text-2xl mr-8">Name</span>
          <span className="text-white font-bold text-2xl px-4 py-2 rounded-lg border border-white w-1/4">
            {driver.username}
          </span>
        </div>

        <div className="flex flex-row items-center mt-8 space-x-[166px]">
          <span className="text-white font-bold text-2xl mr-8">Aadhaar</span>
          <span className="text-white font-bold text-2xl px-4 py-2 rounded-lg border border-white w-1/4">
            {driver.driver_data_set[0].aadhaar}
          </span>
        </div>

        <div className="flex flex-row items-center mt-8 space-x-[80px]">
          <span className="text-white font-bold text-2xl mr-8">Vehicle Number</span>
          <span className="text-white font-bold text-2xl px-4 py-2 rounded-lg border border-white w-1/4">
            {driver.driver_data_set[0].vehicle_no}
          </span>
        </div>

        <div className="flex flex-row items-center mt-8 space-x-[180px]">
          <span className="text-white font-bold text-2xl mr-8">Vehicle</span>
          <span className="text-white font-bold text-2xl px-4 py-2 rounded-lg border border-white w-1/4">
            {driver.driver_data_set[0].vehicle_name}
          </span>
        </div>

        <div className="flex flex-row items-center mt-8 space-x-[150px]">
          <span className="text-white font-bold text-2xl mr-8">Insurance</span>
          <img
            src={`${backendUrl}${driver.driver_data_set[0].insurance}`}
            alt="Insurance"
            className="h-44 w-80 object-cover border-2 border-gray-500"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="flex flex-row items-center mt-8 space-x-[179px]">
          <span className="text-white font-bold text-2xl mr-8">License</span>
          <img
            src={`${backendUrl}${driver.driver_data_set[0].license}`}
            alt="License"
            className="h-44 w-80 object-cover border-2 border-gray-500"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="flex flex-row items-center mt-8 space-x-[110px]">
          <span className="text-white font-bold text-2xl mr-8">Rc Document</span>
          <img
            src={`${backendUrl}${driver.driver_data_set[0].rc_img}`}
            alt="Rc Document"
            className="h-44 w-80 object-cover border-2 border-gray-500"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="flex flex-row items-center mt-8 space-x-[107px]">
          <span className="text-white font-bold text-2xl mr-8">Vehicle Photo</span>
          <img
            src={`${backendUrl}${driver.driver_data_set[0].vehicle_Photo}`}
            alt="Vehicle Photo"
            className="h-44 w-80 object-cover border-2 border-gray-500"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="flex flex-row items-center ml-72  mt-16">
          <button
            onClick={handleDriver}
            className={`px-6 py-2  rounded-lg text-white font-bold ${
              driver.is_active ? "bg-red-600" : "bg-green-600"
            }`}
          >
            {driver.is_active ? "Deactivate" : "Approve"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Documents_page;
