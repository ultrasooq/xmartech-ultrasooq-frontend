/**
 * @fileoverview TanStack React Query hooks for the wallet system.
 *
 * Provides hooks for wallet balance, transactions, deposits,
 * withdrawals, transfers, wallet settings, AmwalPay wallet
 * configuration and verification, and admin-level wallet management.
 *
 * @module queries/wallet
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { APIResponseError } from "@/utils/types/common.types";
import {
  fetchWalletBalance,
  depositToWallet,
  withdrawFromWallet,
  transferToUser,
  fetchWalletTransactions,
  fetchWalletTransactionById,
  fetchWalletSettings,
  updateWalletSettings,
  fetchAllWallets,
  updateWalletStatus,
  fetchAllWalletTransactions,
  createAmwalPayWalletConfig,
  verifyAmwalPayWalletPayment,
} from "../requests/wallet.requests";

/**
 * Query hook that fetches the authenticated user's wallet balance.
 * Retries on 500 errors (wallet may not be created yet) with
 * exponential backoff.
 *
 * @param enabled - Whether the query should execute. Defaults to `true`.
 *
 * @remarks
 * - Query key: `["wallet", "balance"]`
 * - **refetchInterval**: 30 000 ms.
 * - **staleTime**: 10 000 ms.
 * - **retry**: Up to 3 times on 500 or network errors.
 * - Endpoint: Delegated to `fetchWalletBalance` in wallet.requests.
 */
export const useWalletBalance = (enabled = true) =>
  useQuery({
    queryKey: ["wallet", "balance"],
    queryFn: async () => {
      const res = await fetchWalletBalance();
      return res.data;
    },
    enabled,
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 10000, // Consider data stale after 10 seconds
    retry: (failureCount, error: any) => {
      // Retry up to 3 times for 500 errors (wallet might not be created yet)
      if (failureCount < 3) {
        // Check if it's a 500 error (server error - wallet might not exist yet)
        if (error?.response?.status === 500) {
          return true;
        }
        // Also retry network errors
        if (!error?.response) {
          return true;
        }
      }
      return false;
    },
    retryDelay: (attemptIndex) => {
      // Exponential backoff: 1s, 2s, 4s
      return Math.min(1000 * Math.pow(2, attemptIndex), 4000);
    },
  });

/**
 * Query hook that fetches paginated wallet transactions with optional
 * type and date-range filters. Retries on 500 errors.
 *
 * @remarks
 * - Query key: `["wallet", "transactions", payload]`
 * - **refetchInterval**: 30 000 ms.
 * - **staleTime**: 10 000 ms.
 * - Endpoint: Delegated to `fetchWalletTransactions` in wallet.requests.
 */
export const useWalletTransactions = (
  payload: {
    page: number;
    limit: number;
    transactionType?: string;
    startDate?: string;
    endDate?: string;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["wallet", "transactions", payload],
    queryFn: async () => {
      const res = await fetchWalletTransactions(payload);
      return res.data;
    },
    enabled,
    refetchInterval: 30000, // Refetch every 30 seconds to see new transactions
    staleTime: 10000, // Consider data stale after 10 seconds
    retry: (failureCount, error: any) => {
      // Retry up to 3 times for 500 errors
      if (failureCount < 3) {
        if (error?.response?.status === 500) {
          return true;
        }
        if (!error?.response) {
          return true;
        }
      }
      return false;
    },
    retryDelay: (attemptIndex) => {
      // Exponential backoff: 1s, 2s, 4s
      return Math.min(1000 * Math.pow(2, attemptIndex), 4000);
    },
  });

/**
 * Query hook that fetches a single wallet transaction by ID.
 *
 * @remarks
 * Query key: `["wallet", "transaction", transactionId]`
 * Endpoint: Delegated to `fetchWalletTransactionById` in wallet.requests.
 */
export const useWalletTransactionById = (transactionId: number, enabled = true) =>
  useQuery({
    queryKey: ["wallet", "transaction", transactionId],
    queryFn: async () => {
      const res = await fetchWalletTransactionById(transactionId);
      return res.data;
    },
    enabled: enabled && !!transactionId,
  });

/**
 * Query hook that fetches the user's wallet settings / preferences.
 *
 * @remarks
 * Query key: `["wallet", "settings"]`
 * Endpoint: Delegated to `fetchWalletSettings` in wallet.requests.
 */
export const useWalletSettings = (enabled = true) =>
  useQuery({
    queryKey: ["wallet", "settings"],
    queryFn: async () => {
      const res = await fetchWalletSettings();
      return res.data;
    },
    enabled,
  });

/**
 * Mutation hook to deposit funds into the user's wallet.
 *
 * @remarks
 * - **Invalidates**: `["wallet", "balance"]`, `["wallet", "transactions"]` on success.
 * - Endpoint: Delegated to `depositToWallet` in wallet.requests.
 */
export const useDepositToWallet = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: depositToWallet,
    onSuccess: () => {
      // Invalidate wallet balance and transactions
      queryClient.invalidateQueries({ queryKey: ["wallet", "balance"] });
      queryClient.invalidateQueries({ queryKey: ["wallet", "transactions"] });
    },
    onError: (error: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to create an AmwalPay configuration for wallet deposits.
 *
 * @remarks
 * - Endpoint: Delegated to `createAmwalPayWalletConfig` in wallet.requests.
 */
export const useCreateAmwalPayWalletConfig = () => {
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    {}
  >({
    mutationFn: async (payload) => {
      const res = await createAmwalPayWalletConfig(payload);
      return res.data;
    },
    onSuccess: () => {
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to verify an AmwalPay wallet deposit payment.
 *
 * @remarks
 * - **Invalidates**: `["wallet", "balance"]`, `["wallet", "transactions"]` on success.
 * - Endpoint: Delegated to `verifyAmwalPayWalletPayment` in wallet.requests.
 */
export const useVerifyAmwalPayWalletPayment = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    {}
  >({
    mutationFn: async (payload) => {
      const res = await verifyAmwalPayWalletPayment(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallet", "balance"] });
      queryClient.invalidateQueries({ queryKey: ["wallet", "transactions"] });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to withdraw funds from the user's wallet.
 *
 * @remarks
 * - **Invalidates**: `["wallet", "balance"]`, `["wallet", "transactions"]` on success.
 * - Endpoint: Delegated to `withdrawFromWallet` in wallet.requests.
 */
export const useWithdrawFromWallet = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: withdrawFromWallet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallet", "balance"] });
      queryClient.invalidateQueries({ queryKey: ["wallet", "transactions"] });
    },
    onError: (error: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to transfer funds from the current user's wallet
 * to another user's wallet.
 *
 * @remarks
 * - **Invalidates**: `["wallet", "balance"]`, `["wallet", "transactions"]` on success.
 * - Endpoint: Delegated to `transferToUser` in wallet.requests.
 */
export const useTransferToUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: transferToUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallet", "balance"] });
      queryClient.invalidateQueries({ queryKey: ["wallet", "transactions"] });
    },
    onError: (error: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to update the user's wallet settings / preferences.
 *
 * @remarks
 * - **Invalidates**: `["wallet", "settings"]` on success.
 * - Endpoint: Delegated to `updateWalletSettings` in wallet.requests.
 */
export const useUpdateWalletSettings = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateWalletSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallet", "settings"] });
    },
    onError: (error: APIResponseError) => {
    },
  });
};

/**
 * Query hook (admin) that fetches all wallets with pagination and
 * optional user/status filters.
 *
 * @remarks
 * Query key: `["admin", "wallets", payload]`
 * Endpoint: Delegated to `fetchAllWallets` in wallet.requests.
 */
export const useAllWallets = (
  payload: {
    page: number;
    limit: number;
    userId?: number;
    status?: string;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["admin", "wallets", payload],
    queryFn: async () => {
      const res = await fetchAllWallets(payload);
      return res.data;
    },
    enabled,
  });

/**
 * Mutation hook (admin) to update a wallet's status (e.g., active, suspended).
 *
 * @remarks
 * - **Payload**: `{ walletId: number; status: string }`
 * - **Invalidates**: `["admin", "wallets"]`, `["wallet", "balance"]` on success.
 * - Endpoint: Delegated to `updateWalletStatus` in wallet.requests.
 */
export const useUpdateWalletStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ walletId, status }: { walletId: number; status: string }) =>
      updateWalletStatus(walletId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "wallets"] });
      queryClient.invalidateQueries({ queryKey: ["wallet", "balance"] });
    },
    onError: (error: APIResponseError) => {
    },
  });
};

/**
 * Query hook (admin) that fetches all wallet transactions across
 * all users with pagination and filters.
 *
 * @remarks
 * Query key: `["admin", "transactions", payload]`
 * Endpoint: Delegated to `fetchAllWalletTransactions` in wallet.requests.
 */
export const useAllWalletTransactions = (
  payload: {
    page: number;
    limit: number;
    userId?: number;
    transactionType?: string;
    startDate?: string;
    endDate?: string;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["admin", "transactions", payload],
    queryFn: async () => {
      const res = await fetchAllWalletTransactions(payload);
      return res.data;
    },
    enabled,
  });
