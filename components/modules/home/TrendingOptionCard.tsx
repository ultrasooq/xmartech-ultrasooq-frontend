import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdOutlineImageNotSupported } from "react-icons/md";

type TrendingOptionCardProps = {
  item: any;
};

const TrendingOptionCard: React.FC<TrendingOptionCardProps> = ({ item }) => {
  return (
    <Link
      href="#"
      className="flex flex-col items-center justify-start border-b border-solid border-transparent p-2 text-xs font-normal capitalize text-light-gray lg:text-sm"
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
      <span className="text-center">{item?.name}</span>
    </Link>
  );
};

export default TrendingOptionCard;
