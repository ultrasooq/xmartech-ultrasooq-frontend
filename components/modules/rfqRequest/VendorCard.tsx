import React from "react";
import Image from "next/image";
import RatingIcon from "@/public/images/rating.png";
import GlobalIcon from "@/public/images/global.png";

const VendorCard = () => {
  return (
    <div className="flex w-full flex-wrap rounded-md px-[10px] py-[20px]">
      <div className="h-[40px] w-[40px]">
        <Image src={GlobalIcon} alt="global-icon" />
      </div>
      <div className="flex w-[calc(100%-2.5rem)] flex-wrap items-center justify-start gap-y-1 pl-3">
        <div className="flex w-full">
          <h4 className="text-color-[#333333] text-[15px] font-normal uppercase">
            global office
          </h4>
        </div>
        <div className="flex w-full text-xs font-normal">
          <span className="text-[#7F818D]">Offer Price :</span>
          <span className="font-semibold text-[#679A03]">$500</span>
        </div>
        <div className="flex w-full">
          <Image src={RatingIcon} alt="rating-icon" />
        </div>
      </div>
    </div>
  );
};

export default VendorCard;
