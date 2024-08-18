import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import notificationSound from '../assets/notification.wav';
import { useLoadScript } from "@react-google-maps/api";
import { addDriverRide, addRideDetails, addRideLocations } from '../Redux/RideSlice';
import { useNavigate } from 'react-router-dom';

const libraries = ["places"];
const apiKey = import.meta.env.VITE_google_map_api_key;

const useDriverWebSocket = () => {
    const [isRequestInProgress, setIsRequestInProgress] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalUserData, setModalUserData] = useState(null);
    const [responded, setResponded] = useState(false);
    const driver = useSelector((state) => state.driver_data.driver_token);
    const driverdetails = useSelector((state) => state.driver_data.driver_data);

    const [declineTimeout, setDeclineTimeout] = useState(null);
    const socketRef = useRef(null);
    const respondedRef = useRef(false);
    const [Driverlocation,setDriverlocation] = useState(null)
    const dispatch=useDispatch()
    const navigate = useNavigate()

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: apiKey,
        libraries,
      });

    useEffect(() => {
        respondedRef.current = responded;
    }, [responded]);

    useEffect(() => {
        const ws = new WebSocket(`ws://127.0.0.1:8001/ws/driverlocation/${driver.user_id}/`);
        socketRef.current = ws;

        ws.onopen = () => {
            console.log('WebSocket connection established');
        };

        const handleDecline = () => {
            console.log('No, ride declined');
            setResponded(true);
            respondedRef.current = true;
            setShowModal(false);
            if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                socketRef.current.send(JSON.stringify({
                    requestType: 'rideRequestResponse',
                    driver_id: driver.user_id,
                    rideRequestResponse: 'declined',
                }));
            } else {
                console.error('WebSocket is not open. Unable to send decline message.');
            }
            // clearTimeout(declineTimeout);
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.type === 'location_request') {
                if (!isRequestInProgress) {
                    setIsRequestInProgress(true);
                    handleLocationRequest(ws);
                }
            } else if (data.type === 'Riding_request') {
                console.log("Ride request received");
                console.log(data.user_data, 'user data');

                setModalUserData(data.user_data);
                setShowModal(true);
                setResponded(false);
                respondedRef.current = false;

                const audio = new Audio(notificationSound);
                audio.play().catch((error) => {
                    console.warn("Audio play was blocked:", error);
                });

                // const timeout = setTimeout(() => {
                //     if (!respondedRef.current) {
                //         console.warn("No action taken, automatically declining the request.");
                //         handleDecline();
                //     }
                // }, 10000);

                // setDeclineTimeout(timeout);
            }
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close();
            }
            // clearTimeout(declineTimeout);
        };
    }, [driver.user_id]);

    const handleLocationRequest = (ws) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log(latitude, longitude, "location from user");
                    setDriverlocation({lat:latitude,lng:longitude})
                    ws.send(JSON.stringify({
                        requestType: 'sendLocation',
                        Driverlocation: { latitude, longitude },
                        id: driver.user_id
                    }));
                    setIsRequestInProgress(false);
                },
                (error) => {
                    console.error('Error getting location:', error);
                    setIsRequestInProgress(false);
                },
                { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
            );
        } else {
            setIsRequestInProgress(false);
        }
    };

     
    const handleDriverLocation = (driverLocation, clientLocation) => {
        return new Promise((resolve, reject) => {
            if (isLoaded && driverLocation && clientLocation) {
                if (window.google && window.google.maps) {
                    const directionsService = new window.google.maps.DirectionsService();
                    const distanceService = new window.google.maps.DistanceMatrixService();
                    const geocoder = new window.google.maps.Geocoder();
    
                    // Create LatLng objects for driver and client locations
                    const driverLatLng = new window.google.maps.LatLng(driverLocation.lat, driverLocation.lng);
                    const clientLatLng = new window.google.maps.LatLng(clientLocation.lat, clientLocation.lng);
    
                    // Request distance and duration
                    const distanceRequest = {
                        origins: [driverLatLng],
                        destinations: [clientLatLng],
                        travelMode: window.google.maps.TravelMode.DRIVING,
                    };
    
                    distanceService.getDistanceMatrix(distanceRequest, (response, status) => {
                        if (status === window.google.maps.DistanceMatrixStatus.OK) {
                            const result = response.rows[0]?.elements[0];
                            
                            // Log result for debugging
                            console.log('Distance Matrix result:', result);
    
                            if (result && result.status === 'OK') {
                                const distance = result.distance;
                                const duration = result.duration;
    
                                // Log distance and duration for debugging
                                console.log('Distance:', distance);
                                console.log('Duration:', duration);
    
                                if (distance && duration) {
                                    const distanceInKm = distance.value / 1000;
                                    const durationInMinutes = duration.value / 60; // Convert to minutes
    
                                    // Request directions to get the route
                                    const directionsRequest = {
                                        origin: driverLatLng,
                                        destination: clientLatLng,
                                        travelMode: window.google.maps.TravelMode.DRIVING,
                                    };
    
                                    directionsService.route(directionsRequest, (result, status) => {
                                        if (status === window.google.maps.DirectionsStatus.OK) {
                                            // Geocode the locations to get place names
                                            const geocodeLocation = (latLng) => {
                                                return new Promise((resolve, reject) => {
                                                    geocoder.geocode({ location: latLng }, (results, status) => {
                                                        if (status === window.google.maps.GeocoderStatus.OK && results[0]) {
                                                            resolve(results[0].formatted_address);
                                                        } else {
                                                            reject(`Geocode failed due to ${status}`);
                                                        }
                                                    });
                                                });
                                            };
    
                                            // Resolve both locations
                                            Promise.all([
                                                geocodeLocation(driverLatLng),
                                                geocodeLocation(clientLatLng),
                                            ])
                                            .then(([driverAddress, clientAddress]) => {
                                                resolve({
                                                    driverLocation: {
                                                        lat: driverLocation.lat,
                                                        lng: driverLocation.lng,
                                                        address: driverAddress,
                                                    },
                                                    clientLocation: {
                                                        lat: clientLocation.lat,
                                                        lng: clientLocation.lng,
                                                        address: clientAddress,
                                                    },
                                                    distance: {
                                                        text: distance.text, // e.g., '3.9 km'
                                                        value: distance.value
                                                    },
                                                    duration: {
                                                        text: duration.text, // e.g., '13 mins'
                                                        value: duration.value
                                                    }
                                                });
                                            })
                                            .catch(error => {
                                                reject(`Geocoding failed: ${error}`);
                                            });
    
                                        } else {
                                            reject(`Directions request failed due to ${status}`);
                                        }
                                    });
                                } else {
                                    reject('Distance or duration data is not available.');
                                }
                            } else {
                                reject(`Distance request failed due to ${result?.status || 'unknown error'}`);
                            }
                        } else {
                            reject(`DistanceMatrixService failed due to ${status}`);
                        }
                    });
                } else {
                    reject("Google Maps API is not loaded.");
                }
            } else {
                reject('Driver and client locations are required');
            }
        });
    };
    


    const handleAcceptRide = async () => {
        console.log('Yes, ride accepted');
        setResponded(true);
        respondedRef.current = true;
        setShowModal(false);
    
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN && Driverlocation && modalUserData?.userRequest?.place_code?.location) {
            try {
                const driverData = await handleDriverLocation(Driverlocation, modalUserData.userRequest.place_code.location);
                console.log(driverData,'driver data')
                
                

                const ridedata={
                    client:{lat:driverData.clientLocation.lat,
                            lng:driverData.clientLocation.lng},
                    driver:{lat:driverData.driverLocation.lat,
                            lng:driverData.driverLocation.lng },
                }
                console.log(ridedata,'ride Data')

                dispatch(addRideLocations(ridedata))
                dispatch(addDriverRide(driverData))
                dispatch(addRideDetails(modalUserData))
                // Send response message with WebSocket
                socketRef.current.send(JSON.stringify({
                    requestType: 'rideRequestResponse',
                    driver_id: driver.user_id,
                    rideRequestResponse: 'accepted',
                    driverdata: driverData,
                    driverDtails : driverdetails
                }));

                navigate('/Ride')
     
            } catch (error) {
                console.error('Error handling driver location:', error);
            }
        } else {
            console.error('WebSocket is not open or location data is missing.');
        }
         // clearTimeout(declineTimeout);

    };
    



    return {
        showModal,
        modalUserData,
        handleAcceptRide,


        handleDecline: () => {
            if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                console.log('No, ride declined');
                setResponded(true);
                respondedRef.current = true;
                setShowModal(false);
                socketRef.current.send(JSON.stringify({
                    requestType: 'rideRequestResponse',
                    driver_id: driver.user_id,
                    rideRequestResponse: 'declined',
                }));
                // clearTimeout(declineTimeout);
            } else {
                console.error('WebSocket is not open. Unable to send decline message.');
            }
        },

    };
};

export default useDriverWebSocket;