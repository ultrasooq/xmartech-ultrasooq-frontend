"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import TaskIcon from "@/public/images/task-icon.svg";
import Link from "next/link";
import { cn } from "@/lib/utils";
import SellerChat from "@/components/modules/chat/seller/SellerChat";
import ProductChat from "@/components/modules/chat/productChat/ProductChat";
import VendorOperations from "@/components/modules/vendorOperations/VendorOperations";
import ProductMessagesList from "@/components/modules/chat/productChat/Admin/ProductMessagesList";
import {
  PERMISSION_RFQ_SELLER_REQUESTS,
  checkPermission,
} from "@/helpers/permission";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";

const SellerRfqRequestPage = () => {
  const t = useTranslations();
  const { langDir } = useAuth();
  const router = useRouter();
  const hasPermission = checkPermission(PERMISSION_RFQ_SELLER_REQUESTS);
  const [currentTab, setCurrentTab] = useState<string>("RFQ");
  const [productId, setProductId] = useState<number | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!hasPermission) {
      router.push("/home");
      return;
    }

    const params = new URLSearchParams(document.location.search);
    let pId = params.get("product_id");
    if (pId) {
      setProductId(parseInt(pId));
      setCurrentTab("MSG");
    }
  }, []);

  if (!hasPermission) return <div></div>;

  const tabs = [
    {
      id: "RFQ",
      label: t("rfq"),
    },
    {
      id: "Vendor Operations",
      label: t("vendor_operations"),
    },
    {
      id: "Product Messages",
      label: t("product_messages") || "Product Messages",
    },
  ];

  if (productId) {
    tabs.push({
      id: "MSG",
      label: t("messages") || "Messages",
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-[1600px] px-4 py-6 lg:px-6">
        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="rounded-t-xl border-b border-gray-200 bg-white shadow-sm">
            <nav
              className="scrollbar-hide flex space-x-1 overflow-x-auto"
              dir={langDir}
              aria-label="Tabs"
            >
              {tabs.map((tab) => {
                const isActive = currentTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      if (tab.id === "Product Messages") {
                        setProductId(null);
                      }
                      setCurrentTab(tab.id);
                    }}
                    className={cn(
                      "group relative flex items-center gap-2 border-b-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-all duration-200",
                      isActive
                        ? "border-dark-orange text-dark-orange bg-orange-50/50"
                        : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900",
                    )}
                    translate="no"
                  >
                    <span className="relative z-10">{tab.label}</span>
                    {isActive && (
                      <div className="bg-dark-orange absolute right-0 bottom-0 left-0 h-0.5 rounded-t-full" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="rounded-b-xl border border-t-0 border-gray-200 bg-white shadow-sm">
          <div className="p-4 lg:p-6">
            {currentTab === "RFQ" ? (
              <SellerChat />
            ) : currentTab === "Product Messages" ? (
              <ProductMessagesList
                onSelectProduct={(productId) => {
                  setProductId(productId);
                  setCurrentTab("MSG");
                }}
              />
            ) : productId && currentTab === "MSG" ? (
              <ProductChat productId={productId} />
            ) : currentTab === "Vendor Operations" ? (
              <VendorOperations />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerRfqRequestPage;
