/**
 * @file Seller RFQ List Page - app/seller-rfq-list/page.tsx
 * @route /seller-rfq-list
 * @description Seller-side RFQ request listing page. Renders a grid view of all incoming
 *   RFQ requests via the SellerChat component in "grid" layout and "rfqRequests" view mode.
 *   Selecting an RFQ navigates to /seller-rfq-request?rfqId=<id>&tab=rfq for detailed
 *   interaction. Requires PERMISSION_RFQ_SELLER_REQUESTS; redirects to /home if denied.
 * @authentication Required; permission-gated via checkPermission(PERMISSION_RFQ_SELLER_REQUESTS).
 * @key_components SellerChat (grid/rfqRequests mode)
 * @data_fetching
 *   - SellerChat internally handles RFQ data fetching
 * @state_management None at page level; SellerChat manages its own state.
 */
"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import SellerChat from "@/components/modules/chat/seller/SellerChat";
import {
  PERMISSION_RFQ_SELLER_REQUESTS,
  checkPermission,
} from "@/helpers/permission";

const SellerRfqListPage = () => {
  const t = useTranslations();
  const { langDir } = useAuth();
  const router = useRouter();
  const hasPermission = checkPermission(PERMISSION_RFQ_SELLER_REQUESTS);

  useEffect(() => {
    if (!hasPermission) {
      router.push("/home");
    }
  }, [hasPermission, router]);

  if (!hasPermission) {
    return <div></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-[1600px] px-4 py-6 lg:px-6">
        {/* Grid View of RFQ Requests */}
        <SellerChat
          layoutMode="grid"
          viewMode="rfqRequests"
          onSelectRfq={(rfq, rfqGroup) => {
            // Navigate to seller-rfq-request page with selected RFQ
            router.push(`/seller-rfq-request?rfqId=${rfq.rfqQuotesId}&tab=rfq`);
          }}
        />
      </div>
    </div>
  );
};

export default SellerRfqListPage;

