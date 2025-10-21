import { TrendingProduct } from "@/utils/types/common.types";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useEffect, useState, useRef } from "react";
import validator from "validator";
import { Checkbox } from "@/components/ui/checkbox";
import { FaStar, FaRegStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { FaCircleCheck } from "react-icons/fa6";
import PlaceholderImage from "@/public/images/product-placeholder.png";
import { Button } from "@/components/ui/button";
import ShoppingIcon from "@/components/icons/ShoppingIcon";
import { useCartStore } from "@/lib/rfqStore";
import { toast } from "@/components/ui/use-toast";
import {
  useDeleteCartItem,
  useUpdateCartByDevice,
  useUpdateCartWithLogin,
  useUpdateCartWithService,
} from "@/apis/queries/cart.queries";
import { getOrCreateDeviceId } from "@/utils/helper";
import { useTranslations, useLocale } from "next-intl"; // Import useLocale
import { useAuth } from "@/context/AuthContext";
import { useClickOutside } from "use-events";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { IoCloseSharp } from "react-icons/io5";

type ProductCardProps = {
  item: TrendingProduct;
  productVariants?: any[];
  onWishlist: () => void;
  inWishlist?: boolean;
  haveAccessToken: boolean;
  isInteractive?: boolean;
  isSelectable?: boolean;
  selectedIds?: number[];
  onSelectedId?: (args0: boolean | string, args1: number) => void;
  productQuantity?: number;
  productVariant?: any;
  cartId?: number;
  isAddedToCart?: boolean;
  serviceId?: number;
  serviceCartId?: number;
  relatedCart?: any;
  sold?: number;
};

const ProductCard: React.FC<ProductCardProps> = ({
  item,
  productVariants = [],
  onWishlist,
  inWishlist,
  haveAccessToken,
  isInteractive,
  isSelectable,
  selectedIds,
  onSelectedId,
  productQuantity = 0,
  productVariant,
  cartId,
  serviceId,
  serviceCartId,
  relatedCart,
  isAddedToCart,
  sold,
}) => {
  const t = useTranslations();
  const { user, langDir, currency } = useAuth();
  const language = useLocale(); // Get the current locale (e.g., "en" or "ar")

  const [timeLeft, setTimeLeft] = useState<string | null>(null);

  const deviceId = getOrCreateDeviceId() || "";

  const calculateDiscountedPrice = () => {
    const price = item.productProductPrice
      ? Number(item.productProductPrice)
      : 0;
    let discount = item.consumerDiscount || 0;
    let discountType = item.consumerDiscountType;
    
    // For non-BUYER users, try vendor discount first, but fall back to consumer discount if vendor discount is not available
    if (user?.tradeRole && user?.tradeRole != "BUYER") {
      if (item.vendorDiscount && item.vendorDiscount > 0) {
        discount = item.vendorDiscount;
        discountType = item.vendorDiscountType;
      }
      // If vendor discount is not available, keep using consumer discount
    }
    
    if (discountType == "PERCENTAGE") {
      return Number((price - (price * discount) / 100).toFixed(2));
    } else if (discountType == "FLAT") {
      return Number((price - discount).toFixed(2));
    }
    // Default fallback for any other discount type
    return Number((price - discount).toFixed(2));
  };

  const calculateAvgRating = useMemo(() => {
    const totalRating = item.productReview?.reduce(
      (acc: number, item: { rating: number }) => acc + item.rating,
      0,
    );
    const result = totalRating / item.productReview?.length;
    return !isNaN(result) ? Math.floor(result) : 0;
  }, [item.productReview?.length]);

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
    [item.productReview?.length],
  );

  const [productVariantTypes, setProductVariantTypes] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(0);
  const [selectedProductVariant, setSelectedProductVariant] = useState<any>(productVariant);

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] =
    useState<boolean>(false);
  const handleConfirmDialog = () =>
    setIsConfirmDialogOpen(!isConfirmDialogOpen);
  const confirmDialogRef = useRef(null);
  const [isClickedOutsideConfirmDialog] = useClickOutside(
    [confirmDialogRef],
    () => onCancelRemove(),
  );

  useEffect(() => {
    setQuantity(productQuantity || 0);
  }, [productQuantity]);

  useEffect(() => {
    if (productVariants.length > 0) {
      // @ts-ignore
      const variantTypes: string[] = [...new Set(productVariants.map((variant: any) => variant.type))];
      setProductVariantTypes(variantTypes);

      if (!productVariant) {
        let selectedVariant: any[] = [];
        variantTypes.forEach((variantType, index) => {
          selectedVariant.push(productVariants.find((variant: any) => variant.type == variantType));
        });
        setSelectedProductVariant(selectedVariant);
      } else {
        setSelectedProductVariant(
          !Array.isArray(productVariant) ? [productVariant] : productVariant
        );
      }
    }
  }, [productVariants.length, productVariant]);

  const updateCartWithLogin = useUpdateCartWithLogin();
  const updateCartByDevice = useUpdateCartByDevice();
  const updateCartWithService = useUpdateCartWithService();
  const deleteCartItem = useDeleteCartItem();

  const handleAddToCart = async (
    newQuantity: number,
    actionType: "add" | "remove",
    variant?: any,
  ) => {
    const minQuantity = item.productPrices?.length
      ? item.productPrices[0]?.minQuantityPerCustomer
      : null;
    const maxQuantity = item.productPrices?.length
      ? item.productPrices[0]?.maxQuantityPerCustomer
      : null;

    if (actionType == "add" && newQuantity == -1) {
      newQuantity =
        minQuantity && quantity < minQuantity ? minQuantity : quantity + 1;
    }

    if (actionType == "add" && minQuantity && minQuantity > newQuantity) {
      toast({
        description: t("min_quantity_must_be_n", { n: minQuantity }),
        variant: "danger",
      });
      return;
    }

    if (maxQuantity && maxQuantity < newQuantity) {
      toast({
        description: t("max_quantity_must_be_n", { n: maxQuantity }),
        variant: "danger",
      });
      return;
    }

    if (actionType == "remove" && minQuantity && minQuantity > newQuantity) {
      setIsConfirmDialogOpen(true);
      return;
    }

    if (haveAccessToken) {
      if (!item?.productProductPriceId) {
        toast({
          title: t("something_went_wrong"),
          description: t("product_price_id_not_found"),
          variant: "danger",
        });
        return;
      }

      let linkService = !!(!cartId && serviceId && serviceCartId);

      if (linkService) {
        const response = await updateCartWithService.mutateAsync({
          productId: item?.id,
          productPriceId: item?.productProductPriceId,
          quantity: newQuantity,
          productVariant: variant || selectedProductVariant,
          serviceId: relatedCart?.serviceId || serviceId,
          cartId: relatedCart?.id || serviceCartId
        });
  
        if (response.success) {
          setQuantity(
            actionType === "add" && newQuantity === 0 ? 1 : newQuantity,
          );
          toast({
            title:
              actionType == "add"
                ? t("item_added_to_cart")
                : t("item_removed_from_cart"),
            description: t("check_your_cart_for_more_details"),
            variant: "success",
          });
          return response.success;
        } else {
          toast({
            title: t("something_went_wrong"),
            description: response.message,
            variant: "danger",
          });
        }

        return;
      }

      const response = await updateCartWithLogin.mutateAsync({
        productPriceId: item?.productProductPriceId,
        quantity: newQuantity,
        productVariant: variant || selectedProductVariant,
      });

      if (response.status) {
        setQuantity(
          actionType === "add" && newQuantity === 0 ? 1 : newQuantity,
        );
        toast({
          title:
            actionType == "add"
              ? t("item_added_to_cart")
              : t("item_removed_from_cart"),
          description: t("check_your_cart_for_more_details"),
          variant: "success",
        });
        return response.status;
      } else {
        toast({
          title: t("something_went_wrong"),
          description: response.message,
          variant: "danger",
        });
      }

    } else {
      if (!item?.productProductPriceId) {
        toast({
          title: t("something_went_wrong"),
          description: t("product_price_id_not_found"),
          variant: "danger",
        });
        return;
      }
      const response = await updateCartByDevice.mutateAsync({
        productPriceId: item?.productProductPriceId,
        quantity: newQuantity,
        deviceId,
        productVariant: variant || selectedProductVariant,
      });
      if (response.status) {
        setQuantity(
          actionType === "add" && newQuantity === 0 ? 1 : newQuantity,
        );
        toast({
          title:
            actionType == "add"
              ? t("item_added_to_cart")
              : t("item_removed_from_cart"),
          description: t("check_your_cart_for_more_details"),
          variant: "success",
        });
        return response.status;
      } else {
        toast({
          title: t("something_went_wrong"),
          description: response.message,
          variant: "danger",
        });
      }
    }
  };

  const handleQuantity = (quantity: number, action: "add" | "remove") => {
    const minQuantity = item.productPrices?.length
      ? item.productPrices[0]?.minQuantityPerCustomer
      : null;
    const maxQuantity = item.productPrices?.length
      ? item.productPrices[0]?.maxQuantityPerCustomer
      : null;

    if (maxQuantity && maxQuantity < quantity) {
      toast({
        description: t("max_quantity_must_be_n", { n: maxQuantity }),
        variant: "danger",
      });
      setQuantity(productQuantity || maxQuantity);
      return;
    }

    setQuantity(quantity);
    if (cartId) {
      handleAddToCart(quantity, action);
    } else {
      if (minQuantity && minQuantity > quantity) {
        toast({
          description: t("min_quantity_must_be_n", { n: minQuantity }),
          variant: "danger",
        });
        return;
      }
    }
  };

  const handleQuantityChange = () => {
    if (quantity == 0 && productQuantity != 0) {
      toast({
        description: t("quantity_can_not_be_0"),
        variant: "danger",
      });
      handleQuantity(quantity, "remove");
      return;
    }

    const minQuantity = item.productPrices?.length
      ? item.productPrices[0]?.minQuantityPerCustomer
      : null;
    if (minQuantity && minQuantity > quantity) {
      toast({
        description: t("min_quantity_must_be_n", { n: minQuantity }),
        variant: "danger",
      });
      handleQuantity(quantity, quantity > productQuantity ? "add" : "remove");
      return;
    }

    const maxQuantity = item.productPrices?.length
      ? item.productPrices[0]?.maxQuantityPerCustomer
      : null;
    if (maxQuantity && maxQuantity < quantity) {
      toast({
        description: t("max_quantity_must_be_n", { n: maxQuantity }),
        variant: "danger",
      });
      setQuantity(productQuantity || maxQuantity);
      return;
    }

    const action = quantity > productQuantity ? "add" : "remove";
    if (quantity != productQuantity) handleQuantity(quantity, action);
  };

  const handleRemoveItemFromCart = async (cartId: number) => {
    const response = await deleteCartItem.mutateAsync({ cartId });
    if (response.status) {
      toast({
        title: t("item_removed_from_cart"),
        description: t("check_your_cart_for_more_details"),
        variant: "success",
      });
    } else {
      toast({
        title: t("item_not_removed_from_cart"),
        description: t("check_your_cart_for_more_details"),
        variant: "danger",
      });
    }
  };

  const onConfirmRemove = () => {
    if (cartId) handleRemoveItemFromCart(cartId);
    setIsConfirmDialogOpen(false);
  };

  const onCancelRemove = () => {
    setQuantity(productQuantity);
    setIsConfirmDialogOpen(false);
  };

  const getLocalTimestamp = (dateStr: any, timeStr: any) => {
    const date = new Date(dateStr);
    const [hours, minutes] = (timeStr || "").split(":").map(Number);
    date.setHours(hours, minutes || 0, 0, 0);
    return date.getTime();
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const isArabic = language === "ar";
    const numberFormatter = new Intl.NumberFormat(language, {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });

    const formattedDays = days.toString();
    const formattedHours = numberFormatter.format(hours);
    const formattedMinutes = numberFormatter.format(minutes);
    const formattedSeconds = numberFormatter.format(seconds);

    const daysLabel = t("days");

    const timeString = isArabic
      ? `${formattedSeconds}:${formattedMinutes}:${formattedHours} ؛${daysLabel} ${formattedDays}`
      : `${formattedDays} ${daysLabel}; ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

    return timeString;
  };

  useEffect(() => {
    if (
      !item?.productPrices?.length ||
      item?.productPrices?.[0]?.sellType !== "BUYGROUP"
    ) {
      setTimeLeft(null);
      return;
    }

    const product = item.productPrices[0];
    const startTimestamp = getLocalTimestamp(
      product.dateOpen,
      product.startTime,
    );
    const endTimestamp = getLocalTimestamp(product.dateClose, product.endTime);

    const updateCountdown = () => {
      const now = Date.now();

      if (now < startTimestamp) {
        setTimeLeft(t("not_started"));
        return;
      }

      const ms = endTimestamp - now;
      if (ms <= 0) {
        setTimeLeft(t("expired"));
        return;
      }

      setTimeLeft(formatTime(ms));
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [item?.productPrices, language, t]);

  return (
    <div className="group relative bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 overflow-hidden h-full flex flex-col items-stretch">
      {/* Selection Checkbox */}
      {isSelectable ? (
        <div className="absolute left-3 top-3 z-20">
          <Checkbox
            className="border-2 border-gray-300 data-[state=checked]:bg-blue-600! data-[state=checked]:border-blue-600!"
            checked={selectedIds?.includes(item.id)}
            onCheckedChange={(checked) => onSelectedId?.(checked, item.id)}
          />
        </div>
      ) : null}

      {/* Time Left Badge */}
      {timeLeft ? (
        <div className="absolute right-3 top-3 z-20">
          <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            <span dir={language === "ar" ? "rtl" : "ltr"}>{timeLeft}</span>
          </div>
        </div>
      ) : null}

      {/* Product Image Container */}
      <Link href={`/trending/${item.id}`} className="block">
        {/* Discount Badge */}
        {item?.askForPrice !== "true" && item.consumerDiscount ? (
          <div className="absolute right-3 top-12 z-20 bg-linear-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
            {item.consumerDiscountType === "PERCENTAGE" 
              ? `${item.consumerDiscount}%` 
              : `${currency.symbol}${item.consumerDiscount}`
            }
          </div>
        ) : null}

        <div className="relative w-full h-56 bg-gray-50 overflow-hidden">
          <Image
            src={
              item?.productImage && (validator.isURL(item.productImage) || item.productImage.startsWith('data:image/'))
                ? item.productImage
                : PlaceholderImage
            }
            alt="product-image"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain group-hover:scale-105 transition-transform duration-300"
            blurDataURL="/images/product-placeholder.png"
            placeholder="blur"
          />
        </div>
      </Link>

      {/* Action Buttons */}
      {isInteractive ? (
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
          {item?.askForPrice !== "true" ? (
            <Button
              variant="secondary"
              size="sm"
              className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-xs shadow-lg hover:bg-white hover:scale-110 transition-all duration-200"
              onClick={() => handleAddToCart(-1, "add")}
            >
              <ShoppingIcon />
            </Button>
          ) : null}
          <Link
            href={`/trending/${item.id}`}
            className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-xs shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 flex items-center justify-center"
          >
            <FiEye size={16} className="text-gray-700" />
          </Link>
          {haveAccessToken ? (
            <Button
              variant="secondary"
              size="sm"
              className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-xs shadow-lg hover:bg-white hover:scale-110 transition-all duration-200"
              onClick={onWishlist}
            >
              {inWishlist ? (
                <FaHeart color="#ef4444" size={14} />
              ) : (
                <FaRegHeart size={14} className="text-gray-700" />
              )}
            </Button>
          ) : null}
        </div>
      ) : null}

      {/* Product Information */}
      <div className="p-4 space-y-3 flex-1 flex flex-col">
        <Link href={`/trending/${item.id}`} className="block group flex-1">
          <h3 className="font-semibold text-gray-900 text-base leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 mb-2" dir={langDir}>
            {item.productName}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-1 mb-2" title={item.shortDescription}>
            {item.shortDescription}
          </p>
          
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {calculateRatings(calculateAvgRating)}
            </div>
            <span className="text-sm text-gray-500 ml-1">
              ({item.productReview?.length || 0})
            </span>
          </div>
        </Link>
        {/* Price Section */}
        <div className="space-y-2 mb-3">
          {item?.askForPrice === "true" ? (
            <Link href={`/seller-rfq-request?product_id=${item?.id}`}>
              <button
                type="button"
                className="w-full bg-linear-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md text-sm"
                dir={langDir}
                translate="no"
              >
                {t("ask_vendor_for_price")}
              </button>
            </Link>
          ) : (
            <div className="space-y-1" suppressHydrationWarning>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-blue-600" dir={langDir}>
                  {currency.symbol}{calculateDiscountedPrice()}
                </span>
                {item.productProductPrice && Number(item.productProductPrice) > calculateDiscountedPrice() && (
                  <span className="text-sm text-gray-500 line-through">
                    {currency.symbol}{item.productProductPrice}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
        {/* Product Variants */}
        {productVariantTypes.length > 0 ? (
          <div className="space-y-2 mb-3">
            {productVariantTypes.map((variantType: string, index: number) => {
              return (
                <div key={index} dir={langDir}>
                  <label htmlFor={variantType} className="block text-sm font-medium text-gray-700 mb-1">
                    {variantType}
                  </label>
                  <select
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    value={selectedProductVariant?.find((variant: any) => variant.type == variantType)?.value}
                    onChange={(e) => {
                      let selectedVariants = [];
                      let value = e.target.value;
                      const selected = productVariants.find(
                        (variant: any) => variant.type == variantType && variant.value == value
                      );

                      if (selectedProductVariant.find((variant: any) => variant.type == selected.type)) {
                        selectedVariants = selectedProductVariant.map((variant: any) => {
                          if (variant.type == selected.type) {
                            return selected;
                          }
                          return variant;
                        });

                      } else {
                        selectedVariants = [
                          ...selectedProductVariant,
                          selected
                        ];
                      }

                      setSelectedProductVariant(selectedVariants);

                      if (cartId) handleAddToCart(quantity, "add", selectedVariants);
                    }}
                  >
                    {productVariants.filter((variant: any) => variant.type == variantType)
                      .map((variant: any, i: number) => {
                      return <option key={`${index}${i}`} value={variant.value} dir={langDir}>{variant.value}</option>;
                    })}
                  </select>
                </div>
              );
            })}
          </div>
        ) : null}
        {/* Quantity Section */}
        <div className="space-y-2 mb-3">
          <label className="block text-sm font-medium text-gray-700" dir={langDir} translate="no">
            {t("quantity")}
          </label>
          <div className="flex items-center justify-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 w-8 rounded-full border-gray-300 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50"
              onClick={() => handleQuantity(quantity - 1, "remove")}
              disabled={
                quantity === 0 ||
                updateCartWithLogin?.isPending ||
                updateCartByDevice?.isPending
              }
            >
              <Image
                src="/images/upDownBtn-minus.svg"
                alt="minus-icon"
                width={16}
                height={16}
              />
            </Button>
            <input
              type="text"
              value={quantity}
              className="h-8 w-16 text-center text-sm font-medium border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => {
                const value = Number(e.target.value);
                setQuantity(isNaN(value) ? productQuantity : value);
              }}
              onBlur={handleQuantityChange}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 w-8 rounded-full border-gray-300 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50"
              onClick={() => handleQuantity(quantity + 1, "add")}
              disabled={
                updateCartWithLogin?.isPending ||
                updateCartByDevice?.isPending
              }
            >
              <Image
                src="/images/upDownBtn-plus.svg"
                alt="plus-icon"
                width={18}
                height={18}
              />
            </Button>
          </div>
        </div>

        {/* Cart Button */}
        <div className="mt-auto pt-3">
          {isAddedToCart ? (
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg border-2 border-green-200 bg-green-50 text-green-700 font-semibold text-sm transition-all duration-200"
              disabled={false}
              dir={langDir}
              translate="no"
            >
              <FaCircleCheck color="#10b981" size={16} />
              {t("added_to_cart")}
            </button>
          ) : (
            <button
              type="button"
              className="w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm"
              onClick={() => handleAddToCart(quantity, "add")}
              disabled={quantity == 0}
              dir={langDir}
              translate="no"
            >
              {t("add_to_cart")}
            </button>
          )}
        </div>

        {/* Sold Progress Bar */}
        {sold !== undefined && sold !== null && item.productPrices?.[0]?.stock
          ? (() => {
              const percentage = Number(
                (100 - (sold / (sold + item.productPrices[0].stock)) * 100).toFixed(),
              );
              return (
                <div className="mt-3 space-y-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-linear-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span translate="no">
                      {t("sold")}: {sold}
                    </span>
                    <span className="font-semibold">
                      {percentage}% {t("left")}
                    </span>
                  </div>
                </div>
              );
            })()
          : null}
      </div>
      {/* Confirmation Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={handleConfirmDialog}>
        <DialogContent
          className="max-w-md p-6 rounded-xl"
          ref={confirmDialogRef}
        >
          <div className="flex items-center justify-between mb-4" dir={langDir}>
            <DialogTitle className="text-lg font-semibold text-gray-900">
              {t("confirm_removal")}
            </DialogTitle>
            <Button
              onClick={onCancelRemove}
              variant="ghost"
              size="sm"
              className="h-8 w-8 rounded-full hover:bg-gray-100"
            >
              <IoCloseSharp size={18} />
            </Button>
          </div>
          <div className="text-center space-y-4">
            <p className="text-gray-600" translate="no">
              {t("do_you_want_to_remove_this_item_from_cart")}
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                type="button"
                variant="outline"
                onClick={onCancelRemove}
                translate="no"
                className="px-6"
              >
                {t("cancel")}
              </Button>
              <Button
                type="button"
                className="bg-red-500 hover:bg-red-600 px-6"
                onClick={onConfirmRemove}
                translate="no"
              >
                {t("remove")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductCard;
