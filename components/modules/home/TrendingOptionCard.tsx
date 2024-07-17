import Image from "next/image";
import React from "react";
import { MdOutlineImageNotSupported } from "react-icons/md";

type TrendingOptionCardProps = {
  item: any;
};

const TrendingOptionCard: React.FC<TrendingOptionCardProps> = ({ item }) => {
  return (
    <li className="mb-2 w-3/6 text-center sm:w-1/5 md:w-auto">
      <a
        href="#"
        className="flex flex-col items-center border-b border-solid border-transparent p-1 text-xs font-normal capitalize text-light-gray lg:p-3 lg:text-sm"
      >
        {item?.path ? (
          <Image
            src={item?.path}
            className="mb-3 object-contain"
            height={36}
            width={36}
            alt={item?.name}
          />
        ) : (
          <MdOutlineImageNotSupported size={36} className="mb-3" />
        )}
        <span>{item?.name}</span>
      </a>
    </li>
  );
};

export default TrendingOptionCard;
