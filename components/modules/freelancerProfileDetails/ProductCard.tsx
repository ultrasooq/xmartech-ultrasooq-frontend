import { TrendingProduct } from "@/utils/types/common.types";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import validator from "validator";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import PlaceholderImage from "@/public/images/product-placeholder.png";
// import ShoppingIcon from "@/public/images/shopping-icon.svg";
// import EyeIcon from "@/public/images/eye-icon.svg";
// import CompareIcon from "@/public/images/compare-icon.svg";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import ShoppingIcon from "@/components/icons/ShoppingIcon";
import ShareIcon from "@/components/icons/ShareIcon";

type ProductCardProps = {
  item: TrendingProduct;
  onAdd?: () => void;
  onWishlist: () => void;
  inWishlist?: boolean;
  haveAccessToken: boolean;
};

const ProductCard: React.FC<ProductCardProps> = ({
  item,
  onAdd,
  onWishlist,
  inWishlist,
  haveAccessToken,
}) => {
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
      const stars = [];
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

  return (
    <div
      className={cn(
        item.status === "INACTIVE" ? "opacity-50" : "",
        "product-list-s1-col border-[1px] !border-transparent border-slate-300 p-3 hover:!border-slate-200 hover:bg-slate-100",
      )}
    >
      <div className="product-list-s1-box relative cursor-pointer ">
        <Link href={`/trending/${item.id}`}>
          {item?.askForPrice !== "true" ? (
            item.consumerDiscount ? (
              <div className="absolute right-2.5 top-2.5 z-10 inline-block rounded bg-dark-orange px-2.5 py-2 text-lg font-medium capitalize leading-5 text-white">
                <span>{item.consumerDiscount || 0}%</span>
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

        {haveAccessToken ? (
          <div className="mb-3 flex flex-row items-center justify-center gap-x-3">
            {item?.askForPrice !== "true" ? (
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full p-0 shadow-md"
                onClick={onAdd}
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

            {/* <Button
              variant="ghost"
              className="relative h-8 w-8 rounded-full p-0 shadow-md"
              onClick={() => {
                console.log("shared");
              }}
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
      </div>

      <div>
        {item?.askForPrice === "true" ? (
          <button
            type="button"
            className="inline-block w-full rounded-sm bg-color-yellow px-6 py-1 text-sm font-bold capitalize text-white"
          >
            Message
          </button>
        ) : (
          <Link href={`/trending/${item.id}`}>
            <h5 className="py-1 text-[#1D77D1]">
              ${calculateDiscountedPrice()}{" "}
              <span className="text-gray-500 !line-through">
                ${item.productProductPrice}
              </span>
            </h5>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
