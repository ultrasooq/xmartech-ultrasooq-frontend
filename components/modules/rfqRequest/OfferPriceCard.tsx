import React from "react";
import Image from "next/image";
import ProIcon from "@/public/images/pro-2.png";

const OfferPriceCard = () => {
  return (
    <div className="w-full border-b border-solid border-gray-300 p-4">
      <div className="flex w-full">
        <div className="w-[25%] text-xs font-normal text-gray-500">
          <div className="flex w-full flex-wrap">
            <div className="border-color-[#DBDBDB] h-auto w-[48px] border border-solid p-1">
              <Image src={ProIcon} alt="pro-icon" />
            </div>
            <div className="font-nromal flex w-[calc(100%-3rem)] items-center justify-start pl-3 text-xs text-black">
              Lorem Ipsum is simply dummy text..
            </div>
          </div>
        </div>
        <div className="w-[15%] p-4 text-xs font-normal text-black">
          Oct 21, 2024
        </div>
        <div className="w-[10%] p-4 text-xs font-normal text-black">New</div>
        <div className="w-[20%] p-4 text-xs font-normal text-black">1</div>
        <div className="w-[10%] p-4 text-xs font-normal text-black">
          $100.00
        </div>
        <div className="w-[20%] p-4 text-xs font-normal text-black">
          Address
        </div>
      </div>
      <div className="mt-3 flex w-full flex-wrap rounded-lg border border-solid border-gray-300 p-4">
        <span className="mb-2 text-sm font-normal text-gray-500">
          Vendor Note:
        </span>
        <p className="text-sm font-normal text-black">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book
        </p>
      </div>
    </div>
  );
};

export default OfferPriceCard;
