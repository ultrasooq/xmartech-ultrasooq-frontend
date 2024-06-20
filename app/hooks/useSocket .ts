"use client";

import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

const useSocket = (user: { id: number}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if(user.id) {
        const socketIo = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}`, {
            query: {
              userId: user.id,
            }
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
    }
  }, [user]);

  const sendMessage = (room: string, message: string) => {
    if (socket) {
      socket.emit('message', { room, message, userId: user.id });
    }
  };

  const joinRoom = (room: string) => {
    if (socket) {
      socket.emit('joinRoom', room);
    }
  };

  const leaveRoom = (room: string) => {
    if (socket) {
      socket.emit('leaveRoom', room);
    }
  };

  return { connected, messages, sendMessage, joinRoom, leaveRoom };
};

export default useSocket;
