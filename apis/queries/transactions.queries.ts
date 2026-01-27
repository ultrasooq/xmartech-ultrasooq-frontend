/**
 * @fileoverview TanStack React Query hooks for transaction history.
 *
 * Provides a paginated query hook for fetching the authenticated
 * user's transaction records.
 *
 * @module queries/transactions
 */

import { APIResponseError } from "@/utils/types/common.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchTransactions } from "../requests/transactions.requests";

/**
 * Query hook that fetches the authenticated user's transaction
 * history with pagination.
 *
 * @param payload - Pagination parameters.
 * @param payload.page - Page number (1-based).
 * @param payload.limit - Records per page.
 * @param enabled - Whether the query should execute. Defaults to `true`.
 * @returns A `useQuery` result with the paginated transaction list.
 *
 * @remarks
 * Query key: `["transactions", payload]`
 * Endpoint: Delegated to `fetchTransactions` in transactions.requests.
 */
export const useTransactions = (
    payload: {
        page: number;
        limit: number;
    },
    enabled = true,
) =>
    useQuery({
        queryKey: ["transactions", payload],
        queryFn: async () => {
            const res = await fetchTransactions(payload);
            return res.data;
        },
        enabled,
    });
