import Image from "next/image";
import React from "react";

type TrendingOptionCardProps = {
  item: any;
};

const TrendingOptionCard: React.FC<TrendingOptionCardProps> = ({ item }) => {
  return (
    <li className="mb-2 w-2/6 text-center sm:w-1/5 md:w-auto">
      <a
        href="#"
        className="flex flex-col items-center border-b border-solid border-transparent p-1 text-xs font-normal capitalize text-light-gray lg:p-3 lg:text-sm"
      >
        <Image
          src={item?.path}
          className="mb-3 h-[33px] w-[40px] object-contain"
          width={0}
          height={0}
          alt="trend"
        />
        <span>{item?.name}</span>
      </a>
    </li>
  );
};

export default TrendingOptionCard;
