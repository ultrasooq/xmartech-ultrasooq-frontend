import React from "react";
import Image from "next/image";
import ProIcon from "@/public/images/pro-2.png";
import PlaceholderImage from "@/public/images/product-placeholder.png";

const RequestProductCard = () => {
  return (
    <div className="flex w-full flex-wrap bg-white px-[20px] py-[25px] shadow-lg">
      <div className="border-color-[#DBDBDB] h-auto w-20 border border-solid p-1">
        <Image src={PlaceholderImage} alt="placeholder" />
      </div>
      <div className="font-nromal flex w-[calc(100%-5rem)] items-center justify-start pl-3 text-sm text-[#1D77D1]">
        Lorem Ipsum is simply dummy text..
      </div>
    </div>
  );
};

export default RequestProductCard;
