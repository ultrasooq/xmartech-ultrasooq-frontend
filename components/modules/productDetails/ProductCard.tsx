import Image from "next/image";
import React, { useMemo } from "react";

type ProductCardProps = {
  id: number;
  productName: string;
  productImages: { id: number; image: string }[];
  shortDescription: string;
  offerPrice: number;
  productPrice: number;
  onView: () => void;
};

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  productName,
  productImages,
  shortDescription,
  offerPrice,
  productPrice,
  onView,
}) => {
  const offerPercentage = useMemo(
    () => Math.floor(100 - (Number(offerPrice) / Number(productPrice)) * 100),
    [offerPrice, productPrice],
  );

  return (
    <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
      <div className="absolute right-2.5 top-2.5 z-10 inline-block rounded bg-dark-orange px-2.5 py-2 text-lg font-medium capitalize leading-5 text-white">
        <span>{!isNaN(offerPercentage) ? offerPercentage : 0}%</span>
      </div>
      <div className="relative mx-auto mb-4 h-36 w-36">
        <Image
          src={productImages?.[0]?.image || "/images/product-placeholder.png"}
          alt="preview"
          fill
        />
      </div>
      <div className="relative w-full text-sm font-normal capitalize text-color-blue lg:text-base">
        <h4 className="mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase text-color-dark">
          {productName}
        </h4>
        <div className="mt-2.5 w-full">
          <h4 className="font-lg font-normal uppercase text-olive-green">
            ${offerPrice}
          </h4>
        </div>
        <p className="truncate" title={shortDescription}>
          {shortDescription}
        </p>
        <Image
          src="/images/rating_stars.svg"
          alt="star-icon"
          width={85}
          height={15}
          className="mt-3"
        />
        <span className="w-auto text-base font-normal text-light-gray">
          ${productPrice}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
