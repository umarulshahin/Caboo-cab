import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MapComponent from '../../Pages/user_side/Map'
import { backendUrl } from '../../Utils/Constanse'
import pickup from '../../assets/pickup.png';
import dropoff from '../../assets/dropoff.png';
import money from '../../assets/money.png';
import time from '../../assets/time.png';
import distancee from '../../assets/distance.png';
import useUserWebSocket from '../../Socket/Socket';
import RideCancelModal from './RideCancelModal';

const UserRide_page = () => {
    const [locationCoords, setLocationCoords] = useState(null);
    const [destinationCoords, setDestinationCoords] = useState(null);
    const [driverData, setDriverData] = useState({});
    const [rideData, setRideData] = useState({});
    const [showCancelModal, setShowCancelModal] = useState(false);

    const ridedriver = useSelector((state) => state.ride_data.rideDriverdetails);
    const otpvalidation = useSelector((state)=>state.ride_data.otpValidation);
    const {Canceltrip}=useUserWebSocket()

    useEffect(() => {
        const { driverLocation, clientLocation } = ridedriver ? ridedriver.data.user_data.driverdata : {};
        if(otpvalidation!=='OTP_success'){
            console.log('yes working')
            setLocationCoords({ lat: clientLocation.lat, lng: clientLocation.lng });
            setDestinationCoords({ lat: driverLocation.lat, lng: driverLocation.lng });
        }
       
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
          
    useEffect(() => {
      
      const ride_places = ridedriver ? ridedriver.data.user_data.ride_data.userRequest.place_code:"";

      if (otpvalidation === 'OTP_success' && ride_places) {
        const location = ride_places ? ride_places.location:"";
        const destination = ride_places ? ride_places.destination:"";

        setLocationCoords({ lat: location.lat, lng: location.lng });
        setDestinationCoords({ lat: destination.lat, lng: destination.lng });

      }
  }, [otpvalidation,ridedriver]);
  
  const handleCancelRide=()=>{
    setShowCancelModal(false);
    Canceltrip()
    console.log('yes cancel function working')

  }
  const handleCancelModalClose = () => {
    setShowCancelModal(false);

  };
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
                    { otpvalidation !== 'OTP_success' ? 
                      <>
                    <div className='flex items-center justify-center  mb-4 shadow-xl rounded-md p-4 space-x-4  bg-white'>
                         <p className='font-semibold text-xl '> OTP :</p>
                        <p className='font-bold text-2xl'>{rideData.tripOtp}</p>
                    </div>
                    <div className='flex justify-center py-3'>
                    <button         onClick={() => setShowCancelModal(true)}
                         className='bg-red-600 text-white py-2 px-6 font-bold text-xl rounded-md shadow-xl'>Cancel Ride</button>
                        {showCancelModal && (
                                <RideCancelModal
                                  onConfirm={handleCancelRide}
                                  onCancel={handleCancelModalClose}
                                />
                              )}
                    </div>
                    </>:
                    <div className='flex flex-col justify-center items-center p-4'>
                      <span className='text-2xl font-bold text-blue-500'>
                              Your safety is our top priority. <br />
                      </span>
                      <span className='text-2xl font-bold text-blue-500' >
                      Have a nice journey !

                      </span>
                    </div>
                 
                    
                    }
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
