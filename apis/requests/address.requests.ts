import axios from "axios";
import { getCookie } from "cookies-next";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import urlcat from "urlcat";
import {
  AddressCreateRequest,
  AddressUpdateRequest,
} from "@/utils/types/address.types";
import { getApiUrl } from "@/config/api";

/**
 * Fetches all addresses belonging to the authenticated user with pagination.
 *
 * @param payload - Pagination parameters.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @returns Axios promise resolving to the paginated list of user addresses.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/user/getAllUserAddress`
 * - **Auth:** Bearer token required.
 */
export const fetchAllUserAddress = (payload: {
  page: number;
  limit: number;
}) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/user/getAllUserAddress`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Creates a new address for the authenticated user.
 *
 * @param payload - The address creation data conforming to {@link AddressCreateRequest}.
 * @returns Axios promise resolving to the newly created address.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/user/addUserAddress`
 * - **Auth:** Bearer token required.
 */
export const addAddress = (payload: AddressCreateRequest) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/user/addUserAddress`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Updates an existing address for the authenticated user.
 *
 * @param payload - The address update data conforming to {@link AddressUpdateRequest}.
 * @returns Axios promise resolving to the updated address.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/user/updateUserAddress`
 * - **Auth:** Bearer token required.
 */
export const updateAddress = (payload: AddressUpdateRequest) => {
  return axios({
    method: "PATCH",
    url: `${getApiUrl()}/user/updateUserAddress`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches a single user address by its unique identifier.
 *
 * @param payload - The lookup parameters.
 * @param payload.userAddressId - The unique ID of the address to retrieve.
 * @returns Axios promise resolving to the address details.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/user/getOneUserAddress`
 * - **Auth:** Bearer token required.
 */
export const fetchAddressById = (payload: { userAddressId: string }) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/user/getOneUserAddress`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Deletes a user address by its unique identifier.
 *
 * @param payload - The deletion parameters.
 * @param payload.userAddressId - The numeric ID of the address to delete.
 * @returns Axios promise resolving to the deletion confirmation.
 *
 * @remarks
 * - **HTTP Method:** `DELETE`
 * - **Endpoint:** `/user/deleteUserAddress`
 * - **Auth:** Bearer token required.
 */
export const deleteAddress = (payload: { userAddressId: number }) => {
  return axios({
    method: "DELETE",
    url: urlcat(`${getApiUrl()}/user/deleteUserAddress`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};
