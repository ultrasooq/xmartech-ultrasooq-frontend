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

interface rfqRequestType {
  id: number;
  messageId: number;
  rfqQuoteProductId: number;
  status: string;
  requestedPrice: number;
  requestedById: number;
}

interface SocketContextType {
  socket: Socket | null;
  connected: boolean;
  sendMessage: (message: {
    roomId: number;
    rfqId: number;
    content: string;
    rfqQuoteProductId?: number;
    buyerId?: number;
    sellerId?: number;
    requestedPrice?: number;
    rfqQuotesUserId?: number;
  }) => void;
  newMessage: newMessageType | null;
  errorMessage: string;
  clearErrorMessage: () => void;
  newRoom: number | null;
  cratePrivateRoom: (newRoom: {
    participants: number[];
    content: string;
    rfqId: number;
    rfqQuoteProductId?: number;
    buyerId?: number;
    sellerId?: number;
    requestedPrice?: number;
    rfqQuotesUserId?: number;
  }) => void;
  updateRfqRequestStatus: (rfqRequest: {
    roomId: number | null;
    id: number;
    status: string;
  }) => void;
  rfqRequest: rfqRequestType | null;
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
  const [rfqRequest, setRfqRequest] = useState<rfqRequestType | null>(null);

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
        setNewMessage(message);
      });

      socketIo.on("newRoomCreated", (room: { roomId: number }) => {
        setNewRoom(room.roomId);
      });

      socketIo.on(
        "updatedRfqPriceRequest",
        (rfqRequest: {
          id: number;
          messageId: number;
          rfqQuoteProductId: number;
          status: string;
          requestedPrice: number;
          requestedById: number;
        }) => {
          setRfqRequest(rfqRequest);
        },
      );
      // ERROR MESSAGES
      socketIo.on("createPrivateRoomError", (error: { message: string }) => {
        setErrorMessage("Failed");
      });

      socketIo.on("sendMessageError", (error: { message: string }) => {
        setErrorMessage("Failed");
      });

      socketIo.on(
        "updateRfqPriceRequestError",
        (error: { message: string }) => {
          setErrorMessage("Failed");
        },
      );

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
        setNewMessage(null);
        setRfqRequest(null);
      }
    }
  }, [user]);

  const sendMessage = ({
    roomId,
    content,
    rfqId,
    rfqQuoteProductId,
    requestedPrice,
    buyerId,
    sellerId,
    rfqQuotesUserId
  }: {
    roomId: number;
    rfqId: number;
    content: string;
    rfqQuoteProductId?: number;
    buyerId?: number;
    sellerId?: number;
    requestedPrice?: number;
    rfqQuotesUserId?: number;
  }) => {
    if (socket) {
      socket.emit("sendMessage", {
        roomId,
        rfqId,
        content,
        userId: user?.id,
        rfqQuoteProductId,
        buyerId,
        sellerId,
        requestedPrice,
        rfqQuotesUserId
      });
    }
  };

  const cratePrivateRoom = ({
    participants,
    content,
    rfqId,
    rfqQuoteProductId,
    buyerId,
    sellerId,
    requestedPrice,
    rfqQuotesUserId
  }: {
    participants: number[];
    content: string;
    rfqId: number;
    rfqQuoteProductId?: number;
    buyerId?: number;
    sellerId?: number;
    requestedPrice?: number;
    rfqQuotesUserId?: number;
  }) => {
    if (socket) {
      socket.emit("createPrivateRoom", {
        creatorId: user?.id,
        participants,
        content,
        rfqId,
        rfqQuoteProductId,
        buyerId,
        sellerId,
        requestedPrice,
        rfqQuotesUserId
      });
    }
  };

  const updateRfqRequestStatus = ({
    roomId,
    id,
    status,
  }: {
    roomId: number | null;
    id: number;
    status: string;
  }) => {
    if (socket) {
      socket.emit("updateRfqPriceRequest", {
        roomId,
        id,
        status,
        userId: user?.id,
      });
    }
  };

  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
      setConnected(false);
      setNewRoom(null);
      setErrorMessage("");
      setNewMessage(null);
      setRfqRequest(null);
    }
  };

  const clearErrorMessage = () => {
    setErrorMessage("");
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
        newRoom,
        errorMessage,
        clearErrorMessage,
        updateRfqRequestStatus,
        rfqRequest,
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
