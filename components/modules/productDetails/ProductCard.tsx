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
    <div className="group relative h-[500px] w-full bg-white p-6 transition-all duration-300 hover:shadow-xl">
      <Link href={`/trending/${id}`}>
        {askForPrice !== "true" ? (
          consumerDiscount ? (
            <div className="absolute right-3 top-3 z-10 inline-flex items-center rounded-full bg-red-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
              <span>
                {consumerDiscountType === "PERCENTAGE" 
                  ? `${consumerDiscount}% OFF` 
                  : `${currency.symbol}${consumerDiscount} OFF`
                }
              </span>
            </div>
          ) : null
        ) : null}
        
        {/* Product Image */}
        <div className="relative mx-auto mb-4 h-48 w-full overflow-hidden rounded-xl bg-gray-50">
          <Image
            src={
              productImages?.[0]?.image &&
              validator.isURL(productImages[0].image)
                ? productImages[0].image
                : PlaceholderImage
            }
            alt={productName}
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            fill
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex h-[calc(100%-192px)] flex-col justify-between">
        <div className="flex-1">
          <Link href={`/trending/${id}`}>
            <div className="text-center">
              <h4 className="mb-2 h-12 overflow-hidden text-lg font-bold text-gray-900 transition-colors group-hover:text-orange-600" title={productName}>
                {productName}
              </h4>
              
              {/* Rating */}
              <div className="mb-3 flex items-center justify-center gap-1">
                <div className="flex items-center">
                  {calculateRatings(calculateAvgRating)}
                </div>
                <span className="ml-1 text-sm text-gray-500">({productReview?.length})</span>
              </div>
              
              {/* Price */}
              <div className="mb-3 h-12 flex items-center justify-center">
                {askForPrice === "true" ? (
                  <span className="inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
                    {t("ask_for_price")}
                  </span>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl font-bold text-gray-900">
                      {currency.symbol}{calculateDiscountedPrice()}
                    </span>
                    {productProductPrice && calculateDiscountedPrice() < Number(productProductPrice) && (
                      <span className="text-lg text-gray-500 line-through">
                        {currency.symbol}{productProductPrice}
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              {/* Short Description */}
              <p className="h-10 overflow-hidden text-sm text-gray-600" title={shortDescription}>
                {shortDescription}
              </p>
            </div>
          </Link>
        </div>

        {/* Action Buttons - Fixed at bottom */}
        <div className="mt-4 flex items-center justify-center gap-3">
          {askForPrice !== "true" ? (
            <Button
              onClick={onAdd}
              className="flex-1 rounded-full bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-orange-600 hover:shadow-xl"
            >
              <ShoppingIcon className="mr-2 h-4 w-4" />
              {t("add_to_cart")}
            </Button>
          ) : (
            <Link href={`/seller-rfq-request?product_id=${id}`} className="flex-1">
              <button
                type="button"
                className="w-full rounded-full bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-blue-600 hover:shadow-xl"
                dir={langDir}
                translate="no"
              >
                {t("ask_vendor_for_price")}
              </button>
            </Link>
          )}

          <Link href={`/trending/${id}`}>
            <Button
              variant="outline"
              className="h-11 w-11 rounded-full border-2 border-gray-200 bg-white shadow-md transition-all duration-200 hover:border-orange-300 hover:bg-orange-50 hover:shadow-lg"
            >
              <FiEye className="h-5 w-5 text-gray-600" />
            </Button>
          </Link>
          
          {haveAccessToken ? (
            <Button
              variant="outline"
              onClick={onWishlist}
              className={`h-11 w-11 rounded-full border-2 shadow-md transition-all duration-200 hover:shadow-lg ${
                inWishlist 
                  ? "border-red-200 bg-red-50 hover:border-red-300 hover:bg-red-100" 
                  : "border-gray-200 bg-white hover:border-red-300 hover:bg-red-50"
              }`}
            >
              {inWishlist ? (
                <FaHeart className="h-5 w-5 text-red-500" />
              ) : (
                <FaRegHeart className="h-5 w-5 text-gray-600" />
              )}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
