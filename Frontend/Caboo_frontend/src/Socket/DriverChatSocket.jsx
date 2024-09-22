import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adddriverMessage } from '../Redux/Chatslice';
import { toast } from 'sonner';
import Cookies from "js-cookie"
import { json } from 'react-router-dom';

const DriverWebSocketContext = createContext({
  handleSendDriverMessage: () => {}, // Default function
});

export const DriverWebSocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const driver = useSelector((state) => state.driver_data.driver_data);
  const user = useSelector((state) => state.driver_ride_data.driverrideDetails);
  const driverMessage = useSelector((state) => state.chat_data.driverMessage);

  const rawtoken = Cookies.get("DriverTokens")
  let token = null
  if (rawtoken){
     token= JSON.parse(rawtoken)

  }

  const [driverSocket, setDriverSocket] = useState(null);
  const user_id = user?.userRequest?.user_id || null;
  const driver_id = driver ? driver[0]?.customuser?.id : null;

  useEffect(() => {
    if (!user_id || !driver_id || !token) return; // Wait until user_id and driver_id are available

    const roomId = driver_id;
    const ws = new WebSocket(`ws://127.0.0.1:8001/ws/chat/${roomId}/?token=${token["access"]}`);
    


    ws.onopen = () => {
      console.log('Driver WebSocket connection established');
      setDriverSocket(ws);
    };

    ws.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      console.log(messageData, 'received driver data');
      const receiveMessage = messageData?.message?.message;
      if (receiveMessage) {
        console.log(receiveMessage, 'received driver message');
        dispatch(adddriverMessage([{ text: receiveMessage, type: 'received' }]));
        toast.info('You have received a new message ')
      }
    };

    ws.onerror = (error) => {
      console.error('Driver WebSocket error:', error);
    };

    ws.onclose = (event) => {
      console.log(event.code,'Driver WebSocket connection closed');
      if(event.code === 4001){
        toast.error('Authentication failed. Please log in again.');

      }
    };

    return () => {
      ws.close();
    };
  }, [driver_id, user_id]);

  const handleSendDriverMessage = (value) => {
    console.log(value, 'send driver message handler');
    if (value && driverSocket) {
      const newSentMessage = { text: value, type: 'sent' };
      dispatch(adddriverMessage(newSentMessage));
      driverSocket.send(JSON.stringify({ message: value, connectId: user_id }));
    }
  };

  return (
    <DriverWebSocketContext.Provider value={{ handleSendDriverMessage }}>
      {children}
    </DriverWebSocketContext.Provider>
  );
};

export const useDriverWebSocket = () => useContext(DriverWebSocketContext);
