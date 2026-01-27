/**
 * @fileoverview TanStack React Query hooks for the wishlist module.
 *
 * Provides hooks to fetch the wishlist, add / remove products, and
 * retrieve the wishlist count. Add/remove mutations broadly invalidate
 * product-related caches to keep "wishlisted" state in sync everywhere.
 *
 * @module queries/wishlist
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToWishList,
  deleteFromWishList,
  fetchWishList,
  fetchWishlistCount,
} from "../requests/wishlist.requests";
import { APIResponseError } from "@/utils/types/common.types";

/**
 * Query hook that fetches the authenticated user's wishlist with
 * pagination.
 *
 * @param payload - Pagination parameters.
 * @param payload.page - Page number (1-based).
 * @param payload.limit - Records per page.
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with the paginated wishlist.
 *
 * @remarks
 * Query key: `["wishlist", payload]`
 * Endpoint: Delegated to `fetchWishList` in wishlist.requests.
 */
export const useWishlist = (
  payload: {
    page: number;
    limit: number;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["wishlist", payload],
    queryFn: async () => {
      const res = await fetchWishList(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

/**
 * Mutation hook to add a product to the authenticated user's wishlist.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: `{ productId: number }`
 * - **Response**: `{ data: any; message: string; status: boolean }`
 * - **Invalidates** on success:
 *   `["wishlist"]`, `["wishlist-count"]`, `["cart-by-user"]`,
 *   `["cart-count-with-login"]`, `["products"]`, `["existing-products"]`,
 *   `["same-brand-products"]`, `["related-products"]`, `["vendor-products"]`.
 *   The broad invalidation keeps the "wishlisted" badge in sync across
 *   every product listing surface.
 * - Endpoint: Delegated to `addToWishList` in wishlist.requests.
 */
export const useAddToWishList = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { productId: number }
  >({
    mutationFn: async (payload) => {
      const res = await addToWishList(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
      queryClient.invalidateQueries({
        queryKey: ["wishlist-count"],
      });
      queryClient.invalidateQueries({
        queryKey: ["cart-by-user"],
      });
      queryClient.invalidateQueries({
        queryKey: ["cart-count-with-login"],
      });
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["existing-products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["same-brand-products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["related-products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["vendor-products"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to remove a product from the authenticated user's wishlist.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: `{ productId: number }`
 * - **Response**: `{ data: any; message: string; status: boolean }`
 * - **Invalidates** on success:
 *   `["wishlist"]`, `["wishlist-count"]`, `["cart-by-user"]`,
 *   `["cart-count-with-login"]`, `["products"]`, `["existing-products"]`,
 *   `["same-brand-products"]`, `["related-products"]`, `["vendor-products"]`.
 *   Mirrors the invalidation pattern of {@link useAddToWishList}.
 * - Endpoint: Delegated to `deleteFromWishList` in wishlist.requests.
 */
export const useDeleteFromWishList = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { productId: number }
  >({
    mutationFn: async (payload) => {
      const res = await deleteFromWishList(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
      queryClient.invalidateQueries({
        queryKey: ["wishlist-count"],
      });
      queryClient.invalidateQueries({
        queryKey: ["cart-by-user"],
      });
      queryClient.invalidateQueries({
        queryKey: ["cart-count-with-login"],
      });
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["existing-products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["same-brand-products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["related-products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["vendor-products"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Query hook that fetches the total number of items in the
 * authenticated user's wishlist.
 *
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with the wishlist count.
 *
 * @remarks
 * Query key: `["wishlist-count"]`
 * Endpoint: Delegated to `fetchWishlistCount` in wishlist.requests.
 */
export const useWishlistCount = (enabled = true) =>
  useQuery({
    queryKey: ["wishlist-count"],
    queryFn: async () => {
      const res = await fetchWishlistCount();
      return res.data;
    },
    enabled,
  });
