import React, { useEffect, useState } from 'react';
import { GoogleMap, Polyline, Marker, useLoadScript } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import { toast } from "sonner";

import destination_icon from "../../assets/destination.png";
import location_icon from "../../assets/location.png";
import key from '../../assets/key.png';
import pickup from '../../assets/pickup.png';
import dropoff from '../../assets/dropoff.png';
import money from '../../assets/money.png';
import time from '../../assets/time.png';
import distancee from '../../assets/distance.png';

const mapContainerStyle = {
  height: '100%',
  width: '100%',
};

const defaultCenter = {
  lat: 40.7128,
  lng: -74.0060,
};

const pickupIcon = {
  url: location_icon,
  scaledSize: { width: 30, height: 30 },
};

const destinationIcon = {
  url: destination_icon,
  scaledSize: { width: 30, height: 30 },
};

const apiKey = import.meta.env.VITE_google_map_api_key;

const DriverMap = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey, 
    libraries: ['places'],
  });

  const data = useSelector((state) => state.ride_data.rideLocations);
  const ridedetails = useSelector((state)=>state.ride_data.rideDetails)

  const starting = data?.driver;
  const ending = data?.client;
  const { distance, duration, places, price } = ridedetails ? ridedetails.userRequest : {};

  const [directions, setDirections] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(13);

  useEffect(() => {
    if (isLoaded && starting && ending) {
      const directionsService = new window.google.maps.DirectionsService();

      const directionsRequest = {
        origin: new window.google.maps.LatLng(starting.lat, starting.lng),
        destination: new window.google.maps.LatLng(ending.lat, ending.lng),
        travelMode: window.google.maps.TravelMode.DRIVING,
      };

      directionsService.route(directionsRequest, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result.routes[0].overview_path.map(point => ({
            lat: point.lat(),
            lng: point.lng(),
          })));
          setZoomLevel(14);
        } else {
          console.error(`Directions request failed due to ${status}`);
          toast.error("Unable to retrieve directions. Please try again.");
        }
      });
    }
  }, [isLoaded, starting, ending]);

  const handlePinChange = (e) => {
    const value = e.target.value;
    if (value.length === 4) {
      console.log("PIN entered:", value);
    }
  };

  return (
    <div className='flex flex-col md:flex-row h-screen p-6 md:p-10 space-y-4 md:space-y-0 md:space-x-4'>
      {/* Left side with ride details */}
      <div className='w-full md:w-1/2 h-fit bg-blue-50 rounded-md p-4 font-bold flex flex-col justify-between'>
        <div>
          <h2 className='text-2xl font-bold mb-6'>Ride Details</h2>

          <div className='flex items-center mb-4 shadow-xl rounded-md p-4 bg-white'>
            <img src={pickup} alt="Pickup" className='w-6 h-6 mr-2' /> {/* Custom icon */}
            <div>
              <p>{places?.location}</p>
            </div>
          </div>

          <div className="flex items-center mb-4 shadow-xl rounded-md p-4 bg-white">
            <img src={dropoff} alt="Dropoff" className='w-6 h-6 mr-2' /> {/* Custom icon */}
            <div>
              <p>{places?.destination}</p>
            </div>
          </div>

          <div className='flex items-center mb-4 shadow-xl rounded-md p-4 bg-white'>
            <img src={time} alt="Time" className='w-6 h-6 mr-2' /> {/* Custom icon */}
            <div>
              <p>{distance.duration?.text}</p>
            </div>
          </div>

          <div className='flex items-center mb-4 shadow-xl rounded-md p-4 bg-white'>
            <img src={distancee} alt="Distance" className='w-6 h-6 mr-2' /> {/* Custom icon */}
            <div>
              <p>{distance.distance?.text}</p>
            </div>
          </div>

          <div className='flex items-center mb-4 shadow-xl rounded-md p-4 bg-white'>
            <img src={money} alt="Price" className='w-6 h-6 mr-2' /> {/* Custom icon */}
            <div>
              <label className='block text-gray-700'></label>
              <p>₹ {(price * 0.9).toFixed(2)}</p>
            </div>
          </div>

          <div className='flex items-center mb-4 shadow-xl rounded-md p-4 bg-white'>
            <img src={key} alt="Key" className='w-6 h-6 mr-2 mt-7' /> {/* Custom icon */}
            <div>
              <label className='block text-black mb-2'>Enter the PIN to Confirm the ride</label>
              <input
                type='text'
                maxLength='4'
                className='w-full px-4 py-2 border border-black rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500'
                onChange={handlePinChange}
              />
            </div>
          </div>
        </div>

        <div className='flex justify-center space-x-2'>
          <button className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'>
            Cancel Ride
          </button>
          <button className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'>
            Confirm Ride
          </button>
        </div>
      </div>

      {/* Right side with the map */}
      <div className='w-full md:w-1/2 h-[400px] md:h-[610px] rounded-md shadow-2xl bg-blue-100'>
        <div className='h-full' style={mapContainerStyle}>
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={starting || defaultCenter}
              zoom={zoomLevel}
            >
              {directions && (
                <Polyline
                  path={directions}
                  options={{ strokeColor: 'black', strokeOpacity: 1.0, strokeWeight: 4 }}
                />
              )}
              {starting && <Marker position={starting} icon={pickupIcon} />}
              {ending && <Marker position={ending} icon={destinationIcon} />}
            </GoogleMap>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverMap;
