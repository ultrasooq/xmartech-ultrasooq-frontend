import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import { IFreelancerStatusRequest } from "@/utils/types/user.types";
import axios from "axios";
import { getCookie } from "cookies-next";
import { getApiUrl } from "@/config/api";

/**
 * Creates a new freelancer user profile for the authenticated user.
 *
 * @param payload - The freelancer profile creation data (untyped).
 * @returns Axios promise resolving to the newly created freelancer profile.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/user/userProfile`
 * - **Auth:** Bearer token required.
 */
export const createFreelancerProfile = (payload: any) => {
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
 * Updates the existing freelancer user profile for the authenticated user.
 *
 * @param payload - The freelancer profile update data (untyped).
 * @returns Axios promise resolving to the updated freelancer profile.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/user/updateUserProfile`
 * - **Auth:** Bearer token required.
 */
export const updateFreelancerProfile = (payload: any) => {
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
 * Updates an existing freelancer branch's details.
 *
 * @param payload - The branch update data (untyped).
 * @returns Axios promise resolving to the updated branch.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/user/updateBranch`
 * - **Auth:** Bearer token required.
 */
export const updateFreelancerBranch = (payload: any) => {
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
 * Toggles the freelancer's online/offline active status.
 *
 * @param payload - The status update data conforming to {@link IFreelancerStatusRequest}.
 * @returns Axios promise resolving to the updated freelancer status.
 *
 * @remarks
 * - **HTTP Method:** `PATCH`
 * - **Endpoint:** `/user/onlineoffline`
 * - **Auth:** Bearer token required.
 */
export const updateFreelancerActiveStatus = (
  payload: IFreelancerStatusRequest,
) => {
  return axios({
    method: "PATCH",
    url: `${getApiUrl()}/user/onlineoffline`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};
