"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useWalletBalance, useWalletTransactions } from "@/apis/queries/wallet.queries";
import { useWalletStore } from "@/lib/walletStore";
import WalletBalanceCard from "@/components/modules/wallet/WalletBalanceCard";
import WalletActions from "@/components/modules/wallet/WalletActions";
import TransactionHistory from "@/components/modules/wallet/TransactionHistory";
import WalletSettings from "@/components/modules/wallet/WalletSettings";
import LoaderWithMessage from "@/components/shared/LoaderWithMessage";
import { checkPermission } from "@/helpers/permission";

const WalletPage = () => {
  const t = useTranslations();
  const { user, langDir } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [page, setPage] = useState(1);
  const limit = 10;

  // Check if user has permission to access wallet
  const hasPermission = !!user;

  // Debug logging
  console.log("Wallet page - User:", user);
  console.log("Wallet page - Has permission:", hasPermission);

  const { data: walletData, isLoading: walletLoading, error: walletError } = useWalletBalance(hasPermission);
  const { data: transactionsData, isLoading: transactionsLoading } = useWalletTransactions({
    page,
    limit,
  }, hasPermission);

  const { setWallet, setTransactions } = useWalletStore();

  // Update store when data changes
  useEffect(() => {
    if (walletData?.data) {
      setWallet(walletData.data);
    }
  }, [walletData, setWallet]);

  useEffect(() => {
    if (transactionsData?.data?.data) {
      setTransactions(transactionsData.data.data);
    }
  }, [transactionsData, setTransactions]);

  // No redirect needed - access control is handled by conditional rendering

  if (!user) {
    console.log("Wallet page - No user found, showing login prompt");
    return (
      <div className="wallet_page">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="access_denied">
                <h2>{t("access_denied")}</h2>
                <p>{t("please_login_to_access_wallet")}</p>
                <button 
                  className="btn btn_primary"
                  onClick={() => router.push("/login")}
                >
                  {t("login")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!hasPermission) {
    console.log("Wallet page - No permission, showing access denied");
    return (
      <div className="wallet_page">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="access_denied">
                <h2>{t("access_denied")}</h2>
                <p>{t("please_login_to_access_wallet")}</p>
                <button 
                  className="btn btn_primary"
                  onClick={() => router.push("/login")}
                >
                  {t("login")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (walletLoading) {
    return (
      <div className="wallet_page">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <LoaderWithMessage message={t("loading_wallet")} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (walletError) {
    console.error("Wallet error:", walletError);
    return (
      <div className="wallet_page">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="error_state">
                <h2>{t("error_loading_wallet")}</h2>
                <p>{t("unable_to_load_wallet_data")}</p>
                <p>Error: {walletError?.message || "Unknown error"}</p>
                <button 
                  className="btn btn_primary"
                  onClick={() => window.location.reload()}
                >
                  {t("retry")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  console.log("Wallet page - Rendering wallet content");
  return (
    <div className="body-content-s1">
      <div className="wallet_page">
        <div className="container m-auto px-3">
          <div className="wallet_header">
            <h1>{t("my_wallet")}</h1>
            <p>{t("manage_your_funds_and_transactions")}</p>
          </div>

          <div className="wallet_main_content">
            <div className="wallet_primary">
            <WalletBalanceCard 
              wallet={walletData?.data} 
              loading={walletLoading} 
            />
            
            <WalletActions wallet={walletData?.data} />
            
            <div className="wallet_tabs">
              <button
                className={`tab_button ${activeTab === "overview" ? "active" : ""}`}
                onClick={() => setActiveTab("overview")}
              >
                <span className="tab_icon">📊</span>
                {t("overview")}
              </button>
              <button
                className={`tab_button ${activeTab === "transactions" ? "active" : ""}`}
                onClick={() => setActiveTab("transactions")}
              >
                <span className="tab_icon">📋</span>
                {t("transactions")}
              </button>
              <button
                className={`tab_button ${activeTab === "settings" ? "active" : ""}`}
                onClick={() => setActiveTab("settings")}
              >
                <span className="tab_icon">⚙️</span>
                {t("settings")}
              </button>
            </div>

            <div className="tab_content">
              {activeTab === "overview" && (
                <div className="wallet_overview">
                  <div className="overview_stats">
                    <div className="stat_card">
                      <div className="stat_icon">💰</div>
                      <div className="stat_content">
                        <h4>{t("total_balance")}</h4>
                        <p className="stat_value">
                          {walletData?.data?.balance ? Number(walletData.data.balance).toFixed(2) : "0.00"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="stat_card">
                      <div className="stat_icon">🔒</div>
                      <div className="stat_content">
                        <h4>{t("frozen_balance")}</h4>
                        <p className="stat_value">
                          {walletData?.data?.frozenBalance ? Number(walletData.data.frozenBalance).toFixed(2) : "0.00"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="stat_card">
                      <div className="stat_icon">✅</div>
                      <div className="stat_content">
                        <h4>{t("available_balance")}</h4>
                        <p className="stat_value">
                          {(Number(walletData?.data?.balance || 0) - Number(walletData?.data?.frozenBalance || 0)).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="recent_activity">
                    <h3>{t("recent_activity")}</h3>
                    <TransactionHistory
                      transactions={transactionsData?.data?.data?.slice(0, 5) || []}
                      loading={transactionsLoading}
                    />
                  </div>
                </div>
              )}
              
              {activeTab === "transactions" && (
                <TransactionHistory
                  transactions={transactionsData?.data?.data || []}
                  loading={transactionsLoading}
                  pagination={{
                    page,
                    setPage,
                    total: transactionsData?.data?.total || 0,
                    limit,
                  }}
                />
              )}
              
              {activeTab === "settings" && (
                <WalletSettings />
              )}
            </div>
            </div>

            <div className="wallet_sidebar">
              <div className="sidebar_card">
                <h4>{t("quick_actions")}</h4>
                <div className="quick_actions">
                  <button 
                    className="quick_action_btn"
                    onClick={() => setActiveTab("transactions")}
                  >
                    <span className="action_icon">📋</span>
                    {t("view_transactions")}
                  </button>
                  
                  <button 
                    className="quick_action_btn"
                    onClick={() => setActiveTab("settings")}
                  >
                    <span className="action_icon">⚙️</span>
                    {t("wallet_settings")}
                  </button>
                </div>
              </div>

              <div className="sidebar_card">
                <h4>{t("wallet_info")}</h4>
                <div className="wallet_info">
                  <div className="info_item">
                    <span className="info_label">{t("wallet_id")}</span>
                    <span className="info_value">#{walletData?.data?.id || "N/A"}</span>
                  </div>
                  
                  <div className="info_item">
                    <span className="info_label">{t("status")}</span>
                    <span className={`info_value status ${walletData?.data?.status?.toLowerCase() || 'inactive'}`}>
                      {walletData?.data?.status || "INACTIVE"}
                    </span>
                  </div>
                  
                  <div className="info_item">
                    <span className="info_label">{t("currency")}</span>
                    <span className="info_value">{walletData?.data?.currencyCode || "USD"}</span>
                  </div>
                  
                  <div className="info_item">
                    <span className="info_label">{t("created")}</span>
                    <span className="info_value">
                      {walletData?.data?.createdAt ? 
                        new Date(walletData.data.createdAt).toLocaleDateString() : 
                        "N/A"
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
