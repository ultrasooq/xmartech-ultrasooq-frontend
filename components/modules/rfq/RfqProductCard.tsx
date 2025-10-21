import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useMemo } from "react";
import validator from "validator";
import PlaceholderImage from "@/public/images/product-placeholder.png";
import { FaCircleCheck } from "react-icons/fa6";
import ShoppingIcon from "@/components/icons/ShoppingIcon";
import { FaHeart, FaRegHeart, FaStar, FaRegStar } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";

type RfqProductCardProps = {
  id: number;
  productType: "R" | "P";
  productName: string;
  productNote: string;
  productStatus: string;
  productImages: {
    image: string;
  }[];
  productQuantity: number;
  onAdd: (
    args0: number,
    args1: number,
    args2: "add" | "remove",
    args3?: number,
    args4?: number,
    args5?: string,
  ) => void;
  onToCart: () => void;
  onEdit: (args0: number) => void;
  onWishlist: () => void;
  isCreatedByMe: boolean;
  isAddedToCart: boolean;
  inWishlist?: boolean;
  haveAccessToken: boolean;
  productPrice: any;
  offerPriceFrom?: number;
  offerPriceTo?: number;
  productReview?: any[];
  shortDescription?: string;
};

const RfqProductCard: React.FC<RfqProductCardProps> = ({
  id,
  productType,
  productName,
  productNote,
  productStatus,
  productImages,
  productQuantity,
  onAdd,
  onToCart,
  onEdit,
  onWishlist,
  isCreatedByMe,
  isAddedToCart,
  inWishlist,
  haveAccessToken,
  productPrice,
  offerPriceFrom,
  offerPriceTo,
  productReview = [],
  shortDescription = "",
}) => {
  const t = useTranslations();
  const { langDir, currency } = useAuth();
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setQuantity(productQuantity || 0);
  }, [productQuantity]);

  const calculateAvgRating = useMemo(() => {
    const totalRating = productReview?.reduce(
      (acc: number, item: { rating: number }) => acc + item.rating,
      0,
    );
    const result = totalRating / productReview?.length;
    return !isNaN(result) ? Math.floor(result) : 0;
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
    [productReview?.length],
  );

  return (
    <div className="group relative bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 overflow-hidden h-full flex flex-col items-stretch">
      {/* Product Image Container */}
      <Link href={`/rfq/${id}`} className="block">
        <div className="relative w-full h-56 bg-gray-50 overflow-hidden">
          <Image
            src={
              productImages?.[0]?.image &&
              (validator.isURL(productImages?.[0]?.image) || productImages?.[0]?.image.startsWith('data:image/'))
                ? productImages[0].image
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
      <div className="absolute top-3 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
        <Button
          variant="secondary"
          size="sm"
          className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-xs shadow-lg hover:bg-white hover:scale-110 transition-all duration-200"
          onClick={() => onAdd(quantity + 1, id, "add", offerPriceFrom, offerPriceTo, productNote || "")}
        >
          <ShoppingIcon />
        </Button>
        <Link
          href={`/rfq/${id}`}
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

      {/* Product Information */}
      <div className="p-4 space-y-3 flex-1 flex flex-col">
        <Link href={`/rfq/${id}`} className="block group flex-1">
          <h3 className="font-semibold text-gray-900 text-base leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 mb-2" dir={langDir}>
            {productName}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-1 mb-2" title={shortDescription}>
            {shortDescription}
          </p>
          
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {calculateRatings(calculateAvgRating)}
            </div>
            <span className="text-sm text-gray-500 ml-1">
              ({productReview?.length || 0})
            </span>
          </div>
        </Link>

        {/* Price Section */}
        <div className="space-y-2 mb-3">
          <div className="space-y-1" suppressHydrationWarning>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-blue-600" dir={langDir}>
                {t("ask_for_price")}
              </span>
            </div>
          </div>
        </div>

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
              onClick={() => {
                setQuantity(quantity - 1);
                onAdd(quantity - 1, id, "remove", offerPriceFrom, offerPriceTo, productNote || "");
              }}
              disabled={quantity === 0}
            >
              <Image
                src="/images/upDownBtn-minus.svg"
                alt="minus-icon"
                width={16}
                height={16}
                className="opacity-70"
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
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 w-8 rounded-full border-gray-300 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50"
              onClick={() => {
                setQuantity(quantity + 1);
                onAdd(quantity + 1, id, "add", offerPriceFrom, offerPriceTo, productNote || "");
              }}
            >
              <Image
                src="/images/upDownBtn-plus.svg"
                alt="plus-icon"
                width={16}
                height={16}
                className="opacity-70"
              />
            </Button>
          </div>
        </div>

        {/* Edit Button */}
        {isCreatedByMe && haveAccessToken ? (
          <div className="mb-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onEdit(id)}
              className="w-full"
              dir={langDir}
              translate="no"
            >
              {t("edit")}
            </Button>
          </div>
        ) : null}

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
              {t("added_to_rfq_cart")}
            </button>
          ) : (
            <button
              type="button"
              className="w-full bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm"
              onClick={() => onAdd(quantity + 1, id, "add", offerPriceFrom, offerPriceTo, productNote || "")}
              disabled={quantity == 0}
              dir={langDir}
              translate="no"
            >
              {t("add_to_rfq_cart")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RfqProductCard;
