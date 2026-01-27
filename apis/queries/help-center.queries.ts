/**
 * @fileoverview TanStack React Query hooks for the help center module.
 *
 * Provides a query hook to fetch paginated help center queries and a
 * mutation hook to submit a new support query.
 *
 * @module queries/help-center
 */

import { APIResponseError } from "@/utils/types/common.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchHelpCenterQueries, submitQuery } from "../requests/help-center.requests";

/**
 * Query hook that fetches the authenticated user's help center queries
 * with pagination.
 *
 * @param payload - Pagination parameters.
 * @param payload.page - Page number (1-based).
 * @param payload.limit - Records per page.
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with paginated help center queries.
 *
 * @remarks
 * Query key: `["help_center_queries", payload]`
 * Endpoint: Delegated to `fetchHelpCenterQueries` in help-center.requests.
 */
export const useHelpCenterQueries = (
  payload: {
    page: number;
    limit: number;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["help_center_queries", payload],
    queryFn: async () => {
      const res = await fetchHelpCenterQueries(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

/**
 * Mutation hook to submit a new help center / support query.
 *
 * @returns A `useMutation` result.
 *
 * @remarks
 * - **Payload**: `{ userId?: number; email: string; query: string }`
 * - **Response**: `{ data: any; message: string; status: boolean }`
 * - **Invalidates**: `["help_center_queries"]` on success.
 * - Endpoint: Delegated to `submitQuery` in help-center.requests.
 */
export const useSubmitQuery = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { userId?: number; email: string; query: string; }
  >({
    mutationFn: async (payload) => {
      const res = await submitQuery(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["help_center_queries"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
}
