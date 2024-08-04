import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Component to display the user's current location marker
const UserLocationMarker = ({ position }) => {
  const map = useMap();
  console.log(position)
  useEffect(() => {
    if (position) {
      map.setView(position, 15); // Set zoom level to 15 or adjust as needed
    }
  }, [position, map]);

  return position ? (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  ) : null;
};

const MapComponent = () => {
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const currentPosition = [position.coords.latitude, position.coords.longitude];
          setUserPosition(currentPosition);
        },
        (error) => {
          console.error("Error getting the current position: ", error);
          alert("Unable to retrieve your location. Please ensure location services are enabled.");
        },
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  return (
    <MapContainer center={userPosition || [51.505, -0.09]} zoom={13} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <UserLocationMarker position={userPosition} />
    </MapContainer>
  );
};

export default MapComponent;
