import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adduserMessage } from '../Redux/Chatslice';
import { toast } from 'sonner';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user_data.user_data);
  const driver = useSelector((state) => state.ride_data.rideDriverdetails);
  const user_id =user ? user[0]?.id:null;
  const driver_id = driver?.data?.user_data?.driver_id;
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!user_id || !driver_id) return; // Wait until user_id and driver_id are available
    const roomId = user_id;

    const ws = new WebSocket(`ws://127.0.0.1:8001/ws/chat/${roomId}/`);

    ws.onopen = () => {
      console.log('User WebSocket connection established');
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      console.log(messageData, 'received data');
      const receiveMessage = messageData?.message?.message;
      if (receiveMessage) {
        console.log(receiveMessage, 'received message');
        dispatch(adduserMessage([{ text: receiveMessage, type: 'received' }]));
        toast.info('You have received a new message')
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, [user_id, driver_id, dispatch]);

  const handleSendMessage = (value) => {
    console.log(value, 'send message handler');
    if (value && socket) {
      const newSentMessage = { text: value, type: 'sent' };
      dispatch(adduserMessage(newSentMessage));
      socket.send(JSON.stringify({ message: value, connectId: driver_id }));
    }
  };

  return (
    <WebSocketContext.Provider value={{ handleSendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
