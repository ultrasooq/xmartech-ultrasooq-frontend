import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import { getCookie } from "cookies-next";
import axios from "axios";
import urlcat from "urlcat";
import { getApiUrl } from "@/config/api";

/**
 * Fetches the authenticated user's wishlist with pagination.
 *
 * @param payload - Pagination parameters.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @returns Axios promise resolving to the paginated list of wishlist items.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/wishlist/getAllWishListByUser`
 * - **Auth:** Bearer token required.
 */
export const fetchWishList = (payload: { page: number; limit: number }) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/wishlist/getAllWishListByUser`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Adds a product to the authenticated user's wishlist.
 *
 * @param payload - The wishlist addition data.
 * @param payload.productId - The numeric product ID to add to the wishlist.
 * @returns Axios promise resolving to the newly created wishlist entry.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/wishlist/create`
 * - **Auth:** Bearer token required.
 */
export const addToWishList = (payload: { productId: number }) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/wishlist/create`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Removes a product from the authenticated user's wishlist.
 *
 * @param payload - The removal parameters.
 * @param payload.productId - The numeric product ID to remove from the wishlist.
 * @returns Axios promise resolving to the deletion confirmation.
 *
 * @remarks
 * - **HTTP Method:** `DELETE`
 * - **Endpoint:** `/wishlist/delete`
 * - **Auth:** Bearer token required.
 */
export const deleteFromWishList = (payload: { productId: number }) => {
  return axios({
    method: "DELETE",
    url: urlcat(`${getApiUrl()}/wishlist/delete`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches the total number of items in the authenticated user's wishlist.
 *
 * @returns Axios promise resolving to the wishlist item count.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/wishlist/wishlistCount`
 * - **Auth:** Bearer token required.
 */
export const fetchWishlistCount = () => {
  return axios({
    method: "GET",
    url: `${getApiUrl()}/wishlist/wishlistCount`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};
