import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import { getCookie } from "cookies-next";
import axios from "axios";
import urlcat from "urlcat";
import { getApiUrl } from "@/config/api";
import {} from "@/utils/types/product.types";

/**
 * Creates a new service listing for the authenticated seller.
 *
 * @param payload - The service creation data (untyped).
 * @returns Axios promise resolving to the newly created service.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/service/create`
 * - **Auth:** Bearer token required.
 */
export const createService = (payload: any) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/service/create`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Updates an existing service listing by its ID.
 *
 * @param payload - The service update data (untyped). Must include `serviceId` property.
 * @returns Axios promise resolving to the updated service.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/service/:serviceId`
 * - **Auth:** Bearer token required.
 */
export const updateService = (payload: any) => {
  return axios({
    method: "PATCH",
    url: `${getApiUrl()}/service/${payload?.serviceId}`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches all services with optional filtering, sorting, and pagination.
 *
 * @param payload - Query parameters.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @param payload.term - Optional search term.
 * @param payload.sort - Optional sort order.
 * @param payload.userId - Optional user ID filter.
 * @param payload.ownService - Optional flag to filter only the user's own services.
 * @returns Axios promise resolving to the paginated list of services.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/service/list`
 * - **Auth:** Bearer token required.
 */
export const fetchAllServices = (payload: {
  page: number;
  limit: number;
  term?: string;
  sort?: string;
  userId?: number;
  ownService?: boolean;
}) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/service/list`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches a single service by its ID.
 *
 * @param payload - The lookup parameters.
 * @param payload.serviceid - The string service ID.
 * @param payload.userId - Optional numeric user ID for context.
 * @param payload.sharedLinkId - Optional shared link ID for referral tracking.
 * @returns Axios promise resolving to the service details.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/service/:serviceid`
 * - **Auth:** Bearer token required.
 */
export const fetchServiceById = (payload: {
  serviceid: string;
  userId?: number;
  sharedLinkId?: string;
}) => {
  return axios({
    method: "GET",
    url: `${getApiUrl()}/service/${payload.serviceid}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Adds a standalone service to the authenticated user's cart.
 *
 * @param payload - The service cart data (untyped).
 * @returns Axios promise resolving to the updated cart with the added service.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/cart/updateservice`
 * - **Auth:** Bearer token required.
 */
export const addServiceToCart = (payload: any) => {
  return axios({
    method: "PATCH",
    url: `${getApiUrl()}/cart/updateservice`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches all services offered by a specific seller with optional city filters and pagination.
 *
 * @param payload - Query parameters.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @param payload.sellerId - The numeric seller user ID.
 * @param payload.fromCityId - Optional source city ID filter.
 * @param payload.toCityId - Optional destination city ID filter.
 * @returns Axios promise resolving to the paginated list of seller's services.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/service/getAllServiceBySeller`
 * - **Auth:** Bearer token required.
 */
export const fetchServicesBySeller = (payload: {
  page: number;
  limit: number;
  sellerId: number;
  fromCityId?: number;
  toCityId?: number;
}) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/service/getAllServiceBySeller`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches all services by sellers other than the specified seller, with optional city filters.
 *
 * @param payload - Query parameters.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @param payload.sellerId - The numeric seller user ID to exclude.
 * @param payload.fromCityId - Optional source city ID filter.
 * @param payload.toCityId - Optional destination city ID filter.
 * @returns Axios promise resolving to the paginated list of other sellers' services.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/service/getAllServiceOfOtherSeller`
 * - **Auth:** Bearer token required.
 */
export const fetchServicesByOtherSeller = (payload: {
  page: number;
  limit: number;
  sellerId: number;
  fromCityId?: number;
  toCityId?: number;
}) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/service/getAllServiceOfOtherSeller`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches all services related to a specific product category.
 *
 * @param payload - Query parameters.
 * @param payload.categoryId - The string category ID to filter services by.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @returns Axios promise resolving to the paginated list of category-related services.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/service/getAllServiceRelatedProductCategoryId`
 * - **Auth:** Bearer token required.
 */
export const fetchServicesByProductCategory = (payload: {
  categoryId: string;
  page: number;
  limit: number;
}) => {
  return axios({
    method: "GET",
    url: urlcat(
      `${getApiUrl()}/service/getAllServiceRelatedProductCategoryId`,
      payload,
    ),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};
