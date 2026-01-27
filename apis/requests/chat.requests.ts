import { PUREMOON_TOKEN_KEY } from "../../utils/constants";
import axios from "axios";
import urlcat from "urlcat";
import { getCookie } from "cookies-next";
import { getApiUrl } from "@/config/api";
import {
  CreatePrivateRoomRequest,
  FindRoomRequest,
  ChatHistoryRequest,
  RfqPriceStatusUpdateRequest,
  UpdateMessageStatusRequest,
} from "../../utils/types/chat.types";

/**
 * Sends a message by creating (or reusing) a private chat room.
 *
 * @param payload - The message/room creation data conforming to {@link CreatePrivateRoomRequest}.
 * @returns Axios promise resolving to the created room and message details.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/chat/createPrivateRoom`
 * - **Auth:** Bearer token required.
 */
export const sendMessage = (payload: CreatePrivateRoomRequest) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/chat/createPrivateRoom`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Creates a new private chat room between two users.
 *
 * @param payload - The room creation data conforming to {@link CreatePrivateRoomRequest}.
 * @returns Axios promise resolving to the newly created private room details.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/chat/createPrivateRoom`
 * - **Auth:** Bearer token required.
 */
export const createPrivateRoom = (payload: CreatePrivateRoomRequest) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/chat/createPrivateRoom`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Finds an existing chat room by the given criteria.
 *
 * @param payload - The room lookup parameters conforming to {@link FindRoomRequest}.
 * @returns Axios promise resolving to the matching room details.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/chat/find-room`
 * - **Auth:** Bearer token required.
 */
export const findRoomId = (payload: FindRoomRequest) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/chat/find-room`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Retrieves the chat message history for a given room.
 *
 * @param payload - The chat history query parameters conforming to {@link ChatHistoryRequest}.
 * @returns Axios promise resolving to the paginated list of chat messages.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/chat/messages`
 * - **Auth:** Bearer token required.
 */
export const getChatHistory = (payload: ChatHistoryRequest) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/chat/messages`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Updates the status of an RFQ price request within a chat context.
 *
 * @param payload - The RFQ price status update data conforming to {@link RfqPriceStatusUpdateRequest}.
 * @returns Axios promise resolving to the updated RFQ price request status.
 *
 * @remarks
 * - **HTTP Method:** `PUT`
 * - **Endpoint:** `/chat/update-rfq-price-request-status`
 * - **Auth:** Bearer token required.
 */
export const updateRfqRequestPriceStatus = (
  payload: RfqPriceStatusUpdateRequest,
) => {
  return axios({
    method: "put",
    url: `${getApiUrl()}/chat/update-rfq-price-request-status`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Marks unread messages as read in a chat room.
 *
 * @param payload - The message status update data conforming to {@link UpdateMessageStatusRequest}.
 * @returns Axios promise resolving to the update confirmation.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/chat/read-messages`
 * - **Auth:** Bearer token required.
 */
export const updateUnreadMessages = (payload: UpdateMessageStatusRequest) => {
  return axios({
    method: "patch",
    url: `${getApiUrl()}/chat/read-messages`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches product details associated with a chat conversation.
 *
 * @param productId - The numeric product ID to look up.
 * @returns Axios promise resolving to the product details.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/chat/product?productId=:productId`
 * - **Auth:** Bearer token required.
 */
export const getProductDetails = (productId: number) => {
  return axios({
    method: "GET",
    url: `${getApiUrl()}/chat/product?productId=${productId}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches messages related to a specific product and seller combination.
 *
 * @param productId - The numeric product ID.
 * @param sellerId - The numeric seller/vendor user ID.
 * @returns Axios promise resolving to the list of product-related messages.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/chat/product/messages?productId=:productId&sellerId=:sellerId`
 * - **Auth:** Bearer token required.
 */
export const getProductMessages = (productId: number, sellerId: number) => {
  return axios({
    method: "GET",
    url: `${getApiUrl()}/chat/product/messages?productId=${productId}&sellerId=${sellerId}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches all products that have associated chat messages for a given seller.
 *
 * @param sellerId - The numeric seller/vendor user ID.
 * @returns Axios promise resolving to the list of products with message threads.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/chat/products/messages?sellerId=:sellerId`
 * - **Auth:** Bearer token required.
 */
export const getAllProductsWithMessages = (sellerId: number) => {
  return axios({
    method: "GET",
    url: `${getApiUrl()}/chat/products/messages?sellerId=${sellerId}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Uploads a file attachment to a chat conversation.
 *
 * @param payload - The file data as `FormData` (untyped).
 * @returns Axios promise resolving to the uploaded attachment metadata.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/chat/upload-attachment`
 * - **Auth:** Bearer token required.
 * - **Content-Type:** `multipart/form-data`.
 */
export const uploadAttachment = (payload: any) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/chat/upload-attachment`,
    data: payload,
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Downloads a chat attachment by its file path.
 *
 * @param filePath - The server-relative path of the attachment to download.
 * @returns Axios promise resolving to the attachment file data.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/chat/download-attachment?file-path=:filePath`
 * - **Auth:** Bearer token required.
 */
export const downloadAttachment = (filePath: string) => {
  return axios({
    method: "GET",
    url: `${getApiUrl()}/chat/download-attachment?file-path=${filePath}`,
    headers: {
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Retrieves a vendor's products available for suggestion in a chat modal.
 *
 * @param payload - The query parameters.
 * @param payload.vendorId - The numeric vendor/seller user ID.
 * @param payload.page - The page number for pagination.
 * @param payload.limit - The number of records per page.
 * @param payload.term - Optional search term to filter products.
 * @returns Axios promise resolving to the paginated list of vendor products for suggestion.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/chat/vendor-products-for-suggestion`
 * - **Auth:** Bearer token required.
 */
// NEW: Get vendor products for suggestion modal
export const getVendorProductsForSuggestion = (payload: {
  vendorId: number;
  page: number;
  limit: number;
  term?: string;
}) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/chat/vendor-products-for-suggestion`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Selects suggested products from a vendor (buyer action) within a chat/RFQ context.
 *
 * @param payload - The selection data.
 * @param payload.selectedSuggestionIds - Array of suggestion IDs selected by the buyer.
 * @param payload.rfqQuoteProductId - The RFQ quote product ID.
 * @param payload.rfqQuotesUserId - The RFQ quotes user ID.
 * @returns Axios promise resolving to the selection confirmation.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/chat/select-suggested-products`
 * - **Auth:** Bearer token required.
 */
// NEW: Select suggested products (Buyer action)
export const selectSuggestedProducts = (payload: {
  selectedSuggestionIds: number[];
  rfqQuoteProductId: number;
  rfqQuotesUserId: number;
}) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/chat/select-suggested-products`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};
