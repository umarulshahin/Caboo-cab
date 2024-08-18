import React, { useEffect, useState } from 'react';
import { GoogleMap, Polyline, Marker, useLoadScript } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import { FaMapMarkerAlt, FaFlag, FaClock, FaRoad, FaDollarSign, FaKey } from 'react-icons/fa'; 
import destination_icon from "../../assets/destination.png";
import location_icon from "../../assets/location.png";
import { toast } from "sonner";

const mapContainerStyle = {
  height: '100%',
  width: '100%',
};

const defaultCenter = {
  lat: 40.7128, // Default center latitude
  lng: -74.0060, // Default center longitude
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
  const { distance, duration, places, price } = ridedetails.userRequest;

  const [directions, setDirections] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(13); // Start with a high zoom level for better focus

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

          // Adjust zoom level based on the path length
          setZoomLevel(14); // Set to a lower zoom level to show the entire route
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
      // Auto-submit or move to the next step
      console.log("PIN entered:", value);
    }
  };

  return (
    <div className='flex flex-row h-screen p-10'>
      {/* Left side with ride details */}
      <div className='w-1/2 h-1/2 p-4 bg-gray-100 font-bold flex flex-col justify-between'>
        <div>
          <h2 className='text-2xl font-bold mb-6'>Ride Details</h2>
          <div className='flex items-center mb-4 shadow-xl rounded-md p-2'>
            <FaMapMarkerAlt className='text-gray-700 mr-2' />
            <div>
              <p>{places.location}</p>
            </div>
          </div>
          <div className='flex items-center mb-4 shadow-xl rounded-md p-2'>
            <FaFlag className='text-gray-700 mr-2' />
            <div>
              <p>{places.destination}</p>
            </div>
          </div>
          <div className='flex items-center mb-4 shadow-xl rounded-md p-2'>
            <FaClock className='text-gray-700 mr-2' />
            <div>
              <label className='block text-gray-700'>{distance.duration.text}</label>
            </div>
          </div>
          <div className='flex items-center mb-4 shadow-xl rounded-md p-2'>
            <FaRoad className='text-gray-700 mr-2' />
            <div>
              <p>{distance.distance.text}</p> {/* Distance in text */}
            </div>
          </div>
          <div className='flex items-center mb-4 shadow-xl rounded-md p-2'>
            <FaDollarSign className='text-gray-700 mr-2' />
            <div>
              <label className='block text-gray-700'>Price</label>
              <p>₹ {(price * 0.9).toFixed(2)}</p>
            </div>
          </div>
          <div className='flex items-center mb-4 shadow-xl rounded-md p-2'>
            <FaKey className='text-gray-700 mr-2 mt-7' />
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
        <div className='flex justify-between'>
          <button className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'>
            Cancel Ride
          </button>
          <button className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'>
            Confirm Ride
          </button>
        </div>
      </div>

      {/* Right side with the map */}
      <div className='w-1/2 h-[500px] shadow-2xl'>
        <div className='h-full rounded-lg' style={mapContainerStyle}>
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
