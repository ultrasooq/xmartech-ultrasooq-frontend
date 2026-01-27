/**
 * @fileoverview TanStack React Query hooks for services (e.g., logistics,
 * shipping, value-added services).
 *
 * Covers CRUD operations for services, fetching services by various
 * criteria (seller, category, ID), and adding services to the shopping
 * cart.
 *
 * @module queries/services
 */

import { APIResponseError } from "@/utils/types/common.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addServiceToCart, createService, fetchAllServices, fetchServiceById, fetchServicesByOtherSeller, fetchServicesByProductCategory, fetchServicesBySeller, updateService } from "../requests/services.requests";

/**
 * Mutation hook to create a new service listing.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: Untyped `any` (service creation data).
 * - **Invalidates**: `["all-services"]` on success.
 * - Endpoint: Delegated to `createService` in services.requests.
 */
export const useCreateService = () => {
  const queryClient = useQueryClient();
  return useMutation<any>({
    mutationFn: async (payload: any) => {
      const res = await createService(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-services"],
      });
      //   queryClient.invalidateQueries({
      //     queryKey: ["managed-products"],
      //   });
      //   queryClient.invalidateQueries({
      //     queryKey: ["existing-products"],
      //   });
      //   queryClient.invalidateQueries({
      //     queryKey: ["rfq-products"],
      //   });
    },
    onError: (err: any) => {
    },
  });
};

/**
 * Mutation hook to update an existing service listing.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: Untyped `any` (service update data).
 * - **Invalidates**: `["all-services"]`, `["service-by-id"]` on success.
 * - Endpoint: Delegated to `updateService` in services.requests.
 */
export const useUpdateService = () => {
  const queryClient = useQueryClient();
  return useMutation<any>({
    mutationFn: async (payload: any) => {
      const res = await updateService(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-services"],
      });
      queryClient.invalidateQueries({
        queryKey: ["service-by-id"],
      });
      //   queryClient.invalidateQueries({
      //     queryKey: ["existing-products"],
      //   });
      //   queryClient.invalidateQueries({
      //     queryKey: ["rfq-products"],
      //   });
    },
    onError: (err: any) => {
    },
  });
};

/**
 * Query hook that fetches all services with pagination, optional
 * search, sort, and user filters.
 *
 * @param payload - Pagination and filter parameters.
 * @param payload.page - Page number (1-based).
 * @param payload.limit - Records per page.
 * @param payload.term - Optional search term.
 * @param payload.sort - Optional sort field.
 * @param payload.userId - Optional user/seller ID filter.
 * @param payload.ownService - Optional flag to show only own services.
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with paginated service listings.
 *
 * @remarks
 * Query key: `["all-services", payload]`
 * Endpoint: Delegated to `fetchAllServices` in services.requests.
 */
export const useGetAllServices = (payload: { page: number; limit: number; term?: string; sort?: string; userId?: number; ownService?: boolean }, enabled = true,) => useQuery({
  queryKey: ["all-services", payload],
  queryFn: async () => {
    const res = await fetchAllServices(payload);
    return res.data;
  },
  // onError: (err: APIResponseError) => {
  //   console.log(err);
  // },
  enabled,
});

/**
 * Query hook that fetches a single service by its ID, with optional
 * user and shared link context.
 *
 * @param payload - Service identification and context.
 * @param payload.serviceid - The service ID string.
 * @param payload.userId - Optional viewer's user ID.
 * @param payload.sharedLinkId - Optional shared link ID for tracking.
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with service details.
 *
 * @remarks
 * - Query key: `["service-by-id", payload]`
 * - **gcTime**: 0 (no caching).
 * - Endpoint: Delegated to `fetchServiceById` in services.requests.
 */
export const useServiceById = (
  payload: { serviceid: string; userId?: number; sharedLinkId?: string },
  enabled = true,
) =>
  useQuery({
    queryKey: ["service-by-id", payload],
    queryFn: async () => {
      const res = await fetchServiceById(payload);
      return res.data;
    },
    enabled,
    gcTime: 0, // Disables caching by setting garbage collection time to 0
  });

/**
 * Query hook that fetches services offered by a specific seller,
 * with optional city-based filters.
 *
 * @param payload - Pagination and filter parameters.
 * @param payload.page - Page number (1-based).
 * @param payload.limit - Records per page.
 * @param payload.sellerId - The seller's user ID.
 * @param payload.fromCityId - Optional origin city filter.
 * @param payload.toCityId - Optional destination city filter.
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with the seller's services.
 *
 * @remarks
 * Query key: `["services-by-seller", payload]`
 * Endpoint: Delegated to `fetchServicesBySeller` in services.requests.
 */
export const useGetServicesBySeller = (payload: { page: number; limit: number; sellerId: number, fromCityId?: number, toCityId?: number }, enabled = true,) => useQuery({
  queryKey: ["services-by-seller", payload],
  queryFn: async () => {
    const res = await fetchServicesBySeller(payload);
    return res.data;
  },
  // onError: (err: APIResponseError) => {
  //   console.log(err);
  // },
  enabled,
});

/**
 * Query hook that fetches services offered by other sellers (excluding
 * the specified seller), with optional city-based filters.
 *
 * @param payload - Pagination and filter parameters.
 * @param payload.page - Page number (1-based).
 * @param payload.limit - Records per page.
 * @param payload.sellerId - The seller ID to exclude.
 * @param payload.fromCityId - Optional origin city filter.
 * @param payload.toCityId - Optional destination city filter.
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with services from other sellers.
 *
 * @remarks
 * Query key: `["services-by-other-seller", payload]`
 * Endpoint: Delegated to `fetchServicesByOtherSeller` in services.requests.
 */
export const useGetServicesByOtherSeller = (payload: { page: number; limit: number; sellerId: number, fromCityId?: number, toCityId?: number }, enabled = true,) => useQuery({
  queryKey: ["services-by-other-seller", payload],
  queryFn: async () => {
    const res = await fetchServicesByOtherSeller(payload);
    return res.data;
  },
  // onError: (err: APIResponseError) => {
  //   console.log(err);
  // },
  enabled,
});

/**
 * Mutation hook to add one or more services to the shopping cart.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: `number[]` (array of service IDs).
 * - **Invalidates**: `["cart-by-user"]`, `["cart-by-device"]`,
 *   `["cart-count-with-login"]`, `["cart-count-without-login"]` on success.
 * - Endpoint: Delegated to `addServiceToCart` in services.requests.
 */
export const useAddServiceToCart = () => {
  const queryClient = useQueryClient();
  return useMutation<any, APIResponseError, number[]>({
    mutationFn: async (payload: any) => {
      const res = await addServiceToCart(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart-by-user"],
      });
      queryClient.invalidateQueries({
        queryKey: ["cart-by-device"],
      });
      queryClient.invalidateQueries({
        queryKey: ["cart-count-with-login"],
      });
      queryClient.invalidateQueries({
        queryKey: ["cart-count-without-login"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Query hook that fetches services associated with a specific product
 * category, with pagination.
 *
 * @param payload - Pagination and filter parameters.
 * @param payload.categoryId - The product category ID.
 * @param payload.page - Page number (1-based).
 * @param payload.limit - Records per page.
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with services in the given category.
 *
 * @remarks
 * Query key: `["services-by-product-category", payload]`
 * Endpoint: Delegated to `fetchServicesByProductCategory` in services.requests.
 */
export const useGetServicesByProductCategory = (payload: { categoryId: string; page: number; limit: number; }, enabled = true,) => useQuery({
  queryKey: ["services-by-product-category", payload],
  queryFn: async () => {
    const res = await fetchServicesByProductCategory(payload);
    return res.data;
  },
  // onError: (err: APIResponseError) => {
  //   console.log(err);
  // },
  enabled,
});
