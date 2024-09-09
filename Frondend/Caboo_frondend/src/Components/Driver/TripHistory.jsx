import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const TripHistory = () => {

  const navigat = useNavigate()

  const trips = useSelector((state) => state.driver_data.driverTrips);
  const formatAddress = (address) => {
    const parts = address.split(",");
    if (parts.length > 3) {
      return `${parts.slice(0, 3).join(", ")}`;
    }
    return address;
  };

  if (!trips) {
    return (
      <div className="w-full px-4 py-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Loading Ride History...</h2>
        <div className="spinner-border text-blue-500" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-10 py-6 " >
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-200 text-gray-600 border-b border-gray-300">
            <tr>
              <th className="py-3 px-4 border-r text-left">NO</th>
              <th className="py-3 px-2 border-r text-left">Pickup</th>
              <th className="py-3 px-2 border-r text-left">Dropoff</th>
              <th className="py-3 px-4 border-r text-left">Status</th>
              <th className="py-3 px-4 border-r text-left">Date</th>
              <th className="py-3 px-7 text-left ">More</th>
            </tr>
          </thead>
          <tbody>
            {trips && trips.length > 0 ? (
              trips.map((data, index) => (
                <tr key={data.orderId} className="border-b text-gray-800 font-bold">
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
                        data.status === "pending"
                          ? "text-orange-500"
                          : data.status === "cancelled"
                          ? "text-red-600"
                          : data.status === "completed"
                          ? "text-green-600"
                          : "text-gray-700"
                      }`}
                    >
                      {data.status || "Unknown"}
                    </span>
                  </td>
                  <td className="py-2 px-4 text-left">
                    {data.dateTime || "2024-09-05"}
                  </td>
                  <td className="py-2 px-4 text-left">
                    <button onClick={()=>navigat('/tripdetails',{ state: { trips: data } })} className="bg-black text-white px-4 py-1 rounded hover:bg-gray-600">
                      More
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No Trips Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TripHistory;
