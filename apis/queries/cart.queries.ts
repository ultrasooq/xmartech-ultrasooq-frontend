/**
 * @fileoverview TanStack React Query hooks for shopping cart operations.
 *
 * Supports both authenticated (user-based) and anonymous (device-based)
 * carts, plus service-related cart items, cart item counts, cart
 * recommendations, and item deletion.
 *
 * @module queries/cart
 */

import { APIResponseError } from "@/utils/types/common.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import {
  addServiceToCartWithProduct,
  deleteCartItem,
  deleteServiceFromCart,
  fetchCartByDevice,
  fetchCartByUserId,
  fetchCartCountByDeviceId,
  fetchCartCountWithLogin,
  updateCartByDevice,
  updateCartWithLogin,
  updateCartWithService,
  updateUserCartByDeviceId,
  fetchCartRecommendations,
} from "../requests/cart.requests";

/**
 * Query hook that fetches the authenticated user's cart items with pagination.
 *
 * @param payload - Pagination parameters.
 * @param payload.page - Page number (1-based).
 * @param payload.limit - Maximum items per page.
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with the paginated cart list.
 *
 * @remarks
 * Query key: `["cart-by-user", payload]`
 * Endpoint: Delegated to `fetchCartByUserId` in cart.requests.
 */
export const useCartListByUserId = (
  payload: {
    page: number;
    limit: number;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["cart-by-user", payload],
    queryFn: async () => {
      const res = await fetchCartByUserId(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

/**
 * Query hook that fetches cart items for an anonymous user identified
 * by a device ID, with pagination.
 *
 * @param payload - Pagination and device parameters.
 * @param payload.page - Page number (1-based).
 * @param payload.limit - Maximum items per page.
 * @param payload.deviceId - Unique identifier for the anonymous device.
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with the device-based cart list.
 *
 * @remarks
 * Query key: `["cart-by-device", payload]`
 * Endpoint: Delegated to `fetchCartByDevice` in cart.requests.
 */
export const useCartListByDevice = (
  payload: {
    page: number;
    limit: number;
    deviceId: string;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["cart-by-device", payload],
    queryFn: async () => {
      const res = await fetchCartByDevice(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

/**
 * Mutation hook to add or update a product in the authenticated
 * user's cart.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: `{ productPriceId, quantity, sharedLinkId?, productVariant? }`
 * - **Invalidates**: `["cart-by-user"]`, `["cart-count-with-login"]` on success.
 * - Endpoint: Delegated to `updateCartWithLogin` in cart.requests.
 */
export const useUpdateCartWithLogin = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    {
      productPriceId: number;
      quantity: number,
      sharedLinkId?: number;
      productVariant?: any;
    }
  >({
    mutationFn: async (payload) => {
      const res = await updateCartWithLogin(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart-by-user"],
      });
      queryClient.invalidateQueries({
        queryKey: ["cart-count-with-login"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to add or update a product in an anonymous
 * (device-based) cart.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: `{ productPriceId, quantity, deviceId, sharedLinkId?, productVariant? }`
 * - **Invalidates**: `["cart-by-device"]`, `["cart-count-without-login"]` on success.
 * - Endpoint: Delegated to `updateCartByDevice` in cart.requests.
 */
export const useUpdateCartByDevice = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    {
      productPriceId: number;
      quantity: number;
      deviceId: string,
      sharedLinkId?: number;
      productVariant?: any;
    }
  >({
    mutationFn: async (payload) => {
      const res = await updateCartByDevice(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart-by-device"],
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
 * Mutation hook to add or update a service item in the cart,
 * related to an existing product cart entry.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: `{ productId, productPriceId, quantity, productVariant?, cartId, serviceId }`
 * - Automatically appends `relatedCartType: "PRODUCT"` and `cartType: "SERVICE"`.
 * - **Invalidates**: `["cart-by-user"]`, `["cart-count-with-login"]` on success.
 * - Endpoint: Delegated to `updateCartWithService` in cart.requests.
 */
export const useUpdateCartWithService = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; success: boolean },
    APIResponseError,
    {
      productId: number;
      productPriceId: number;
      quantity: number,
      productVariant?: any;
      cartId: number;
      serviceId: number;
    }
  >({
    mutationFn: async (payload) => {
      const res = await updateCartWithService({
        ...payload,
        ...{ relatedCartType: 'PRODUCT', cartType: 'SERVICE' }
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart-by-user"],
      });
      queryClient.invalidateQueries({
        queryKey: ["cart-count-with-login"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to delete a cart item by its ID. Invalidates both
 * user-based and device-based cart queries plus their counts.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: `{ cartId: number }`
 * - **Invalidates**: `["cart-by-user"]`, `["cart-by-device"]`,
 *   `["cart-count-with-login"]`, `["cart-count-without-login"]`.
 * - Endpoint: Delegated to `deleteCartItem` in cart.requests.
 */
export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { cartId: number }
  >({
    mutationFn: async (payload) => {
      const res = await deleteCartItem(payload);
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
 * Mutation hook to remove a service from a cart item, optionally
 * targeting a specific service feature.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: `{ cartId: number; serviceFeatureId?: number }`
 * - **Invalidates**: `["cart-by-user"]`, `["cart-by-device"]`,
 *   `["cart-count-with-login"]`, `["cart-count-without-login"]`.
 * - Endpoint: Delegated to `deleteServiceFromCart` in cart.requests.
 */
export const useDeleteServiceFromCart = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { cartId: number, serviceFeatureId?: number }
  >({
    mutationFn: async (payload) => {
      const res = await deleteServiceFromCart(payload.cartId, payload.serviceFeatureId);
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
 * Mutation hook to merge an anonymous (device-based) cart into
 * the authenticated user's cart after login.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: `{ deviceId: string }`
 * - **Invalidates**: `["cart-by-user"]`, `["cart-count-without-login"]` on success.
 * - Endpoint: Delegated to `updateUserCartByDeviceId` in cart.requests.
 */
export const useUpdateUserCartByDeviceId = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { deviceId: string }
  >({
    mutationFn: async (payload) => {
      const res = await updateUserCartByDeviceId(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart-by-user"],
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
 * Query hook that fetches the total cart item count for an
 * authenticated user.
 *
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with the cart count data.
 *
 * @remarks
 * Query key: `["cart-count-with-login"]`
 * Endpoint: Delegated to `fetchCartCountWithLogin` in cart.requests.
 */
export const useCartCountWithLogin = (enabled = true) => {
  return useQuery({
    queryKey: ["cart-count-with-login"],
    queryFn: async () => {
      const res = await fetchCartCountWithLogin();
      return res.data;
    },
    enabled,
  });
};

/**
 * Query hook that fetches the total cart item count for an
 * anonymous user identified by a device ID.
 *
 * @param payload - Device identification.
 * @param payload.deviceId - Unique device identifier.
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with the cart count data.
 *
 * @remarks
 * Query key: `["cart-count-without-login"]`
 * Endpoint: Delegated to `fetchCartCountByDeviceId` in cart.requests.
 */
export const useCartCountWithoutLogin = (
  payload: { deviceId: string },
  enabled = true,
) => {
  return useQuery({
    queryKey: ["cart-count-without-login"],
    queryFn: async () => {
      const res = await fetchCartCountByDeviceId(payload);
      return res.data;
    },
    enabled,
  });
};

/**
 * Mutation hook to add a service as a companion item alongside a
 * product already in the cart.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: Arbitrary key-value object.
 * - **Invalidates**: `["cart-by-user"]`, `["cart-by-device"]`,
 *   `["cart-count-with-login"]`, `["cart-count-without-login"]` on success.
 * - Endpoint: Delegated to `addServiceToCartWithProduct` in cart.requests.
 */
export const useAddServiceToCartWithProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; success: boolean },
    APIResponseError,
    {[key: string]: any}
  >({
    mutationFn: async (payload) => {
      const res = await addServiceToCartWithProduct(payload);
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
 * Query hook that fetches product recommendations based on current
 * cart contents.
 *
 * @param payload - Recommendation parameters.
 * @param payload.productIds - Comma-separated product IDs currently in the cart.
 * @param payload.limit - Maximum number of recommendations to return.
 * @param payload.deviceId - Device ID for anonymous users.
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with recommended products.
 *
 * @remarks
 * Query key: `["cart-recommendations", payload]`
 * Endpoint: Delegated to `fetchCartRecommendations` in cart.requests.
 */
export const useCartRecommendations = (
  payload: {
    productIds?: string;
    limit?: number;
    deviceId?: string;
  },
  enabled = true,
) => {
  return useQuery({
    queryKey: ["cart-recommendations", payload],
    queryFn: async () => {
      const res = await fetchCartRecommendations(payload);
      return res.data;
    },
    enabled,
  });
};
