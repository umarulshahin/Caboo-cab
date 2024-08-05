import React, { useEffect, useState, useRef } from "react";
import { GoogleMap, Polyline, useLoadScript, Marker } from "@react-google-maps/api";
import current_icon from "../../assets/current.png";
import destination_icon from "../../assets/destination.png";
import location_icon from "../../assets/location.png";

const libraries = ["places"];
const apiKey = import.meta.env.VITE_google_map_api_key;

const pickupIcon = {
  url: location_icon,
  scaledSize: { width: 30, height: 30 },
};

const destinationIcon = {
  url: destination_icon,
  scaledSize: { width: 30, height: 30 },
};

const currentLocationIcon = {
  url: current_icon,
  scaledSize: { width: 40, height: 40 },
};

const MapComponent = ({ locationCoords, destinationCoords }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,
  });

  const [userPosition, setUserPosition] = useState(null);
  const [route, setRoute] = useState([]);
  const [distance, setDistance] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentPosition = { lat: position.coords.latitude, lng: position.coords.longitude };
          setUserPosition(currentPosition);
        },
        (error) => {
          console.error("Error getting the current position: ", error);
          alert("Unable to retrieve your location. Please ensure location services are enabled.");
        },
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (isLoaded && locationCoords && destinationCoords) {
      if (window.google && window.google.maps) {
        const directionsService = new window.google.maps.DirectionsService();
        const distanceService = new window.google.maps.DistanceMatrixService();

        const directionsRequest = {
          origin: new window.google.maps.LatLng(locationCoords.lat, locationCoords.lng),
          destination: new window.google.maps.LatLng(destinationCoords.lat, destinationCoords.lng),
          travelMode: window.google.maps.TravelMode.DRIVING,
        };

        directionsService.route(directionsRequest, (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            const routePath = result.routes[0].overview_path.map((point) => ({
              lat: point.lat(),
              lng: point.lng(),
            }));
            setRoute(routePath);

            const bounds = new window.google.maps.LatLngBounds();
            bounds.extend(new window.google.maps.LatLng(locationCoords.lat, locationCoords.lng));
            bounds.extend(new window.google.maps.LatLng(destinationCoords.lat, destinationCoords.lng));
            routePath.forEach((point) => bounds.extend(new window.google.maps.LatLng(point.lat, point.lng)));
            if (mapRef.current) {
              mapRef.current.fitBounds(bounds);
            }
          } else {
            console.error(`Directions request failed due to ${status}`);
          }
        });

        const distanceRequest = {
          origins: [new window.google.maps.LatLng(locationCoords.lat, locationCoords.lng)],
          destinations: [new window.google.maps.LatLng(destinationCoords.lat, destinationCoords.lng)],
          travelMode: window.google.maps.TravelMode.DRIVING,
        };

        distanceService.getDistanceMatrix(distanceRequest, (response, status) => {
          if (status === window.google.maps.DistanceMatrixStatus.OK) {
            console.log('Distance Matrix Response:', response);
            const result = response.rows[0].elements[0];
            if (result.status === 'OK') {
              const distanceInKm = result.distance.value / 1000; // Convert meters to kilometers
              setDistance(distanceInKm.toFixed(2));
            } else {
              console.error(`Distance request failed due to ${result.status}`);
            }
          } else {
            console.error(`Distance request failed due to ${status}`);
          }
        });
      } else {
        console.error("Google Maps API is not loaded.");
      }
    } else {
      setRoute([]);
      setDistance(null);
    }
  }, [isLoaded, locationCoords, destinationCoords]);

  const mapCenter = userPosition || { lat: 51.505, lng: -0.09 };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading Maps...</div>;
  }

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <GoogleMap
        center={mapCenter}
        zoom={13}
        mapContainerStyle={{ height: "100%", width: "100%" }}
        onLoad={(map) => (mapRef.current = map)}
      >
        {!locationCoords && !destinationCoords && userPosition && (
          <Marker
            position={userPosition}
            icon={currentLocationIcon}
          />
        )}

        {locationCoords && (
          <Marker
            position={locationCoords}
            icon={pickupIcon}
          />
        )}

        {destinationCoords && (
          <Marker
            position={destinationCoords}
            icon={destinationIcon}
          />
        )}

        {route.length > 0 && (
          <Polyline path={route} options={{ strokeColor: "black" }} />
        )}
      </GoogleMap>
      {distance !== null && (
        <div style={{ position: 'absolute', bottom: 10, left: 10, background: 'white', padding: '5px' }}>
          Distance: {distance} km
        </div>
      )}
    </div>
  );
};

export default MapComponent;
