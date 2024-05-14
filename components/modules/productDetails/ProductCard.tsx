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
import ShareIcon from "@/components/icons/ShareIcon";

type ProductCardProps = {
  id: number;
  productName: string;
  productImages: { id: number; image: string }[];
  shortDescription: string;
  offerPrice: number;
  productPrice: number;
  productReview: { rating: number }[];
  onAdd?: () => void;
  onWishlist: () => void;
  inWishlist?: boolean;
  haveAccessToken: boolean;
};

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  productName,
  productImages,
  shortDescription,
  offerPrice,
  productPrice,
  productReview,
  onAdd,
  onWishlist,
  inWishlist,
  haveAccessToken,
}) => {
  const offerPercentage = useMemo(
    () => Math.floor(100 - (Number(offerPrice) / Number(productPrice)) * 100),
    [offerPrice, productPrice],
  );

  const calculateAvgRating = useMemo(() => {
    const totalRating = productReview?.reduce(
      (acc: number, item: { rating: number }) => {
        return acc + item.rating;
      },
      0,
    );

    const result = totalRating / productReview?.length;
    return !isNaN(result) ? Math.floor(result) : 0;
  }, [productReview?.length]);

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
    [productReview?.length],
  );

  return (
    // <Link href={`/trending/${id}`}>
    <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
      <div className="absolute right-2.5 top-2.5 z-10 inline-block rounded bg-dark-orange px-2.5 py-2 text-lg font-medium capitalize leading-5 text-white">
        <span>{!isNaN(offerPercentage) ? offerPercentage : 0}%</span>
      </div>
      <div className="relative mx-auto mb-4 h-36 w-36">
        <Image
          src={
            productImages?.[0]?.image && validator.isURL(productImages[0].image)
              ? productImages[0].image
              : PlaceholderImage
          }
          alt="preview"
          className="object-contain"
          fill
        />
      </div>

      <div className="mb-3 flex flex-row items-center justify-center gap-x-3">
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full p-0 shadow-md"
          onClick={onAdd}
        >
          <ShoppingIcon />
        </Button>

        <Link
          href={`/trending/${id}`}
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
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full p-0 shadow-md"
          onClick={() => {
            console.log("shared");
          }}
        >
          <ShareIcon />
        </Button>
      </div>

      <div className="relative w-full text-sm font-normal capitalize text-color-blue lg:text-base">
        <h4 className="mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase text-color-dark">
          {productName}
        </h4>
        <div className="mt-2.5 w-full">
          <h4 className="font-lg font-normal uppercase text-olive-green">
            ${offerPrice}
          </h4>
        </div>
        <p className="truncate" title={shortDescription}>
          {shortDescription}
        </p>
        <div className="flex">
          {calculateRatings(calculateAvgRating)}
          <span className="ml-2">{productReview?.length}</span>
        </div>
        <span className="w-auto text-base font-normal text-light-gray">
          ${productPrice}
        </span>
      </div>
    </div>
    // </Link>
  );
};

export default ProductCard;
