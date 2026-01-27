import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import axios from "axios";
import { getCookie } from "cookies-next";
import { getApiUrl } from "@/config/api";

/**
 * Updates the authenticated user's profile information.
 *
 * @param payload - The profile update data (untyped).
 * @returns Axios promise resolving to the updated user profile.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/user/updateProfile`
 * - **Auth:** Bearer token required.
 */
export const updateUserProfile = (payload: any) => {
  return axios({
    method: "PATCH",
    url: `${getApiUrl()}/user/updateProfile`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches the currently authenticated user's profile information.
 *
 * @returns Axios promise resolving to the authenticated user's profile data.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/user/me`
 * - **Auth:** Bearer token required.
 */
export const fetchMe = () => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/user/me`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches a unique user's details by their user ID.
 *
 * @param payload - The lookup parameters.
 * @param payload.userId - The numeric user ID to look up (may be `undefined`).
 * @returns Axios promise resolving to the unique user's details.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/user/findUnique`
 * - **Auth:** Bearer token required.
 */
export const fetchUniqueUser = (payload: { userId: number | undefined }) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/user/findUnique`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches the permissions assigned to the currently authenticated user.
 *
 * @returns Axios promise resolving to the user's permission set.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/user/get-perrmision`
 * - **Auth:** Bearer token required.
 */
export const fetchUserPermissions = () => {
  return axios({
    method: "GET",
    url: `${getApiUrl()}/user/get-perrmision`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches the business categories associated with the authenticated user.
 *
 * @returns Axios promise resolving to the list of user business categories.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/user/bussiness-category/get-all`
 * - **Auth:** Bearer token required.
 */
export const fetchUserBusinessCategories = () => {
  return axios({
    method: "GET",
    url: `${getApiUrl()}/user/bussiness-category/get-all`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches a user's details by their numeric user ID.
 *
 * @param payload - The lookup parameters.
 * @param payload.userId - The numeric user ID.
 * @returns Axios promise resolving to the user's details.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/user/findUnique`
 * - **Auth:** Bearer token required.
 */
export const fetchUserById = (payload: { userId: number }) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/user/findUnique`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};
