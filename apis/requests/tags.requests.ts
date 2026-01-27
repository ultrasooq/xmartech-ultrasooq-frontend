import axios from "axios";
import { getCookie } from "cookies-next";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import { getApiUrl } from "@/config/api";

/**
 * Fetches all available tags in the system.
 *
 * @returns Axios promise resolving to the list of tags.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/user/viewTags`
 * - **Auth:** None required.
 */
export const fetchTags = () => {
  return axios({
    method: "GET",
    url: `${getApiUrl()}/user/viewTags`,
  });
};

/**
 * Creates a new tag in the system.
 *
 * @param payload - The tag creation data.
 * @param payload.tagName - The name of the new tag.
 * @returns Axios promise resolving to the newly created tag.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/user/createTag`
 * - **Auth:** Bearer token required.
 */
export const createTag = (payload: { tagName: string }) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/user/createTag`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};
