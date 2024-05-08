import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
// import Link from "next/link";
import React, { useMemo } from "react";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import validator from "validator";
import ShoppingIcon from "@/public/images/shopping-icon.svg";
import EyeIcon from "@/public/images/eye-icon.svg";
import HeartIcon from "@/public/images/heart-icon.svg";
import CompareIcon from "@/public/images/compare-icon.svg";

type SameBrandProductCardProps = {
  id: number;
  productName: string;
  productImages: { id: number; image: string }[];
  shortDescription: string;
  productPrice: string;
  offerPrice: string;
  productReview: { rating: number }[];
  onAdd?: () => void;
};

const SameBrandProductCard: React.FC<SameBrandProductCardProps> = ({
  id,
  productName,
  productImages,
  shortDescription,
  productPrice,
  offerPrice,
  productReview,
  onAdd,
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
              productImages?.length &&
              validator.isURL(productImages?.[0]?.image)
                ? productImages[0].image
                : "/images/product-placeholder.png"
            }
            alt="preview"
            fill
          />
        </div>
        <div className="multiple-action-container">
          <Button type="button" className="circle-btn">
            <Image
              src={ShoppingIcon}
              alt="shopping-icon"
              width={16}
              height={16}
            />
          </Button>
          <Link href={`/trending/${id}`} className="circle-btn !shadow">
            <Image src={EyeIcon} alt="eye-icon" width={16} height={16} />
          </Link>
          <Button type="button" className="circle-btn">
            <Image src={HeartIcon} alt="heart-icon" width={16} height={16} />
          </Button>
          <Button type="button" className="circle-btn">
            <Image
              src={CompareIcon}
              alt="compare-icon"
              width={16}
              height={16}
            />
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
          <h5>${offerPrice}</h5>
        </div>
      </div>
    </div>
  );
};

export default SameBrandProductCard;
