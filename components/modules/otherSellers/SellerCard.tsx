import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { useVendorBusinessCategories } from "@/hooks/useVendorBusinessCategories";
import { checkCategoryConnection } from "@/utils/categoryConnection";
import { useCategory } from "@/apis/queries/category.queries";
import { useCurrentAccount } from "@/apis/queries/auth.queries";

/**
 * Props for the {@link SellerCard} component.
 *
 * @property productId            - ID of the product being sold.
 * @property sellerName           - Display name of the seller.
 * @property offerPrice           - Legacy offer price field (string).
 * @property productPrice         - Legacy product price field (string).
 * @property onAdd                - Callback for the "Add to Cart" action.
 * @property onToCheckout         - Callback for the "Buy Now" action.
 * @property productProductPrice  - Actual numeric price string used for
 *   discount calculation.
 * @property consumerDiscount     - Percentage or flat discount for consumers.
 * @property consumerDiscountType - `"PERCENTAGE"` or `"FLAT"`.
 * @property vendorDiscount       - Percentage or flat discount for vendors.
 * @property vendorDiscountType   - `"PERCENTAGE"` or `"FLAT"`.
 * @property askForPrice          - `"true"` when price is hidden and the
 *   buyer must contact the seller.
 * @property askForStock          - `"true"` when stock is hidden.
 * @property deliveryAfter        - Number of days until delivery.
 * @property productLocation      - Location string for the product.
 * @property sellerId             - User ID of the seller (used for profile link).
 * @property soldByTradeRole      - Seller's trade role (`"COMPANY"` or
 *   `"FREELANCER"`) for profile URL routing.
 * @property onChooseSeller       - Callback invoked when "Choose Seller" is clicked.
 * @property categoryId           - Product's category ID for discount matching.
 * @property categoryLocation     - Comma-separated category location string.
 * @property consumerType         - Target consumer audience of the product price.
 */
type SellerCardProps = {
  productId: number;
  sellerName: string;
  offerPrice: string;
  productPrice: string;
  onAdd: () => void;
  onToCheckout: () => void;
  productProductPrice?: string;
  consumerDiscount?: number;
  consumerDiscountType?: string;
  vendorDiscount?: number;
  vendorDiscountType?: string;
  askForPrice?: string;
  askForStock?: string;
  deliveryAfter?: number;
  productLocation?: string;
  sellerId?: number;
  soldByTradeRole?: string;
  onChooseSeller?: () => void;
  categoryId?: number;
  categoryLocation?: string;
  consumerType?: "CONSUMER" | "VENDORS" | "EVERYONE";
};

/**
 * Displays a single seller's offering for a product on the product
 * detail page's "Other Sellers" section.
 *
 * Layout is a three-column grid showing: seller info (with profile link
 * and product location), discounted price (calculated via the shared
 * discount logic), and delivery estimate.
 *
 * Below the grid are action buttons:
 * - "Choose Seller" -- always visible.
 * - "Add to Cart" and "Buy Now" -- shown when `askForPrice` is not `"true"`.
 * - "Message" -- shown when the price is hidden and contact is required.
 *
 * Discount calculation follows the marketplace discount matrix:
 * - Vendor with matching category gets vendor discount.
 * - Vendor with non-matching category + EVERYONE consumer type gets
 *   consumer discount.
 * - Buyer always gets consumer discount.
 *
 * @param props - {@link SellerCardProps}
 * @returns A bordered section element with seller offer details.
 */
const SellerCard: React.FC<SellerCardProps> = ({
  productId,
  sellerName,
  offerPrice,
  productPrice,
  onAdd,
  onToCheckout,
  productProductPrice,
  consumerDiscount,
  consumerDiscountType,
  vendorDiscount,
  vendorDiscountType,
  askForPrice,
  askForStock,
  deliveryAfter,
  productLocation,
  sellerId,
  soldByTradeRole,
  onChooseSeller,
  categoryId,
  categoryLocation,
  consumerType,
}) => {
  const t = useTranslations();
  const { user, langDir, currency } = useAuth();
  const currentAccount = useCurrentAccount();
  const vendorBusinessCategoryIds = useVendorBusinessCategories();

  // Get the current account's trade role (for multi-account system)
  const currentTradeRole = currentAccount?.data?.data?.account?.tradeRole || user?.tradeRole;
  
  // Fetch product category data to get connections (only if vendor and categoryId exists)
  const productCategoryQuery = useCategory(
    categoryId?.toString(),
    !!(currentTradeRole && currentTradeRole !== "BUYER" && categoryId)
  );
  
  const categoryConnections = productCategoryQuery?.data?.data?.category_categoryIdDetail || [];
  
  /**
   * Computes the final display price after applying the applicable
   * discount based on the current user's trade role and category match
   * against the vendor's business categories.
   *
   * @returns The discounted price as a number rounded to two decimals.
   */
  const calculateDiscountedPrice = () => {
    const price = productProductPrice ? Number(productProductPrice) : 0;
    const productConsumerType = consumerType || "CONSUMER";
    
    // Check if vendor business category matches product category
    const isCategoryMatch = checkCategoryConnection(
      vendorBusinessCategoryIds,
      categoryId || 0,
      categoryLocation,
      categoryConnections
    );
    
    let discount = consumerDiscount || 0;
    let discountType = consumerDiscountType;
    
    // Apply discount logic based on your table
    if (currentTradeRole && currentTradeRole !== "BUYER") {
      // VENDOR (V) or EVERYONE (E) as vendor
      if (isCategoryMatch) {
        // Same relation - Vendor gets vendor discount
        if (vendorDiscount && vendorDiscount > 0) {
          discount = vendorDiscount;
          discountType = vendorDiscountType;
        } else {
          // No vendor discount available, no discount
          discount = 0;
        }
      } else {
        // Not same relation
        if (productConsumerType === "EVERYONE") {
          // E + Not Same relation → Consumer Discount
          discount = consumerDiscount || 0;
          discountType = consumerDiscountType;
        } else {
          // V + Not Same relation → No Discount
          discount = 0;
        }
      }
    } else {
      // CONSUMER (C) - Always gets consumer discount
      discount = consumerDiscount || 0;
      discountType = consumerDiscountType;
    }
    
    // Calculate final price
    if (discount > 0 && discountType) {
      if (discountType === "PERCENTAGE") {
        return Number((price - (price * discount) / 100).toFixed(2));
      } else if (discountType === "FLAT") {
        return Number((price - discount).toFixed(2));
      }
    }
    
    return price;
  };

  return (
    <div className="w-full">
      <div className="grid w-full grid-cols-3 border-b border-solid border-gray-300">
        <div>
          <div className="h-[57px] w-full border-b border-solid border-gray-300 px-3 py-4">
            <span dir={langDir} translate="no">{t("seller")}</span>
          </div>
          <div className="w-full px-3 py-4">
            <Link
              href={
                soldByTradeRole === "COMPANY"
                  ? `/company-profile-details?userId=${sellerId}`
                  : soldByTradeRole === "FREELANCER"
                    ? `/freelancer-profile-details?userId=${sellerId}`
                    : "#"
              }
            >
              <h4 className="text-base font-medium text-dark-orange">
                {sellerName}
              </h4>
            </Link>
            <ul>
              <li className="relative my-2 pl-4 text-sm font-normal before:absolute before:left-0 before:top-[7px] before:h-[6px] before:w-[6px] before:rounded before:bg-slate-400 before:content-['']" dir={langDir} translate="no">
                {t("product_location")}: {productLocation || "N/A"}
              </li>
            </ul>
          </div>
        </div>
        {askForPrice !== "true" ? (
          <div>
            <div className="h-[57px] w-full border-b border-solid border-gray-300 px-3 py-4">
              <span dir={langDir} translate="no">{t("price")}</span>
            </div>
            <div className="w-full px-3 py-4">
              <div className="flex w-full items-end">
                <span className="text-md font-medium text-black">
                  {calculateDiscountedPrice
                    ? `${currency.symbol}${calculateDiscountedPrice()}`
                    : `${currency.symbol}${0}`}
                </span>
                <span className="ml-2 text-sm font-medium text-light-gray line-through">
                  {productProductPrice ? `${currency.symbol}${productProductPrice}` : `${currency.symbol}${0}`}
                </span>
              </div>
            </div>
          </div>
        ) : null}
        <div>
          <div className="h-[57px] w-full border-b border-solid border-gray-300 px-3 py-4">
            <span>Delivery</span>
          </div>
          <div className="w-full px-3 py-4">
            <div className="my-2 flex w-full text-sm font-medium">
              {deliveryAfter ? (
                <p dir={langDir} translate="no">{t("delivery_days_after").replace("{after}", String(deliveryAfter))}</p>
              ) : (
                <p dir={langDir} translate="no">{t("no_delivery_days")}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border-b border-solid border-gray-300 p-3">
        <div className="flex w-full items-center justify-between gap-2 text-sm font-medium">
          <button
            onClick={onChooseSeller}
            className="whitespace-nowrap rounded-sm bg-gray-500 px-6 py-3 text-sm font-bold capitalize text-white"
            dir={langDir}
            translate="no"
          >
            {t("choose_seller")}
          </button>

          {askForPrice !== "true" ? (
            <div className="flex w-full items-center justify-end gap-2 text-sm font-medium">
              <button
                onClick={onAdd}
                className="inline-block rounded-sm bg-dark-orange px-6 py-3 text-sm font-bold capitalize text-white"
                dir={langDir}
                translate="no"
              >
                {t("add_to_cart").toUpperCase()}
              </button>
              <button
                onClick={onToCheckout}
                className="inline-block rounded-sm bg-color-yellow px-6 py-3 text-sm font-bold capitalize text-white"
                dir={langDir}
                translate="no"
              >
                {t("buy_now").toUpperCase()}
              </button>
            </div>
          ) : (
            <button className="inline-block rounded-sm bg-color-yellow px-6 py-3 text-sm font-bold capitalize text-white" dir={langDir} translate="no">
              {t("message").toUpperCase()}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerCard;
