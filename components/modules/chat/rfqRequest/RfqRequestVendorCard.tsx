import React from "react";
import Image from "next/image";
import moment from "moment";
import { cn } from "@/lib/utils";
import AvatarPlaceholder from "@/public/images/no-user-image.png";

type VendorCardProps = {
  offerPrice: string;
  name: string;
  profilePicture: string;
  onClick?: () => void;
  isSelected?: boolean;
  seller: {
    firstName: string;
    lastName: string;
    profilePicture: string;
    unreadMsgCount: number;
    latestMessageContent: string;
    latestMessageCreatedAt: string;
  }
};

const VendorCard: React.FC<VendorCardProps> = ({
  offerPrice,
  name,
  profilePicture,
  onClick,
  isSelected,
  seller
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full flex-wrap rounded-md px-[10px] py-[20px]",
        isSelected ? "shadow-lg" : "",
      )}
    >
      <div className="relative h-[40px] w-[40px] rounded-full">
        <Image
          src={profilePicture || AvatarPlaceholder}
          alt="global-icon"
          fill
          className="rounded-full"
        />
      </div>
      <div className="flex w-[calc(100%-2.5rem)] flex-wrap items-center justify-start gap-y-1 pl-3">
        <div className="flex w-full">
          <h4 className="text-color-[#333333] text-left text-[15px] font-normal uppercase">
            {name ? name : "-"}
          </h4>
        </div>
        <div className="flex w-full text-xs font-normal">
          <span className="text-[#7F818D]">Offer Price :</span>
          <span className="font-semibold text-[#679A03]">
            {offerPrice ? `$${offerPrice}` : "-"}
          </span>
        </div>

        <div>
          <div className="flex space-x-2 p-2">
            <div className="flex items-center space-x-1">
              <div className="text-xs font-normal text-gray-500">
                {seller?.latestMessageContent}
              </div>
              {seller?.unreadMsgCount ? (
                <div className="flex items-center justify-center h-5 w-5 text-xs font-semibold text-white bg-blue-500 rounded-full">
                  {seller?.unreadMsgCount}
                </div>
              ) : null}
            </div>
          </div>
          {seller?.latestMessageCreatedAt && (
            <div className="w-full text-right text-xs font-normal text-[#AEAFB8]">
              <span>
                {seller.latestMessageCreatedAt
                  ? moment(seller.latestMessageCreatedAt)
                    .startOf("seconds")
                    .fromNow()
                  : ""}
              </span>
            </div>
          )}
        </div>


        {/* <div className="flex w-full">
          <Image src={RatingIcon} alt="rating-icon" />
        </div> */}
      </div>
    </button>
  );
};

export default VendorCard;
