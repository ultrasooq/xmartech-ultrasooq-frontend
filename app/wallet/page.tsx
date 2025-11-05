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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2" dir={langDir} translate="no">
            {t("my_wallet")}
          </h1>
          <p className="text-gray-600" dir={langDir} translate="no">
            {t("manage_your_funds_and_transactions")}
          </p>
        </div>

        {/* Wallet Balance Card */}
        <div className="mb-8">
          <WalletBalanceCard 
            wallet={walletData?.data} 
            loading={walletLoading} 
          />
        </div>

        {/* Wallet Actions */}
        <div className="mb-8">
          <WalletActions wallet={walletData?.data} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-3">
            {/* Tabs Navigation */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-0">
                  <button
                    className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-200 ${
                      activeTab === "overview" 
                        ? "text-blue-600 bg-blue-50 border-b-2 border-blue-600" 
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveTab("overview")}
                    dir={langDir}
                    translate="no"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-lg">📊</span>
                      <span>{t("overview")}</span>
                    </div>
                  </button>
                  <button
                    className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-200 ${
                      activeTab === "transactions" 
                        ? "text-blue-600 bg-blue-50 border-b-2 border-blue-600" 
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveTab("transactions")}
                    dir={langDir}
                    translate="no"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-lg">📋</span>
                      <span>{t("transactions")}</span>
                    </div>
                  </button>
                  <button
                    className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-200 ${
                      activeTab === "settings" 
                        ? "text-blue-600 bg-blue-50 border-b-2 border-blue-600" 
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveTab("settings")}
                    dir={langDir}
                    translate="no"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-lg">⚙️</span>
                      <span>{t("settings")}</span>
                    </div>
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === "overview" && (
                  <div className="space-y-8">
                    {/* Overview Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xl">💰</span>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-green-800" dir={langDir} translate="no">
                              {t("total_balance")}
                            </h4>
                            <p className="text-2xl font-bold text-green-900">
                              {walletData?.data?.balance ? Number(walletData.data.balance).toFixed(2) : "0.00"}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xl">🔒</span>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-orange-800" dir={langDir} translate="no">
                              {t("frozen_balance")}
                            </h4>
                            <p className="text-2xl font-bold text-orange-900">
                              {walletData?.data?.frozenBalance ? Number(walletData.data.frozenBalance).toFixed(2) : "0.00"}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xl">✅</span>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-blue-800" dir={langDir} translate="no">
                              {t("available_balance")}
                            </h4>
                            <p className="text-2xl font-bold text-blue-900">
                              {(Number(walletData?.data?.balance || 0) - Number(walletData?.data?.frozenBalance || 0)).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-6" dir={langDir} translate="no">
                        {t("recent_activity")}
                      </h3>
                      <TransactionHistory
                        transactions={transactionsData?.data?.data?.slice(0, 5) || []}
                        loading={transactionsLoading}
                      />
                    </div>
                  </div>
                )}
                
                {activeTab === "transactions" && (
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
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
                  </div>
                )}
                
                {activeTab === "settings" && (
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <WalletSettings />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h4 className="text-lg font-semibold text-gray-900" dir={langDir} translate="no">
                    {t("quick_actions")}
                  </h4>
                </div>
                <div className="p-6 space-y-4">
                  <button 
                    className="w-full flex items-center space-x-3 p-4 text-left rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
                    onClick={() => setActiveTab("transactions")}
                    dir={langDir}
                    translate="no"
                  >
                    <span className="text-2xl">📋</span>
                    <span className="font-medium text-gray-700">{t("view_transactions")}</span>
                  </button>
                  
                  <button 
                    className="w-full flex items-center space-x-3 p-4 text-left rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
                    onClick={() => setActiveTab("settings")}
                    dir={langDir}
                    translate="no"
                  >
                    <span className="text-2xl">⚙️</span>
                    <span className="font-medium text-gray-700">{t("wallet_settings")}</span>
                  </button>
                </div>
              </div>

              {/* Wallet Info */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h4 className="text-lg font-semibold text-gray-900" dir={langDir} translate="no">
                    {t("wallet_info")}
                  </h4>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-600" dir={langDir} translate="no">
                      {t("wallet_id")}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      #{walletData?.data?.id || "N/A"}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-600" dir={langDir} translate="no">
                      {t("status")}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      walletData?.data?.status?.toLowerCase() === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {walletData?.data?.status || "INACTIVE"}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-600" dir={langDir} translate="no">
                      {t("currency")}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {walletData?.data?.currencyCode || "USD"}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm font-medium text-gray-600" dir={langDir} translate="no">
                      {t("created")}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
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
