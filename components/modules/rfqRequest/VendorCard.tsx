import React from "react";
import Image from "next/image";
import RatingIcon from "@/public/images/rating.png";
import GlobalIcon from "@/public/images/global.png";
import { cn } from "@/lib/utils";

type VendorCardProps = {
  offerPrice: string;
  name: string;
  profilePicture: string;
  onClick?: () => void;
  isSelected?: boolean;
};

const VendorCard: React.FC<VendorCardProps> = ({
  offerPrice,
  name,
  profilePicture,
  onClick,
  isSelected,
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
          src={profilePicture || GlobalIcon}
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
        <div className="flex w-full">
          <Image src={RatingIcon} alt="rating-icon" />
        </div>
      </div>
    </button>
  );
};

export default VendorCard;
