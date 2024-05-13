import { TrendingProduct } from "@/utils/types/common.types";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import validator from "validator";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import PlaceholderImage from "@/public/images/product-placeholder.png";
import { Button } from "@/components/ui/button";
import ShoppingIcon from "@/public/images/shopping-icon.svg";
import EyeIcon from "@/public/images/eye-icon.svg";
import CompareIcon from "@/public/images/compare-icon.svg";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

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
  const offerPercentage = useMemo(
    () => Math.floor(100 - (item.offerPrice / item.productPrice) * 100),
    [item.offerPrice, item.productPrice],
  );

  const calculateAvgRating = useMemo(() => {
    const totalRating = item.productReview?.reduce(
      (acc: number, item: { rating: number }) => {
        return acc + item.rating;
      },
      0,
    );

    const result = totalRating / item.productReview?.length;
    return !isNaN(result) ? Math.floor(result) : 0;
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
    [item.productReview?.length],
  );

  return (
    <div className="product-list-s1-col">
      <div className="product-list-s1-box hover:bg-slate-100">
        {/* <Link href={`/trending/${item.id}`}> */}
        <div className="absolute right-2.5 top-2.5 z-10 inline-block rounded bg-dark-orange px-2.5 py-2 text-lg font-medium capitalize leading-5 text-white">
          <span>{!isNaN(offerPercentage) ? offerPercentage : 0}%</span>
        </div>
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

        {haveAccessToken ? (
          <div className="mb-3 grid grid-cols-4 gap-x-3">
            <Button
              variant="ghost"
              className="relative h-8 w-8 rounded-full shadow-md"
              onClick={onAdd}
            >
              <Image
                src={ShoppingIcon}
                alt="shopping-icon"
                className="object-contain p-2"
                fill
              />
            </Button>
            <Link
              href={`/trending/${item.id}`}
              className="relative h-8 w-8 rounded-full !shadow-md"
            >
              <Image
                src={EyeIcon}
                alt="eye-icon"
                className="object-contain p-2"
                fill
              />
            </Link>
            <Button
              variant="ghost"
              className="relative h-8 w-8 rounded-full p-0 shadow-md"
              onClick={onWishlist}
            >
              {inWishlist ? <FaHeart color="red" /> : <FaRegHeart />}
            </Button>
            <Button
              variant="ghost"
              className="relative h-8 w-8 rounded-full shadow-md"
              onClick={() => {
                console.log("shared");
              }}
            >
              <Image
                src={CompareIcon}
                alt="shopping-icon"
                className="object-contain p-2"
                fill
              />
            </Button>
          </div>
        ) : null}

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
          <h5>${item.offerPrice}</h5>
        </div>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default ProductCard;
