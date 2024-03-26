import Image from "next/image";
import React, { useState } from "react";
import UserRatingCard from "./UserRatingCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  // DialogTitle,
  // DialogTrigger,
} from "@/components/ui/dialog";

const RatingsSection = () => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const handleToggleReviewModal = () =>
    setIsReviewModalOpen(!isReviewModalOpen);

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
              <p>Based on 139 Reviews</p>
            </div>
          </div>
        </div>
        <div className="w-auto">
          <button
            type="button"
            onClick={handleToggleReviewModal}
            className="flex rounded-sm bg-dark-orange px-6 py-4 text-base font-bold leading-5 text-white"
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
      <div className="flex w-full items-center justify-end py-6">
        <ul className="flex items-center justify-end">
          <li className="ml-2 text-sm font-medium text-color-dark">
            Sort By :
          </li>
          <li className="ml-2">
            <a
              href=""
              className="block rounded-full border border-solid border-gray-300 px-10 py-3.5 text-sm font-medium text-gray-500"
            >
              Newest
            </a>
          </li>
          <li className="ml-2">
            <a
              href=""
              className="block rounded-full border border-solid border-gray-300 px-10 py-3.5 text-sm font-medium text-gray-500"
            >
              Newest
            </a>
          </li>
          <li className="ml-2">
            <a
              href=""
              className="block rounded-full border border-solid border-gray-300 px-10 py-3.5 text-sm font-medium text-gray-500"
            >
              Newest
            </a>
          </li>
        </ul>
      </div>
      <div className="mt-5 flex w-full border-t-2 border-dashed border-gray-300 py-10">
        <div className="flex-items flex w-full flex-col justify-between gap-y-5 lg:flex-row">
          <div className="w-full px-3.5 lg:w-2/6">
            <UserRatingCard />
          </div>
          <div className="w-full px-3.5 lg:w-2/6">
            <UserRatingCard />
          </div>
          <div className="w-full px-3.5 lg:w-2/6">
            <UserRatingCard />
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-center text-center text-base font-bold text-dark-orange">
        <span className="flex">
          <Image
            src="/images/loader.png"
            className="mr-1.5"
            height={25}
            width={25}
            alt="loader-icon"
          />
          Load More
        </span>
      </div>

      <Dialog open={isReviewModalOpen} onOpenChange={handleToggleReviewModal}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription className="min-h-[300px]">
              Form Content
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RatingsSection;
