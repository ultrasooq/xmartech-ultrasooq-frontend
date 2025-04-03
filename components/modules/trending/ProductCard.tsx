import { TrendingProduct } from "@/utils/types/common.types";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useEffect, useState } from "react";
import validator from "validator";
import { Checkbox } from "@/components/ui/checkbox";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import PlaceholderImage from "@/public/images/product-placeholder.png";
import { Button } from "@/components/ui/button";
// import ShoppingIcon from "@/public/images/shopping-icon.svg";
// import EyeIcon from "@/public/images/eye-icon.svg";
// import CompareIcon from "@/public/images/compare-icon.svg";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import ShoppingIcon from "@/components/icons/ShoppingIcon";
import { FaCircleCheck } from "react-icons/fa6";
import { useCartStore } from "@/lib/rfqStore";
import { toast } from "@/components/ui/use-toast";
import {
  useUpdateCartByDevice,
  useUpdateCartWithLogin,
} from "@/apis/queries/cart.queries";
import { getOrCreateDeviceId } from "@/utils/helper";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";

type ProductCardProps = {
  item: TrendingProduct;
  onWishlist: () => void;
  inWishlist?: boolean;
  haveAccessToken: boolean;
  isInteractive?: boolean;
  isSelectable?: boolean;
  selectedIds?: number[];
  onSelectedId?: (args0: boolean | string, args1: number) => void;
  productQuantity?: number;
  isAddedToCart?: boolean;
};

const ProductCard: React.FC<ProductCardProps> = ({
  item,
  onWishlist,
  inWishlist,
  haveAccessToken,
  isInteractive,
  isSelectable,
  selectedIds,
  onSelectedId,
  productQuantity = 0,
  isAddedToCart,
}) => {
  const t = useTranslations();
  const { langDir } = useAuth();

  const [timeLeft, setTimeLeft] = useState("");

  const deviceId = getOrCreateDeviceId() || "";

  const calculateDiscountedPrice = () => {
    const price = item.productProductPrice
      ? Number(item.productProductPrice)
      : 0;
    const discount = item.consumerDiscount || 0;
    return price - (price * discount) / 100;
  };

  const calculateAvgRating = useMemo(() => {
    const totalRating = item.productReview?.reduce(
      (acc: number, item: { rating: number }) => {
        return acc + item.rating;
      },
      0,
    );

    const result = totalRating / item.productReview?.length;
    return !isNaN(result) ? Math.floor(result) : 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [item.productReview?.length],
  );

  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setQuantity(productQuantity || 0);
  }, [productQuantity]);

  const updateCartWithLogin = useUpdateCartWithLogin();
  const updateCartByDevice = useUpdateCartByDevice();

  const handleAddToCart = async (
    newQuantity: number,
    actionType: "add" | "remove",
  ) => {
    const minQuantity = item.productPrices?.length ? item.productPrices[0]?.minQuantityPerCustomer : null;
    const maxQuantity = item.productPrices?.length ? item.productPrices[0]?.maxQuantityPerCustomer : null; 

    if (actionType == 'add' && newQuantity == -1) {
      newQuantity = minQuantity && quantity < minQuantity ? minQuantity : quantity + 1;
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
      newQuantity = 0;
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
      const response = await updateCartWithLogin.mutateAsync({
        productPriceId: item?.productProductPriceId,
        quantity: newQuantity,
      });

      if (response.status) {
        if (actionType === "add" && newQuantity === 0) {
          setQuantity(1);
        } else {
          setQuantity(newQuantity);
        }
        toast({
          title: actionType == "add" ? t("item_added_to_cart") : t("item_removed_from_cart"),
          description: t("check_your_cart_for_more_details"),
          variant: "success",
        });
        return response.status;
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
      });
      if (response.status) {
        if (actionType === "add" && newQuantity === 0) {
          setQuantity(1);
        } else {
          setQuantity(newQuantity);
        }
        toast({
          title: actionType == "add" ? t("item_added_to_cart") : t("item_removed_from_cart"),
          description: t("check_your_cart_for_more_details"),
          variant: "success",
        });
        return response.status;
      }
    }
  }

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
    return `${days} Days; ${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (!item?.productPrices?.length || item?.productPrices?.[0]?.sellType !== "BUYGROUP") return;

    const product = item.productPrices[0];

    const startTimestamp = getLocalTimestamp(product.dateOpen, product.startTime);
    const endTimestamp = getLocalTimestamp(product.dateClose, product.endTime);

    const updateCountdown = () => {
      const now = Date.now();

      if (now < startTimestamp) {
        setTimeLeft(t("not_started"));
        return;
      }

      let ms = endTimestamp - now;
      if (ms <= 0) {
        setTimeLeft(t("expired"));
        return;
      }

      setTimeLeft(formatTime(ms));
    };

    updateCountdown(); // Initial call
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [item?.productPrices?.length])

  return (
    <div className="product-list-s1-col">
      <div className="product-list-s1-box relative hover:bg-slate-100">
        {isSelectable ? (
          <div className="absolute left-[10px] top-[20px]">
            <Checkbox
              className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange"
              checked={selectedIds?.includes(item.id)}
              onCheckedChange={(checked) => onSelectedId?.(checked, item.id)}
            />
          </div>
        ) : null}
        {timeLeft && <div className="time_left">
          <span>{timeLeft}</span>
        </div>}
        <Link href={`/trending/${item.id}`}>
          {item?.askForPrice !== "true" ? (
            item.consumerDiscount ? (
              <div className="absolute right-2.5 top-2.5 z-10 inline-block rounded bg-dark-orange px-2.5 py-2 text-lg font-medium capitalize leading-5 text-white">
                <span>{item.consumerDiscount}%</span>
              </div>
            ) : null
          ) : null}
          <div className="relative mx-auto mb-4 h-36 w-36">
            <Image
              src={
                item?.productImage && validator.isURL(item.productImage)
                  ? item.productImage
                  : PlaceholderImage
              }
              alt="product-image"
              fill
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              className="object-contain"
              blurDataURL="/images/product-placeholder.png"
              placeholder="blur"
            />
          </div>
        </Link>

        {isInteractive ? (
          <div className="mb-3 flex flex-row items-center justify-center gap-x-3">
            {item?.askForPrice !== "true" ? (
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full p-0 shadow-md"
                onClick={() => handleAddToCart(-1, "add")}
              >
                <ShoppingIcon />
              </Button>
            ) : null}

            <Link
              href={`/trending/${item.id}`}
              className="relative flex h-8 w-8 items-center justify-center rounded-full !shadow-md"
            >
              <FiEye size={18} />
            </Link>
            {haveAccessToken ? (
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full p-0 shadow-md"
                onClick={onWishlist}
              >
                {inWishlist ? (
                  <FaHeart color="red" size={16} />
                ) : (
                  <FaRegHeart size={16} />
                )}
              </Button>
            ) : null}
            {/* <Button
              variant="ghost"
              className="relative h-8 w-8 rounded-full p-0 shadow-md"
              onClick={copyToClipboard}
            >
              <ShareIcon />
            </Button> */}
          </div>
        ) : null}

        <Link href={`/trending/${item.id}`}>
          <div className="relative w-full text-sm font-normal capitalize text-color-blue lg:text-base">
            <h4 className="mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase text-color-dark">
              {item.productName}
            </h4>
            <p title={item.shortDescription} className="truncate">
              {item.shortDescription}
            </p>
            <div className="my-1 flex">
              {calculateRatings(calculateAvgRating)}
              <span className="ml-2">{item.productReview?.length}</span>
            </div>
          </div>
        </Link>
        <div>
          {item?.askForPrice === "true" ? (
            <Link href={`/seller-rfq-request?product_id=${item?.id}`}>
              <button
                type="button"
                className="inline-block w-full rounded-sm bg-color-yellow px-3 py-1 text-sm font-bold text-white"
                dir={langDir}
              >
                {t("ask_vendor_for_price")}
              </button>
            </Link>
          ) : (
            <h5 className="py-1 text-[#1D77D1]">
              ${calculateDiscountedPrice()}{" "}
              <span className="text-gray-500 !line-through">
                ${item.productProductPrice}
              </span>
            </h5>
          )}
        </div>
        <div className="quantity_wrap mb-2">
          <label dir={langDir}>{t("quantity")}</label>
          <div className="qty-up-down-s1-with-rgMenuAction">
            <div className="flex items-center gap-x-3 md:gap-x-4">
              <Button
                type="button"
                variant="outline"
                className="relative hover:shadow-sm"
                onClick={() => {
                  if (isAddedToCart) {
                    handleAddToCart(quantity - 1, "remove");
                  } else {
                    setQuantity(quantity - 1);
                  }
                }}
                disabled={quantity === 0}
              >
                <Image
                  src="/images/upDownBtn-minus.svg"
                  alt="minus-icon"
                  fill
                  className="p-3"
                />
              </Button>
              <p className="!mb-0 !text-black">{quantity}</p>
              <Button
                type="button"
                variant="outline"
                className="relative hover:shadow-sm"
                onClick={() => {
                  if (isAddedToCart) {
                    handleAddToCart(quantity + 1, "add");
                  } else {
                    setQuantity(quantity + 1);
                  }
                }}
              >
                <Image
                  src="/images/upDownBtn-plus.svg"
                  alt="plus-icon"
                  fill
                  className="p-3"
                />
              </Button>
            </div>
          </div>
        </div>

        <div className="cart_button">
          {isAddedToCart && <button
            type="button"
            className="flex items-center justify-evenly gap-x-2 rounded-sm border border-[#E8E8E8] p-[10px] text-[15px] font-bold leading-5 text-[#7F818D]"
            disabled={false}
            dir={langDir}
          >
            <FaCircleCheck color="#00C48C" />
            {t("added_to_cart")}
          </button>}
          {!isAddedToCart && <button
            type="button"
            className="add_to_cart_button"
            onClick={() => handleAddToCart(quantity, "add")}
            disabled={quantity == 0}
            dir={langDir}
          >
            {t("add_to_cart")}
          </button>}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
