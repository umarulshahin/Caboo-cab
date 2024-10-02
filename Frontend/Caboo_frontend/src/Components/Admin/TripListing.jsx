import React, { useEffect, useState } from "react";
import Sidebar_admin from "./Sidebar_admin";
import { useSelector } from "react-redux";
import useAdmin from "../../Hooks/useAdmin";
import Admin_header from "./Admin_header";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TripListing = () => {
  const { GetTripdata } = useAdmin();
  const navigate = useNavigate();

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTrips, setcurrentTrips] = useState({});
  const tripsPerPage = 5; // Number of trips per page

  useEffect(() => {
    const tripdata = async () => {
      await GetTripdata();
    };
    tripdata();
  }, []);

  const alltrip = useSelector((state) => state.admin_data.allTrips);
  console.log(alltrip, "alltrip");
  // Pagination Logic
  const indexOfLastTrip = currentPage * tripsPerPage;
  console.log(indexOfLastTrip, "last trip");

  const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
  console.log(indexOfFirstTrip, "first trip");

  if (indexOfFirstTrip && indexOfLastTrip) {
    setcurrentTrips(alltrip.slice(indexOfFirstTrip, indexOfLastTrip));
  }

  const totalPages = Math.ceil(alltrip.length / tripsPerPage); // Total number of pages

  // Function to handle page change
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex min-h-screen mt-16 bg-gray-100">
      <Admin_header />
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
              {currentTrips.length > 0 ? (
                currentTrips.map((data, index) => (
                  <tr
                    key={data.id}
                    className="relative hover:bg-gray-200 font-bold transition-colors"
                  >
                    <td className="py-3 px-4 text-gray-500">
                      {indexOfFirstTrip + index + 1}
                    </td>
                    <td className="py-3 px-4">
                      {(() => {
                        const locationParts = data.location.split(", ");
                        return locationParts.length > 2
                          ? `${locationParts.slice(0, 2).join(", ")}, ...`
                          : data.location;
                      })()}
                    </td>
                    <td className="py-3 px-4">
                      {(() => {
                        const destinationParts = data.destination.split(", ");
                        return destinationParts.length > 2
                          ? `${destinationParts.slice(0, 2).join(", ")}, ...`
                          : data.destination;
                      })()}
                    </td>
                    <td className="py-3 px-4">{data.dateTime}</td>
                    <td
                      className={` py-3 px-4 ${
                        data.status === "pending"
                          ? "text-yellow-500"
                          : data.status === "cancelled"
                          ? "text-red-600"
                          : data.status === "completed"
                          ? "text-green-600"
                          : "text-black"
                      } `}
                    >
                      {data.status}
                    </td>
                    <td className="py-3">
                      <button
                        onClick={() =>
                          navigate("/tripmore", { state: { trips: data } })
                        }
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
                        {" "}
                        <div className="h-7 bg-slate-400 w-full rounded-md"></div>
                        <div className="h-7 bg-slate-400 w-full rounded-md"></div>
                        <div className="h-7 bg-slate-400 w-full rounded-md"></div>
                        <div className="h-7 bg-slate-400 w-full rounded-md"></div>
                        <div className="h-7 bg-slate-400 w-1/2 rounded-md"></div>
                        <div className="h-7 bg-slate-400 w-1/2 rounded-md"></div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-1">
              {currentPage > 2 && (
                <>
                  <PageButton page={1} onClick={() => handlePageClick(1)} />
                  {currentPage > 3 && (
                    <span className="text-gray-400">...</span>
                  )}
                </>
              )}

              {currentPage > 1 && (
                <PageButton
                  page={currentPage - 1}
                  onClick={() => handlePageClick(currentPage - 1)}
                />
              )}

              <PageButton
                page={currentPage}
                isActive
                onClick={() => handlePageClick(currentPage)}
              />

              {currentPage < totalPages && (
                <PageButton
                  page={currentPage + 1}
                  onClick={() => handlePageClick(currentPage + 1)}
                />
              )}

              {currentPage < totalPages - 1 && (
                <>
                  {currentPage < totalPages - 2 && (
                    <span className="text-gray-400">...</span>
                  )}
                  <PageButton
                    page={totalPages}
                    onClick={() => handlePageClick(totalPages)}
                  />
                </>
              )}
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PageButton = ({ page, isActive = false, onClick }) => (
  <button
    onClick={onClick}
    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "bg-blue-400 text-white"
        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
    }`}
  >
    {page}
  </button>
);

export default TripListing;
