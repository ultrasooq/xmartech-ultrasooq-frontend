import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import validator from "validator";
import PlaceholderImage from "@/public/images/product-placeholder.png";
import { Button } from "@/components/ui/button";
// import ShoppingIcon from "@/public/images/shopping-icon.svg";
// import EyeIcon from "@/public/images/eye-icon.svg";
// import CompareIcon from "@/public/images/compare-icon.svg";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import ShoppingIcon from "@/components/icons/ShoppingIcon";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";

type ProductCardProps = {
  id: number;
  productName: string;
  productImages: { id: number; image: string }[];
  shortDescription: string;
  productProductPrice?: string;
  offerPrice: number;
  productPrice: number;
  productReview: { rating: number }[];
  onAdd?: () => void;
  onWishlist: () => void;
  inWishlist?: boolean;
  haveAccessToken: boolean;
  consumerDiscount?: number;
  consumerDiscountType?: string;
  vendorDiscount?: number;
  vendorDiscountType?: string;
  askForPrice?: string;
};

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  productName,
  productImages,
  shortDescription,
  productProductPrice,
  offerPrice,
  productPrice,
  productReview,
  onAdd,
  onWishlist,
  inWishlist,
  haveAccessToken,
  consumerDiscount,
  consumerDiscountType,
  vendorDiscount,
  vendorDiscountType,
  askForPrice,
}) => {
  const t = useTranslations();
  const { user, langDir, currency } = useAuth();

  const calculateDiscountedPrice = () => {
    const price = productProductPrice ? Number(productProductPrice) : 0;
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
    
    if (discountType == "PERCENTAGE") {
      return Number((price - (price * discount) / 100).toFixed(2));
    } else if (discountType == "FLAT") {
      return Number((price - discount).toFixed(2));
    }
    // Default fallback for any other discount type
    return Number((price - discount).toFixed(2));
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

  return (
    <div className="relative h-full w-full bg-white p-4">
      <Link href={`/trending/${id}`}>
        {askForPrice !== "true" ? (
          consumerDiscount ? (
            <div className="absolute left-2 top-2 z-10 inline-flex items-center bg-red-600 px-2 py-0.5 text-xs font-medium text-white">
              <span>
                {consumerDiscountType === "PERCENTAGE" 
                  ? `-${consumerDiscount}%` 
                  : `-${currency.symbol}${consumerDiscount}`
                }
              </span>
            </div>
          ) : null
        ) : null}
        
        {/* Product Image */}
        <div className="relative mx-auto mb-3 h-48 w-full bg-white flex items-center justify-center">
          <Image
            src={
              productImages?.[0]?.image &&
              validator.isURL(productImages[0].image)
                ? productImages[0].image
                : PlaceholderImage
            }
            alt={productName}
            className="object-contain"
            fill
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex flex-col">
        <Link href={`/trending/${id}`}>
          <div>
            <h4 className="mb-2 line-clamp-2 text-sm text-gray-900" title={productName}>
              {productName}
            </h4>
            
            {/* Rating */}
            <div className="mb-2 flex items-center gap-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>
                    {i < calculateAvgRating ? (
                      <FaStar size={14} color="#FFA41C" />
                    ) : (
                      <FaRegStar size={14} color="#FFA41C" />
                    )}
                  </span>
                ))}
              </div>
              <span className="text-xs text-blue-600">({productReview?.length})</span>
            </div>
            
            {/* Price */}
            <div className="mb-2">
              {askForPrice === "true" ? (
                <span className="text-sm font-medium text-gray-700">
                  {t("ask_for_price")}
                </span>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-xl font-medium text-gray-900">
                    {currency.symbol}{calculateDiscountedPrice()}
                  </span>
                  {productProductPrice && calculateDiscountedPrice() < Number(productProductPrice) && (
                    <span className="text-sm text-gray-500 line-through">
                      {currency.symbol}{productProductPrice}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Short Description */}
            {shortDescription && shortDescription !== "-" && (
              <p className="mb-2 line-clamp-2 text-xs text-gray-600" title={shortDescription}>
                {shortDescription}
              </p>
            )}

            {/* Discount Badge */}
            {askForPrice !== "true" && consumerDiscount && consumerDiscount > 0 && (
              <div className="mb-2 flex items-center gap-1">
                <span className="text-xs font-medium text-red-600">
                  Save {consumerDiscountType === "PERCENTAGE" 
                    ? `${consumerDiscount}%` 
                    : `${currency.symbol}${consumerDiscount}`
                  }
                </span>
              </div>
            )}
          </div>
        </Link>

        {/* Action Buttons */}
        <div className="mt-3 flex items-center gap-2">
          {askForPrice !== "true" ? (
            <Button
              onClick={onAdd}
              className="flex-1 bg-yellow-400 px-4 py-2 text-xs font-medium text-gray-900 hover:bg-yellow-500"
            >
              {t("add_to_cart")}
            </Button>
          ) : (
            <Link href={`/seller-rfq-request?product_id=${id}`} className="flex-1">
              <button
                type="button"
                className="w-full bg-blue-500 px-4 py-2 text-xs font-medium text-white hover:bg-blue-600"
                dir={langDir}
                translate="no"
              >
                {t("ask_vendor_for_price")}
              </button>
            </Link>
          )}

          {haveAccessToken ? (
            <Button
              variant="outline"
              onClick={onWishlist}
              className="h-9 w-9 border-0 bg-gray-100 p-0 hover:bg-gray-200"
            >
              {inWishlist ? (
                <FaHeart className="h-4 w-4 text-red-500" />
              ) : (
                <FaRegHeart className="h-4 w-4 text-gray-600" />
              )}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
