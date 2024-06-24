"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useAuth } from "./AuthContext";


interface newMessageType {
  content: string;
  userId: number;
  roomId: number;
  rfqId: number;
  createdAt: string;
}

interface SocketContextType {
  socket: Socket | null;
  connected: boolean;
  sendMessage: (message: { roomId: number; rfqId: number; content: string }) => void;
  newMessage: newMessageType | null;
  errorMessage: string;
  clearErrorMessage: () => void;
  newRoom: number | null;
  cratePrivateRoom: (newRoom: {
    participants: number[];
    content: string;
    rfqId: number
  }) => void;
  disconnectSocket: () => void;
}


const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [newMessage, setNewMessage] = useState<newMessageType | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [newRoom, setNewRoom] = useState<number | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (user?.id) {
      const socketIo = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}`, {
        query: { userId: user.id },
      });

      socketIo.on("connect", () => {
        setConnected(true);
        console.log("Connected to socket server");
      });

      socketIo.on("disconnect", () => {
        setConnected(false);
        console.log("Disconnected from socket server");
      });

      socketIo.on("receivedMessage", (message: newMessageType) => {
        setNewMessage(message)
      });

      socketIo.on("newRoomCreated", (room: { roomId: number }) => {
        setNewRoom(room.roomId)
      });

      socketIo.on("createPrivateRoomError", (error: { message: string }) => {
        setErrorMessage("Failed")
      });

      socketIo.on("sendMessageError", (error: { message: string }) => {
        setErrorMessage("Failed")
      });


      setSocket(socketIo);

      return () => {
        socketIo.disconnect();
      };
    } else {
      // Clean up socket if user logs out
      if (socket) {
        socket.disconnect();
        setSocket(null);
        setConnected(false);
        setNewRoom(null);
        setErrorMessage("");
        setNewMessage(null)
      }
    }
  }, [user]);

  const sendMessage = ({ roomId, content, rfqId }: { roomId: number; rfqId: number; content: string; }) => {
    if (socket) {
      socket.emit("sendMessage", { roomId, rfqId, content, userId: user?.id });
    }
  };

  const cratePrivateRoom = ({ participants, content, rfqId }: { participants: number[]; content: string; rfqId: number }) => {
    if (socket) {
      socket.emit("createPrivateRoom", { creatorId: user?.id, participants, content, rfqId });
    }
  };

  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
      setConnected(false);
      setNewRoom(null);
      setErrorMessage("");
      setNewMessage(null)
    }
  };

  const clearErrorMessage = () => {
    setErrorMessage("")
  }

  return (
    <SocketContext.Provider
      value={{
        socket,
        connected,
        newMessage,
        sendMessage,
        disconnectSocket,
        cratePrivateRoom,
        newRoom,
        errorMessage,
        clearErrorMessage
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
