import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import axios from "axios";
import { getCookie } from "cookies-next";
import { isEmpty } from "lodash";
import { getApiUrl } from "@/config/api";

/**
 * Creates a new company user profile for the authenticated user.
 *
 * @param payload - The company profile creation data (untyped).
 * @returns Axios promise resolving to the newly created company profile.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/user/userProfile`
 * - **Auth:** Bearer token required.
 */
export const createCompanyProfile = (payload: any) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/user/userProfile`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Updates the existing company user profile for the authenticated user.
 *
 * @param payload - The company profile update data (untyped).
 * @returns Axios promise resolving to the updated company profile.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/user/updateUserProfile`
 * - **Auth:** Bearer token required.
 */
export const updateCompanyProfile = (payload: any) => {
  return axios({
    method: "PATCH",
    url: `${getApiUrl()}/user/updateUserProfile`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Updates an existing company branch's details.
 *
 * @param payload - The branch update data (untyped).
 * @returns Axios promise resolving to the updated branch details.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/user/updateBranch`
 * - **Auth:** Bearer token required.
 */
export const updateCompanyBranch = (payload: any) => {
  return axios({
    method: "PATCH",
    url: `${getApiUrl()}/user/updateBranch`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Creates a new branch for the authenticated user's company.
 *
 * @param payload - The branch creation data (untyped).
 * @returns Axios promise resolving to the newly created branch.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/user/addBranch`
 * - **Auth:** Bearer token required.
 */
export const createCompanyBranch = (payload: any) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/user/addBranch`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches a single company branch by its ID.
 *
 * @param payload - The lookup parameters.
 * @param payload.branchId - The string ID of the branch to retrieve.
 * @returns Axios promise resolving to the branch details.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/user/findOneBranch`
 * - **Auth:** Bearer token required.
 * - Manually constructs URLSearchParams from the payload.
 */
export const fetchCompanyBranchById = (payload: { branchId: string }) => {
  const query = new URLSearchParams();

  if (!isEmpty(payload.branchId)) {
    query.append("branchId", String(payload.branchId));
  }

  return axios({
    method: "GET",
    url: `${getApiUrl()}/user/findOneBranch?${query}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};
