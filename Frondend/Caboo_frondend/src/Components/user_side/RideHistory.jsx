import React, { useEffect, useState } from 'react';
import useGetUser from '../../Hooks/useGetUser';
import { useSelector } from 'react-redux';
import { Ride_User_Data_url } from '../../Utils/Constanse';
import { Navigate, useNavigate } from 'react-router-dom';

const RideHistory = () => {
    const [loading, setLoading] = useState(true);
    const { UserTabls } = useGetUser();
    const user = useSelector((state) => state.user_data.token_data);
    const trips = useSelector((state) => state.user_data.userTrips);
    const navigate=useNavigate()

    useEffect(() => {
        const fetchTrips = async () => {
            if (user.user_id) {
                try {
                    await UserTabls(Ride_User_Data_url, { id: user.user_id }, 'trip');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchTrips();
    }, []);

    const formatAddress = (address) => {
        const parts = address.split(',');
        if (parts.length > 2) {
            return `${parts.slice(0, 2).join(',')}`;
        }
        return address;
    };

    if (loading) {
        return (
            <div className="w-full px-4 py-6 text-center ">
                <h2 className="text-2xl font-bold mb-4">Loading Ride History...</h2>
                {/* Optionally, include a spinner or loading animation */}
                <div className="spinner-border text-blue-500" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full px-10  py-6">
        <div className="overflow-x-auto  rounded-lg">
            <table className="min-w-full   bg-white border border-gray-200">
                <thead className="bg-gray-200 text-gray-600 border-b  border-gray-300">
                    <tr >
                        <th className="py-3 px-4 border-r text-left">NO</th>
                        <th className="py-3 px-2 border-r text-left">Pickup</th>
                        <th className="py-3 px-2 border-r text-left">Dropoff</th>
                        <th className="py-3 px-4 border-r text-left">Status</th>
                        <th className="py-3 px-4 border-r text-left">Date</th>
                        <th className="py-3 px-8 text-left">More</th>
                    </tr>
                </thead>
                <tbody>
                    {trips && trips.length > 0 ? (
                        trips.map((data, index) => (
                            <tr key={data.orderId} className="border-b font-bold text-gray-800">
                                <td className="py-2 px-4 text-left">{index + 1}</td>
                                <td className="py-2 px-2 text-left">
                                    {formatAddress(data.location || "Location A")}
                                </td>
                                <td className="py-2 px-2 text-left">
                                    {formatAddress(data.destination || "Location B")}
                                </td>
                                <td className="py-2 px-4 text-left">
                                    <span
                                        className={`font-bold ${
                                            data.status === 'pending'
                                                ? 'text-orange-500'
                                                : data.status === 'cancelled'
                                                ? 'text-red-600'
                                                : data.status === 'completed'
                                                ? 'text-green-600'
                                                : 'text-gray-700'
                                        }`}
                                    >
                                        {data.status || "Unknown"}
                                    </span>
                                </td>
                                <td className="py-2 px-4 text-left font-bold">
                                    {data.dateTime }
                                </td>
                                <td className="py-2 px-4 text-left ">
                                    <button onClick={()=>navigate('/ridedetails',{ state: { rides: data } })} className="bg-black font-bold text-white px-5 py-1 rounded hover:bg-gray-600">
                                        More
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center py-4">No Trips Available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
    
    );
};

export default RideHistory;