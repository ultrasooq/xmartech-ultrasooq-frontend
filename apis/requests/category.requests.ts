import { ADMIN_BEARER, PUREMOON_TOKEN_KEY } from "@/utils/constants";
import axios from "axios";
import { getCookie } from "cookies-next";
import { isEmpty } from "lodash";
import urlcat from "urlcat";
import { getApiUrl } from "@/config/api";

/**
 * Fetches a single category by its optional ID using the admin bearer token.
 *
 * @param payload - The lookup parameters.
 * @param payload.categoryId - Optional category ID to retrieve.
 * @returns Axios promise resolving to the category details.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/category/findOne`
 * - **Auth:** Uses a hard-coded admin bearer token (`ADMIN_BEARER`).
 */
export const fetchCategory = (payload: { categoryId?: string }) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/category/findOne`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // TODO: remove later
      // Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
      Authorization: "Bearer " + ADMIN_BEARER,
    },
  });
};

/**
 * Fetches all top-level categories with a fixed pagination of page 1, limit 10.
 *
 * @returns Axios promise resolving to the list of categories.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/category/findAll?page=1&limit=10`
 * - **Auth:** None required.
 */
export const fetchCategories = () => {
  return axios({
    method: "GET",
    url: `${getApiUrl()}/category/findAll?page=1&limit=10`,
  });
};

/**
 * Fetches subcategories for a given parent category ID.
 *
 * @param payload - The lookup parameters.
 * @param payload.categoryId - The parent category ID whose subcategories to fetch.
 * @returns Axios promise resolving to the subcategory details.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/category/findOne`
 * - **Auth:** Bearer token required.
 * - Manually builds URL search params from the payload.
 */
export const fetchSubCategoriesById = (payload: { categoryId: string }) => {
  const query = new URLSearchParams();

  if (!isEmpty(payload.categoryId)) {
    query.append("categoryId", String(payload.categoryId));
  }

  return axios({
    method: "GET",
    url: `${getApiUrl()}/category/findOne?${query}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};
