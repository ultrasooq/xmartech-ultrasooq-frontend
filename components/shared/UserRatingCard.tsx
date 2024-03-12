import React from "react";

const UserRatingCard = () => {
  return (
    <div className="w-full rounded-2xl border border-solid border-gray-300 px-5 py-5">
      <div className="flex w-full flex-wrap items-start justify-between">
        <div className="h-12 w-12 overflow-hidden rounded-full">
          <img src="images/review-1.png" alt="review-icon" />
        </div>
        <div className="w-[calc(100%_-_3rem)] pl-3.5 text-sm font-normal leading-5 text-gray-500">
          <div className="flex w-full items-start justify-between">
            <h4 className="text-lg font-semibold text-color-dark">John Doe</h4>
            <img src="images/review-dot.svg" alt="review-dot-icon" />
          </div>
          <div className="w-full">
            <h5 className="mb-1 text-xs font-normal text-gray-500">
              2 reviews
            </h5>
            <div className="flex w-full items-start text-xs leading-5 text-gray-500">
              <span className="mr-1">
                <img src="images/star.svg" alt="star-icon" />
              </span>
              <span className="mr-1">
                <img src="images/star.svg" alt="star-icon" />
              </span>
              <span className="mr-1">
                <img src="images/star.svg" alt="star-icon" />
              </span>
              <span className="mr-1">
                <img src="images/star.svg" alt="star-icon" />
              </span>
              <span className="mr-1">
                <img src="images/star.svg" alt="star-icon" />
              </span>
              <span className="ml-1">3 Weeks ago</span>
            </div>
          </div>
        </div>
        <div className="w-full pt-3 text-sm font-normal leading-6 text-gray-500">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            <a href="#" className="font-semibold">
              More.
            </a>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserRatingCard;
