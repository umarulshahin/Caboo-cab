import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adduserMessage } from "../Redux/Chatslice";
import { toast } from "sonner";
import Cookies from "js-cookie";
import axios from "axios";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user_data.user_data);
  const driver = useSelector((state) => state.ride_data.rideDriverdetails);
  const user_id = user ? user[0]?.id : null;
  const driver_id = driver?.data?.user_data?.driver_id;
  const [socket, setSocket] = useState(null);
  const rawtoken = Cookies.get("userTokens");
  if (rawtoken){
    const token = JSON.parse(rawtoken);

  }

  const refresh = async () => {
    try {
      console.log('yes refresh is working')
      const rawToken = Cookies.get("userTokens");
      const token = JSON.parse(rawToken);
      if (!token.refresh) {
        throw new Error("No refresh token available");
      }
      // Request a new access token using the refresh token
      const response = await axios.post(`${backendUrl}/Api/token/refresh/`, {
        refresh: token.refresh,
      });

      const newToken = response.data;
        Cookies.set("userTokens", JSON.stringify(newToken), { expires: 7 });

      return newToken.access; 
    } catch (error) {
      console.error("Failed to refresh token", error);
      throw error;
    }
  };



  const connectWebSocket = useCallback(async () =>  {
    if (!user_id || !driver_id || !token) return;
    const roomId = user_id;

    const ws = new WebSocket(
      `ws://127.0.0.1:8001/ws/chat/${roomId}/?token=${token["access"]}`
    );

    ws.onopen = () => {
      console.log("User WebSocket connection established");
      setSocket(ws);
      console.log('yes working connection')
    };

    ws.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      const receiveMessage = messageData?.message?.message;
      if (receiveMessage) {
        dispatch(adduserMessage([{ text: receiveMessage, type: "received" }]));
        toast.info("You have received a new message");
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = (event) => {
      console.log(event.code, "WebSocket connection closed");
      if (event.code === 4001) {
        const newtoken = refresh()
        if(newtoken){
          console.log('yes working')
          connectWebSocket()
        }else{
          toast.error("Authentication failed. Please log in again.");

        }

      }else{
        console.log(event.code)
      }
    };

    return () => {
      ws.close();
    };
  }, [user_id, driver_id]);

  const handleSendMessage = (value) => {

    const newSentMessage = { text: value, type: "sent" };

    if (value && socket && socket.readyState === WebSocket.OPEN) {
      dispatch(adduserMessage(newSentMessage));
      socket.send(JSON.stringify({ message: value, connectId: driver_id }));
    }else{
      
      dispatch(adduserMessage({ text: value, type: "sent" , status: "pending"}))
      connectWebSocket();
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
