import React, { useEffect, useState } from 'react';
import Sidebar_admin from './Sidebar_admin';
import useAdmin from '../../Hooks/useAdmin';
import { useSelector } from 'react-redux';
import { get_Driver_url, backendUrl } from '../../Utils/Constanse';
import { useNavigate } from 'react-router-dom';
import avatar from "../../assets/profile_img.png";

const Drivers_list_page = () => {
  const { GetUsers } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {

    GetUsers(get_Driver_url, "driver");
    
  }, []);

  const User_list = useSelector((state) => state.admin_data.Driver_list || []);
  console.log(User_list,'driver')

  const handleView = (data) => {
    navigate('/Documents', { state: { driver: data } });
  };

  return (
    <div className="flex min-h-screen mt-16 bg-gray-100">
      <div className="w-1/6 bg-white shadow-lg h-screen">
        <Sidebar_admin />
      </div>
      <div className="w-5/6 mt-10 pl-10 flex flex-col">
        <span className="text-4xl text-gray-800 mx-8 font-bold mb-6">Drivers</span>

        {/* Table Container */}
        <div className="m-8 bg-white p-6 rounded-lg shadow-lg">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">ID</th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">Profile</th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">Name</th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">Phone</th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">Trip status</th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">Status</th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">Documents</th>
              </tr>
            </thead>
            <tbody>
              {User_list.length > 0 ? (
                User_list.map((data) => (
                  <tr key={data.id} className="relative hover:bg-gray-200 font-bold transition-colors">
                    <td className="py-3 px-4 text-gray-500">{data.customuser.id}</td>
                    <td className="py-3 px-4">
                      <img
                        src={data.customuser.profile ? `${backendUrl}${data.customuser.profile}` : avatar}
                        alt="Profile"
                        className="h-10 w-10 rounded-full object-cover cursor-pointer"
                      />
                    </td>
                    <td className="py-3 px-4">{data.customuser.username}</td>
                    <td className="py-3 px-4">{data.customuser.phone}</td>
                    <td className= {` py-3 px-8 ${data.customuser.ride ? 'text-green-600' : 'text-red-600'}`}>{data.customuser.ride ? 'OnTrip':'idle'}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`font-bold ${
                          data.request === 'active'
                            ? 'text-green-600'
                            : data.request === 'pending'
                            ? 'text-orange-500'
                            : data.request === 'decline'
                            ? 'text-red-600'
                            : ''
                        }`}
                      >
                        {data.request === 'active'
                          ? 'Active'
                          : data.request === 'pending'
                          ? 'Pending'
                          : data.request === 'decline'
                          ? 'Decline'
                          : 'Unknown'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        className="px-6 py-2 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 transition"
                        onClick={() => handleView(data)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-2 px-4 text-center">No drivers found</td>
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
