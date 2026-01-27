/**
 * @fileoverview TanStack React Query mutation hooks for file upload
 * and deletion.
 *
 * Provides hooks to upload a single file, upload multiple files, and
 * delete a file by its storage key. These are fire-and-forget
 * mutations -- they do not invalidate any query caches.
 *
 * @module queries/upload
 */

import { APIResponseError } from "@/utils/types/common.types";
import { IUploadFile } from "@/utils/types/user.types";
import { useMutation } from "@tanstack/react-query";
import {
  deleteFile,
  uploadFile,
  uploadMultipleFile,
} from "../requests/upload.requests";

/**
 * Mutation hook to upload a single file (e.g., image, document).
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: Generic object (typically `FormData`).
 * - **Response**: {@link IUploadFile}
 * - Endpoint: Delegated to `uploadFile` in upload.requests.
 */
export const useUploadFile = () =>
  useMutation<IUploadFile, APIResponseError, {}>({
    mutationFn: async (payload) => {
      const res = await uploadFile(payload);
      return res.data;
    },
    onSuccess: () => {},
    onError: (err: APIResponseError) => {
    },
  });

/**
 * Mutation hook to upload multiple files in a single request.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: Generic object (typically `FormData` with multiple files).
 * - **Response**: {@link IUploadFile}
 * - Endpoint: Delegated to `uploadMultipleFile` in upload.requests.
 */
export const useUploadMultipleFile = () =>
  useMutation<IUploadFile, APIResponseError, {}>({
    mutationFn: async (payload) => {
      const res = await uploadMultipleFile(payload);
      return res.data;
    },
    onSuccess: () => {},
    onError: (err: APIResponseError) => {
    },
  });

/**
 * Mutation hook to delete a previously uploaded file by its storage key.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: `{ key: string }` -- the file's storage key / path.
 * - **Response**: {@link IUploadFile}
 * - Endpoint: Delegated to `deleteFile` in upload.requests.
 */
export const useDeleteFile = () =>
  useMutation<
    IUploadFile,
    APIResponseError,
    {
      key: string;
    }
  >({
    mutationFn: async (payload) => {
      const res = await deleteFile(payload);
      return res.data;
    },
    onSuccess: () => {},
    onError: (err: APIResponseError) => {
    },
  });
