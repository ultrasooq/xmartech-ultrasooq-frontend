/**
 * @fileoverview Chat and messaging type definitions for the Ultrasooq marketplace.
 *
 * Covers real-time chat room creation, message sending, message status
 * tracking, and RFQ price-negotiation status updates that occur within
 * chat conversations.
 *
 * @module utils/types/chat.types
 * @dependencies None (pure type definitions).
 */

/**
 * Status codes for RFQ product price requests within chat negotiations.
 *
 * @description
 * Intent: Enumerates the possible states of a price request made through
 * the chat system during RFQ (Request For Quotation) negotiations.
 *
 * Usage: Used in chat message payloads and RFQ price update requests.
 *
 * @enum {string}
 */
export enum RfqProductPriceRequestStatus {
    /** Price request has been approved by the counterparty. */
    APPROVED = "A",
    /** Price request has been rejected by the counterparty. */
    REJECTED = "R",
    /** Price request is pending review. */
    PENDING = "P",
}

/**
 * Numeric status codes for individual chat messages.
 *
 * @description
 * Intent: Tracks the read/deletion lifecycle of a chat message.
 *
 * Usage: Applied to message objects to control read receipts and
 * soft-delete visibility in the chat UI.
 *
 * @enum {number}
 */
export enum MessageStatus {
    /** Message has not been read by the recipient. */
    UNREAD,
    /** Message has been read by the recipient. */
    READ,
    /** Message has been soft-deleted. */
    DELETED
}

/**
 * Represents a product suggestion within an RFQ chat conversation.
 *
 * @description
 * Intent: Allows sellers to suggest alternative products with optional
 * pricing and quantity during RFQ negotiations in the chat.
 *
 * Usage: Included in {@link CreatePrivateRoomRequest.suggestedProducts}.
 *
 * @property suggestedProductId - ID of the suggested product.
 * @property offerPrice - Optional proposed price for the suggestion.
 * @property quantity - Optional proposed quantity.
 */
export interface SuggestedProductItem {
    suggestedProductId: number;
    offerPrice?: number;
    quantity?: number;
}

/**
 * Request payload for creating a private chat room.
 *
 * @description
 * Intent: Initiates a one-on-one or multi-party private chat room,
 * optionally linked to an RFQ negotiation context with price requests
 * and product suggestions.
 *
 * Usage: Triggered when a buyer or seller starts a conversation from
 * an RFQ listing, product page, or order detail.
 *
 * Data Flow: Chat UI -> WebSocket / API POST -> backend creates room.
 *
 * @property creatorId - String ID of the user creating the room.
 * @property participants - Array of user IDs to include in the room.
 * @property content - Optional initial message content.
 * @property rfqId - Optional RFQ ID linking the chat to an RFQ.
 * @property rfqQuoteProductId - Optional RFQ quote product being discussed.
 * @property buyerId - Optional buyer user ID for context.
 * @property sellerId - Optional seller user ID for context.
 * @property requestedPrice - Optional price the buyer is requesting.
 * @property rfqQuotesUserId - Optional ID of the user who submitted the RFQ quote.
 * @property suggestForRfqQuoteProductId - Optional product ID for product suggestions.
 * @property suggestedProducts - Optional array of product suggestions.
 * @property uniqueId - Optional unique identifier for deduplication.
 * @property attachments - Optional array of file attachments.
 */
export interface CreatePrivateRoomRequest {
    creatorId: string;
    participants: number[];
    content?: string;
    rfqId?: number;
    rfqQuoteProductId?: number;
    buyerId?: number;
    sellerId?: number;
    requestedPrice?: number;
    rfqQuotesUserId?: number;
    suggestForRfqQuoteProductId?: number; // NEW: For product suggestions
    suggestedProducts?: SuggestedProductItem[]; // NEW: Array of suggested products
    uniqueId?: number;
    attachments?: any[];
}

/**
 * Request payload for finding an existing chat room.
 *
 * @description
 * Intent: Locates a chat room associated with a specific RFQ and user.
 *
 * Usage: Used to check whether a chat room already exists before creating
 * a new one, preventing duplicate rooms.
 *
 * @property rfqId - The RFQ ID to search for.
 * @property userId - The user ID involved in the chat.
 */
export interface FindRoomRequest {
    rfqId: number;
    userId: number;
}

/**
 * Request payload for sending a message in a chat room.
 *
 * @description
 * Intent: Sends a text message to an existing chat room.
 *
 * Usage: Emitted via WebSocket or REST when the user submits a chat message.
 *
 * Data Flow: Chat input -> WebSocket emit / API POST -> broadcast to room.
 *
 * @property content - The text content of the message.
 * @property userId - ID of the user sending the message.
 * @property roomId - ID of the target chat room.
 */
export interface SendMessageRequest {
    content: string;
    userId: number;
    roomId: number
}

/**
 * Request payload for retrieving chat history.
 *
 * @description
 * Intent: Fetches the message history for a given chat room.
 *
 * Usage: Called when a user opens a chat room to load previous messages.
 *
 * @property roomId - The chat room ID, or null if no room is selected.
 */
export interface ChatHistoryRequest {
    roomId: number | null;
}

/**
 * Request payload for updating the status of an RFQ price request in chat.
 *
 * @description
 * Intent: Allows a user to approve, reject, or keep pending a price
 * request that was made within a chat conversation.
 *
 * Usage: Triggered from the chat UI when a user acts on a price
 * negotiation message.
 *
 * @property id - The ID of the RFQ price request record.
 * @property status - The new status to set (Approved, Rejected, or Pending).
 * @property userId - Optional ID of the user performing the action.
 */
export interface RfqPriceStatusUpdateRequest {
    id: number;
    status: RfqProductPriceRequestStatus;
    userId?: number;
}

/**
 * Request payload for marking messages as read in a chat room.
 *
 * @description
 * Intent: Updates the read status of all unread messages for a user
 * in a specific chat room.
 *
 * Usage: Sent when a user opens or scrolls through a chat room to
 * mark messages as read and update read receipts.
 *
 * @property userId - The ID of the user reading the messages.
 * @property roomId - The ID of the chat room.
 */
export interface UpdateMessageStatusRequest {
    userId: number;
    roomId: number;
}