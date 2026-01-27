/**
 * @fileoverview TanStack React Query hooks for user address management.
 *
 * Provides hooks to fetch, create, update, and delete user addresses.
 * All mutations automatically invalidate the ["address"] query key on
 * success so that dependent lists re-fetch.
 *
 * @module queries/address
 */

import { APIResponseError } from "@/utils/types/common.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addAddress,
  deleteAddress,
  fetchAddressById,
  fetchAllUserAddress,
  updateAddress,
} from "../requests/address.requests";
import {
  AddressCreateRequest,
  AddressUpdateRequest,
} from "@/utils/types/address.types";

/**
 * React Query hook that fetches all addresses for the currently
 * authenticated user with pagination support.
 *
 * @param payload - Pagination parameters.
 * @param payload.page - The page number to retrieve (1-based).
 * @param payload.limit - The maximum number of address records per page.
 * @param enabled - Whether the query should execute automatically. Defaults to `true`.
 * @returns A `useQuery` result whose `data` contains the paginated address list.
 *
 * @remarks
 * Query key: `["address", payload]`
 * Endpoint: Delegated to `fetchAllUserAddress` in address.requests.
 */
export const useAllUserAddress = (
  payload: {
    page: number;
    limit: number;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["address", payload],
    queryFn: async () => {
      const res = await fetchAllUserAddress(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

/**
 * React Query mutation hook that creates a new address for the
 * authenticated user.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Mutation payload**: {@link AddressCreateRequest}
 * - **Response**: `{ data: any; message: string; status: boolean }`
 * - **Error type**: {@link APIResponseError}
 * - **Invalidates**: `["address"]` on success.
 * - Endpoint: Delegated to `addAddress` in address.requests.
 */
export const useAddAddress = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    AddressCreateRequest
  >({
    mutationFn: async (payload) => {
      const res = await addAddress(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["address"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * React Query mutation hook that updates an existing user address.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Mutation payload**: {@link AddressUpdateRequest}
 * - **Response**: `{ data: any; message: string; status: boolean }`
 * - **Error type**: {@link APIResponseError}
 * - **Invalidates**: `["address"]` on success.
 * - Endpoint: Delegated to `updateAddress` in address.requests.
 */
export const useUpdateAddress = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    AddressUpdateRequest
  >({
    mutationFn: async (payload) => {
      const res = await updateAddress(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["address"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * React Query hook that fetches a single address by its ID.
 *
 * @param id - The unique identifier of the user address.
 * @param enabled - Whether the query should execute automatically. Defaults to `true`.
 * @returns A `useQuery` result whose `data` contains the address details.
 *
 * @remarks
 * Query key: `["address-by-id", id]`
 * Endpoint: Delegated to `fetchAddressById` in address.requests.
 */
export const useAddressById = (id: string, enabled = true) =>
  useQuery({
    queryKey: ["address-by-id", id],
    queryFn: async () => {
      const res = await fetchAddressById({ userAddressId: id });
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

/**
 * React Query mutation hook that deletes a user address.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Mutation payload**: `{ userAddressId: number }`
 * - **Response**: `{ data: any; message: string; status: boolean }`
 * - **Error type**: {@link APIResponseError}
 * - **Invalidates**: `["address"]` on success.
 * - Endpoint: Delegated to `deleteAddress` in address.requests.
 */
export const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { userAddressId: number }
  >({
    mutationFn: async (payload) => {
      const res = await deleteAddress(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["address"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};
