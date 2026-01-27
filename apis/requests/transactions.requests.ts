import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import axios from "axios";
import { getCookie } from "cookies-next";
import urlcat from "urlcat";
import { getApiUrl } from "@/config/api";

/**
 * Fetches all payment transactions for the authenticated user.
 *
 * @param payload - Optional query/filter parameters (untyped). Passed as both URL params and request body.
 * @returns Axios promise resolving to the list of transactions.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/payment/transaction/getl-all`
 * - **Auth:** Bearer token required.
 */
export const fetchTransactions = (payload: any) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/payment/transaction/getl-all`, payload),
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};
