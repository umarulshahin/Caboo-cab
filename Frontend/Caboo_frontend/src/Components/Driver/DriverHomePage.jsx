import React from "react";

const DriverHomePage = (trip_data) => {
  const {count,cancel,amount,currentMonth}= trip_data.trip_data || {};
  return (
    <div className="pt-24">
      <div className="flex justify-evenly bg-gray-950 p-4 rounded-lg mx-10 my-14">
        <div className="relative drop-shadow-xl w-80 h-40 overflow-hidden rounded-xl bg-[#3d3c3d]">
          <div className="  absolute flex flex-col items-center space-y-6  text-white z-[1] opacity-90 rounded-xl inset-0.5 bg-gradient-to-br from-blue-600 to-blue-300 hover:scale-105 transition-all duration-300 delay-100">
          <span className=" font-bold text-xl pt-6 w-fit h-fit ">This Month's Rides</span>

            <h1 className=" font-bold text-5xl">{currentMonth}</h1>
          </div>
          
          <div className="absolute flex items-center  w-80 h-40 bg-white blur-[50px] -left-1/2 -top-1/2 ">
            
          </div>
        </div>
        <div className="relative drop-shadow-xl w-80 h-40 overflow-hidden rounded-xl bg-[#3d3c3d]">
          <div className="absolute flex flex-col  items-center space-y-6 text-white z-[1] opacity-90 rounded-xl inset-0.5 bg-gradient-to-br from-green-600 to-green-400 hover:scale-105 transition-all duration-300 delay-100">
          
          <span className="pt-4 font-bold text-xl">Total Earnings</span>
          <h1 className=" font-bold text-5xl">₹ {amount}</h1>

          </div>
          <div className="absolute w-56 h-40 bg-white blur-[50px] -left-1/2 -top-1/2"></div>
        </div>
        <div className="relative drop-shadow-xl w-80 h-40 overflow-hidden rounded-xl bg-[#3d3c3d]">
          <div className="absolute flex flex-col  items-center space-y-6 text-white z-[1] opacity-90 rounded-xl inset-0.5 bg-gradient-to-br from-yellow-600 to-yellow-300 hover:scale-105 transition-all duration-300 delay-100">
          <span className="pt-4 font-bold text-xl">Total Rides</span>
          <h1 className=" font-bold text-5xl">{count}</h1>
          </div>          

          <div className="absolute w-56 h-40 bg-white blur-[50px] -left-1/2 -top-1/2"></div>
        </div>
        <div className="relative drop-shadow-xl w-80 h-40 overflow-hidden rounded-xl bg-[#3d3c3d]">
          <div className="absolute flex flex-col items-center space-y-6 text-white z-[1] opacity-90 rounded-xl inset-0.5 bg-gradient-to-br from-red-600 to-red-400 hover:scale-105 transition-all duration-300 delay-100">
            <span className="pt-4 font-bold text-xl">Cancelled Rides</span>
            <h1 className=" font-bold text-5xl">{cancel}</h1>
          
          </div>
          <div className="absolute w-56 h-40 bg-white blur-[50px] -left-1/2 -top-1/2"></div>
        </div>
      </div>
    </div>
    
  );
};

export default DriverHomePage;
