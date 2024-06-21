"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useAuth } from "./AuthContext";

interface SocketContextType {
  socket: Socket | null;
  connected: boolean;
  sendMessage: (message: { roomId: number; rfqId: number; content: string }) => void;
  newMessage: string;
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
  const [newMessage, setNewMessage] = useState<string>("");
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

      socketIo.on("receivedMessage", (message: string) => {
        setNewMessage(message)
      });

      socketIo.on("newRoomCreated", (room: { roomId: number }) => {
        setNewRoom(room.roomId)
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
      }
    }
  }, [user]);

  const sendMessage = ({ roomId, content, rfqId}: { roomId: number; rfqId: number; content: string; }) => {
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
    }
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        connected,
        newMessage,
        sendMessage,
        disconnectSocket,
        cratePrivateRoom,
        newRoom
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
