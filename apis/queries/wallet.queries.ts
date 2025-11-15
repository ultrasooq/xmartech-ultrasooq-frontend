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
} from "../requests/wallet.requests";

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
  });

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
  });

export const useWalletTransactionById = (transactionId: number, enabled = true) =>
  useQuery({
    queryKey: ["wallet", "transaction", transactionId],
    queryFn: async () => {
      const res = await fetchWalletTransactionById(transactionId);
      return res.data;
    },
    enabled: enabled && !!transactionId,
  });

export const useWalletSettings = (enabled = true) =>
  useQuery({
    queryKey: ["wallet", "settings"],
    queryFn: async () => {
      const res = await fetchWalletSettings();
      return res.data;
    },
    enabled,
  });

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

// Admin queries
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
