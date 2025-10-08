"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { IWalletTransaction } from "@/utils/types/wallet.types";
import { WALLET_TRANSACTION_TYPES, TRANSACTION_STATUS } from "@/utils/types/wallet.types";
import Pagination from "@/components/shared/Pagination";

interface TransactionHistoryProps {
  transactions: IWalletTransaction[];
  loading?: boolean;
  pagination?: {
    page: number;
    setPage: (page: number) => void;
    total: number;
    limit: number;
  };
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ 
  transactions, 
  loading = false,
  pagination 
}) => {
  const t = useTranslations();
  const { currency } = useAuth();
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "DEPOSIT":
        return "💰";
      case "WITHDRAWAL":
        return "💸";
      case "TRANSFER_IN":
        return "⬇️";
      case "TRANSFER_OUT":
        return "⬆️";
      case "PAYMENT":
        return "🛒";
      case "REFUND":
        return "↩️";
      case "COMMISSION":
        return "💼";
      case "BONUS":
        return "🎁";
      case "FEE":
        return "💳";
      default:
        return "📄";
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "DEPOSIT":
      case "TRANSFER_IN":
      case "REFUND":
      case "COMMISSION":
      case "BONUS":
        return "positive";
      case "WITHDRAWAL":
      case "TRANSFER_OUT":
      case "PAYMENT":
      case "FEE":
        return "negative";
      default:
        return "neutral";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "success";
      case "PENDING":
        return "warning";
      case "FAILED":
      case "CANCELLED":
        return "danger";
      default:
        return "neutral";
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const typeMatch = filterType === "all" || transaction.transactionType === filterType;
    const statusMatch = filterStatus === "all" || transaction.status === filterStatus;
    return typeMatch && statusMatch;
  });

  if (loading) {
    return (
      <div className="transaction_history">
        <div className="history_header">
          <h3>{t("transaction_history")}</h3>
        </div>
        <div className="loading_skeleton">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="transaction_item skeleton">
              <div className="skeleton skeleton_icon"></div>
              <div className="skeleton_content">
                <div className="skeleton skeleton_text"></div>
                <div className="skeleton skeleton_text"></div>
              </div>
              <div className="skeleton skeleton_amount"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="transaction_history">
      <div className="history_header">
        <h3>{t("transaction_history")}</h3>
        
        <div className="filters">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="filter_select"
          >
            <option value="all">{t("all_types")}</option>
            <option value="DEPOSIT">{t("deposit")}</option>
            <option value="WITHDRAWAL">{t("withdraw")}</option>
            <option value="TRANSFER_IN">{t("transfer_in")}</option>
            <option value="TRANSFER_OUT">{t("transfer_out")}</option>
            <option value="PAYMENT">{t("payment")}</option>
            <option value="REFUND">{t("refund")}</option>
            <option value="COMMISSION">{t("commission")}</option>
            <option value="BONUS">{t("bonus")}</option>
            <option value="FEE">{t("fee")}</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter_select"
          >
            <option value="all">{t("all_statuses")}</option>
            <option value="COMPLETED">{t("completed")}</option>
            <option value="PENDING">{t("pending")}</option>
            <option value="FAILED">{t("failed")}</option>
            <option value="CANCELLED">{t("cancelled")}</option>
          </select>
        </div>
      </div>

      <div className="transactions_list">
        {filteredTransactions.length === 0 ? (
          <div className="empty_state">
            <div className="empty_icon">📄</div>
            <p>{t("no_transactions_found")}</p>
          </div>
        ) : (
          filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="transaction_item">
              <div className="transaction_icon">
                <span className="icon">{getTransactionIcon(transaction.transactionType)}</span>
              </div>
              
              <div className="transaction_details">
                <div className="transaction_type">
                  {t(transaction.transactionType.toLowerCase())}
                </div>
                <div className="transaction_description">
                  {transaction.description || t("no_description")}
                </div>
                <div className="transaction_meta">
                  <span className="date">
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </span>
                  <span className="time">
                    {new Date(transaction.createdAt).toLocaleTimeString()}
                  </span>
                  {transaction.referenceId && (
                    <span className="reference">
                      #{transaction.referenceId}
                    </span>
                  )}
                </div>
              </div>

              <div className="transaction_amount">
                <div className={`amount ${getTransactionColor(transaction.transactionType)}`}>
                  {getTransactionColor(transaction.transactionType) === "positive" ? "+" : "-"}
                  {currency.symbol}{Number(transaction.amount).toFixed(2)}
                </div>
                <div className={`status ${getStatusColor(transaction.status)}`}>
                  {t(transaction.status.toLowerCase())}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {pagination && pagination.total > pagination.limit && (
        <div className="pagination_wrapper">
          <Pagination
            currentPage={pagination.page}
            totalPages={Math.ceil(pagination.total / pagination.limit)}
            onPageChange={pagination.setPage}
          />
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
