import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import axios from "axios";
import { getCookie } from "cookies-next";
import { getApiUrl } from "@/config/api";

/**
 * Uploads a single file to the server via a presigned URL mechanism.
 *
 * @param payload - The file data as `FormData` (untyped).
 * @returns Axios promise resolving to the uploaded file metadata (e.g., presigned URL).
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/user/presignedUrlUpload`
 * - **Auth:** Bearer token required.
 * - **Content-Type:** `multipart/form-data`.
 */
export const uploadFile = (payload: any) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/user/presignedUrlUpload`,
    data: payload,
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Uploads multiple files to the server via a presigned URL mechanism.
 *
 * @param payload - The files data as `FormData` (untyped).
 * @returns Axios promise resolving to the uploaded files metadata (e.g., presigned URLs).
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/user/presignedUrlUploadMultiple`
 * - **Auth:** Bearer token required.
 * - **Content-Type:** `multipart/form-data`.
 */
export const uploadMultipleFile = (payload: any) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/user/presignedUrlUploadMultiple`,
    data: payload,
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Deletes a previously uploaded file using its presigned URL reference.
 *
 * @param payload - The file deletion data (untyped), typically containing the file key or URL.
 * @returns Axios promise resolving to the deletion confirmation.
 *
 * @remarks
 * - **HTTP Method:** `DELETE`
 * - **Endpoint:** `/user/presignedUrlDelete`
 * - **Auth:** Bearer token required.
 */
export const deleteFile = (payload: any) => {
  return axios({
    method: "DELETE",
    url: `${getApiUrl()}/user/presignedUrlDelete`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};
