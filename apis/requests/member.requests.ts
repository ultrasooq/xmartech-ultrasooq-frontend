import axios from "axios";
import { isEmpty } from "lodash";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import { getCookie } from "cookies-next";
import urlcat from "urlcat";
import { getApiUrl } from "@/config/api";

/**
 * Creates a new team member under the authenticated user's organization.
 *
 * @param payload - The team member creation data (untyped).
 * @returns Axios promise resolving to the newly created team member.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/team-member/create`
 * - **Auth:** Bearer token required.
 */
export const createMember = (payload: any) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/team-member/create`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches all team members with pagination for the authenticated user's organization.
 *
 * @param payload - Pagination parameters.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @returns Axios promise resolving to the paginated list of team members.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/team-member/getAllTeamMember`
 * - **Auth:** Bearer token required.
 */
export const fetchAllMembers = (payload: { page: number; limit: number }) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/team-member/getAllTeamMember`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Updates an existing team member's details.
 *
 * @param payload - The team member update data (untyped).
 * @returns Axios promise resolving to the updated team member.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/team-member/update`
 * - **Auth:** Bearer token required.
 */
export const updateMember = (payload: any) => {
  return axios({
    method: "PATCH",
    url: `${getApiUrl()}/team-member/update`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches all available permissions from the admin endpoint.
 *
 * @returns Axios promise resolving to the list of system permissions.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/admin/permission/get-all`
 * - **Auth:** Bearer token required.
 */
export const fetchPermissions = () => {
  return axios({
    method: "GET",
    url: `${getApiUrl()}/admin/permission/get-all`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Assigns permissions to a user role.
 *
 * @param payload - The permission assignment data (untyped).
 * @returns Axios promise resolving to the assignment confirmation.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/user/set-permision`
 * - **Auth:** Bearer token required.
 */
export const setPermission = (payload: any) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/user/set-permision`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches a user role together with its assigned permissions by role ID.
 *
 * @param payload - The lookup parameters.
 * @param payload.userRoleId - The numeric user role ID.
 * @returns Axios promise resolving to the role details including its permissions.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/user/getOneUserRole-with-permission`
 * - **Auth:** Bearer token required.
 */
export const fetchPermissionByRoleId = (payload: { userRoleId: number }) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/user/getOneUserRole-with-permission`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Updates the permissions assigned to a user role.
 *
 * @param payload - The permission update data (untyped).
 * @returns Axios promise resolving to the update confirmation.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/user/update-set-permission`
 * - **Auth:** Bearer token required.
 */
export const updatePermission = (payload: any) => {
  return axios({
    method: "PATCH",
    url: `${getApiUrl()}/user/update-set-permission`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};
