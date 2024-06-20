"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';

interface SocketContextType {
  socket: Socket | null;
  connected: boolean;
  messages: string[];
  sendMessage: (room: string, message: string) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (user?.id) {
      const socketIo = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}`, {
        query: { userId: user.id },
      });

      socketIo.on('connect', () => {
        setConnected(true);
        console.log('Connected to socket server');
      });

      socketIo.on('disconnect', () => {
        setConnected(false);
        console.log('Disconnected from socket server');
      });

      socketIo.on('message', (message: string) => {
        setMessages((prevMessages) => [...prevMessages, message]);
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

  const sendMessage = (room: string, message: string) => {
    if (socket) {
      socket.emit('message', { room, message, userId: user?.id });
    }
  };

  return (
    <SocketContext.Provider value={{ socket, connected, messages, sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
