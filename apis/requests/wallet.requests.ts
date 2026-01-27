import axios from "axios";
import { getCookie } from "cookies-next";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import urlcat from "urlcat";
import { getApiUrl } from "@/config/api";
import {
  IWalletDepositRequest,
  IWalletWithdrawRequest,
  IWalletTransferRequest,
  IWalletSettings,
} from "@/utils/types/wallet.types";

/**
 * Fetches the current wallet balance for the authenticated user.
 *
 * @returns Axios promise resolving to the wallet balance data.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/wallet/balance`
 * - **Auth:** Bearer token required.
 */
export const fetchWalletBalance = () => {
  return axios({
    method: "GET",
    url: `${getApiUrl()}/wallet/balance`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Deposits funds into the authenticated user's wallet.
 *
 * @param payload - The deposit data conforming to {@link IWalletDepositRequest}.
 * @returns Axios promise resolving to the deposit confirmation.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/wallet/deposit`
 * - **Auth:** Bearer token required.
 */
export const depositToWallet = (payload: IWalletDepositRequest) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/wallet/deposit`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Withdraws funds from the authenticated user's wallet.
 *
 * @param payload - The withdrawal data conforming to {@link IWalletWithdrawRequest}.
 * @returns Axios promise resolving to the withdrawal confirmation.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/wallet/withdraw`
 * - **Auth:** Bearer token required.
 */
export const withdrawFromWallet = (payload: IWalletWithdrawRequest) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/wallet/withdraw`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Transfers funds from the authenticated user's wallet to another user.
 *
 * @param payload - The transfer data conforming to {@link IWalletTransferRequest}.
 * @returns Axios promise resolving to the transfer confirmation.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/wallet/transfer`
 * - **Auth:** Bearer token required.
 */
export const transferToUser = (payload: IWalletTransferRequest) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/wallet/transfer`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches wallet transaction history with optional filtering and pagination.
 *
 * @param payload - Query parameters.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @param payload.transactionType - Optional filter by transaction type.
 * @param payload.startDate - Optional start date filter (ISO string).
 * @param payload.endDate - Optional end date filter (ISO string).
 * @returns Axios promise resolving to the paginated list of wallet transactions.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/wallet/transactions`
 * - **Auth:** Bearer token required.
 */
export const fetchWalletTransactions = (payload: {
  page: number;
  limit: number;
  transactionType?: string;
  startDate?: string;
  endDate?: string;
}) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/wallet/transactions`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches a single wallet transaction by its ID.
 *
 * @param transactionId - The numeric transaction ID to retrieve.
 * @returns Axios promise resolving to the transaction details.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/wallet/transactions/:transactionId`
 * - **Auth:** Bearer token required.
 */
export const fetchWalletTransactionById = (transactionId: number) => {
  return axios({
    method: "GET",
    url: `${getApiUrl()}/wallet/transactions/${transactionId}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches the wallet settings/configuration for the authenticated user.
 *
 * @returns Axios promise resolving to the wallet settings.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/wallet/settings`
 * - **Auth:** Bearer token required.
 */
export const fetchWalletSettings = () => {
  return axios({
    method: "GET",
    url: `${getApiUrl()}/wallet/settings`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Updates the wallet settings/configuration for the authenticated user.
 *
 * @param payload - Partial wallet settings data conforming to `Partial<IWalletSettings>`.
 * @returns Axios promise resolving to the updated wallet settings.
 *
 * @remarks
 * - **HTTP Method:** `PUT`
 * - **Endpoint:** `/wallet/settings`
 * - **Auth:** Bearer token required.
 */
export const updateWalletSettings = (payload: Partial<IWalletSettings>) => {
  return axios({
    method: "PUT",
    url: `${getApiUrl()}/wallet/settings`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

// Admin APIs (for future use)

/**
 * Fetches all wallets in the system with optional filtering and pagination (admin only).
 *
 * @param payload - Query parameters.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @param payload.userId - Optional user ID filter.
 * @param payload.status - Optional wallet status filter.
 * @returns Axios promise resolving to the paginated list of all wallets.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/admin/wallets`
 * - **Auth:** Bearer token required (admin).
 */
export const fetchAllWallets = (payload: {
  page: number;
  limit: number;
  userId?: number;
  status?: string;
}) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/admin/wallets`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Updates the status of a specific wallet (admin only).
 *
 * @param walletId - The numeric wallet ID to update.
 * @param status - The new status string.
 * @returns Axios promise resolving to the updated wallet status.
 *
 * @remarks
 * - **HTTP Method:** `PUT`
 * - **Endpoint:** `/admin/wallets/:walletId/status`
 * - **Auth:** Bearer token required (admin).
 */
export const updateWalletStatus = (walletId: number, status: string) => {
  return axios({
    method: "PUT",
    url: `${getApiUrl()}/admin/wallets/${walletId}/status`,
    data: { status },
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Fetches all wallet transactions across the system with optional filtering and pagination (admin only).
 *
 * @param payload - Query parameters.
 * @param payload.page - The page number to retrieve.
 * @param payload.limit - The number of records per page.
 * @param payload.userId - Optional user ID filter.
 * @param payload.transactionType - Optional transaction type filter.
 * @param payload.startDate - Optional start date filter (ISO string).
 * @param payload.endDate - Optional end date filter (ISO string).
 * @returns Axios promise resolving to the paginated list of all transactions.
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `/admin/transactions`
 * - **Auth:** Bearer token required (admin).
 */
export const fetchAllWalletTransactions = (payload: {
  page: number;
  limit: number;
  userId?: number;
  transactionType?: string;
  startDate?: string;
  endDate?: string;
}) => {
  return axios({
    method: "GET",
    url: urlcat(`${getApiUrl()}/admin/transactions`, payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Creates an AmwalPay payment configuration for wallet deposits.
 *
 * @param payload - The AmwalPay wallet configuration data (untyped).
 * @returns Axios promise resolving to the AmwalPay wallet config response.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/payment/create-amwalpay-wallet-config`
 * - **Auth:** Bearer token required.
 */
export const createAmwalPayWalletConfig = (payload: any) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/payment/create-amwalpay-wallet-config`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};

/**
 * Verifies an AmwalPay wallet payment after completion.
 *
 * @param payload - The payment verification data (untyped).
 * @returns Axios promise resolving to the payment verification result.
 *
 * @remarks
 * - **HTTP Method:** `POST`
 * - **Endpoint:** `/payment/verify-amwalpay-wallet-payment`
 * - **Auth:** Bearer token required.
 */
export const verifyAmwalPayWalletPayment = (payload: any) => {
  return axios({
    method: "POST",
    url: `${getApiUrl()}/payment/verify-amwalpay-wallet-payment`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(PUREMOON_TOKEN_KEY),
    },
  });
};
