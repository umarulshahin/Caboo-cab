import React from "react";
import Driver_Header from "./Driver_Header";
import Footer from "../Footer";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Clock,
  MapPin,
  Star,
  Tag,
  Truck,
  Calendar,
  Info
} from "lucide-react";
import { FaMoneyBillAlt, FaDownload, FaArrowLeft } from "react-icons/fa";
import { backendUrl } from "../../Utils/Constanse";

const Tripdetails = () => {
  const { state } = useLocation();
  const { trips } = state || {};
  const navigate = useNavigate();

  if (!trips) {
    return <div>No trip data available.</div>;
  }

  return (
    <div>
      <Driver_Header />
      <div className="flex justify-center  items-center my-28">
        <div className="w-3/4 border-2 bg-blue-100 p-5 rounded-lg">
          <div className="bg-gray-100 border-b">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-2xl p-6">Trip Details</span>
              </div>
              <div>
                <span className="text-gray-500 font-bold ">
                  Service Type: {trips.service_type}
                </span>
                <span className="text-gray-500 font-bold px-7">
                  Trip ID: {trips.orderId}
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col space-y-4 pt-4">
              <div className="flex items-center space-x-3 pl-6 rounded-lg bg-white">
                {/* Profile Image */}
                <img
                  src={`${backendUrl}${trips.user.profile}`} // Assuming this is the URL to the profile image
                  alt={trips.user.username}
                  className="w-10 h-10 rounded-full object-cover" // Tailwind classes to make the image round
                />
                {/* Username */}
                <span className="py-4 text-lg font-bold">{trips.user.username}</span>
              </div>
              <div className="flex py-4 space-x-3 pl-8 rounded-lg bg-white">
                <Star size={24} />
                <span className="font-bold">
                  Review <br /> <span>⭐⭐⭐⭐⭐</span>
                </span>
              </div>
              <div className="flex items-center space-x-3 pl-8 rounded-lg bg-white">
                <FaMoneyBillAlt size={24} />
                <span className="font-bold py-5">Fare: ₹{trips.amount}</span>
              </div>
              <div className="flex items-center pt-8 space-x-3 pl-8 rounded-lg bg-white">
                <Tag size={24} />
                <span className="font-bold">Paid Type: {trips.payment_type}</span>
              </div>
              {/* New Data Field with Icon */}
              <div className="flex items-center py-4 space-x-3 pl-8 rounded-lg bg-white">
                <Calendar size={24} /> {/* Calendar Icon */}
                <span className="font-bold">Date: {trips.dateTime}</span>
              </div>
              {/* New Status Field with Icon */}
              
            </div>
            <div className="flex flex-col pt-4 space-y-4">

            <div className="flex items-center py-4 px-4 space-x-3 rounded-lg bg-white">
                <Info size={24} /> {/* Info Icon for Status */}
                <span className="font-bold">Status: <span className={`${trips.status === 'completed' ? 'text-green-600' : trips.status === 'pending' ? 'text-orange-600' : 'text-red-600'}`}> {trips.status}</span></span>
              </div>
              <div className="flex items-center space-x-3 px-4  rounded-lg bg-white">
                <Truck size={24} />
                <span className="font-bold py-3">Distance: {trips.distance}</span>
              </div>
              <div className="flex items-center space-x-3 px-4 rounded-lg bg-white">
                <Clock size={24} />
                <span className="font-bold py-3">Duration: {trips.duration}</span>
              </div>
              <div className="flex items-center py-3 px-4 space-x-3 rounded-lg bg-white">
                <MapPin size={24} />
                <span className="font-bold">Location: <br /> <span>{trips.location}</span></span>
              </div>
              <div className="flex items-center py-2 px-4 space-x-3 rounded-lg bg-white">
                <MapPin size={24} />
                <span className="font-bold">Destination: <br /><span>{trips.destination}</span></span>
              </div>
              <div className="space-x-4 flex justify-end mr-10 py-5">
                <button onClick={() => navigate(-1)} className="bg-white border text-black font-bold py-2 px-6 my-4 hover:border-black rounded-lg flex items-center">
                  <FaArrowLeft className="mr-2" />
                  Back
                </button>
                <button className="bg-black font-bold text-white py-2 px-4 my-4 hover:bg-gray-600 rounded-lg flex items-center">
                  <FaDownload className="mr-2" />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Tripdetails;
