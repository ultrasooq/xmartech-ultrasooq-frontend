/**
 * @fileoverview TanStack React Query hooks for the chat / messaging system.
 *
 * Provides mutations for creating private chat rooms and updating RFQ
 * price request statuses, plus queries for fetching product details and
 * all products with messages for a given seller.
 *
 * @module queries/chat
 */

import { APIResponseError } from "../../utils/types/common.types";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { CreatePrivateRoomRequest, RfqPriceStatusUpdateRequest } from "../../utils/types/chat.types";
import { createPrivateRoom, getProductDetails, updateRfqRequestPriceStatus, getProductMessages, getAllProductsWithMessages } from "../requests/chat.requests";

/**
 * Mutation hook to create a private chat room between users
 * (typically buyer and seller) for a product or RFQ conversation.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: {@link CreatePrivateRoomRequest}
 * - **Response**: `{ data: any; message: string; status: boolean; id: string }`
 * - **Invalidates**: `["chat"]` on success.
 * - Endpoint: Delegated to `createPrivateRoom` in chat.requests.
 */
export const useCreatePrivateRoom = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean, id: string },
    APIResponseError,
    CreatePrivateRoomRequest
  >({
    mutationFn: async (payload) => {
      const res = await createPrivateRoom(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["chat"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to update the status of an RFQ price request within
 * a chat context (e.g., accept, reject, counter-offer).
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: {@link RfqPriceStatusUpdateRequest}
 * - **Response**: `{ data: any; message: string; status: boolean }`
 * - Endpoint: Delegated to `updateRfqRequestPriceStatus` in chat.requests.
 */
export const useUpdateRfqPriceRequestStatus = () => {
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    RfqPriceStatusUpdateRequest
  >({
    mutationFn: async (payload) => {
      const res = await updateRfqRequestPriceStatus(payload);
      return res.data;
    },
    onError: (err: APIResponseError) => {
    },
  });
};


/**
 * Query hook that fetches product details for a chat context by
 * product ID.
 *
 * @param productId - The numeric product identifier.
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with the product details.
 *
 * @remarks
 * Query key: `["productId", productId]`
 * Endpoint: Delegated to `getProductDetails` in chat.requests.
 */
export const useGetProductDetails = (
  productId: number,
  enabled = true,
) =>
  useQuery({
    queryKey: ["productId", productId],
    queryFn: async () => {
      const res = await getProductDetails(productId);
      return res.data;
    },
    enabled,
  });

/**
 * Query hook that fetches all products with associated chat messages
 * for a given seller. Auto-refetches every 30 seconds to surface new
 * messages.
 *
 * @param sellerId - The numeric seller / admin ID.
 * @param enabled - Whether the query should execute. Defaults to `true`.
 *   Also disabled when `sellerId` is falsy.
 * @returns A `useQuery` result with the products and their messages.
 *
 * @remarks
 * - Query key: `["allProductsWithMessages", sellerId]`
 * - **refetchInterval**: 30 000 ms (30 seconds).
 * - Endpoint: Delegated to `getAllProductsWithMessages` in chat.requests.
 */
export const useGetAllProductsWithMessages = (sellerId: number, enabled = true) =>
  useQuery({
    queryKey: ["allProductsWithMessages", sellerId],
    queryFn: async () => {
      const res = await getAllProductsWithMessages(sellerId);
      return res.data;
    },
    enabled: enabled && !!sellerId,
    refetchInterval: 30000, // Refetch every 30 seconds to get new messages
  });
