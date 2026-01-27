/**
 * @fileoverview Zustand store for wallet state management.
 *
 * Persists wallet data, transaction history, and metadata to `localStorage`
 * under the key `"wallet-storage"`. Loading and error states are intentionally
 * excluded from persistence via `partialize` so they always start fresh.
 * Only the most recent 50 transactions are persisted to keep storage lean.
 *
 * @module lib/walletStore
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IWallet, IWalletTransaction } from "@/utils/types/wallet.types";

/**
 * Shape of the wallet store state.
 *
 * @export
 * @typedef {Object} WalletState
 * @property {IWallet | null} wallet - The wallet object containing balance, status, and metadata.
 * @property {IWalletTransaction[]} transactions - List of recent wallet transactions.
 * @property {string | null} lastUpdated - ISO-8601 timestamp of the last state mutation.
 * @property {boolean} isLoading - Whether a wallet-related async operation is in progress.
 * @property {string | null} error - The most recent error message, or `null` when clear.
 */
export type WalletState = {
  wallet: IWallet | null;
  transactions: IWalletTransaction[];
  lastUpdated: string | null;
  isLoading: boolean;
  error: string | null;
};

/**
 * Actions available on the wallet store.
 *
 * @export
 * @typedef {Object} WalletActions
 * @property {(wallet: IWallet | null) => void} setWallet - Replaces the wallet object, clears errors, and updates `lastUpdated`.
 * @property {(transactions: IWalletTransaction[]) => void} setTransactions - Replaces the entire transactions array and updates `lastUpdated`.
 * @property {(transaction: IWalletTransaction) => void} addTransaction - Prepends a single transaction to the list and updates `lastUpdated`.
 * @property {(newBalance: number) => void} updateWalletBalance - Updates only the wallet balance without replacing the full object.
 * @property {(loading: boolean) => void} setLoading - Sets the loading flag.
 * @property {(error: string | null) => void} setError - Sets or clears the error message.
 * @property {() => void} resetWallet - Resets all wallet state to initial values.
 * @property {() => void} updateLastUpdated - Manually bumps the `lastUpdated` timestamp.
 */
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

/**
 * Default / empty wallet state used for initialisation and reset.
 *
 * @constant
 * @type {WalletState}
 */
const initialWalletState: WalletState = {
  wallet: null,
  transactions: [],
  lastUpdated: null,
  isLoading: false,
  error: null,
};

/**
 * Zustand store hook for wallet state.
 *
 * Uses the `persist` middleware to save essential wallet data to `localStorage`
 * under the key `"wallet-storage"`. The `partialize` option excludes transient
 * state (`isLoading`, `error`) and caps persisted transactions at 50.
 *
 * @example
 * ```ts
 * const { wallet, setWallet, addTransaction } = useWalletStore();
 * setWallet(fetchedWallet);
 * addTransaction(newTx);
 * ```
 */
export const useWalletStore = create<WalletState & WalletActions>()(
  persist(
    (set, get) => ({
      ...initialWalletState,

      /** @see WalletActions.setWallet */
      setWallet: (wallet) =>
        set((state) => ({
          ...state,
          wallet,
          lastUpdated: new Date().toISOString(),
          error: null
        })),

      /** @see WalletActions.setTransactions */
      setTransactions: (transactions) =>
        set((state) => ({
          ...state,
          transactions,
          lastUpdated: new Date().toISOString()
        })),

      /** @see WalletActions.addTransaction */
      addTransaction: (transaction) =>
        set((state) => ({
          ...state,
          transactions: [transaction, ...state.transactions],
          lastUpdated: new Date().toISOString()
        })),

      /** @see WalletActions.updateWalletBalance */
      updateWalletBalance: (newBalance) =>
        set((state) => ({
          ...state,
          wallet: state.wallet ? { ...state.wallet, balance: newBalance } : null,
          lastUpdated: new Date().toISOString()
        })),

      /** @see WalletActions.setLoading */
      setLoading: (loading) =>
        set((state) => ({ ...state, isLoading: loading })),

      /** @see WalletActions.setError */
      setError: (error) =>
        set((state) => ({ ...state, error })),

      /** @see WalletActions.resetWallet */
      resetWallet: () =>
        set(initialWalletState),

      /** @see WalletActions.updateLastUpdated */
      updateLastUpdated: () =>
        set((state) => ({
          ...state,
          lastUpdated: new Date().toISOString()
        })),
    }),
    {
      name: "wallet-storage",
      getStorage: () => localStorage,
      // Only persist essential data, not loading states
      partialize: (state) => ({
        wallet: state.wallet,
        transactions: state.transactions.slice(0, 50), // Keep only last 50 transactions
        lastUpdated: state.lastUpdated,
      }),
    }
  )
);

/**
 * Selector hook that returns only the wallet balance (defaults to `0`).
 * @returns {number} The current wallet balance.
 */
export const useWalletBalance = () => useWalletStore((state) => state.wallet?.balance || 0);

/**
 * Selector hook that returns the wallet status (defaults to `"INACTIVE"`).
 * @returns {string} The current wallet status string.
 */
export const useWalletStatus = () => useWalletStore((state) => state.wallet?.status || 'INACTIVE');

/**
 * Selector hook that returns the array of wallet transactions.
 * @returns {IWalletTransaction[]} The transaction list.
 */
export const useWalletTransactions = () => useWalletStore((state) => state.transactions);

/**
 * Selector hook that returns the wallet loading flag.
 * @returns {boolean} `true` when a wallet operation is in progress.
 */
export const useWalletLoading = () => useWalletStore((state) => state.isLoading);

/**
 * Selector hook that returns the wallet error message.
 * @returns {string | null} The current error message, or `null` when clear.
 */
export const useWalletError = () => useWalletStore((state) => state.error);
