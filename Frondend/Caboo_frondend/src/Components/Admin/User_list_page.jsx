import React, { act, useEffect, useState } from 'react'
import Sidebar_admin from './Sidebar_admin'
import useAdmin from '../../Hooks/useAdmin'
import { useSelector } from 'react-redux'
import BlockModal from './BlockModal'
import { statusManagment_url } from '../../Utils/Constanse'
import { get_Users_url } from '../../Utils/Constanse' 

const User_list_page = () => {
    const {GetUsers,Usermanagement}=useAdmin()

    useEffect(()=>{
      console.log("yes working")
   
     GetUsers(get_Users_url,"user")
    },[])

    const [selectedUser, setSelectedUser] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
  
    const handleBlockUnblock = (user) => {
      setSelectedUser(user);
      const action = user.is_active ? 'block' : 'unblock';
      setModalMessage(`Are you sure you want to ${action} this user?`);
      setModalOpen(true);
    };
  
    const handleConfirm = () => {
      if (selectedUser) {
        const action = selectedUser.is_active ? 'block' : 'unblock';
        // Handle block/unblock logic here
        setModalOpen(false);
        setSelectedUser(null);
        console.log(selectedUser)
        const data={
            id:selectedUser.id,
            action:action
        }

        Usermanagement(statusManagment_url,data)

      }
    };
  
    const handleClose = () => {
      setModalOpen(false);
      setSelectedUser(null);
    };
    const User_list=useSelector((state)=>state.admin_data.users_list)
    console.log(User_list,"user list ")

  return (
    <div className="flex min-h-screen mt-16">
    <div className="w-1/6 bg-white h-screen">
      <Sidebar_admin />
    </div>
    <div className="w-5/6 mt-10 pl-10 flex flex-col">
      <span className="text-4xl text-white mx-8 font-bold">Users</span>

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
              <th className="py-2 px-4 text-left text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {User_list.map((data) => (
              <tr key={data.id} className="rounded-lg">
                <td className="py-2 px-4">{data.id}</td>
                <td className="py-2 px-4">{data.username}</td>
                <td className="py-2 px-4">{data.phone}</td>
                <td className="py-2 px-4">$1000</td>
                <td className="py-2 px-4">{data.address}</td>
                <td className="py-2 px-4">
              <span className={data.is_active ? 'text-green-600' : 'text-red-600'}>
                {data.is_active ? "Active" : "Blocked"}
                </span>

                </td>
                <td className="py-2 px-4">
                <button
                    className={`px-4 py-2 rounded ${data.is_active ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
                    onClick={() => handleBlockUnblock(data)}
                    >
                    {data.is_active ? 'Block' : 'Unblock'}
                    </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <BlockModal
        isOpen={modalOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        message={modalMessage}
      />
  </div>
   )
}

export default User_list_page