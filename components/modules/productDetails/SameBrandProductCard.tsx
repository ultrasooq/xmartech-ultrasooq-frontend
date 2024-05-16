import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
// import Link from "next/link";
import React, { useMemo } from "react";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import validator from "validator";
// import ShoppingIcon from "@/public/images/shopping-icon.svg";
// import EyeIcon from "@/public/images/eye-icon.svg";
// import CompareIcon from "@/public/images/compare-icon.svg";
import PlaceholderImage from "@/public/images/product-placeholder.png";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import ShoppingIcon from "@/components/icons/ShoppingIcon";
import ShareIcon from "@/components/icons/ShareIcon";

type SameBrandProductCardProps = {
  id: number;
  productName: string;
  productImages: { id: number; image: string }[];
  shortDescription: string;
  productProductPrice?: number;
  productPrice: string;
  offerPrice: string;
  productReview: { rating: number }[];
  onAdd?: () => void;
  onWishlist: () => void;
  inWishlist?: boolean;
  haveAccessToken: boolean;
};

const SameBrandProductCard: React.FC<SameBrandProductCardProps> = ({
  id,
  productName,
  productImages,
  shortDescription,
  productPrice,
  offerPrice,
  productProductPrice,
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
    <div className="product-list-s1-col">
      <div className="product-list-s1-box">
        <div className="image-container relative mb-4">
          <span className="discount">
            {!isNaN(offerPercentage) ? offerPercentage : 0}%
          </span>
          <Image
            src={
              productImages?.[0]?.image &&
              validator.isURL(productImages[0].image)
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

        <div className="text-container">
          <h4>{productName}</h4>
          <p title={shortDescription} className="truncate">
            {shortDescription}
          </p>
          <div className="rating_stars">
            {calculateRatings(calculateAvgRating)}
            <span>{productReview?.length}</span>
          </div>
          <h5>${productProductPrice}</h5>
        </div>
      </div>
    </div>
  );
};

export default SameBrandProductCard;
