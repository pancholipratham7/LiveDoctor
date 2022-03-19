import React, { useState } from "react";
import { createContext } from "react";
import { io } from "socket.io-client";

// socket context
export const SocketContext = createContext();

// io from socket library
export const socket = io("http://localhost:5000");

export const SocketContextProvider = (props) => {
  const [meetingId, setMeetingId] = useState(null);

  const joinMeeting = (id) => {
    socket.emit("join-meeting", id);
  };

  return (
    <SocketContext.Provider value={{ meetingId, joinMeeting }}>
      {props.children}
    </SocketContext.Provider>
  );
};
