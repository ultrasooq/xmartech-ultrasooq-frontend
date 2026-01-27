import axios from "axios";
import { isEmpty } from "lodash";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import { getCookie } from "cookies-next";
import urlcat from "urlcat";
import { getApiUrl } from "@/config/api";

/**
 * Fetches the list of countries available for product-related operations.
 *
 * @returns Axios promise resolving to the list of countries.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/countryList`
 * - **Auth:** None required.
 */
export const fetchCountries = () => {
  return axios({
    method: "GET",
    url: `${getApiUrl()}/product/countryList`,
  });
};

/**
 * Fetches a list of brands with optional search and filtering.
 *
 * @param payload - The query parameters.
 * @param payload.term - Optional search term to filter brands by name.
 * @param payload.addedBy - Optional user ID who added the brand.
 * @param payload.type - Optional brand type filter.
 * @returns Axios promise resolving to the list of matching brands.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/brand/findAll`
 * - **Auth:** None required.
 */
export const fetchBrands = (payload: {
  term?: string;
  addedBy?: number;
  type?: string;
}) => {
  const query = new URLSearchParams();
  query.append("addedBy", String(payload.addedBy));

  if (payload.term) query.append("term", String(payload.term));
  if (payload.type) query.append("type", String(payload.type));

  return axios({
    method: "GET",
    url: `${getApiUrl()}/brand/findAll?${query}`,
  });
};

/**
 * Fetches all user roles defined in the system.
 *
 * @returns Axios promise resolving to the list of user roles.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/user/getAllUserRole`
 * - **Auth:** Bearer token required.
 */
export const fetchuserRoles = () => {
  const query = new URLSearchParams();
  return axios({
    method: "GET",
    url: `${getApiUrl()}/user/getAllUserRole?${query}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches all user roles with pagination support.
 *
 * @param payload - Pagination parameters.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @returns Axios promise resolving to the paginated list of user roles.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/user/getAllUserRole`
 * - **Auth:** Bearer token required.
 */
export const fetchuserRolesWithPagination = (payload: {
  page: number;
  limit: number;
}) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/user/getAllUserRole`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Deletes a member role by its numeric ID.
 *
 * @param payload - The deletion parameters.
 * @param payload.id - The numeric ID of the role to delete.
 * @returns Axios promise resolving to the deletion confirmation.
 *
 * @remarks
 * - **HTTP Method:** `DELETE`
 * - **Endpoint:** `/user/deleteUserRole`
 * - **Auth:** Bearer token required.
 */
export const deleteMemberRole = (payload: { id: number }) => {
  return axios({
    method: "DELETE",
    url: urlcat(`${getApiUrl()}/user/deleteUserRole`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Creates a new brand entry submitted by the authenticated user.
 *
 * @param payload - The brand creation data.
 * @param payload.brandName - The name of the new brand.
 * @returns Axios promise resolving to the newly created brand.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/brand/addBrandByUser`
 * - **Auth:** Bearer token required.
 */
export const createBrand = (payload: { brandName: string }) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/brand/addBrandByUser`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Creates a new user role in the system.
 *
 * @param payload - The role creation data.
 * @param payload.userRoleName - The name for the new role.
 * @returns Axios promise resolving to the newly created role.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/user/createUserRole`
 * - **Auth:** Bearer token required.
 */
export const createUserRole = (payload: { userRoleName: string }) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/user/createUserRole`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Copies (duplicates) an existing user role along with all its permissions.
 *
 * @param payload - The copy parameters.
 * @param payload.userRoleId - The numeric ID of the source role to copy.
 * @returns Axios promise resolving to the newly duplicated role.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/user/copy-userRole-with-permission`
 * - **Auth:** Bearer token required.
 */
export const copyUserRole = (payload: { userRoleId: number }) => {
  return axios({
    method: "PATCH",
    url: `${getApiUrl()}/user/copy-userRole-with-permission`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Updates an existing user role's name.
 *
 * @param payload - The role update data.
 * @param payload.userRoleName - The new name for the role.
 * @returns Axios promise resolving to the updated role.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/user/updateUserRole`
 * - **Auth:** Bearer token required.
 */
export const updateUserRole = (payload: { userRoleName: string }) => {
  return axios({
    method: "PATCH",
    url: `${getApiUrl()}/user/updateUserRole`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches the list of locations available for product-related operations.
 *
 * @returns Axios promise resolving to the list of locations.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/product/locationList`
 * - **Auth:** None required.
 */
export const fetchLocation = () => {
  return axios({
    method: "GET",
    url: `${getApiUrl()}/product/locationList`,
  });
};

/**
 * Fetches all countries from the admin endpoint with a high limit (1000).
 *
 * @returns Axios promise resolving to the list of all countries.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/admin/getAllCountry?page=1&limit=1000&sort=desc`
 * - **Auth:** None required.
 */
export const fetchAllCountry = () => {
  return axios({
    method: "GET",
    url: `${getApiUrl()}/admin/getAllCountry?page=1&limit=1000&sort=desc`,
  });
};

/**
 * Fetches all states/provinces for a given country.
 *
 * @param payload - The lookup parameters.
 * @param payload.countryId - The numeric country ID.
 * @returns Axios promise resolving to the list of states for the country.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/admin/getAllStates?countryId=:countryId&page=1&limit=5000&sort=desc`
 * - **Auth:** None required.
 */
export const fetchStatesByCountry = (payload: { countryId: number }) => {
  return axios({
    method: "GET",
    url: `${getApiUrl()}/admin/getAllStates?countryId=${payload.countryId}&page=1&limit=5000&sort=desc`,
  });
};

/**
 * Fetches all cities for a given state/province.
 *
 * @param payload - The lookup parameters.
 * @param payload.stateId - The numeric state/province ID.
 * @returns Axios promise resolving to the list of cities for the state.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/admin/getAllCities?stateId=:stateId&page=1&limit=50000&sort=desc`
 * - **Auth:** None required.
 */
export const fetchCitiesByState = (payload: { stateId: number }) => {
  return axios({
    method: "GET",
    url: `${getApiUrl()}/admin/getAllCities?stateId=${payload.stateId}&page=1&limit=50000&sort=desc`,
  });
};
