import { TrendingProduct } from "@/utils/types/common.types";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import validator from "validator";

type ProducCardProps = {
  item: TrendingProduct;
};

const ProductCard: React.FC<ProducCardProps> = ({ item }) => {
  const offerPercentage = useMemo(
    () => Math.floor(100 - (item.offerPrice / item.productPrice) * 100),
    [item.offerPrice, item.productPrice],
  );

  return (
    <div className="product-list-s1-col">
      <div className="product-list-s1-box  cursor-pointer hover:bg-slate-100">
        <Link href={`/buygroup?id=${item.id}`}>
          <div className="absolute right-2.5 top-2.5 z-10 inline-block rounded bg-dark-orange px-2.5 py-2 text-lg font-medium capitalize leading-5 text-white">
            <span>{!isNaN(offerPercentage) ? offerPercentage : 0}%</span>
          </div>
          <div className="relative mx-auto mb-4 h-36 w-36">
            <Image
              src={
                item?.productImage && validator.isURL(item.productImage)
                  ? item.productImage
                  : "/images/product-placeholder.png"
              }
              alt="product-image"
              fill
            />
          </div>

          <div className="relative w-full text-sm font-normal capitalize text-color-blue lg:text-base">
            <h4 className="mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase text-color-dark">
              {item.productName}
            </h4>
            <p title={item.shortDescription} className="truncate">
              {item.shortDescription}
            </p>
            <div className="rating_stars">
              <Image
                src="/images/rating_stars.svg"
                alt="star-icon"
                width={85}
                height={15}
                className="mt-3"
              />
              <span>02</span>
            </div>
            <h5>${item.offerPrice}</h5>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
