import React, { useEffect, useState } from "react";
import Sidebar_admin from "./Sidebar_admin";
import { useSelector } from "react-redux";
import useAdmin from "../../Hooks/useAdmin";

const TripListing = () => {
  const [User_list, setUserlist] = useState(0);
  const { GetTripdata } = useAdmin();
  useEffect(() => {
    const tripdata = async () => {
      console.log("yes working");
      await GetTripdata();
    };
    tripdata();
  }, []);
  const alltrip = useSelector((state) => state.admin_data.allTrips);

  console.log(alltrip, "alltrips");

  return (
    <div className="flex min-h-screen mt-16 bg-gray-100">
      <div className="w-1/6 bg-white shadow-lg h-screen">
        <Sidebar_admin />
      </div>
      <div className="w-5/6 mt-10 pl-10 flex flex-col">
        <span className="text-4xl text-gray-800 mx-8 font-bold mb-6">
          All Trips
        </span>

        {/* Table Container */}
        <div className="m-8 bg-white p-6 rounded-lg shadow-lg">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                  No
                </th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                  PickUp
                </th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                  DropOff
                </th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                  Date
                </th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                  Status
                </th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                  More
                </th>
              </tr>
            </thead>
            <tbody>
              {alltrip ? (
                alltrip.map((data, index) => (
                    <tr key={data.id} className="relative hover:bg-gray-200 font-bold transition-colors">
                    <td className="py-3 px-4 text-gray-500">{index + 1}</td>
                    <td className="py-3 px-4 ">
                        {(() => {
                            const locationParts = data.location.split(', ');
                            return locationParts.length > 2
                                ? `${locationParts.slice(0, 2).join(', ')}, ...`
                                : data.location;
                        })()}
                    </td>
                    <td className="py-3 px-4 ">
                        {(() => {
                            const destinationParts = data.destination.split(', ');
                            return destinationParts.length > 2
                                ? `${destinationParts.slice(0, 2).join(', ')}, ...`
                                : data.destination;
                        })()}
                    </td>
                    <td className='py-3 px-4 '>{data.dataTime}</td>
                    <td className={` py-3 px-4 ${data.status === 'pending' ? 'text-yellow-500':
                                               data.status === 'cancelled' ? 'text-red-600':
                                               data.status === 'completed'? 'text-green-600':'text-black'
                    } `}>{data.status}</td>
                    <td className="py-3 px-4 ">
                        <button
                            className="px-6 py-2 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 transition"
                        >
                            View
                        </button>
                    </td>
                </tr>
                
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-2 px-4 text-center">
                    <div>
                      <div className="animate-pulse flex flex-col items-center mt-10  gap-4 w-full">
                        <div>
                          <div className="w-48 h-6 bg-slate-400 rounded-md"></div>
                          <div className="w-28 h-4 bg-slate-400 mx-auto mt-3 rounded-md"></div>
                        </div>
                        <div className="h-7 bg-slate-400 w-full rounded-md"></div>
                        <div className="h-7 bg-slate-400 w-full rounded-md"></div>
                        <div className="h-7 bg-slate-400 w-full rounded-md"></div>
                        <div className="h-7 bg-slate-400 w-1/2 rounded-md"></div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TripListing;
