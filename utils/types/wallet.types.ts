/**
 * @fileoverview Wallet and financial transaction type definitions for the
 * Ultrasooq marketplace.
 *
 * Covers the full wallet domain: wallet accounts, transactions, transfers,
 * settings, deposit/withdraw/transfer request payloads, response wrappers,
 * and constant lookup objects for transaction types and statuses.
 *
 * @module utils/types/wallet.types
 * @dependencies None (pure type definitions and const assertions).
 */

/**
 * Represents a user's wallet account.
 *
 * @description
 * Intent: Models the wallet entity holding the user's balance, frozen
 * funds, and status within a specific currency.
 *
 * Usage: Displayed on the wallet dashboard, balance widgets, and
 * checkout flows that support wallet payment.
 *
 * Data Flow: API GET /wallet -> IWalletBalanceResponse -> IWallet.
 *
 * @property id - Unique wallet identifier.
 * @property userId - Owner user's ID.
 * @property userAccountId - Optional sub-account ID if the wallet is per-account.
 * @property currencyCode - ISO 4217 currency code (e.g., "USD", "OMR").
 * @property balance - Available balance amount.
 * @property frozenBalance - Amount held/frozen (e.g., pending transactions).
 * @property status - Current wallet state.
 * @property createdAt - ISO timestamp of wallet creation.
 * @property updatedAt - ISO timestamp of last update.
 */
export interface IWallet {
  id: number;
  userId: number;
  userAccountId?: number;
  currencyCode: string;
  balance: number;
  frozenBalance: number;
  status: 'ACTIVE' | 'FROZEN' | 'SUSPENDED' | 'CLOSED';
  createdAt: string;
  updatedAt: string;
}

/**
 * Represents a single wallet transaction record.
 *
 * @description
 * Intent: Logs every financial movement in or out of a wallet, tracking
 * the before/after balance, the type of transaction, and any reference
 * to an external entity (order, transfer, etc.).
 *
 * Usage: Rendered in the wallet transaction history list.
 *
 * Data Flow: API GET /wallet/transactions -> IWalletTransaction[].
 *
 * @property id - Unique transaction identifier.
 * @property walletId - ID of the wallet this transaction belongs to.
 * @property transactionType - Category of the transaction.
 * @property amount - Transaction amount.
 * @property balanceBefore - Wallet balance before this transaction.
 * @property balanceAfter - Wallet balance after this transaction.
 * @property referenceId - Optional external reference ID (e.g., order number).
 * @property referenceType - Optional type of the referenced entity.
 * @property description - Optional human-readable description.
 * @property metadata - Optional arbitrary metadata object.
 * @property status - Processing status of the transaction.
 * @property createdAt - ISO timestamp of transaction creation.
 * @property updatedAt - ISO timestamp of last status update.
 */
export interface IWalletTransaction {
  id: number;
  walletId: number;
  transactionType: 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER_IN' | 'TRANSFER_OUT' | 'PAYMENT' | 'REFUND' | 'COMMISSION' | 'BONUS' | 'FEE';
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  referenceId?: string;
  referenceType?: 'ORDER' | 'PAYMENT' | 'TRANSFER' | 'COMMISSION' | 'REFUND' | 'BONUS';
  description?: string;
  metadata?: any;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
}

/**
 * Represents a wallet-to-wallet transfer record.
 *
 * @description
 * Intent: Tracks transfers between two wallets including the fee charged
 * and the current processing status.
 *
 * Usage: Displayed in transfer history and transfer confirmation views.
 *
 * @property id - Unique transfer identifier.
 * @property fromWalletId - Source wallet ID.
 * @property toWalletId - Destination wallet ID.
 * @property amount - Transfer amount (excluding fee).
 * @property transferFee - Fee charged for the transfer.
 * @property description - Optional transfer description/note.
 * @property status - Processing status.
 * @property createdAt - ISO timestamp of transfer initiation.
 * @property updatedAt - ISO timestamp of last status update.
 */
export interface IWalletTransfer {
  id: number;
  fromWalletId: number;
  toWalletId: number;
  amount: number;
  transferFee: number;
  description?: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
}

/**
 * Wallet settings and limit configuration for a user.
 *
 * @description
 * Intent: Stores the user's wallet preferences including auto-withdrawal
 * and spending/withdrawal limits.
 *
 * Usage: Managed from the wallet settings page.
 *
 * Data Flow: API GET/PUT /wallet/settings -> IWalletSettings.
 *
 * @property id - Unique settings record identifier.
 * @property userId - Owner user's ID.
 * @property autoWithdraw - Whether automatic withdrawal is enabled.
 * @property withdrawLimit - Per-transaction withdrawal limit.
 * @property dailyLimit - Maximum daily withdrawal/spend amount.
 * @property monthlyLimit - Maximum monthly withdrawal/spend amount.
 * @property notificationPreferences - Wallet-specific notification preferences (generic).
 * @property createdAt - ISO timestamp of settings creation.
 * @property updatedAt - ISO timestamp of last update.
 */
export interface IWalletSettings {
  id: number;
  userId: number;
  autoWithdraw: boolean;
  withdrawLimit: number;
  dailyLimit: number;
  monthlyLimit: number;
  notificationPreferences: any;
  createdAt: string;
  updatedAt: string;
}

// Request/Response types

/**
 * Request payload for depositing funds into the wallet.
 *
 * @description
 * Intent: Initiates a deposit from an external payment method into the
 * user's wallet.
 *
 * Usage: Submitted from the wallet deposit form after payment confirmation.
 *
 * Data Flow: Deposit form -> payment gateway -> mutation hook -> API POST /wallet/deposit.
 *
 * @property amount - Amount to deposit.
 * @property paymentMethod - Payment method used for the deposit.
 * @property paymentIntentId - Optional Stripe/gateway payment intent ID.
 * @property transactionId - Optional AmwalPay transaction ID.
 */
export interface IWalletDepositRequest {
  amount: number;
  paymentMethod: 'CARD' | 'BANK_TRANSFER' | 'PAYPAL' | 'STRIPE' | 'AMWALPAY';
  paymentIntentId?: string;
  transactionId?: string; // For AmwalPay transaction ID
}

/**
 * Request payload for withdrawing funds from the wallet.
 *
 * @description
 * Intent: Initiates a withdrawal from the wallet to an external
 * bank account or payment service.
 *
 * Data Flow: Withdraw form -> mutation hook -> API POST /wallet/withdraw.
 *
 * @property amount - Amount to withdraw.
 * @property bankAccountId - Optional linked bank account ID.
 * @property withdrawalMethod - Method for receiving the withdrawal.
 */
export interface IWalletWithdrawRequest {
  amount: number;
  bankAccountId?: string;
  withdrawalMethod: 'BANK_TRANSFER' | 'PAYPAL';
}

/**
 * Request payload for transferring funds to another user's wallet.
 *
 * @description
 * Intent: Initiates a wallet-to-wallet transfer to another user,
 * optionally targeting a specific sub-account.
 *
 * Data Flow: Transfer form -> mutation hook -> API POST /wallet/transfer.
 *
 * @property toUserId - Recipient user's ID.
 * @property toUserAccountId - Optional recipient sub-account ID.
 * @property amount - Transfer amount.
 * @property description - Optional transfer note/description.
 */
export interface IWalletTransferRequest {
  toUserId: number;
  toUserAccountId?: number;
  amount: number;
  description?: string;
}

/**
 * API response wrapper for wallet balance queries.
 *
 * @description
 * Intent: Standard response wrapper containing the wallet entity.
 *
 * Data Flow: API GET /wallet -> IWalletBalanceResponse.
 *
 * @property message - Human-readable response message.
 * @property status - Boolean success indicator.
 * @property data - The wallet record.
 */
export interface IWalletBalanceResponse {
  message: string;
  status: boolean;
  data: IWallet;
}

/**
 * API response wrapper for paginated wallet transaction history.
 *
 * @description
 * Intent: Returns a paginated list of wallet transactions.
 *
 * Data Flow: API GET /wallet/transactions -> IWalletTransactionsResponse.
 *
 * @property message - Human-readable response message.
 * @property status - Boolean success indicator.
 * @property data.data - Array of transaction records for the current page.
 * @property data.total - Total transaction count across all pages.
 * @property data.page - Current page number.
 * @property data.limit - Items per page.
 */
export interface IWalletTransactionsResponse {
  message: string;
  status: boolean;
  data: {
    data: IWalletTransaction[];
    total: number;
    page: number;
    limit: number;
  };
}

/**
 * API response wrapper for wallet settings.
 *
 * @description
 * Intent: Standard response wrapper containing the wallet settings.
 *
 * Data Flow: API GET /wallet/settings -> IWalletSettingsResponse.
 *
 * @property message - Human-readable response message.
 * @property status - Boolean success indicator.
 * @property data - The wallet settings record.
 */
export interface IWalletSettingsResponse {
  message: string;
  status: boolean;
  data: IWalletSettings;
}

/**
 * Constant lookup object for wallet transaction type string values.
 *
 * @description
 * Intent: Provides a type-safe, readonly mapping of all wallet transaction
 * types for use in UI labels, filters, and comparisons.
 *
 * Usage: Used in transaction list filters and display logic.
 *
 * @const
 */
export const WALLET_TRANSACTION_TYPES = {
  DEPOSIT: 'DEPOSIT',
  WITHDRAWAL: 'WITHDRAWAL',
  TRANSFER_IN: 'TRANSFER_IN',
  TRANSFER_OUT: 'TRANSFER_OUT',
  PAYMENT: 'PAYMENT',
  REFUND: 'REFUND',
  COMMISSION: 'COMMISSION',
  BONUS: 'BONUS',
  FEE: 'FEE',
} as const;

/**
 * Constant lookup object for wallet status string values.
 *
 * @description
 * Intent: Provides a type-safe, readonly mapping of all wallet statuses.
 *
 * Usage: Used in wallet status badges and conditional rendering.
 *
 * @const
 */
export const WALLET_STATUS = {
  ACTIVE: 'ACTIVE',
  FROZEN: 'FROZEN',
  SUSPENDED: 'SUSPENDED',
  CLOSED: 'CLOSED',
} as const;

/**
 * Constant lookup object for transaction processing status values.
 *
 * @description
 * Intent: Provides a type-safe, readonly mapping of transaction statuses.
 *
 * Usage: Used in transaction status badges and filtering logic.
 *
 * @const
 */
export const TRANSACTION_STATUS = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED',
} as const;
