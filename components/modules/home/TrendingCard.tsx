import React from "react";
import Image from "next/image";
import { MdOutlineImageNotSupported } from "react-icons/md";
import Link from "next/link";

type TrendingCardProps = {
  item: any;
};

const TrendingCard: React.FC<TrendingCardProps> = ({ item }) => {
  return (
    <Link
      href="#"
      className="flex flex-col items-center justify-start p-2 text-xs font-normal capitalize text-light-gray lg:text-base"
    >
      <div className="relative mb-3 h-20 w-20">
        {item?.path ? (
          <Image
            src={item?.path}
            className="object-contain"
            // height={70}
            // width={100}
            fill
            alt={item?.name}
          />
        ) : (
          <MdOutlineImageNotSupported size={80} className="mb-3" />
        )}
      </div>
      <span className="text-beat text-center">{item?.name}</span>
    </Link>
  );
};

export default TrendingCard;
