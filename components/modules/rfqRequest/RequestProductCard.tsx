import React from "react";
import Image from "next/image";
import PlaceholderImage from "@/public/images/product-placeholder.png";
import { cn } from "@/lib/utils";
import validator from "validator";

type RequestProductCardProps = {
  rfqId?: number;
  onClick?: () => void;
  isSelected?: boolean;
  productImages?: {
    id: number;
    image: string;
  }[];
};

const RequestProductCard: React.FC<RequestProductCardProps> = ({
  rfqId,
  onClick,
  isSelected,
  productImages,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full flex-col gap-y-2 bg-white px-[10px] py-[15px] shadow-lg",
        isSelected ? "bg-[#F8F8F8]" : "",
      )}
    >
      <div className="border-color-[#DBDBDB] h-auto w-full">
        <div className="flex flex-wrap gap-2 p-1">
          {productImages?.map((ele: any) => (
            <div
              key={ele?.id}
              className="relative h-14 w-14 border border-solid"
            >
              <Image
                src={
                  ele?.image && validator.isURL(ele.image)
                    ? ele.image
                    : PlaceholderImage
                }
                fill
                alt="preview"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-[calc(100%-4rem)] items-center justify-start text-sm font-normal text-[#1D77D1]">
        <span className="text-[#828593]">RFQ ID: </span> RFQ000{rfqId}
      </div>
    </button>
  );
};

export default RequestProductCard;
