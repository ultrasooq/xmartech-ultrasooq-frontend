import React, { useMemo } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import AvatarPlaceholder from "@/public/images/no-user-image.png";

type ProductReviewCardProps = {
  productName: string;
  productImage: {
    imageName: string;
    image: string;
  }[];
  rating: number;
  title: string;
  review: string;
};

const ProductReviewCard: React.FC<ProductReviewCardProps> = ({
  productName,
  productImage,
  rating,
  title,
  review,
}) => {
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
    [rating],
  );

  return (
    <div className="w-full rounded-2xl border border-solid border-gray-300 p-4">
      <div className="flex w-full flex-wrap items-start justify-between">
        <div className="flex flex-row">
          <div className="relative h-16 w-16 rounded-sm">
            <Image
              src={productImage?.[0]?.image || AvatarPlaceholder}
              alt="review-icon"
              fill
              className="rounded-sm"
            />
          </div>
          <div className="w-[calc(100%_-_2rem)] pl-3.5 text-sm font-normal leading-5 text-gray-500">
            <div className="flex w-full items-start justify-between">
              <h4 className="text-base font-semibold text-color-dark">
                {productName}
              </h4>
            </div>
            <div className="w-full">
              <div className="flex w-full flex-wrap items-start gap-2 text-xs leading-5 text-gray-500">
                <div className="flex">{calculateRatings(rating)}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full pt-3 ">
          <h3>{title}</h3>
          <p className="text-sm font-normal leading-6 text-gray-500">
            {review}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductReviewCard;
