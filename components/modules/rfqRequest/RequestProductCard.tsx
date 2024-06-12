import React from "react";
import Image from "next/image";
import PlaceholderImage from "@/public/images/product-placeholder.png";
import { cn } from "@/lib/utils";

type RequestProductCardProps = {
  rfqId?: number;
  onClick?: () => void;
  isSelected?: boolean;
};

const RequestProductCard: React.FC<RequestProductCardProps> = ({
  rfqId,
  onClick,
  isSelected,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full flex-wrap bg-white px-[10px] py-[15px] shadow-lg",
        isSelected ? "bg-[#F8F8F8]" : "",
      )}
    >
      <div className="border-color-[#DBDBDB] h-auto w-16 border border-solid p-1">
        <Image src={PlaceholderImage} alt="placeholder" />
      </div>
      <div className="font-nromal flex w-[calc(100%-4rem)] items-center justify-start pl-3 pt-2 text-sm text-[#1D77D1]">
        <span className="text-[#828593]">RFQ ID: </span> RFQ000{rfqId}
      </div>
    </button>
  );
};

export default RequestProductCard;
