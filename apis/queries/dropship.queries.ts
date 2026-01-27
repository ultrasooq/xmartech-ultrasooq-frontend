/**
 * @fileoverview TanStack React Query hooks for the dropshipping module.
 *
 * Provides hooks to create dropship products, browse available products
 * for dropshipping, list a seller's dropship products, view earnings,
 * update product status, and delete dropship products.
 *
 * @module queries/dropship
 */

import { APIResponseError } from "@/utils/types/common.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createDropshipProduct,
  getAvailableProductsForDropship,
  getDropshipEarnings,
  getDropshipProducts,
  updateDropshipProductStatus,
  deleteDropshipProduct,
} from "../requests/product.request";

/**
 * Mutation hook to create a new dropship product from an existing
 * original product.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: `{ originalProductId, customProductName, customDescription,
 *   marketingText?, additionalImages?, markup }`
 * - **Invalidates**: `["dropship-products"]`, `["available-dropship-products"]`
 *   on success.
 * - Endpoint: Delegated to `createDropshipProduct` in product.request.
 */
// Dropshipping queries
export const useCreateDropshipProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<any, APIResponseError, {
    originalProductId: number;
    customProductName: string;
    customDescription: string;
    marketingText?: string;
    additionalImages?: string[];
    markup: number;
  }>({
    mutationFn: async (payload) => {
      const res = await createDropshipProduct(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['dropship-products'],
      });
      queryClient.invalidateQueries({
        queryKey: ['available-dropship-products'],
      });
    },
  });
};

/**
 * Query hook that fetches products available to be added as dropship
 * items, with pagination and optional filters.
 *
 * @param payload - Pagination and filter parameters.
 * @param payload.page - Page number (1-based).
 * @param payload.limit - Records per page.
 * @param payload.term - Optional search term.
 * @param payload.categoryId - Optional category filter.
 * @param payload.priceMin - Optional minimum price filter.
 * @param payload.priceMax - Optional maximum price filter.
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with available dropship products.
 *
 * @remarks
 * Query key: `["available-dropship-products", payload]`
 * Endpoint: Delegated to `getAvailableProductsForDropship` in product.request.
 */
export const useAvailableProductsForDropship = (
  payload: {
    page: number;
    limit: number;
    term?: string;
    categoryId?: number;
    priceMin?: number;
    priceMax?: number;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ['available-dropship-products', payload],
    queryFn: async () => {
      const res = await getAvailableProductsForDropship(payload);
      return res.data;
    },
    enabled,
  });

/**
 * Query hook that fetches the current seller's dropship products
 * with pagination and optional status filter.
 *
 * @param payload - Pagination and filter parameters.
 * @param payload.page - Page number (1-based).
 * @param payload.limit - Records per page.
 * @param payload.status - Optional status filter (e.g., "ACTIVE", "INACTIVE").
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with the seller's dropship products.
 *
 * @remarks
 * Query key: `["dropship-products", payload]`
 * Endpoint: Delegated to `getDropshipProducts` in product.request.
 */
export const useDropshipProducts = (
  payload: {
    page: number;
    limit: number;
    status?: string;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ['dropship-products', payload],
    queryFn: async () => {
      const res = await getDropshipProducts(payload);
      return res.data;
    },
    enabled,
  });

/**
 * Query hook that fetches the seller's dropship earnings summary.
 *
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with earnings data.
 *
 * @remarks
 * Query key: `["dropship-earnings"]`
 * Endpoint: Delegated to `getDropshipEarnings` in product.request.
 */
export const useDropshipEarnings = (enabled = true) =>
  useQuery({
    queryKey: ['dropship-earnings'],
    queryFn: async () => {
      const res = await getDropshipEarnings();
      return res.data;
    },
    enabled,
  });

/**
 * Mutation hook to update the status of a dropship product
 * (e.g., activate or deactivate).
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: `{ id: number; status: string }`
 * - **Invalidates**: `["dropship-products"]` on success.
 * - Endpoint: Delegated to `updateDropshipProductStatus` in product.request.
 */
export const useUpdateDropshipProductStatus = () => {
  const queryClient = useQueryClient();
  return useMutation<any, APIResponseError, { id: number; status: string }>({
    mutationFn: async ({ id, status }) => {
      const res = await updateDropshipProductStatus(id, status);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['dropship-products'],
      });
    },
  });
};

/**
 * Mutation hook to delete a dropship product.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: `{ id: number }`
 * - **Invalidates**: `["dropship-products"]`, `["dropship-earnings"]`
 *   on success.
 * - Endpoint: Delegated to `deleteDropshipProduct` in product.request.
 */
export const useDeleteDropshipProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<any, APIResponseError, { id: number }>({
    mutationFn: async ({ id }) => {
      const res = await deleteDropshipProduct(id);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['dropship-products'],
      });
      queryClient.invalidateQueries({
        queryKey: ['dropship-earnings'],
      });
    },
  });
};
