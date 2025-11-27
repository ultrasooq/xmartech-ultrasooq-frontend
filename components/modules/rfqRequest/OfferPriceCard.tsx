import React, { useEffect, useState } from "react";
import Image from "next/image";
import moment from "moment";
import PlaceholderImage from "@/public/images/product-placeholder.png";
import { capitalizeWord, formatDate, formatPrice } from "@/utils/helper";
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";

type OfferPriceCardProps = {
  offerPrice: string;
  note: string;
  quantity: number;
  productType?: string;
  address: string;
  deliveryDate: string;
  productImage: string;
  productName: string;
  productId: number;
  onRequestPrice: (productId: number, requestedPrice: number) => void;
  priceRequest: any;
  offerPriceFrom?: number;
  offerPriceTo?: number;
  isBuyer?: boolean;
  hasFirstVendorApproval?: boolean;
};

const OfferPriceCard: React.FC<OfferPriceCardProps> = ({
  offerPrice,
  note,
  quantity,
  productType,
  address,
  deliveryDate,
  productImage,
  productName,
  productId,
  onRequestPrice,
  priceRequest,
  offerPriceFrom,
  offerPriceTo,
  isBuyer = false,
  hasFirstVendorApproval = false,
}) => {
  const t = useTranslations();
  const { currency, langDir } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedOfferPrice, setEditedOfferPrice] = useState("");

  useEffect(() => {
    setEditedOfferPrice(offerPrice);
  }, [offerPrice, priceRequest]);

  // Exit edit mode if price gets approved while editing, but only if buyer hasn't received first vendor approval
  // After first approval, both parties can continue editing even if current price is approved
  useEffect(() => {
    if (priceRequest?.status === "APPROVED" && isEditing && isBuyer && !hasFirstVendorApproval) {
      setIsEditing(false);
    }
  }, [priceRequest?.status, isEditing, isBuyer, hasFirstVendorApproval]);

  // Check if buyer can edit: only after first vendor approval
  const canBuyerEdit = !isBuyer || hasFirstVendorApproval;
  
  // After first vendor approval, both parties can edit even if current price is approved
  // This allows continued negotiation after the first approval
  // Only disable editing if buyer hasn't received first vendor approval yet
  const isEditDisabled = isBuyer && !hasFirstVendorApproval;

  const handleEditClick = () => {
    if (!isEditDisabled) {
      setIsEditing(true);
    }
  };

  const handleSaveClick = () => {
    if (!isEditDisabled) {
      setIsEditing(false);
      onRequestPrice(productId, parseInt(editedOfferPrice));
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedOfferPrice(offerPrice);
  };

  return (
    <div className="w-[700px] border-b border-solid border-gray-300 p-4 md:w-full">
      <div className="flex w-full">
        <div className="w-[20%] text-xs font-normal text-gray-500">
          <div className="flex w-full flex-wrap">
            <div className="border-color-[#DBDBDB] relative h-[48px] w-[48px] border border-solid p-2">
              <Image
                src={productImage || PlaceholderImage}
                alt="preview"
                fill
              />
            </div>
            <div className="font-nromal flex w-[calc(100%-3rem)] items-center justify-start pl-3 text-xs text-black">
              {productName || "-"}
            </div>
          </div>
        </div>
        <div className="w-[12%] px-1.5 py-2 text-xs font-normal text-black md:px-1.5 md:py-3">
          {productType === "SAME" ? (
            <div className="flex flex-col" dir={langDir}>
              <span className="font-semibold text-blue-600" translate="no">
                {t("same_product")}
              </span>
              <span className="text-[10px] text-gray-500" translate="no">
                {t("same_product_required")}
              </span>
            </div>
          ) : productType === "SIMILAR" ? (
            <div className="flex flex-col" dir={langDir}>
              <span className="font-semibold text-green-600" translate="no">
                {t("similar_product")}
              </span>
              <span className="text-[10px] text-gray-500" translate="no">
                {t("similar_products_allowed")}
              </span>
            </div>
          ) : (
            "-"
          )}
        </div>
        <div className="w-[13%] px-1.5 py-2 text-xs font-normal text-black md:px-1.5 md:py-3">
          {formatDate(deliveryDate) || "-"}
        </div>
        <div className="w-[10%] px-1.5 py-2 text-xs font-normal text-black md:px-1.5 md:py-3">
          -
        </div>
        <div className="w-[13%] px-1.5 py-2 text-xs font-normal text-black md:px-1.5 md:py-3">
          {quantity}
        </div>
        <div className="w-[12%] px-1.5 py-2 text-xs font-normal text-black md:px-1.5 md:py-3">
          {isEditing && !isEditDisabled ? (
            <div className="w-full">
              <input
                value={editedOfferPrice}
                onChange={(e) => setEditedOfferPrice(e.target.value)}
                className="w-full rounded border p-1"
                type="number"
                disabled={isEditDisabled}
              />
              <div className="mt-1 flex gap-1">
                <button
                  onClick={handleSaveClick}
                  disabled={isEditDisabled}
                  className="text-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                  translate="no"
                >
                  {t("save")}
                </button>
                <button
                  onClick={handleCancelClick}
                  className="text-red-500"
                  translate="no"
                >
                  {t("cancel")}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              {/* Show budget range if available */}
              {offerPriceFrom && offerPriceTo && offerPriceFrom > 0 && offerPriceTo > 0 && (
                <div className="text-xs mb-2">
                  <div className="text-gray-600 mb-1" translate="no">
                    {t("budget")}:
                  </div>
                  <div className="font-semibold text-green-600">
                    {currency.symbol}{offerPriceFrom} - {currency.symbol}{offerPriceTo}
                  </div>
                  <div className="mt-1 text-gray-500 text-[10px]" translate="no">
                    {t("customer_budget_range")}
                  </div>
                </div>
              )}
              {/* Always show offer price and edit button (unless approved or buyer before first approval) */}
              <div className="flex flex-col">
                <div>
                  {editedOfferPrice ? `${currency.symbol}${editedOfferPrice}` : "-"}
                </div>
                {!isEditDisabled && (
                  <button
                    onClick={handleEditClick}
                    className="mt-1 text-blue-500 text-xs"
                    translate="no"
                  >
                    {t("edit")}
                  </button>
                )}
                {priceRequest?.status === "APPROVED" && (
                  <span className="mt-1 text-xs text-gray-500" translate="no">
                    ({t("approved")})
                  </span>
                )}
                {isBuyer && !hasFirstVendorApproval && (
                  <span className="mt-1 text-xs text-gray-500" translate="no">
                    {t("waiting_for_vendor_offer") || "Waiting for vendor offer"}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="w-[20%] px-1.5 py-2 text-xs font-normal text-black md:px-1.5 md:py-3">
          {address || "-"}
        </div>
      </div>
      {priceRequest?.status === "PENDING" ? (
        <div className="mt-3 flex w-full flex-wrap rounded-lg border border-solid border-gray-300 p-4">
          <p className="mb-2 text-sm font-normal text-gray-500">
            <span translate="no">{t("requested_offer_price")}:</span>
            <span className="mx-7">
              <span translate="no">{t("requested_price")}:</span>&nbsp;{" "}
              {formatPrice(priceRequest?.requestedPrice, currency.symbol)}
            </span>
            <span className="mr-7">
              <span translate="no">{t("status")}:</span>{" "}
              {capitalizeWord(priceRequest?.status)}
            </span>
            <span>
              <span translate="no">{t("date")}:</span>{" "}
              {moment(priceRequest?.updatedAt).format("YYYY-MM-DD HH:mm A")}
            </span>
          </p>
        </div>
      ) : null}
      <div
        className="mt-3 flex w-full flex-wrap rounded-lg border border-solid border-gray-300 p-4"
        dir={langDir}
      >
        <span className="mb-2 text-sm font-normal text-gray-500" translate="no">
          {t("vendor_note")}:
        </span>
        <p className="text-sm font-normal text-black"> {note || "-"}</p>
      </div>
    </div>
  );
};

export default OfferPriceCard;
