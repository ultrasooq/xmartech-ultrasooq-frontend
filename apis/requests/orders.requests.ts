import axios from "axios";
import { getCookie } from "cookies-next";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import urlcat from "urlcat";
import { getApiUrl } from "@/config/api";

/**
 * Fetches all order products for the authenticated buyer with filtering and pagination.
 *
 * @param payload - Query parameters for filtering and pagination.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @param payload.term - Optional search term.
 * @param payload.orderProductStatus - Optional status filter (e.g., "pending", "delivered").
 * @param payload.startDate - Optional start date filter (ISO string).
 * @param payload.endDate - Optional end date filter (ISO string).
 * @returns Axios promise resolving to the paginated list of order products.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/order/getAllOrderProductByUserId`
 * - **Auth:** Bearer token required.
 */
export const fetchOrders = (payload: {
  page: number;
  limit: number;
  term?: string;
  orderProductStatus?: string;
  startDate?: string;
  endDate?: string;
}) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/order/getAllOrderProductByUserId`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Creates a new order for the authenticated user.
 *
 * @param payload - The order creation data (untyped).
 * @returns Axios promise resolving to the newly created order.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/order/createOrder`
 * - **Auth:** Bearer token required.
 */
export const createOrder = (payload: any) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/order/createOrder`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Creates a new order for an unauthenticated (guest) user.
 *
 * @param payload - The guest order creation data (untyped).
 * @returns Axios promise resolving to the newly created guest order.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/order/createOrderUnAuth`
 * - **Auth:** None required.
 */
export const createOrderUnAuth = (payload: any) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/order/createOrderUnAuth`,
    data: payload,
  });
};

/**
 * Creates a Paymob payment intention for processing a payment.
 *
 * @param payload - The payment intent data (untyped).
 * @returns Axios promise resolving to the Paymob payment intention response.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/payment/create-paymob-intention`
 * - **Auth:** Bearer token required.
 */
export const createPaymentIntent = (payload: any) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/payment/create-paymob-intention`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Creates a payment link for external payment processing.
 *
 * @param payload - The payment link creation data (untyped).
 * @returns Axios promise resolving to the generated payment link.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/payment/createPaymentLink`
 * - **Auth:** Bearer token required.
 */
export const createPaymentLink = (payload: any) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/payment/createPaymentLink`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Creates an EMI (Equated Monthly Installment) payment for an order.
 *
 * @param payload - The EMI payment data (untyped).
 * @returns Axios promise resolving to the EMI payment creation response.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/payment/createPaymentForEMI`
 * - **Auth:** Bearer token required.
 */
export const createEMIPayment = (payload: any) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/payment/createPaymentForEMI`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Creates an AmwalPay payment configuration for processing payments.
 *
 * @param payload - The AmwalPay configuration data (untyped).
 * @returns Axios promise resolving to the AmwalPay config response.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/payment/create-amwalpay-config`
 * - **Auth:** Bearer token required.
 */
export const createAmwalPayConfig = (payload: any) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/payment/create-amwalpay-config`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches a single order product detail by its ID for the buyer.
 *
 * @param payload - The lookup parameters.
 * @param payload.orderProductId - The string ID of the order product.
 * @returns Axios promise resolving to the order product details.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/order/getOneOrderProductDetailByUserId`
 * - **Auth:** Bearer token required.
 */
export const fetchOrderById = (payload: { orderProductId: string }) => {
  return axios({
    method: "GET",
    url: urlcat(
      `${getApiUrl()}/order/getOneOrderProductDetailByUserId`,
      payload,
    ),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches a single order product detail by its ID for the seller.
 *
 * @param payload - The lookup parameters.
 * @param payload.orderProductId - The string ID of the order product.
 * @returns Axios promise resolving to the order product details from the seller's perspective.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/order/getOneOrderProductDetailBySellerId`
 * - **Auth:** Bearer token required.
 */
export const fetchOrderBySellerId = (payload: { orderProductId: string }) => {
  return axios({
    method: "GET",
    url: urlcat(
      `${getApiUrl()}/order/getOneOrderProductDetailBySellerId`,
      payload,
    ),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches all order products for the authenticated seller with filtering and pagination.
 *
 * @param payload - Query parameters for filtering and pagination.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @param payload.term - Optional search term.
 * @param payload.orderProductStatus - Optional order product status filter.
 * @param payload.startDate - Optional start date filter (ISO string).
 * @param payload.endDate - Optional end date filter (ISO string).
 * @returns Axios promise resolving to the paginated list of seller order products.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/order/getAllOrderProductBySellerId`
 * - **Auth:** Bearer token required.
 */
export const fetchOrdersBySellerId = (payload: {
  page: number;
  limit: number;
  term?: string;
  orderProductStatus?: string;
  startDate?: string;
  endDate?: string;
}) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/order/getAllOrderProductBySellerId`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Updates the status of a specific order product (e.g., shipped, delivered).
 *
 * @param payload - The status update data.
 * @param payload.orderProductId - The numeric order product ID.
 * @param payload.status - The new status value.
 * @returns Axios promise resolving to the status update confirmation.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/order/orderProductStatusById`
 * - **Auth:** Bearer token required.
 */
export const updateProductStatus = (payload: {
  orderProductId: number;
  status: string;
}) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/order/orderProductStatusById`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Updates the cancellation reason for an order product.
 *
 * @param payload - The cancel reason data.
 * @param payload.orderProductId - The numeric order product ID.
 * @param payload.cancelReason - The reason for cancellation.
 * @returns Axios promise resolving to the update confirmation.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/order/orderProductCancelReason`
 * - **Auth:** Bearer token required.
 */
export const updateCancelReason = (payload: {
  orderProductId: number;
  cancelReason: string;
}) => {
  return axios({
    method: "PATCH",
    url: `${getApiUrl()}/order/orderProductCancelReason`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Updates the shipping status and receipt for an order shipment.
 *
 * @param payload - The shipping update data.
 * @param payload.orderShippingId - The numeric shipping record ID.
 * @param payload.receipt - The shipping receipt or tracking reference.
 * @returns Axios promise resolving to the shipping status update confirmation.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/order/orderShippingStatusUpdateById`
 * - **Auth:** Bearer token required.
 */
export const updateOrderShippingStatus = (payload: {
  orderShippingId: number;
  receipt: string;
}) => {
  return axios({
    method: "PATCH",
    url: `${getApiUrl()}/order/orderShippingStatusUpdateById`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Performs a pre-order price/tax/shipping calculation before placing an order.
 *
 * @param payload - The calculation input data (untyped).
 * @returns Axios promise resolving to the pre-order calculation breakdown.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/order/preOrderCal`
 * - **Auth:** Bearer token required.
 */
export const preOrderCalculation = (payload: any) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/order/preOrderCal`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches order details for an unauthenticated (guest) user by order ID.
 *
 * @param payload - The lookup parameters.
 * @param payload.orderId - The numeric order ID.
 * @returns Axios promise resolving to the guest order details.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/order/getOneOrderUnAuth`
 * - **Auth:** None required.
 */
export const fetchOrderByIdUnAuth = (payload: { orderId: number }) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/order/getOneOrderUnAuth`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};

// Vendor Dashboard specific endpoints

/**
 * Fetches aggregated order statistics for the vendor dashboard.
 *
 * @returns Axios promise resolving to the vendor's order stats summary.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/order/vendor/order-stats`
 * - **Auth:** Bearer token required.
 */
export const fetchVendorOrderStats = () => {
  return axios({
    method: "GET",
    url: `${getApiUrl()}/order/vendor/order-stats`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches recent orders for the vendor with optional filtering and pagination.
 *
 * @param payload - Query parameters for filtering and pagination.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @param payload.status - Optional order status filter.
 * @param payload.startDate - Optional start date filter (ISO string).
 * @param payload.endDate - Optional end date filter (ISO string).
 * @param payload.sellType - Optional sell type filter.
 * @returns Axios promise resolving to the paginated list of recent vendor orders.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/order/vendor/recent-orders`
 * - **Auth:** Bearer token required.
 */
export const fetchVendorRecentOrders = (payload: {
  page: number;
  limit: number;
  status?: string;
  startDate?: string;
  endDate?: string;
  sellType?: string;
}) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/order/vendor/recent-orders`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Updates the status of an order product from the vendor's perspective.
 *
 * @param payload - The status update data.
 * @param payload.orderProductId - The numeric order product ID.
 * @param payload.status - The new status string.
 * @param payload.notes - Optional notes accompanying the status change.
 * @returns Axios promise resolving to the update confirmation.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/order/vendor/update-status`
 * - **Auth:** Bearer token required.
 */
export const updateOrderStatus = (payload: {
  orderProductId: number;
  status: string;
  notes?: string;
}) => {
  return axios({
    method: "PATCH",
    url: `${getApiUrl()}/order/vendor/update-status`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Adds tracking information to an order product for shipment tracking.
 *
 * @param payload - The tracking data.
 * @param payload.orderProductId - The numeric order product ID.
 * @param payload.trackingNumber - The shipment tracking number.
 * @param payload.carrier - The shipping carrier name.
 * @param payload.notes - Optional tracking notes.
 * @returns Axios promise resolving to the tracking addition confirmation.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/order/vendor/add-tracking`
 * - **Auth:** Bearer token required.
 */
export const addOrderTracking = (payload: {
  orderProductId: number;
  trackingNumber: string;
  carrier: string;
  notes?: string;
}) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/order/vendor/add-tracking`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};
