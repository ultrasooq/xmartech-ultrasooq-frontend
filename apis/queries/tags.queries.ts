/**
 * @fileoverview TanStack React Query hooks for product tags.
 *
 * Provides a query to fetch all tags and a mutation to create a new tag.
 *
 * @module queries/tags
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTag, fetchTags } from "../requests/tags.requests";
import { APIResponseError } from "@/utils/types/common.types";

/**
 * Query hook that fetches all available product tags.
 *
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with the list of tags.
 *
 * @remarks
 * Query key: `["tags"]`
 * Endpoint: Delegated to `fetchTags` in tags.requests.
 */
export const useTags = (enabled = true) =>
  useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await fetchTags();
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

/**
 * Mutation hook to create a new product tag.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: `{ tagName: string }`
 * - **Response**: `{ data: any; message: string; status: boolean }`
 * - **Invalidates**: `["tags"]` on success.
 * - Endpoint: Delegated to `createTag` in tags.requests.
 */
export const useCreateTag = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { tagName: string }
  >({
    mutationFn: async (payload) => {
      const res = await createTag(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tags"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};
