/**
 * @fileoverview TanStack React Query hooks for order management.
 *
 * Covers buyer and seller order listings (paginated and infinite-scroll),
 * order creation (authenticated and unauthenticated), payment intents,
 * payment links, EMI payments, AmwalPay configuration, order detail
 * lookups, status updates, cancel reasons, shipping status, pre-order
 * calculations, vendor dashboard stats, and order tracking.
 *
 * @module queries/orders
 */

import {
  useMutation,
  useQuery,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createEMIPayment,
  createOrder,
  createOrderUnAuth,
  createPaymentIntent,
  createPaymentLink,
  createAmwalPayConfig,
  fetchOrderById,
  fetchOrderByIdUnAuth,
  fetchOrderBySellerId,
  fetchOrders,
  fetchOrdersBySellerId,
  preOrderCalculation,
  updateCancelReason,
  updateOrderShippingStatus,
  updateProductStatus,
  fetchVendorOrderStats,
  fetchVendorRecentOrders,
  updateOrderStatus,
  addOrderTracking,
} from "../requests/orders.requests";
import { APIResponseError } from "@/utils/types/common.types";

/**
 * Query hook that fetches paginated orders with optional search,
 * status, and date-range filters.
 *
 * @param payload - Pagination and filter parameters.
 * @param payload.page - Page number (1-based).
 * @param payload.limit - Records per page.
 * @param payload.term - Optional search term.
 * @param payload.orderProductStatus - Optional order product status filter.
 * @param payload.startDate - Optional start date filter (ISO string).
 * @param payload.endDate - Optional end date filter (ISO string).
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with the paginated order list.
 *
 * @remarks
 * Query key: `["orders", payload]`
 * Endpoint: Delegated to `fetchOrders` in orders.requests.
 */
export const useOrders = (
  payload: {
    page: number;
    limit: number;
    term?: string;
    orderProductStatus?: string;
    startDate?: string;
    endDate?: string;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["orders", payload],
    queryFn: async () => {
      const res: any = await fetchOrders(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

/**
 * Infinite-scroll query hook for orders. Fetches successive pages
 * of orders as the user scrolls, using the same filters as
 * {@link useOrders}.
 *
 * @param payload - Pagination and filter parameters (same as `useOrders`).
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useInfiniteQuery` result with accumulated order pages.
 *
 * @remarks
 * - Query key: `["infinite-orders", payload]`
 * - **getNextPageParam**: Returns `undefined` when the last page is
 *   smaller than `limit`, otherwise `lastPage.page + 1`.
 * - Endpoint: Delegated to `fetchOrders` in orders.requests.
 */
export const useInfiniteOrders = (
  payload: {
    page: number;
    limit: number;
    term?: string;
    orderProductStatus?: string;
    startDate?: string;
    endDate?: string;
  },
  enabled = true,
) =>
  useInfiniteQuery({
    queryKey: ["infinite-orders", payload],
    queryFn: async ({ pageParam }) => {
      const queries = payload;
      queries.page = pageParam ?? 1;
      const res: { data: { data: any; message: string; status: boolean } } =
        await fetchOrders({ ...payload, page: queries.page });
      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => {
      if (lastPage.data.length < payload.limit) return undefined;
      return lastPage?.page + 1 || 1;
    },
    enabled,
  });

/**
 * Mutation hook to create an order for an authenticated user.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: Generic object (order details).
 * - **Invalidates**: `["orders"]`, `["cart-count-with-login"]`,
 *   `["cart-by-user"]` on success.
 * - Endpoint: Delegated to `createOrder` in orders.requests.
 */
export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    {}
  >({
    mutationFn: async (payload) => {
      const res = await createOrder(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      queryClient.invalidateQueries({
        queryKey: ["cart-count-with-login"],
      });
      queryClient.invalidateQueries({
        queryKey: ["cart-by-user"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to create an order for an unauthenticated (guest) user.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: Generic object (order details).
 * - **Invalidates**: `["orders"]`, `["cart-count-without-login"]`,
 *   `["cart-by-device"]` on success.
 * - Endpoint: Delegated to `createOrderUnAuth` in orders.requests.
 */
export const useCreateOrderUnAuth = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    {}
  >({
    mutationFn: async (payload) => {
      const res = await createOrderUnAuth(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      queryClient.invalidateQueries({
        queryKey: ["cart-count-without-login"],
      });
      queryClient.invalidateQueries({
        queryKey: ["cart-by-device"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to create a Stripe payment intent for an order.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: Generic object (payment details).
 * - Endpoint: Delegated to `createPaymentIntent` in orders.requests.
 */
export const useCreatePaymentIntent = () => {
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    {}
  >({
    mutationFn: async (payload) => {
      const res = await createPaymentIntent(payload);
      return res.data;
    },
    onSuccess: () => {
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to create a payment link for sharing with a buyer.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: Generic object (payment link parameters).
 * - Endpoint: Delegated to `createPaymentLink` in orders.requests.
 */
export const useCreatePaymentLink = () => {
  return useMutation<
    { data: any; message: string; success: boolean },
    APIResponseError,
    {}
  >({
    mutationFn: async (payload) => {
      const res = await createPaymentLink(payload);
      return res.data;
    },
    onSuccess: () => {
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to initiate an EMI (equated monthly installment) payment.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: Generic object (EMI plan details).
 * - Endpoint: Delegated to `createEMIPayment` in orders.requests.
 */
export const useCreateEMIPayment = () => {
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    {}
  >({
    mutationFn: async (payload) => {
      const res = await createEMIPayment(payload);
      return res.data;
    },
    onSuccess: () => {
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to create an AmwalPay payment configuration.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: Generic object (AmwalPay config data).
 * - Endpoint: Delegated to `createAmwalPayConfig` in orders.requests.
 */
export const useCreateAmwalPayConfig = () => {
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    {}
  >({
    mutationFn: async (payload) => {
      const res = await createAmwalPayConfig(payload);
      return res.data;
    },
    onSuccess: () => {
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Query hook that fetches a single order by its order-product ID.
 *
 * @param payload - Order identification.
 * @param payload.orderProductId - The order-product ID string.
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with order details and `otherData`.
 *
 * @remarks
 * Query key: `["order-by-id", payload]`
 * Endpoint: Delegated to `fetchOrderById` in orders.requests.
 */
export const useOrderById = (
  payload: {
    orderProductId: string;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["order-by-id", payload],
    queryFn: async () => {
      const res: {
        data: { data: any; message: string; status: boolean; otherData: any };
      } = await fetchOrderById(payload);
      return res.data;
    },
    enabled,
  });

/**
 * Query hook that fetches a single order from the seller's perspective.
 *
 * @param payload - Order identification.
 * @param payload.orderProductId - The order-product ID string.
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with seller-side order details.
 *
 * @remarks
 * Query key: `["order-by-seller-id", payload]`
 * Endpoint: Delegated to `fetchOrderBySellerId` in orders.requests.
 */
export const useOrderBySellerId = (
  payload: {
    orderProductId: string;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["order-by-seller-id", payload],
    queryFn: async () => {
      const res: {
        data: { data: any; message: string; status: boolean; otherData: any };
      } = await fetchOrderBySellerId(payload);
      return res.data;
    },
    enabled,
  });

/**
 * Query hook that fetches paginated seller orders with optional
 * search, status, and date-range filters.
 *
 * @param payload - Pagination and filter parameters (same shape as `useOrders`).
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with paginated seller orders.
 *
 * @remarks
 * Query key: `["orders-by-seller-id", payload]`
 * Endpoint: Delegated to `fetchOrdersBySellerId` in orders.requests.
 */
export const useOrdersBySellerId = (
  payload: {
    page: number;
    limit: number;
    term?: string;
    orderProductStatus?: string;
    startDate?: string;
    endDate?: string;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["orders-by-seller-id", payload],
    queryFn: async () => {
      const res: any = await fetchOrdersBySellerId(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

/**
 * Mutation hook to update the product status within an order.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: `{ orderProductId: number; status: string }`
 * - **Invalidates**: `["orders"]` on success.
 * - Endpoint: Delegated to `updateProductStatus` in orders.requests.
 */
export const useUpdateProductStatus = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { orderProductId: number; status: string }
  >({
    mutationFn: async (payload) => {
      const res = await updateProductStatus(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to update the cancellation reason for an order product.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: `{ orderProductId: number; cancelReason: string }`
 * - **Invalidates**: `["orders"]` on success.
 * - Endpoint: Delegated to `updateCancelReason` in orders.requests.
 */
export const useUpdateCancelReason = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { orderProductId: number; cancelReason: string }
  >({
    mutationFn: async (payload) => {
      const res = await updateCancelReason(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to update shipping status with a receipt / tracking
 * reference.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: `{ orderShippingId: number; receipt: string }`
 * - **Invalidates**: `["orders"]` on success.
 * - Endpoint: Delegated to `updateOrderShippingStatus` in orders.requests.
 */
export const useUpdateOrderShippingStatus = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    {
      orderShippingId: number;
      receipt: string;
    }
  >({
    mutationFn: async (payload) => {
      const res = await updateOrderShippingStatus(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to perform a pre-order cost calculation
 * (e.g., subtotals, shipping fees, taxes) before placing an order.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: `{ cartIds: number[]; serviceCartIds: number[]; userAddressId: number }`
 * - Endpoint: Delegated to `preOrderCalculation` in orders.requests.
 */
export const usePreOrderCalculation = () => {
  return useMutation<
    { [key: string]: any },
    APIResponseError,
    { cartIds: number[]; serviceCartIds: number[], userAddressId: number }
  >({
    mutationFn: async (payload) => {
      const res = await preOrderCalculation(payload);
      return res.data;
    },
    onSuccess: () => {

    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Query hook that fetches order details for an unauthenticated user
 * by order ID.
 *
 * @param payload - Order identification.
 * @param payload.orderId - The numeric order ID.
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with the order details.
 *
 * @remarks
 * Query key: `["order-by-id", payload]`
 * Endpoint: Delegated to `fetchOrderByIdUnAuth` in orders.requests.
 */
export const useOrderByIdUnAuth = (
  payload: {
    orderId: number;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["order-by-id", payload],
    queryFn: async () => {
      const res: {
        data: { data: any; message: string; status: boolean; };
      } = await fetchOrderByIdUnAuth(payload);
      return res.data;
    },
    enabled,
  });

/**
 * Query hook that fetches aggregate order statistics for the
 * vendor dashboard (e.g., total orders, revenue, pending orders).
 *
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with vendor order stats.
 *
 * @remarks
 * Query key: `["vendor-order-stats"]`
 * Endpoint: Delegated to `fetchVendorOrderStats` in orders.requests.
 */
export const useVendorOrderStats = (enabled = true) =>
  useQuery({
    queryKey: ["vendor-order-stats"],
    queryFn: async () => {
      const res: any = await fetchVendorOrderStats();
      return res.data;
    },
    enabled,
  });

/**
 * Query hook that fetches recent vendor orders with pagination,
 * status, date-range, and sell-type filters.
 *
 * @param payload - Pagination and filter parameters.
 * @param payload.page - Page number (1-based).
 * @param payload.limit - Records per page.
 * @param payload.status - Optional order status filter.
 * @param payload.startDate - Optional start date filter (ISO string).
 * @param payload.endDate - Optional end date filter (ISO string).
 * @param payload.sellType - Optional sell-type filter (e.g., "B2B", "B2C").
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with recent vendor orders.
 *
 * @remarks
 * Query key: `["vendor-recent-orders", payload]`
 * Endpoint: Delegated to `fetchVendorRecentOrders` in orders.requests.
 */
export const useVendorRecentOrders = (
  payload: {
    page: number;
    limit: number;
    status?: string;
    startDate?: string;
    endDate?: string;
    sellType?: string;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["vendor-recent-orders", payload],
    queryFn: async () => {
      const res: any = await fetchVendorRecentOrders(payload);
      return res.data;
    },
    enabled,
  });

/**
 * Mutation hook to update an order's status (vendor-side),
 * with optional notes.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: `{ orderProductId: number; status: string; notes?: string }`
 * - **Invalidates**: `["vendor-order-stats"]`, `["vendor-recent-orders"]`,
 *   `["orders-by-seller-id"]` on success.
 * - Endpoint: Delegated to `updateOrderStatus` in orders.requests.
 */
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { orderProductId: number; status: string; notes?: string }
  >({
    mutationFn: async (payload) => {
      const res = await updateOrderStatus(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vendor-order-stats"],
      });
      queryClient.invalidateQueries({
        queryKey: ["vendor-recent-orders"],
      });
      queryClient.invalidateQueries({
        queryKey: ["orders-by-seller-id"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to add tracking information (carrier and tracking
 * number) to an order product.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: `{ orderProductId: number; trackingNumber: string;
 *   carrier: string; notes?: string }`
 * - **Invalidates**: `["vendor-recent-orders"]`,
 *   `["orders-by-seller-id"]` on success.
 * - Endpoint: Delegated to `addOrderTracking` in orders.requests.
 */
export const useAddOrderTracking = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { orderProductId: number; trackingNumber: string; carrier: string; notes?: string }
  >({
    mutationFn: async (payload) => {
      const res = await addOrderTracking(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vendor-recent-orders"],
      });
      queryClient.invalidateQueries({
        queryKey: ["orders-by-seller-id"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};
