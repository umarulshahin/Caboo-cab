import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const useDriverWebSocket = () => {
    const [socket, setSocket] = useState(null);
    const [isRequestInProgress, setIsRequestInProgress] = useState(false);
    const driver = useSelector((state) => state.driver_data.driver_token);

    useEffect(() => {
        const ws = new WebSocket(`ws://127.0.0.1:8001/ws/driverlocation/${driver.user_id}/`);
        console.log(ws)
        ws.onopen = () => {
            console.log('WebSocket connection established');
            setSocket(ws);
        };

        ws.onmessage = (event) => {

            const data = JSON.parse(event.data);
            if (data.type === 'location_request') {
                if (!isRequestInProgress) {
                    setIsRequestInProgress(true);
                    handleLocationRequest(ws);
                }
            }
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close();
            }
        };
    }, [driver.user_id]);

    const handleLocationRequest = (ws) => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log(latitude, longitude, "location from user");
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

    return {};
};

export default useDriverWebSocket;
