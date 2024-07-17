import React from "react";
import Image from "next/image";
import { MdOutlineImageNotSupported } from "react-icons/md";

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
        {item?.path ? (
          <Image
            src={item?.path}
            className="mb-3 object-contain"
            height={70}
            width={100}
            alt={item?.name}
          />
        ) : (
          <MdOutlineImageNotSupported size={100} className="mb-3" />
        )}
        <span>#{item?.name}</span>
      </a>
    </div>
  );
};

export default TrendingCard;
