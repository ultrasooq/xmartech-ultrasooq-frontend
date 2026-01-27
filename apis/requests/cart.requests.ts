import axios from "axios";
import { getCookie } from "cookies-next";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import urlcat from "urlcat";
import { getApiUrl } from "@/config/api";

/**
 * Fetches the cart items for the currently authenticated user with pagination.
 *
 * @param payload - Pagination parameters.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @returns Axios promise resolving to the paginated list of cart items.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/cart/list`
 * - **Auth:** Bearer token required.
 */
export const fetchCartByUserId = (payload: { page: number; limit: number }) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/cart/list`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches the cart items for an unauthenticated user identified by device ID.
 *
 * @param payload - Device identification and pagination parameters.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @param payload.deviceId - The unique device identifier for the guest user.
 * @returns Axios promise resolving to the paginated list of cart items.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/cart/listUnAuth`
 * - **Auth:** None required.
 */
export const fetchCartByDevice = (payload: {
  page: number;
  limit: number;
  deviceId: string;
}) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/cart/listUnAuth`, payload),
  });
};

/**
 * Updates the cart for the authenticated user (e.g., add/change product quantity).
 *
 * @param payload - The cart update data (untyped).
 * @returns Axios promise resolving to the updated cart.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/cart/update`
 * - **Auth:** Bearer token required.
 */
export const updateCartWithLogin = (payload: any) => {
  return axios({
    method: "PATCH",
    url: `${getApiUrl()}/cart/update`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Updates the cart for a guest user identified by device ID.
 *
 * @param payload - The cart update data for a guest session.
 * @param payload.productPriceId - The product price entry ID.
 * @param payload.quantity - The desired quantity.
 * @param payload.deviceId - The unique device identifier.
 * @param payload.sharedLinkId - Optional shared link ID for referral tracking.
 * @param payload.productVariant - Optional product variant details.
 * @returns Axios promise resolving to the updated cart.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/cart/updateUnAuth`
 * - **Auth:** None required.
 */
export const updateCartByDevice = (payload: {
  productPriceId: number;
  quantity: number;
  deviceId: string;
  sharedLinkId?: number;
  productVariant?: any;
}) => {
  return axios({
    method: "PATCH",
    url: `${getApiUrl()}/cart/updateUnAuth`,
    data: payload,
  });
};

/**
 * Updates the cart with a service product for the authenticated user.
 *
 * @param payload - The service cart update data (untyped).
 * @returns Axios promise resolving to the updated cart with service.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/cart/updateservice/product`
 * - **Auth:** Bearer token required.
 */
export const updateCartWithService = (payload: any) => {
  return axios({
    method: "PATCH",
    url: `${getApiUrl()}/cart/updateservice/product`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Deletes a specific item from the authenticated user's cart.
 *
 * @param payload - The deletion parameters.
 * @param payload.cartId - The numeric cart item ID to remove.
 * @returns Axios promise resolving to the deletion confirmation.
 *
 * @remarks
 * - **HTTP Method:** `DELETE`
 * - **Endpoint:** `/cart/delete`
 * - **Auth:** Bearer token required.
 */
export const deleteCartItem = (payload: { cartId: number }) => {
  return axios({
    method: "DELETE",
    url: urlcat(`${getApiUrl()}/cart/delete`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Deletes a service (or specific service feature) from a cart item.
 *
 * @param cartId - The numeric cart item ID containing the service.
 * @param serviceFeatureId - Optional service feature ID to remove a specific feature.
 * @returns Axios promise resolving to the deletion confirmation.
 *
 * @remarks
 * - **HTTP Method:** `DELETE`
 * - **Endpoint:** `/cart/deleteService/:cartId`
 * - **Auth:** Bearer token required.
 */
export const deleteServiceFromCart = (
  cartId: number,
  serviceFeatureId?: number,
) => {
  let payload: any = {};
  if (serviceFeatureId) {
    payload.servicefeatureids = serviceFeatureId.toString();
  }
  return axios({
    method: "DELETE",
    url: urlcat(`${getApiUrl()}/cart/deleteService/${cartId}`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Migrates a guest cart (by device ID) to the authenticated user's account upon login.
 *
 * @param payload - The device identification data.
 * @param payload.deviceId - The unique device identifier whose cart to merge.
 * @returns Axios promise resolving to the migration confirmation.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/cart/updateUserIdBydeviceId`
 * - **Auth:** Bearer token required.
 */
export const updateUserCartByDeviceId = (payload: { deviceId: string }) => {
  return axios({
    method: "PATCH",
    url: `${getApiUrl()}/cart/updateUserIdBydeviceId`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Retrieves the total number of items in the authenticated user's cart.
 *
 * @returns Axios promise resolving to the cart item count.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/cart/cartCount`
 * - **Auth:** Bearer token required.
 */
export const fetchCartCountWithLogin = () => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/cart/cartCount`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Retrieves the total number of items in a guest user's cart by device ID.
 *
 * @param payload - The device identification data.
 * @param payload.deviceId - The unique device identifier.
 * @returns Axios promise resolving to the cart item count.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/cart/cartCountUnAuth`
 * - **Auth:** None required.
 */
export const fetchCartCountByDeviceId = (payload: { deviceId: string }) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/cart/cartCountUnAuth`,
    data: payload,
  });
};

/**
 * Adds a service to a cart item that already contains a product.
 *
 * @param payload - The service-to-cart data (key-value object, untyped).
 * @returns Axios promise resolving to the updated cart item with the added service.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/cart/updateCartServiceWithProduct`
 * - **Auth:** Bearer token required.
 */
export const addServiceToCartWithProduct = (payload: {
  [key: string]: any;
}) => {
  return axios({
    method: "PATCH",
    url: `${getApiUrl()}/cart/updateCartServiceWithProduct`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches product recommendations based on the current cart contents.
 *
 * @param payload - The recommendation request parameters.
 * @param payload.productIds - Optional comma-separated product IDs in the cart.
 * @param payload.limit - Optional maximum number of recommendations.
 * @param payload.deviceId - Optional device identifier for guest users.
 * @returns Axios promise resolving to the list of recommended products.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/cart/recommendations`
 * - **Auth:** Bearer token required.
 */
export const fetchCartRecommendations = (payload: {
  productIds?: string;
  limit?: number;
  deviceId?: string;
}) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/cart/recommendations`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};
