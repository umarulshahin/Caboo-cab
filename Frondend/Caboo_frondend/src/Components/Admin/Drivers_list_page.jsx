import React, { useEffect, useState } from 'react';
import Sidebar_admin from './Sidebar_admin';
import useAdmin from '../../Hooks/useAdmin';
import { useSelector } from 'react-redux';
import BlockModal from './BlockModal';
import { statusManagment_url, get_Driver_url } from '../../Utils/Constanse';
import { Link, useNavigate } from 'react-router-dom';

const Drivers_list_page = () => {
  const { GetUsers, Usermanagement } = useAdmin();
  const navigate=useNavigate()

  useEffect(() => {
    console.log("Fetching users");
    GetUsers(get_Driver_url, "driver");
  }, []); 

  const [selectedUser, setSelectedUser] = useState(null);
  const User_list = useSelector((state) => state.admin_data.Driver_list || []); 

  console.log(User_list, "user list ");

  const handleView=(data)=>{
      console.log(data)
      navigate('/Documents',{state:{driver:data}})

   }


  return (
    <div className="flex min-h-screen mt-16">
      <div className="w-1/6 bg-white h-screen">
        <Sidebar_admin />
      </div>
      <div className="w-5/6 mt-10 pl-10 flex flex-col">
        <span className="text-4xl text-white mx-8 font-bold">Drivers</span>

        {/* Table Container */}
        <div className="m-8">
          <table className="min-w-full bg-white rounded-lg">
            <thead>
              <tr className="w-full bg-gray-100">
                <th className="py-2 px-4 text-left text-gray-600">ID</th>
                <th className="py-2 px-4 text-left text-gray-600">Name</th>
                <th className="py-2 px-4 text-left text-gray-600">Phone</th>
                <th className="py-2 px-4 text-left text-gray-600">Wallet</th>
                <th className="py-2 px-4 text-left text-gray-600">Address</th>
                <th className="py-2 px-4 text-left text-gray-600">Status</th>
                <th className="py-2 px-4 text-left text-gray-600">Documents</th>
              </tr>
            </thead>
            <tbody>
              {User_list.length > 0 ? (
                User_list.map((data) => (
                  <tr key={data.id} className="rounded-lg ">
                    <td className="py-4 px-4">{data.id}</td>
                    <td className="py-4 px-4">{data.username}</td>
                    <td className="py-4 px-4">{data.phone}</td>
                    <td className="py-4 px-4">$1000</td>
                    <td className="py-4 px-4">{data.address}</td>
                    <td className="py-4 px-4">
                    <span className={`font-bold ${data.is_active ? 'text-green-600' : 'text-orange-500'}`}>
                      {data.is_active ? "Active" : "Pending"}
                    </span>

                    </td>
                    <td className="py-2 px-4">
                      <button
                        className={`px-6  py-2 rounded-lg bg-black text-white`}
                        onClick={()=>handleView(data)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-2 px-4 text-center">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Drivers_list_page;
