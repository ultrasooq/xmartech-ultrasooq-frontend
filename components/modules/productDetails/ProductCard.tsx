import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import validator from "validator";
import PlaceholderImage from "@/public/images/product-placeholder.png";

type ProductCardProps = {
  id: number;
  productName: string;
  productImages: { id: number; image: string }[];
  shortDescription: string;
  offerPrice: number;
  productPrice: number;
  productReview: { rating: number }[];
  onView: () => void;
};

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  productName,
  productImages,
  shortDescription,
  offerPrice,
  productPrice,
  productReview,
  onView,
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
    <Link href={`/trending/${id}`}>
      <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
        <div className="absolute right-2.5 top-2.5 z-10 inline-block rounded bg-dark-orange px-2.5 py-2 text-lg font-medium capitalize leading-5 text-white">
          <span>{!isNaN(offerPercentage) ? offerPercentage : 0}%</span>
        </div>
        <div className="relative mx-auto mb-4 h-36 w-36">
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
    </Link>
  );
};

export default ProductCard;
