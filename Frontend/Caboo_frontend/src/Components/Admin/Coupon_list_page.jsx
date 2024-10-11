import React, { useState } from "react";

const Coupon_list_page = () => {
    const [current_page,setcurrentpage]=useState()
    const [currentTrips,setcurrtrip]=useState()
  return (
    <div>
      <div className=" bg-white rounded-lg shadow-lg">
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
            {currentTrips && currentTrips.length > 0 ? (
              currentTrips.map((data, index) => (
                <tr
                  key={data.id}
                  className="relative hover:bg-gray-200 font-bold transition-colors"
                >
                  <td className="py-3 px-4 text-gray-500">{index + 1}</td>
                  <td className="py-3 px-4"></td>
                  <td className="py-3 px-4"></td>
                  <td className="py-3 px-4"></td>
                  <td></td>
                  <td className="py-3">
                    <button className="px-6 py-2 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 transition">
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-2  px-4 text-center">
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
        {/* <div className="flex   justify-center space-x-3 my-5">
          <button
            disabled={page === 1}
            className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            aria-label="Previous page"
            onClick={() => setPage(page - 1)}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <span className="w-10 h-10 flex items-center justify-center bg-green-500 text-white rounded-full text-sm font-medium">
            {page}
          </span>

          {page < total_pages - 1 && (
            <>
              <span className="text-gray-500 font-bold">. . .</span>
              <span className="w-10 h-10 flex items-center justify-center bg-green-500 text-white rounded-full text-sm font-medium">
                {total_pages}
              </span>
            </>
          )}

          <button
            disabled={page === total_pages}
            className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            aria-label="Next page"
            onClick={() => setPage(page + 1)}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Coupon_list_page;
