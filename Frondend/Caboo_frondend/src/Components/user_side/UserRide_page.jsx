import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import MapComponent from '../../Pages/user_side/Map'
import { backendUrl } from '../../Utils/Constanse'
import destination_icon from "../../assets/destination.png";
import location_icon from "../../assets/location.png";
import key from '../../assets/key.png';
import pickup from '../../assets/pickup.png';
import dropoff from '../../assets/dropoff.png';
import money from '../../assets/money.png';
import time from '../../assets/time.png';
import distancee from '../../assets/distance.png';

const UserRide_page = () => {
    const [locationCoords, setLocationCoords] = useState(null);
    const [destinationCoords, setDestinationCoords] = useState(null);
    const [driverData, setDriverData] = useState({});
    const [rideData, setRideData] = useState({});
    const ridedriver = useSelector((state) => state.ride_data.rideDriverdetails);
    console.log(ridedriver, 'ride details');

    useEffect(() => {
        const { driverLocation, clientLocation } = ridedriver ? ridedriver.data.user_data.driverdata : {};
        setLocationCoords({ lat: clientLocation.lat, lng: clientLocation.lng });
        setDestinationCoords({ lat: driverLocation.lat, lng: driverLocation.lng });

        const { profile, username } = ridedriver ? ridedriver.data.tripdata.driver_data[0].customuser : {};
        const { vehicle_name, vehicle_no } = ridedriver ? ridedriver.data.tripdata.driver_data[0] : {};

        setDriverData({
            profile: profile,
            username: username,
            vehicle: vehicle_name,
            vehicle_no: vehicle_no,
        });

        const { distance, duration, location, orderId, tripOTP, amount, destination } = ridedriver ? ridedriver.data.tripdata.trip_data : {};

        setRideData({
            location: location,
            destination: destination,
            distance: distance,
            duration: duration,
            amount: amount,
            orderId: orderId,
            tripOtp: tripOTP,
        });
    }, [ridedriver]);

    return (
        <div className='flex flex-row  p-10 space-x-4'>
            <div className='py-4 w-1/2 shadow-2xl bg-blue-50 flex flex-col items-center justify-center'>
                {driverData && rideData && (
                  <>
                  <img className='rounded-full h-32 w-32 border-4 border-gray-300' src={`${backendUrl}${driverData.profile}`} alt="Profile" />
                  <div className='mt-4 w-full px-6'>
                      {/* First row with labels */}
                      <div className='flex justify-between px-20 space-x-6 '>
                          <p className='w-1/2  '>Name</p>
                          <p className='w-1/2  '>Vehicle</p>
                      </div>
                      {/* First row with values */}
                      <div className='flex justify-between px-20 mt-1 space-x-4'>
                          <p className='text-lg font-semibold shadow-xl bg-white p-4 rounded-md w-1/2'>{driverData.username}</p>
                          <p className='text-lg font-semibold shadow-xl bg-white p-4 rounded-md w-1/2'>{driverData.vehicle}</p>
                      </div>
                      
                      {/* Second row with labels */}
                      <div className='flex justify-between px-20 space-x-6 mt-4'>
                          <p className='w-1/2  '>Vehicle Number</p>
                          <p className='w-1/2  '>Order ID</p>
                      </div>
                      {/* Second row with values */}
                      <div className='flex justify-between px-20 mt-1 space-x-4'>
                          <p className='text-lg font-semibold shadow-xl bg-white p-4 rounded-md w-1/2'>{driverData.vehicle_no}</p>
                          <p className='text-lg font-semibold shadow-xl bg-white p-4 rounded-md w-1/2'>{rideData.orderId}</p>
                      </div>
                  </div>
              </>
              
                )}
                <div className='mt-4 space-y-2'>
                    <div className='flex items-center mb-4 shadow-xl rounded-md p-4 bg-white'>
                        <img src={pickup} alt="Pickup" className='w-6 h-6 mr-2' /> {/* Pickup icon */}
                        <p className='font-bold'>{rideData.location}</p>
                    </div>
                    <div className='flex items-center mb-4 shadow-xl rounded-md p-4 bg-white'>
                        <img src={dropoff} alt="Dropoff" className='w-6 h-6 mr-2' /> {/* Dropoff icon */}
                        <p className='font-bold'>{rideData.destination}</p>
                    </div>
                    <div className='flex items-center mb-4 shadow-xl rounded-md p-4 bg-white'>
                        <img src={distancee} alt="Distance" className='w-6 h-6 mr-2' /> {/* Distance icon */}
                        <p className='font-bold'>{rideData.distance}</p>
                    </div>
                    <div className='flex items-center mb-4 shadow-xl rounded-md p-4 bg-white'>
                        <img src={time} alt="Duration" className='w-6 h-6 mr-2' /> {/* Duration icon */}
                        <p className='font-bold'>{rideData.duration}</p>
                    </div>
                    <div className='flex items-center mb-4 shadow-xl rounded-md p-4 bg-white'>
                        <img src={money} alt="Amount" className='w-6 h-6 mr-2 ' /> {/* Money icon */}
                        <p className='font-bold'>₹ {rideData.amount}</p>
                    </div>
                    <div className='flex items-center justify-center  mb-4 shadow-xl rounded-md p-4 space-x-4  bg-white'>
                         <p className='font-semibold text-xl '> OTP :</p>
                        <p className='font-bold text-2xl'>{rideData.tripOtp}</p>
                    </div>
                    <div className='flex justify-center py-3'>
                    <button className='bg-red-600 text-white py-2 px-6 font-bold text-xl rounded-md shadow-xl'>Cancel Ride</button>

                    </div>
                </div>
            </div>
            <div className='w-1/2 rounded-lg shadow-2xl'>
                <MapComponent
                    locationCoords={locationCoords ? locationCoords : { lat: null, lng: null }}
                    destinationCoords={destinationCoords ? destinationCoords : { lat: null, lng: null }}
                />
            </div>
        </div>
    )
}

export default UserRide_page;
