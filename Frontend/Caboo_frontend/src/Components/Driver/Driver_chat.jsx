import React, { useEffect, useRef, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useDriverWebSocket } from '../../Socket/DriverChatSocket';

const Driver_chat = ({ setShowchat }) => {
  const driverMessage = useSelector((state) => state.chat_data.driverMessage);
  const dispatch = useDispatch();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Use the custom hook to access WebSocket functionality
  const { handleSendDriverMessage } = useDriverWebSocket();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to the bottom whenever messages are updated
  useEffect(() => {
    scrollToBottom();
  }, [driverMessage]);

  // Handle sending a new message
  const handleMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      handleSendDriverMessage(newMessage);
      setNewMessage('');
    }
  };

  // Go back to previous screen
  const handleBack = () => {
    setShowchat(false);
  };

  return (
    <div className="flex flex-col h-screen mx-auto bg-gray-100 p-4">
      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto mb-4">
        {Array.isArray(driverMessage) && driverMessage.length > 0 ? (
          driverMessage.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'} mb-2`}
            >
              <div
                className={`p-2 rounded-lg max-w-xs ${
                  msg.type === 'sent' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                {typeof msg.text === 'string' ? msg.text : JSON.stringify(msg.text)}
              </div>
            </div>
          ))
        ) : (
          <p>No messages</p>
        )}

        {/* Reference for scrolling */}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="flex items-center space-x-4 p-4">
        {/* Back button */}
        <button
          onClick={handleBack}
          className="bg-transparent border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:border-black flex items-center"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>

        {/* Form */}
        <form onSubmit={handleMessage} className="flex flex-1">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Driver_chat;
