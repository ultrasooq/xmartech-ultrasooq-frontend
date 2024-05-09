import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import validator from "validator";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import PlaceholderImage from "@/public/images/product-placeholder.png";
import { stripHTML } from "@/utils/helper";
import TrashIcon from "@/public/images/td-trash-icon.svg";
import { Button } from "@/components/ui/button";

type WishlistCardProps = {
  productId: number;
  wishlistData: any;
  onDeleteFromWishlist: (wishListId: number) => void;
  id: number;
};

const WishlistCard: React.FC<WishlistCardProps> = ({
  productId,
  wishlistData,
  onDeleteFromWishlist,
  id,
}) => {
  // const offerPercentage = useMemo(
  //   () =>
  //     Math.floor(
  //       100 - (wishlistData.offerPrice / wishlistData.productPrice) * 100,
  //     ),
  //   [wishlistData.offerPrice, wishlistData.productPrice],
  // );

  const calculateAvgRating = useMemo(() => {
    const totalRating = wishlistData.productReview?.reduce(
      (acc: number, wishlistData: { rating: number }) => {
        return acc + wishlistData.rating;
      },
      0,
    );

    const result = totalRating / wishlistData.productReview?.length;
    return !isNaN(result) ? Math.floor(result) : 0;
  }, [wishlistData.productReview?.length]);

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
    [wishlistData.productReview?.length],
  );

  return (
    <div className="product-list-s1-col relative">
      <div className="product-list-s1-box cursor-pointer hover:bg-slate-100">
        <Button
          className="absolute right-2.5 top-2.5 z-10 rounded-full bg-white p-2"
          onClick={() => onDeleteFromWishlist(productId)}
        >
          <Image
            src={TrashIcon}
            height={26}
            width={26}
            alt="trash-icon"
            className=""
          />
        </Button>
        <Link href={`/trending/${wishlistData.id}`}>
          {/* <div className="absolute right-2.5 top-2.5 z-10 inline-block rounded bg-dark-orange px-2.5 py-2 text-lg font-medium capitalize leading-5 text-white">
            <span>{!isNaN(offerPercentage) ? offerPercentage : 0}%</span>
          </div> */}
          <div className="relative mx-auto mb-4 h-36 w-36">
            <Image
              src={
                wishlistData.productImages?.[0]?.image &&
                validator.isURL(wishlistData.productImages[0].image)
                  ? wishlistData.productImages[0].image
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

          <div className="relative w-full text-sm font-normal capitalize text-color-blue lg:text-base">
            <h4 className="mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase text-color-dark">
              {wishlistData.productName}
            </h4>
            <p title={wishlistData.shortDescription} className="truncate">
              {wishlistData?.shortDescription
                ? stripHTML(wishlistData.shortDescription)
                : ""}
            </p>
            <div className="my-1 flex">
              {calculateRatings(calculateAvgRating)}
              <span className="ml-2">{wishlistData.productReview?.length}</span>
            </div>
            <h5>${wishlistData.offerPrice}</h5>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default WishlistCard;
