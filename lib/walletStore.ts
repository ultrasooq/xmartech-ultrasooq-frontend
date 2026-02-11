import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { IWallet, IWalletTransaction } from "@/utils/types/wallet.types";

export type WalletState = {
  wallet: IWallet | null;
  transactions: IWalletTransaction[];
  lastUpdated: string | null;
  isLoading: boolean;
  error: string | null;
};

export type WalletActions = {
  setWallet: (wallet: IWallet | null) => void;
  setTransactions: (transactions: IWalletTransaction[]) => void;
  addTransaction: (transaction: IWalletTransaction) => void;
  updateWalletBalance: (newBalance: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetWallet: () => void;
  updateLastUpdated: () => void;
};

const initialWalletState: WalletState = {
  wallet: null,
  transactions: [],
  lastUpdated: null,
  isLoading: false,
  error: null,
};

/**
 * Secure wallet store that minimizes persisted sensitive data
 * 
 * SECURITY: For production safety, we do NOT persist:
 * - Full transaction history (contains financial details, descriptions, metadata)
 * - User IDs or account IDs
 * - Transaction metadata (may contain sensitive payment info)
 * 
 * Only persists minimal balance info for UX (session-only via sessionStorage)
 * Full wallet data should be fetched from backend when needed
 */
export const useWalletStore = create<WalletState & WalletActions>()(
  persist(
    (set, get) => ({
      ...initialWalletState,
      
      setWallet: (wallet) => 
        set((state) => ({ 
          ...state, 
          wallet,
          lastUpdated: new Date().toISOString(),
          error: null 
        })),
      
      setTransactions: (transactions) => 
        set((state) => ({ 
          ...state, 
          transactions,
          lastUpdated: new Date().toISOString() 
        })),
      
      addTransaction: (transaction) => 
        set((state) => ({ 
          ...state, 
          transactions: [transaction, ...state.transactions],
          lastUpdated: new Date().toISOString() 
        })),
      
      updateWalletBalance: (newBalance) => 
        set((state) => ({ 
          ...state, 
          wallet: state.wallet ? { ...state.wallet, balance: newBalance } : null,
          lastUpdated: new Date().toISOString() 
        })),
      
      setLoading: (loading) => 
        set((state) => ({ ...state, isLoading: loading })),
      
      setError: (error) => 
        set((state) => ({ ...state, error })),
      
      resetWallet: () => 
        set(initialWalletState),
      
      updateLastUpdated: () => 
        set((state) => ({ 
          ...state, 
          lastUpdated: new Date().toISOString() 
        })),
    }),
    {
      name: "wallet-storage",
      // Use sessionStorage (cleared on browser close) for better security
      storage: createJSONStorage(() => {
        if (typeof window === "undefined") {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          } as any;
        }
        return sessionStorage;
      }),
      // Only persist minimal non-sensitive data
      partialize: (state) => ({
        // Only persist balance and status - no transaction history, no user IDs
        wallet: state.wallet
          ? {
              id: state.wallet.id,
              balance: state.wallet.balance,
              frozenBalance: state.wallet.frozenBalance,
              status: state.wallet.status,
              currencyCode: state.wallet.currencyCode,
              // Explicitly exclude: userId, userAccountId, createdAt, updatedAt
            }
          : null,
        // Do NOT persist transactions (contains sensitive financial data, descriptions, metadata)
        transactions: [],
        lastUpdated: state.lastUpdated,
      }),
    }
  )
);

// Selectors for better performance
export const useWalletBalance = () => useWalletStore((state) => state.wallet?.balance || 0);
export const useWalletStatus = () => useWalletStore((state) => state.wallet?.status || 'INACTIVE');
export const useWalletTransactions = () => useWalletStore((state) => state.transactions);
export const useWalletLoading = () => useWalletStore((state) => state.isLoading);
export const useWalletError = () => useWalletStore((state) => state.error);
