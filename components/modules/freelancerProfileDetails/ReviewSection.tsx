import React, { useMemo, useState } from "react";
import Image from "next/image";
import { useReviewsForSeller } from "@/apis/queries/review.queries";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import ProductReviewCard from "./ProductReviewCard";
import { stripHTML } from "@/utils/helper";

type ReviewSectionProps = {};

const ReviewSection: React.FC<ReviewSectionProps> = () => {
  const [sortType, setSortType] = useState<"highest" | "lowest" | "newest">(
    "newest",
  );

  const reviewsQuery = useReviewsForSeller({
    page: 1,
    limit: 10,
    sortType,
  });

  //   const calculateAvgRating = useMemo(() => {
  //     const totalRating = productReview?.reduce(
  //       (acc: number, item: { rating: number }) => {
  //         return acc + item.rating;
  //       },
  //       0,
  //     );

  //     const result = totalRating / productReview?.length;
  //     return !isNaN(result) ? Math.floor(result) : 0;
  //   }, [productReview?.length]);

  //   const calculateRatings = useMemo(
  //     () => (rating: number) => {
  //       const stars = [];
  //       for (let i = 1; i <= 5; i++) {
  //         if (i <= rating) {
  //           stars.push(<FaStar key={i} color="#FFC107" size={20} />);
  //         } else {
  //           stars.push(<FaRegStar key={i} color="#FFC107" size={20} />);
  //         }
  //       }
  //       return stars;
  //     },
  //     [productReview?.length],
  //   );

  return (
    <div className="w-full">
      <div className="flex w-full flex-wrap items-center justify-between">
        <div className="flex w-auto flex-wrap items-start justify-start">
          <h2 className="mb-0 mr-7 text-2xl font-semibold leading-7 text-color-dark">
            Ratings &amp; Reviews
          </h2>
          <div className="flex w-auto flex-col">
            <div className="flex w-auto items-center justify-start">
              <h4 className="mb-0 mr-2.5 text-2xl font-medium leading-7 text-color-dark">
                {/* {calculateAvgRating ? `${calculateAvgRating}.0` : "0"} */}
              </h4>
              {/* {calculateRatings(calculateAvgRating)} */}
            </div>
            <div className="mt-1.5 w-auto text-sm font-medium leading-5 text-gray-500">
              <p>Based on {reviewsQuery.data?.data?.length} Reviews</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-end py-5">
        <ul className="flex items-center justify-end">
          <li className="ml-2 text-sm font-medium text-color-dark">Sort By:</li>
          <li className="ml-2">
            <Button
              variant={sortType === "newest" ? "secondary" : "ghost"}
              onClick={() => setSortType("newest")}
              className="block rounded-full border border-solid border-gray-300 text-sm font-medium text-gray-500"
            >
              Newest
            </Button>
          </li>
          <li className="ml-2">
            <Button
              variant={sortType === "highest" ? "secondary" : "ghost"}
              onClick={() => setSortType("highest")}
              className="block rounded-full border border-solid border-gray-300 text-sm font-medium text-gray-500"
            >
              Highest
            </Button>
          </li>
          <li className="ml-2">
            <Button
              variant={sortType === "lowest" ? "secondary" : "ghost"}
              onClick={() => setSortType("lowest")}
              className="block rounded-full border border-solid border-gray-300 text-sm font-medium text-gray-500"
            >
              Lowest
            </Button>
          </li>
        </ul>
      </div>
      <div className="flex w-full border-t-2 border-dashed border-gray-300 py-5">
        {!reviewsQuery?.data?.data?.length ? (
          <div className="w-full text-center text-sm font-bold text-dark-orange">
            No reviews found
          </div>
        ) : null}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviewsQuery.data?.data?.length
            ? reviewsQuery.data?.data.map(
                (review: {
                  id: string;
                  rating: number;
                  title: string;
                  description: string;
                  createdAt: string;
                  productReview_product: {
                    productName: string;
                    productImages: {
                      imageName: string;
                      image: string;
                    }[];
                  };
                }) => (
                  <ProductReviewCard
                    key={review?.id}
                    rating={review?.rating}
                    productName={review?.productReview_product?.productName}
                    productImage={review?.productReview_product?.productImages}
                    title={review.title}
                    review={review.description}
                  />
                ),
              )
            : null}
        </div>
      </div>
      {/* <div className="flex w-full items-center justify-center text-center text-sm font-bold text-dark-orange">
        <span className="flex">
          <Image
            src="/images/loader.png"
            className="mr-1.5"
            height={20}
            width={20}
            alt="loader-icon"
          />
          Load More
        </span>
      </div> */}
    </div>
  );
};

export default ReviewSection;
