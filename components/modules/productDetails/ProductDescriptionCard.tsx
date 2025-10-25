import React, { useEffect, useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import SecurePaymentIcon from "@/public/images/securePaymenticon.svg";
import SupportIcon from "@/public/images/support-24hr.svg";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import OtherSellerSection from "../trending/OtherSellerSection";
import CompactVendorInfo from "./CompactVendorInfo";
import Link from "next/link";
import MinusIcon from "@/public/images/upDownBtn-minus.svg";
import PlusIcon from "@/public/images/upDownBtn-plus.svg";
import { useTranslations } from "next-intl";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useProductVariant } from "@/apis/queries/product.queries";
import { Label } from "@/components/ui/label";
import { Select, SelectItem } from "@/components/ui/select";
import { SelectContent } from "@radix-ui/react-select";

type ProductDescriptionCardProps = {
  productId: string;
  productName: string;
  productType?: string;
  brand: string;
  productPrice: string;
  offerPrice: string;
  skuNo: string;
  productTags: any[];
  category: string;
  productShortDescription: any[];
  productQuantity: number;
  productReview: { rating: number }[];
  onAdd: (args0: number, args2: "add" | "remove") => void;
  onBuyNow?: () => void;
  isLoading: boolean;
  // Dropship marketing content
  isDropshipped?: boolean;
  customMarketingContent?: any;
  additionalMarketingImages?: any[];
  soldBy: string;
  soldByTradeRole: string;
  userId?: number;
  sellerId?: number;
  haveOtherSellers?: boolean;
  productProductPrice?: string;
  consumerDiscount?: number;
  consumerDiscountType?: string;
  vendorDiscount?: number;
  vendorDiscountType?: string;
  askForPrice?: string;
  otherSellerDetails?: any[];
  productPriceArr: any[];
  minQuantity?: number;
  maxQuantity?: number;
  onQuantityChange?: (
    newQuantity: number,
    action: "add" | "remove",
    variant?: any,
  ) => void;
  productVariantTypes?: string[];
  productVariants?: any[];
  selectedProductVariant?: any;
  selectProductVariant?: (variant: any) => void;
  adminId?: number;
};

const ProductDescriptionCard: React.FC<ProductDescriptionCardProps> = ({
  productId,
  productName,
  productType,
  brand,
  productPrice,
  offerPrice,
  skuNo,
  productTags,
  category,
  productShortDescription,
  productQuantity = 0, // Default to 1 if undefined
  productReview,
  onAdd,
  onBuyNow,
  isLoading,
  // Dropship marketing content
  isDropshipped = false,
  customMarketingContent,
  additionalMarketingImages = [],
  soldBy,
  soldByTradeRole,
  userId,
  sellerId,
  haveOtherSellers,
  productProductPrice,
  consumerDiscount,
  consumerDiscountType,
  vendorDiscount,
  vendorDiscountType,
  askForPrice,
  otherSellerDetails,
  productPriceArr,
  minQuantity,
  maxQuantity,
  onQuantityChange, // Callback to update productQuantity outside
  productVariantTypes = [],
  productVariants = [],
  selectedProductVariant,
  selectProductVariant,
  adminId,
}) => {
  const t = useTranslations();
  const { user, langDir, currency } = useAuth();
  const [selectedProductVariants, setSelectedProductVariants] = useState<any>(
    selectedProductVariant,
  );
  const [quantity, setQuantity] = useState(productQuantity);
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(
    productQuantity > 0,
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  const calculateDiscountedPrice = () => {
    const price = productProductPrice ? Number(productProductPrice) : 0;
    const offerPriceValue = Number(offerPrice) || 0;
    
    // If offerPrice is provided and different from productPrice, use it directly
    if (offerPriceValue > 0 && offerPriceValue !== price) {
      return offerPriceValue;
    }
    
    let discount = consumerDiscount || 0;
    let discountType = consumerDiscountType;
    
    // For non-BUYER users, try vendor discount first, but fall back to consumer discount if vendor discount is not available
    if (user?.tradeRole && user.tradeRole != "BUYER") {
      if (vendorDiscount && vendorDiscount > 0) {
        discount = vendorDiscount;
        discountType = vendorDiscountType;
      }
      // If vendor discount is not available, keep using consumer discount
    }
    
    // Only apply discount if we have valid discount values
    if (discount > 0 && discountType) {
      if (discountType == "PERCENTAGE") {
        return Number((price - (price * discount) / 100).toFixed(2));
      } else if (discountType == "FLAT") {
        return Number((price - discount).toFixed(2));
      }
    }
    
    // Return original price if no discount
    return price;
  };

  const calculateAvgRating = useMemo(() => {
    const totalRating = productReview?.reduce(
      (acc: number, item: { rating: number }) => {
        return acc + item.rating;
      },
      0,
    );

    const result = totalRating / productReview?.length;
    return !isNaN(result) ? Math.floor(result) : 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productReview?.length]);

  const calculateRatings = useMemo(
    () => (rating: number) => {
      const stars: Array<React.ReactNode> = [];
      for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
          stars.push(<FaStar key={i} color="#FFC107" size={20} />);
        } else {
          stars.push(<FaRegStar key={i} color="#FFC107" size={20} />);
        }
      }
      return stars;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [productReview?.length],
  );

  useEffect(() => {
    if (productQuantity === -1) return;
    setQuantity(productQuantity || 0);
    setIsAddedToCart(!!productQuantity && productQuantity > 0);
  }, [productQuantity]);

  useEffect(() => {
    if (productVariantTypes.length > 0 && productVariants.length > 0) {
      if (!selectedProductVariant) {
        let selectedVariants: any = [];
        productVariantTypes.forEach((variantType, index) => {
          selectedVariants.push(
            productVariants.find((variant: any) => variant.type == variantType),
          );
        });
        setSelectedProductVariants(selectedVariants);
      } else {
        setSelectedProductVariants(
          !Array.isArray(selectedProductVariant)
            ? [selectedProductVariant]
            : selectedProductVariant,
        );
      }
    }
  }, [productVariants.length, selectedProductVariant]);

  const updateQuantity = (newQuantity: number, action: "add" | "remove") => {
    setQuantity(newQuantity);

    if (maxQuantity && maxQuantity < newQuantity) {
      toast({
        description: t("max_quantity_must_be_n", { n: maxQuantity }),
        variant: "danger",
      });
      setQuantity(productQuantity);
      return;
    }

    // If quantity is 0 and item is already in cart, remove from cart
    if (newQuantity === 0 && isAddedToCart) {
      onAdd(0, "remove");
    }
  };

  const handleQuantityChange = () => {
    if (quantity == 0 && isAddedToCart) {
      // Remove from cart when quantity is set to 0
      onAdd(0, "remove");
      return;
    }

    if (quantity == 0 && !isAddedToCart) {
      toast({
        description: t("quantity_can_not_be_0"),
        variant: "danger",
      });
      return;
    }

    if (minQuantity && minQuantity > quantity) {
      toast({
        description: t("min_quantity_must_be_n", { n: minQuantity }),
        variant: "danger",
      });
      return;
    }

    if (maxQuantity && maxQuantity < quantity) {
      toast({
        description: t("max_quantity_must_be_n", { n: maxQuantity }),
        variant: "danger",
      });
      setQuantity(productQuantity);
      return;
    }
  };

  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Get UTC offset
  const getUTCOffset = () => {
    const now = new Date();
    const offsetMinutes = now.getTimezoneOffset();
    const offsetHours = Math.abs(offsetMinutes) / 60;
    const sign = offsetMinutes > 0 ? "-" : "+";
    return `UTC${sign}${String(offsetHours).padStart(2, "0")}:00`;
  };

  // get end date and time with own timezone
  const formatDateTimeWithTimezone = (isoDate: string, time24: string) => {
    if (!isoDate || !time24) return "Invalid date"; // Handle empty values safely

    // Parse the dateClose string to get the correct date
    const date = new Date(isoDate);

    // Extract hours and minutes from `endTime` (which is in 24-hour format)
    const [hours, minutes] = time24.split(":").map(Number);

    // Set the correct local time (adjusting for timezone shifts)
    date.setHours(hours, minutes, 0, 0); // Set the correct time in local time

    // Get the user's local timezone
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Format the date-time in the user's local timezone
    return date.toLocaleString("en-US", {
      timeZone: userTimeZone,
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Ensures AM/PM format
    });
  };

  // For CountDown

  useEffect(() => {
    if (
      !productPriceArr?.length ||
      productPriceArr?.[0]?.sellType !== "BUYGROUP"
    )
      return;

    const product = productPriceArr[0];

    const startTimestamp = getLocalTimestamp(
      product.dateOpen,
      product.startTime,
    );
    const endTimestamp = getLocalTimestamp(product.dateClose, product.endTime);

    const updateCountdown = () => {
      const now = Date.now();

      if (now < startTimestamp) {
        setTimeLeft("NotStarted");
        return;
      }

      let ms = endTimestamp - now;
      if (ms <= 0) {
        setTimeLeft("Expired");
        return;
      }

      setTimeLeft(formatTime(ms));
    };

    updateCountdown(); // Initial call
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [productPriceArr]);

  // ✅ Fixing getLocalTimestamp to correctly combine Date + Time
  const getLocalTimestamp = (dateStr: any, timeStr: any) => {
    const date = new Date(dateStr); // Parse date part only
    const [hours, minutes] = (timeStr || "").split(":").map(Number); // Extract hours/minutes

    date.setHours(hours, minutes || 0, 0, 0); // Set correct time in local timezone

    return date.getTime(); // Return timestamp in milliseconds
  };

  // ✅ Corrected formatTime function to display (Days, Hours, Minutes, Seconds)
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = String(Math.floor((totalSeconds % 86400) / 3600)).padStart(
      2,
      "0",
    );
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0",
    );
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    // console.log(days, hours, minutes, seconds)
    return `${days}:${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="w-full space-y-6">
      {/* Product Title */}
      {isLoading ? (
        <Skeleton className="h-10 w-3/4" />
      ) : (
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 leading-relaxed" dir={langDir} translate="no">
            {productName}
          </h1>
        </div>
      )}

      {/* Brand & Seller Info */}
      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-6 w-1/3" />
        </div>
      ) : (
        <div className="space-y-3">
          {/* Brand and Rating Row */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600" dir={langDir} translate="no">
                {t("brand")}:
              </span>
              <span className="text-sm text-gray-900" dir={langDir} translate="no">
                {brand}
              </span>
            </div>
            
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {calculateRatings(calculateAvgRating)}
              </div>
              <span className="text-sm text-gray-600">
                ({productReview?.length || 0} {t("reviews")})
              </span>
            </div>
          </div>

          {/* Vendor Information */}
          {adminId && (
            <CompactVendorInfo adminId={String(adminId)} />
          )}
        </div>
      )}

      {/* Price Section */}
      {isLoading ? (
        <Skeleton className="h-12 w-48" />
      ) : (
        <div className="space-y-2">
          {askForPrice === "true" ? (
            <div className="inline-flex items-center rounded-lg bg-orange-100 px-4 py-2">
              <span className="text-sm font-semibold text-orange-800" dir={langDir} translate="no">
                {t("ask_for_price")}
              </span>
            </div>
          ) : productType != "R" ? (
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900">
                {currency.symbol}{calculateDiscountedPrice()}
              </span>
              {Number(productProductPrice) > calculateDiscountedPrice() && (
                <span className="text-lg text-gray-500 line-through">
                  {currency.symbol}{Number(productProductPrice)}
                </span>
              )}
              {Number(productProductPrice) > calculateDiscountedPrice() && (
                <span className="text-sm font-medium text-green-600">
                  {(() => {
                    const originalPrice = Number(productProductPrice);
                    const discountedPrice = calculateDiscountedPrice();
                    const discountAmount = originalPrice - discountedPrice;
                    const discountPercentage = Math.round((discountAmount / originalPrice) * 100);
                    
                    // Show percentage if it's meaningful (>0), otherwise show flat amount
                    if (discountPercentage > 0) {
                      return `${discountPercentage}% OFF`;
                    } else if (discountAmount > 0) {
                      return `₹${discountAmount} OFF`;
                    }
                    return '';
                  })()}
                </span>
              )}
            </div>
          ) : null}
        </div>
      )}

      {/* Product Description */}
      {isLoading ? (
        <Skeleton className="h-32 w-full" />
      ) : (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <h3 className="mb-3 text-lg font-semibold text-gray-900" dir={langDir} translate="no">
            {t("product_description")}
          </h3>
          {/* For dropship products, show marketing text if available, otherwise show regular description */}
          {isDropshipped && customMarketingContent?.marketingText ? (
            <p className="text-sm text-gray-700" dir={langDir} translate="no">
              {customMarketingContent.marketingText}
            </p>
          ) : productShortDescription?.length ? (
            <ul className="space-y-2">
              {productShortDescription?.map((item) => (
                <li key={item?.id} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="mt-1 h-1 w-1 rounded-full bg-gray-400 flex-shrink-0" />
                  {item?.shortDescription}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500" dir={langDir} translate="no">
              {t("no_description")}
            </p>
          )}
        </div>
      )}

      {/* Product Variants */}
      {productVariantTypes?.map((type: string, index: number) => {
        let selectedVariant = !Array.isArray(selectedProductVariant)
          ? [selectedProductVariant]
          : selectedProductVariant;
        return (
          <div className="space-y-2" key={index}>
            <label className="text-sm font-medium text-gray-700" dir={langDir} translate="no">
              {type}
            </label>
            <select
              data-type={type}
              value={
                selectedVariant?.find((variant: any) => variant?.type == type)
                  ?.value
              }
              onChange={(e) => {
                let selectedVariants = [];
                let value = e.target.value;
                let type = e.target.dataset.type;
                const selected = productVariants.find(
                  (variant: any) =>
                    variant.type == type && variant.value == value,
                );

                if (
                  selectedProductVariants.find(
                    (variant: any) => variant.type == selected.type,
                  )
                ) {
                  selectedVariants = selectedProductVariants.map(
                    (variant: any) => {
                      if (variant.type == selected.type) {
                        return selected;
                      }
                      return variant;
                    },
                  );
                } else {
                  selectedVariants = [...selectedProductVariants, selected];
                }

                setSelectedProductVariants(selectedVariants);

                selectProductVariant?.(selectedVariants);
              }}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-dark-orange focus:outline-none focus:ring-1 focus:ring-dark-orange"
            >
              {productVariants
                ?.filter((item: any) => item.type == type)
                ?.map((item: any, i: number) => {
                  return (
                    <option key={`${index}${i}`} value={item.value}>
                      {item.value}
                    </option>
                  );
                }) || []}
            </select>
          </div>
        );
      })}

      {/* Quantity Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700" dir={langDir} translate="no">
          {t("quantity")}
        </label>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="h-10 w-10 rounded-lg border-gray-300 hover:bg-gray-50"
            onClick={() => updateQuantity(quantity - 1, "remove")}
            disabled={!isAddedToCart && quantity === 0}
          >
            <Image src={MinusIcon} alt="minus-icon" width={16} height={16} />
          </Button>
          <input
            type="number"
            min="0"
            value={quantity}
            className="h-10 w-16 rounded-lg border border-gray-300 bg-white text-center text-sm focus:border-dark-orange focus:outline-none focus:ring-1 focus:ring-dark-orange"
            onChange={(e) => {
              const value = Number(e.target.value);
              setQuantity(isNaN(value) ? 0 : value);
            }}
            onBlur={handleQuantityChange}
          />
          <Button
            variant="outline"
            size="sm"
            className="h-10 w-10 rounded-lg border-gray-300 hover:bg-gray-50"
            onClick={() => updateQuantity(quantity + 1, "add")}
          >
            <Image src={PlusIcon} alt="plus-icon" width={16} height={16} />
          </Button>
        </div>
      </div>

      {/* Action Buttons - Amazon Style */}
      {askForPrice !== "true" && (
        <div className="space-y-3">
          {/* Add to Cart / Remove from Cart Button */}
          <Button
            onClick={() => {
              if (isAddedToCart && quantity === 0) {
                onAdd(0, "remove");
              } else {
                onAdd(quantity || 1, "add");
              }
            }}
            disabled={!isAddedToCart && quantity === 0}
            className={`w-full rounded-lg py-3 text-base font-medium shadow-lg transition-all hover:shadow-xl active:scale-95 disabled:opacity-50 ${
              isAddedToCart && quantity === 0
                ? "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700"
                : "bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 hover:from-yellow-500 hover:to-yellow-600"
            }`}
            dir={langDir}
            translate="no"
          >
            {isAddedToCart && quantity === 0
              ? t("remove_from_cart")
              : isAddedToCart
              ? t("added_to_cart")
              : t("add_to_cart")}
          </Button>

          {/* Buy Now Button */}
          <Button
            onClick={onBuyNow || (() => onAdd(quantity || 1, "add"))}
            disabled={quantity === 0}
            className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 py-3 text-base font-medium text-white shadow-lg transition-all hover:from-orange-600 hover:to-orange-700 hover:shadow-xl active:scale-95 disabled:opacity-50"
            dir={langDir}
            translate="no"
          >
            {t("buy_now")}
          </Button>
        </div>
      )}

      {/* Additional Product Info */}
      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
        </div>
      ) : (
        <div className="space-y-4">
          {/* Group Buy Timer */}
          {productPriceArr?.[0]?.sellType === "BUYGROUP" && (
            <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
              {timeLeft !== "NotStarted" && timeLeft !== "Expired" ? (
                <div className="mb-3" dir={langDir}>
                  <h4 className="mb-3 text-sm font-semibold text-orange-800" translate="no">
                    {t("time_left")}
                  </h4>
                  <div className="grid grid-cols-4 gap-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-900">{timeLeft.split(":")[0]}</div>
                      <div className="text-xs text-orange-700">Days</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-900">{timeLeft.split(":")[1]}</div>
                      <div className="text-xs text-orange-700">Hours</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-900">{timeLeft.split(":")[2]}</div>
                      <div className="text-xs text-orange-700">Minutes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-900">{timeLeft.split(":")[3]}</div>
                      <div className="text-xs text-orange-700">Seconds</div>
                    </div>
                  </div>
                </div>
              ) : null}
              
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium text-orange-800" dir={langDir} translate="no">
                    {t("group_buy_deal_ends")}:
                  </span>{" "}
                  <span className="text-orange-700">
                    {formatDateTimeWithTimezone(
                      productPriceArr?.[0]?.dateClose,
                      productPriceArr?.[0]?.endTime,
                    )}
                  </span>
                </p>
                <p>
                  <span className="font-medium text-orange-800" dir={langDir} translate="no">
                    {t("timezone")}:
                  </span>{" "}
                  <span className="text-orange-700">
                    {getUTCOffset()} ({userTimezone})
                  </span>
                </p>
              </div>
            </div>
          )}

        </div>
      )}

      {/* Security Badges */}
      <div className="flex items-center gap-6 py-4">
        <div className="flex items-center gap-2">
          <Image
            src={SecurePaymentIcon}
            alt="secure-payment-icon"
            width={24}
            height={20}
          />
          <span className="text-sm text-gray-600" dir={langDir} translate="no">
            {t("secure_payment")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src={SupportIcon}
            alt="support-24hr-icon"
            width={24}
            height={24}
          />
          <span className="text-sm text-gray-600" dir={langDir} translate="no">
            {t("support_24_7")}
          </span>
        </div>
      </div>

      {/* Product Details */}
      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-6 w-1/2" />
        </div>
      ) : (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900" dir={langDir} translate="no">
            {t("product_details")}
          </h4>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-600 w-20" dir={langDir} translate="no">
                {t("sku")}:
              </span>
              <span className="text-gray-900">{skuNo}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-600 w-20" dir={langDir} translate="no">
                {t("categories")}:
              </span>
              <span className="text-gray-900">{category}</span>
            </div>
            
            <div className="flex items-start gap-2">
              <span className="font-medium text-gray-600 w-20 flex-shrink-0" dir={langDir} translate="no">
                {t("tags")}:
              </span>
              <span className="text-gray-900">
                {productTags?.map((item) => item.productTagsTag?.tagName).join(", ")}
              </span>
            </div>
          </div>

          {/* Other Sellers */}
          {haveOtherSellers && (
            <Drawer
              direction="right"
              open={isDrawerOpen}
              onOpenChange={setIsDrawerOpen}
            >
              <Button
                variant="outline"
                className="text-red-600 border-red-200 hover:bg-red-50"
                onClick={() => setIsDrawerOpen(true)}
                translate="no"
              >
                {t("see_other_sellers")}
              </Button>
              <DrawerContent className="left-auto right-0 top-0 mt-0 w-[600px] rounded-none">
                <ScrollArea className="h-screen">
                  <div className="mx-auto w-full p-2">
                    <DrawerHeader>
                      <DrawerTitle dir={langDir} translate="no">
                        {t("all_sellers")}
                      </DrawerTitle>
                    </DrawerHeader>
                    <OtherSellerSection
                      setIsDrawerOpen={setIsDrawerOpen}
                      otherSellerDetails={otherSellerDetails}
                    />
                  </div>
                </ScrollArea>
              </DrawerContent>
            </Drawer>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDescriptionCard;
