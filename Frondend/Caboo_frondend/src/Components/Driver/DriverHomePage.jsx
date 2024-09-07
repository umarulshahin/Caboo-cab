import React from "react";

const DriverHomePage = () => {
  return (
    <div className="pt-40">
      <div className="flex justify-evenly">
        <div class="relative drop-shadow-xl w-48 h-64 overflow-hidden rounded-xl bg-[#3d3c3d]">
          <div class="absolute flex items-start justify-center text-white z-[1] opacity-90 rounded-xl inset-0.5 bg-[#323132]">
          
          <span className="pt-4 font-bold">This Month's Rides</span>
          </div>
          <div class="absolute w-56 h-48 bg-white blur-[50px] -left-1/2 -top-1/2"></div>
        </div>
        <div class="relative drop-shadow-xl w-48 h-64 overflow-hidden rounded-xl bg-[#3d3c3d]">
          <div class="absolute flex items-start justify-center text-white z-[1] opacity-90 rounded-xl inset-0.5 bg-[#323132]">
          
          <span className="pt-4 font-bold">Total Earnings</span>
          </div>
          <div class="absolute w-56 h-48 bg-white blur-[50px] -left-1/2 -top-1/2"></div>
        </div>
        <div class="relative drop-shadow-xl w-48 h-64 overflow-hidden rounded-xl bg-[#3d3c3d]">
          <div class="absolute flex items-start justify-center text-white z-[1] opacity-90 rounded-xl inset-0.5 bg-[#323132]">
          <span className="pt-4 font-bold">Total Rides</span>
          </div>
          <div class="absolute w-56 h-48 bg-white blur-[50px] -left-1/2 -top-1/2"></div>
        </div>
        <div class="relative drop-shadow-xl w-48 h-64 overflow-hidden rounded-xl bg-[#3d3c3d]">
          <div class="absolute flex items-start justify-center text-white z-[1] opacity-90 rounded-xl inset-0.5 bg-[#323132]">
            <span className="pt-4 font-bold">Cancelled Rides</span>
          
          </div>
          <div class="absolute w-56 h-48 bg-white blur-[50px] -left-1/2 -top-1/2"></div>
        </div>
      </div>
    </div>
    
  );
};

export default DriverHomePage;
