import React, { useState } from "react";
import { createContext } from "react";
import { io } from "socket.io-client";

// socket context
export const SocketContext = createContext();

// io from socket library
const socket = io("http://localhost:5000");

export const SocketContextProvider = (props) => {
  // this state will store the socket id
  const [me, setMe] = useState("");

  // updating the socket id state
  socket.on("me", (data) => setMe(data));

  return (
    <SocketContext.Provider value={{ me }}>
      {props.children}
    </SocketContext.Provider>
  );
};
