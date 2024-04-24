import React, { useState } from "react";
import Image from "next/image";
import UserRatingCard from "./UserRatingCard";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import ReviewForm from "./ReviewForm";
import { useReviews } from "@/apis/queries/review.queries";

type ReviewSectionProps = {
  productId?: string;
};

const ReviewSection: React.FC<ReviewSectionProps> = ({ productId }) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const handleToggleReviewModal = () =>
    setIsReviewModalOpen(!isReviewModalOpen);

  const reviewsQuery = useReviews(
    { page: 1, limit: 20, productId: productId ?? "" },
    !!productId,
  );

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
                5.0
              </h4>
              <span>
                <Image
                  src="/images/star.svg"
                  width={19}
                  height={18}
                  alt="star-icon"
                />
              </span>
              <span>
                <Image
                  src="/images/star.svg"
                  width={19}
                  height={18}
                  alt="star-icon"
                />
              </span>
              <span>
                <Image
                  src="/images/star.svg"
                  width={19}
                  height={18}
                  alt="star-icon"
                />
              </span>
              <span>
                <Image
                  src="/images/star.svg"
                  width={19}
                  height={18}
                  alt="star-icon"
                />
              </span>
              <span>
                <Image
                  src="/images/star.svg"
                  width={19}
                  height={18}
                  alt="star-icon"
                />
              </span>
            </div>
            <div className="mt-1.5 w-auto text-sm font-medium leading-5 text-gray-500">
              <p>Based on {reviewsQuery.data?.data?.length} Reviews</p>
            </div>
          </div>
        </div>
        <div className="w-auto">
          <button
            type="button"
            onClick={handleToggleReviewModal}
            className="flex rounded-sm bg-dark-orange p-3 text-sm font-bold leading-5 text-white"
          >
            <Image
              src="/images/pen-icon.svg"
              height={20}
              width={20}
              className="mr-2"
              alt="pen-icon"
            />
            <span>Write A Review</span>
          </button>
        </div>
      </div>
      <div className="flex w-full items-center justify-end py-5">
        <ul className="flex items-center justify-end">
          <li className="ml-2 text-sm font-medium text-color-dark">
            Sort By :
          </li>
          <li className="ml-2">
            <Button
              variant="ghost"
              className="block rounded-full border border-solid border-gray-300 text-sm font-medium text-gray-500"
            >
              Newest
            </Button>
          </li>
          <li className="ml-2">
            <Button
              variant="ghost"
              className="block rounded-full border border-solid border-gray-300 text-sm font-medium text-gray-500"
            >
              Highest
            </Button>
          </li>
          <li className="ml-2">
            <Button
              variant="ghost"
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
                  reviewByUserDetail: {
                    firstName: string;
                    lastName: string;
                    profilePicture: string;
                  };
                }) => (
                  <UserRatingCard
                    key={review?.id}
                    rating={review?.rating}
                    name={`${review?.reviewByUserDetail?.firstName} ${review?.reviewByUserDetail?.lastName}`}
                    title={review.title}
                    review={review.description}
                    date={review.createdAt}
                    profilePicture={review?.reviewByUserDetail?.profilePicture}
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

      <Dialog open={isReviewModalOpen} onOpenChange={handleToggleReviewModal}>
        <DialogContent>
          <ReviewForm onClose={handleToggleReviewModal} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewSection;
