import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import axios from "axios";
import { getCookie } from "cookies-next";
import { getApiUrl } from "@/config/api";

/**
 * Fetches all help center queries for the authenticated user.
 *
 * @param payload - Optional query/filter parameters (untyped).
 * @returns Axios promise resolving to the list of help center queries.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/user/help-center/get-all`
 * - **Auth:** Bearer token required.
 */
export const fetchHelpCenterQueries = (payload: any) => {
  return axios({
    method: "GET",
    url: `${getApiUrl()}/user/help-center/get-all`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Submits a new help center query/support ticket.
 *
 * @param payload - The query submission data.
 * @param payload.userId - Optional numeric user ID (may be omitted for guest queries).
 * @param payload.email - The email address for follow-up communication.
 * @param payload.query - The query/question text.
 * @returns Axios promise resolving to the created help center query.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/user/help-center/create`
 * - **Auth:** Bearer token required.
 */
export const submitQuery = (payload: {
  userId?: number;
  email: string;
  query: string;
}) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/user/help-center/create`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};
