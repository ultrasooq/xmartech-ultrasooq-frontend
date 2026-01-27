"use client";

/**
 * @fileoverview Socket.IO context provider for the Ultrasooq marketplace.
 *
 * Establishes and manages a WebSocket connection to the backend via Socket.IO.
 * Provides real-time messaging capabilities including:
 * - Sending and receiving chat messages
 * - Creating private chat rooms
 * - Handling RFQ (Request for Quotation) price-request status updates
 * - Receiving file attachment upload confirmations
 *
 * The socket automatically connects when a valid user is authenticated and
 * disconnects on logout.
 *
 * @module context/SocketContext
 */

import React, { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useAuth } from "./AuthContext";
import { MessageStatus } from "@/utils/types/chat.types";
import { getApiUrl } from "@/config/api";

/**
 * Payload shape for an incoming or outgoing chat message.
 *
 * @interface newMessageType
 * @property {number} [id] - Server-assigned message ID (absent until persisted).
 * @property {string} content - The text content of the message.
 * @property {number} userId - ID of the user who sent the message.
 * @property {number} roomId - ID of the chat room the message belongs to.
 * @property {number} rfqId - ID of the associated RFQ.
 * @property {string} createdAt - ISO-8601 timestamp of message creation.
 * @property {number} [uniqueId] - Client-generated ID for optimistic UI updates.
 * @property {Object} [user] - Sender information.
 * @property {number} user.id - Sender user ID.
 * @property {string} user.firstName - Sender first name.
 * @property {string} user.lastName - Sender last name.
 * @property {string} user.email - Sender email address.
 * @property {number[]} [participants] - Array of user IDs participating in the conversation.
 * @property {any} [rfqProductPriceRequest] - Associated RFQ product price request data.
 * @property {number | null} [rfqQuotesUserId] - ID of the RFQ quotes user, if applicable.
 * @property {any[]} [attachments] - Array of file attachments sent with the message.
 */
interface newMessageType {
  id?: number;
  content: string;
  userId: number;
  roomId: number;
  rfqId: number;
  createdAt: string;
  uniqueId?: number;
  user?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  participants?: number[];
  rfqProductPriceRequest?: any;
  rfqQuotesUserId?: number | null;
  attachments?: any[];
}

/**
 * Payload shape for an incoming attachment upload confirmation from the server.
 *
 * @export
 * @interface newAttachmentType
 * @property {string} uniqueId - Client-generated unique identifier for the attachment.
 * @property {string} status - Upload status (e.g. "completed", "failed").
 * @property {number} messageId - The message ID the attachment belongs to.
 * @property {number} roomId - The chat room ID.
 * @property {number} senderId - The user ID of the sender.
 * @property {string} fileName - Original file name.
 * @property {string} filePath - Server-side storage path.
 * @property {string} fileType - MIME type of the file.
 * @property {string} presignedUrl - Pre-signed URL for downloading the attachment.
 */
export interface newAttachmentType {
  uniqueId: string;
  status: string;
  messageId: number;
  roomId: number;
  senderId: number;
  fileName: string;
  filePath: string;
  fileType: string;
  presignedUrl: string;
}

/**
 * Payload shape for an RFQ price-request status update received from the server.
 *
 * @interface rfqRequestType
 * @property {number} id - The price-request record ID.
 * @property {number} messageId - The associated chat message ID.
 * @property {number} rfqQuoteProductId - The RFQ quote product this request targets.
 * @property {string} status - Updated status (e.g. "ACCEPTED", "REJECTED").
 * @property {number} requestedPrice - The price that was requested.
 * @property {number} requestedById - User ID of the requester.
 * @property {number} newTotalOfferPrice - Recalculated total offer price after the update.
 */
interface rfqRequestType {
  id: number;
  messageId: number;
  rfqQuoteProductId: number;
  status: string;
  requestedPrice: number;
  requestedById: number;
  newTotalOfferPrice: number;
}

/**
 * Shape of the value exposed by {@link SocketContext}.
 *
 * @interface SocketContextType
 * @property {Socket | null} socket - The active Socket.IO client instance, or `null` when disconnected.
 * @property {boolean} connected - Whether the socket is currently connected to the server.
 * @property {(message: Object) => void} sendMessage - Emits a chat message to the server.
 * @property {newMessageType | null} newMessage - The most recently received message via socket.
 * @property {string} errorMessage - The most recent error message from the socket layer.
 * @property {() => void} clearErrorMessage - Resets {@link errorMessage} to an empty string.
 * @property {{ roomId: number, creatorId: number }} newRoom - Info about the most recently created room.
 * @property {newAttachmentType | null} newAttachment - The most recently received attachment confirmation.
 * @property {(newRoom: Object) => void} cratePrivateRoom - Emits a request to create a private chat room.
 * @property {(rfqRequest: Object) => void} updateRfqRequestStatus - Emits an RFQ price-request status update.
 * @property {rfqRequestType | null} rfqRequest - The most recently received RFQ request update.
 * @property {() => void} disconnectSocket - Manually disconnects the socket and resets all state.
 */
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
    rfqQuotesUserId?: number | null;
    attachments?: any[],
    uniqueId: number
  }) => void;
  newMessage: newMessageType | null;
  errorMessage: string;
  clearErrorMessage: () => void;
  newRoom: {
    roomId: number,
    creatorId: number,
  };
  newAttachment: newAttachmentType | null;
  cratePrivateRoom: (newRoom: {
    participants: number[];
    content: string;
    rfqId: number;
    rfqQuoteProductId?: number;
    buyerId?: number;
    sellerId?: number;
    requestedPrice?: number;
    rfqQuotesUserId?: number | null;
    attachments?: any[],
    uniqueId: number
  }) => void;
  updateRfqRequestStatus: (rfqRequest: {
    roomId: number | null;
    id: number;
    status: string;
    rfqUserId: number;
    requestedPrice: number;
    rfqQuoteProductId: number
  }) => void;
  rfqRequest: rfqRequestType | null;
  disconnectSocket: () => void;
}

/**
 * React context for Socket.IO state and actions.
 * Initialized as `undefined`; consumers must be wrapped by {@link SocketProvider}.
 */
const SocketContext = createContext<SocketContextType | undefined>(undefined);

/**
 * Provider component that establishes and manages the Socket.IO connection.
 *
 * The socket lifecycle is tied to the authenticated user:
 * - When a valid `user.id` is present, a connection is opened to the backend
 *   WebSocket endpoint (`/ws`).
 * - When the user logs out (becomes `null`), the socket is disconnected and
 *   all related state is reset.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components that consume the socket context.
 *
 * @example
 * ```tsx
 * <SocketProvider>
 *   <ChatPage />
 * </SocketProvider>
 * ```
 */
export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  /** @type {[Socket | null, React.Dispatch<React.SetStateAction<Socket | null>>]} */
  const [socket, setSocket] = useState<Socket | null>(null);
  /** @type {[newMessageType | null, React.Dispatch<React.SetStateAction<newMessageType | null>>]} */
  const [newMessage, setNewMessage] = useState<newMessageType | null>(null);
  /** @type {[newAttachmentType | null, React.Dispatch<React.SetStateAction<newAttachmentType | null>>]} */
  const [newAttachment, setNewAttachment] = useState<newAttachmentType | null>(null);
  /** Most recent error message originating from socket events. */
  const [errorMessage, setErrorMessage] = useState<string>("");
  /** Information about the most recently created chat room. */
  const [newRoom, setNewRoom] = useState<any | null>(null);
  /** Most recently received RFQ price-request update. */
  const [rfqRequest, setRfqRequest] = useState<rfqRequestType | null>(null);

  /** Whether the Socket.IO client is currently connected. */
  const [connected, setConnected] = useState(false);

  /**
   * Effect that manages the Socket.IO connection lifecycle.
   *
   * - Validates the user ID before attempting to connect.
   * - Configures WebSocket transport with polling fallback.
   * - Registers listeners for connection events, incoming messages,
   *   new rooms, attachments, RFQ updates, and error events.
   * - Cleans up (disconnects) on unmount or when the user changes.
   * - When the user becomes invalid, any existing socket is disconnected
   *   and all state is reset to defaults.
   */
  useEffect(() => {
    const userId = user?.id;
    const hasValidUserId = userId !== undefined && userId !== null && !isNaN(Number(userId));

    if (hasValidUserId) {
      // Use the same backend URL as API calls
      const socketUrl = getApiUrl();
      const fullSocketUrl = `${socketUrl}/ws`;

      const socketIo = io(fullSocketUrl, {
        query: { userId: userId },
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5,
        timeout: 20000,
        forceNew: true,
        autoConnect: true,
      });

      /** Handler: Socket successfully connected. */
      socketIo.on("connect", () => {
        setConnected(true);
      });

      /** Handler: Socket disconnected from the server. */
      socketIo.on("disconnect", () => {
        setConnected(false);
      });

      /** Handler: Socket connection error. Stores a user-friendly error message. */
      socketIo.on("connect_error", (error) => {
        setConnected(false);
        setErrorMessage(`Connection failed: ${error.message || "Unable to connect to server"}. Please check if the backend is running on port 3000.`);
      });

      /** Handler: A new chat message was received. */
      socketIo.on("receivedMessage", (message: newMessageType) => {
        setNewMessage(message);
      });

      /** Handler: A new private chat room was created. */
      socketIo.on("newRoomCreated", (room: { roomId: number, creatorId: number }) => {
        setNewRoom(room);
      });

      /** Handler: An attachment upload completed on the server. */
      socketIo.on("newAttachment", (attachment: newAttachmentType) => {
        setNewAttachment(attachment);
      });

      /** Handler: An RFQ price-request status was updated on the server. */
      socketIo.on(
        "updatedRfqPriceRequest",
        (rfqRequest: {
          id: number;
          messageId: number;
          rfqQuoteProductId: number;
          status: string;
          requestedPrice: number;
          requestedById: number;
          newTotalOfferPrice: number;
        }) => {
          setRfqRequest(rfqRequest);
        },
      );
      // ERROR MESSAGES
      /** Handler: Error when creating a private room. */
      socketIo.on("createPrivateRoomError", (error: { message: string; status?: number }) => {
        console.error("createPrivateRoomError:", error);
        setErrorMessage(error?.message || "Failed to create room. Please try again.");
      });

      /** Handler: Error when sending a message. */
      socketIo.on("sendMessageError", (error: { message: string; status?: number }) => {
        console.error("sendMessageError:", error);
        setErrorMessage(error?.message || "Failed to send message. Please try again.");
      });

      /** Handler: Error when updating an RFQ price request. */
      socketIo.on(
        "updateRfqPriceRequestError",
        (error: { message: string; status?: number }) => {
          console.error("updateRfqPriceRequestError:", error);
          setErrorMessage(error?.message || "Failed to update request. Please try again.");
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
        setNewAttachment(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  /**
   * Sends a chat message to the server via the `"sendMessage"` socket event.
   *
   * Validates that the socket is initialized, connected, and the user is
   * authenticated before emitting. Sets an error message if any check fails.
   *
   * @param {Object} params - Message payload.
   * @param {number} params.roomId - The chat room to send the message to.
   * @param {number} params.rfqId - The associated RFQ ID.
   * @param {string} params.content - The message text content.
   * @param {number} [params.rfqQuoteProductId] - Optional RFQ quote product ID for price negotiations.
   * @param {number} [params.buyerId] - Optional buyer user ID.
   * @param {number} [params.sellerId] - Optional seller user ID.
   * @param {number} [params.requestedPrice] - Optional requested price for negotiations.
   * @param {number | null} [params.rfqQuotesUserId] - Optional RFQ quotes user ID.
   * @param {number} [params.suggestForRfqQuoteProductId] - Optional product ID for product suggestions.
   * @param {Array<{ suggestedProductId: number; offerPrice?: number; quantity?: number }>} [params.suggestedProducts] - Optional array of suggested products.
   * @param {any[]} [params.attachments] - Optional file attachments.
   * @param {number} params.uniqueId - Client-generated unique ID for optimistic updates.
   * @returns {void}
   */
  const sendMessage = ({
    roomId,
    content,
    rfqId,
    rfqQuoteProductId,
    requestedPrice,
    buyerId,
    sellerId,
    rfqQuotesUserId,
    suggestForRfqQuoteProductId,
    suggestedProducts,
    attachments,
    uniqueId
  }: {
    roomId: number;
    rfqId: number;
    content: string;
    rfqQuoteProductId?: number;
    buyerId?: number;
    sellerId?: number;
    requestedPrice?: number;
    rfqQuotesUserId?: number | null;
    suggestForRfqQuoteProductId?: number; // NEW: For product suggestions
    suggestedProducts?: Array<{ suggestedProductId: number; offerPrice?: number; quantity?: number }>; // NEW: Array of suggested products
    attachments?: any[],
    uniqueId: number
  }) => {
    if (!socket) {
      console.error("Socket is not initialized");
      setErrorMessage("Not connected. Please refresh the page.");
      return;
    }

    if (!connected) {
      console.error("Socket is not connected");
      setErrorMessage("Not connected to server. Please check your connection.");
      return;
    }

    if (!user?.id) {
      console.error("User ID is missing");
      setErrorMessage("User not authenticated. Please login again.");
      return;
    }

    console.log("Sending message:", { roomId, rfqId, content, uniqueId, userId: user.id });

    socket.emit("sendMessage", {
      roomId,
      rfqId,
      content: content || "",
      userId: user.id,
      rfqQuoteProductId,
      buyerId,
      sellerId,
      requestedPrice,
      rfqQuotesUserId,
      suggestForRfqQuoteProductId,
      suggestedProducts,
      attachments: attachments || [],
      uniqueId
    });
  };

  /**
   * Creates a new private chat room by emitting the `"createPrivateRoom"` socket event.
   *
   * Validates socket state and user authentication before emitting.
   * The initial message content and participants are included in the payload so
   * the room is created with a first message already present.
   *
   * @param {Object} params - Room creation payload.
   * @param {number[]} params.participants - Array of user IDs to include in the room.
   * @param {string} params.content - The initial message content.
   * @param {number} params.rfqId - The associated RFQ ID.
   * @param {number} [params.rfqQuoteProductId] - Optional RFQ quote product ID.
   * @param {number} [params.buyerId] - Optional buyer user ID.
   * @param {number} [params.sellerId] - Optional seller user ID.
   * @param {number} [params.requestedPrice] - Optional requested price.
   * @param {number | null} [params.rfqQuotesUserId] - Optional RFQ quotes user ID.
   * @param {number} [params.suggestForRfqQuoteProductId] - Optional product ID for product suggestions.
   * @param {Array<{ suggestedProductId: number; offerPrice?: number; quantity?: number }>} [params.suggestedProducts] - Optional array of suggested products.
   * @param {any[]} [params.attachments] - Optional file attachments.
   * @param {number} params.uniqueId - Client-generated unique ID for optimistic updates.
   * @returns {void}
   */
  const cratePrivateRoom = ({
    participants,
    content,
    rfqId,
    rfqQuoteProductId,
    buyerId,
    sellerId,
    requestedPrice,
    rfqQuotesUserId,
    suggestForRfqQuoteProductId,
    suggestedProducts,
    attachments,
    uniqueId
  }: {
    participants: number[];
    content: string;
    rfqId: number;
    rfqQuoteProductId?: number;
    buyerId?: number;
    sellerId?: number;
    requestedPrice?: number;
    rfqQuotesUserId?: number | null;
    suggestForRfqQuoteProductId?: number; // NEW: For product suggestions
    suggestedProducts?: Array<{ suggestedProductId: number; offerPrice?: number; quantity?: number }>; // NEW: Array of suggested products
    attachments?: any[],
    uniqueId: number
  }) => {
    if (!socket) {
      console.error("Socket is not initialized");
      setErrorMessage("Not connected. Please refresh the page.");
      return;
    }

    if (!connected) {
      console.error("Socket is not connected");
      setErrorMessage("Not connected to server. Please check your connection.");
      return;
    }

    if (!user?.id) {
      console.error("User ID is missing");
      setErrorMessage("User not authenticated. Please login again.");
      return;
    }

    console.log("Creating private room:", { participants, rfqId, content, uniqueId, creatorId: user.id });

    socket.emit("createPrivateRoom", {
      creatorId: user.id,
      participants,
      content: content || "",
      rfqId,
      rfqQuoteProductId,
      buyerId,
      sellerId,
      requestedPrice,
      rfqQuotesUserId,
      suggestForRfqQuoteProductId,
      suggestedProducts,
      messageStatus: MessageStatus.READ,
      attachments: attachments || [],
      uniqueId
    });
  };

  /**
   * Emits an RFQ price-request status update via the `"updateRfqPriceRequest"` socket event.
   *
   * Only emits if the socket is initialized.
   *
   * @param {Object} params - RFQ request update payload.
   * @param {number | null} params.roomId - The chat room ID (may be `null`).
   * @param {number} params.id - The price-request record ID.
   * @param {string} params.status - The new status to set (e.g. "ACCEPTED", "REJECTED").
   * @param {number} params.rfqUserId - The RFQ user ID.
   * @param {number} params.requestedPrice - The price that was requested.
   * @param {number} params.rfqQuoteProductId - The RFQ quote product ID.
   * @returns {void}
   */
  const updateRfqRequestStatus = ({
    roomId,
    id,
    status,
    rfqUserId,
    requestedPrice,
    rfqQuoteProductId
  }: {
    roomId: number | null;
    id: number;
    status: string;
    rfqUserId: number;
    requestedPrice: number;
    rfqQuoteProductId: number
  }) => {
    if (socket) {
      socket.emit("updateRfqPriceRequest", {
        roomId,
        id,
        status,
        userId: user?.id,
        rfqUserId,
        requestedPrice,
        rfqQuoteProductId
      });
    }
  };

  /**
   * Manually disconnects the Socket.IO client and resets all socket-related
   * state to its initial values. Useful for explicit logout flows.
   *
   * @returns {void}
   */
  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
      setConnected(false);
      setNewRoom(null);
      setErrorMessage("");
      setNewMessage(null);
      setRfqRequest(null);
      setNewAttachment(null);
    }
  };

  /**
   * Clears the current error message string.
   *
   * @returns {void}
   */
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
        newAttachment
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

/**
 * Custom hook that retrieves the socket context.
 *
 * @throws {Error} If called outside of a {@link SocketProvider}.
 * @returns {SocketContextType} The current socket context value.
 *
 * @example
 * ```tsx
 * const { socket, connected, sendMessage } = useSocket();
 * ```
 */
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
