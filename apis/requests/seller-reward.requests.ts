import axios from "axios";
import { getCookie } from "cookies-next";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import urlcat from "urlcat";
import { getApiUrl } from "@/config/api";

/**
 * Fetches all seller reward programs with optional filtering, sorting, and pagination.
 *
 * @param payload - Query parameters.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @param payload.term - Optional search term.
 * @param payload.productId - Optional product ID filter.
 * @param payload.sortType - Optional sort order (`"asc"` or `"desc"`).
 * @returns Axios promise resolving to the paginated list of seller rewards.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/getAllSellerReward`
 * - **Auth:** Bearer token required.
 */
export const fetchSellerRewards = (payload: {
  page: number;
  limit: number;
  term?: string;
  productId?: string;
  sortType?: "asc" | "desc";
}) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/product/getAllSellerReward`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Creates a new seller reward program for a product.
 *
 * @param payload - The reward creation data.
 * @param payload.productId - The numeric product ID to attach the reward to.
 * @param payload.startTime - The reward start time (ISO string).
 * @param payload.endTime - The reward end time (ISO string).
 * @param payload.rewardPercentage - The reward percentage.
 * @param payload.rewardFixAmount - The fixed reward amount.
 * @param payload.minimumOrder - The minimum order value to qualify.
 * @param payload.stock - The available stock for the reward.
 * @returns Axios promise resolving to the newly created seller reward.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/product/createSellerRewardProduct`
 * - **Auth:** Bearer token required.
 */
export const addSellerReward = (payload: {
  productId: number;
  startTime: string;
  endTime: string;
  rewardPercentage: number;
  rewardFixAmount: number;
  minimumOrder: number;
  stock: number;
}) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/product/createSellerRewardProduct`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches all generated share links with optional filtering, sorting, and pagination.
 *
 * @param payload - Query parameters.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @param payload.productId - Optional product ID filter.
 * @param payload.sortType - Optional sort order (`"asc"` or `"desc"`).
 * @returns Axios promise resolving to the paginated list of share links.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/getAllGenerateLink`
 * - **Auth:** Bearer token required.
 */
export const fetchShareLinks = (payload: {
  page: number;
  limit: number;
  productId?: string;
  sortType?: "asc" | "desc";
}) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/product/getAllGenerateLink`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Generates a new share link for a specific seller reward.
 *
 * @param payload - The share link creation data.
 * @param payload.sellerRewardId - The numeric seller reward ID to generate a link for.
 * @returns Axios promise resolving to the newly generated share link.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/product/generateLink`
 * - **Auth:** Bearer token required.
 * - Automatically appends `generatedLink: "generatedLink"` to the payload via `Object.assign`.
 */
export const createShareLink = (payload: { sellerRewardId: number }) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/product/generateLink`,
    data: Object.assign(payload, { generatedLink: "generatedLink" }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches all share links for a specific seller reward with optional filtering and pagination.
 *
 * @param payload - Query parameters.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @param payload.term - Optional search term.
 * @param payload.sellerRewardId - Optional seller reward ID filter.
 * @param payload.sortType - Optional sort order (`"asc"` or `"desc"`).
 * @returns Axios promise resolving to the paginated list of share links for the reward.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/getAllGenerateLinkBySellerRewardId`
 * - **Auth:** Bearer token required.
 */
export const fetchShareLinksBySellerRewardId = (payload: {
  page: number;
  limit: number;
  term?: string;
  sellerRewardId?: string;
  sortType?: "asc" | "desc";
}) => {
  return axios({
    method: "GET",
    url: urlcat(
      `${getApiUrl()}/product/getAllGenerateLinkBySellerRewardId`,
      payload,
    ),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};
