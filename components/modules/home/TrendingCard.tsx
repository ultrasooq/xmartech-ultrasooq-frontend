import React from "react";
import Image from "next/image";

type TrendingCardProps = {
  item: any;
};

const TrendingCard: React.FC<TrendingCardProps> = ({ item }) => {
  return (
    <div className="my-3.5 flex w-auto items-end justify-center text-center">
      <a
        href="#"
        className="max-w-full text-xs font-normal capitalize text-light-gray lg:text-base"
      >
        <div className="mb-3">
          <Image
            src={item?.path}
            className="h-[70px] w-[100px] object-contain"
            alt={item?.name}
          />
        </div>
        <span>#{item?.name}</span>
      </a>
    </div>
  );
};

export default TrendingCard;
