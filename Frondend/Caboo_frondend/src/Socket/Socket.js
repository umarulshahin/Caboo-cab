import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const useUserWebSocket = () => {
    const [socket, setSocket] = useState(null);
    const user = useSelector((state) => state.user_data.token_data);
    
    useEffect(() => {
        if (!user.user_id) {
            console.error("User ID is not available");
            return;
        }

        const ws = new WebSocket(`ws://127.0.0.1:8001/ws/driverlocation/${user.user_id}/`);
        console.log(ws);
        
        ws.onopen = () => {
            console.log('WebSocket connection established');
            setSocket(ws);
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Message received:', data);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close();
            }
        };
    }, [user.user_id]);

    const sendMessage = (data) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            console.log('Sending message:', data);
            socket.send(JSON.stringify({ userRequest: data }));
        } else {
            console.error('Cannot send message, WebSocket is not open');
        }
    };

    return { sendMessage };
};

export default useUserWebSocket;
