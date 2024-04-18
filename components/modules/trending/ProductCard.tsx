import { TrendingProduct } from "@/utils/types/common.types";
import Image from "next/image";
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
        <a href={`/buygroup?id=${item.id}`} className="">
          <div className="image-container ">
            <span className="discount">{offerPercentage}%</span>
            <img
              src={
                item?.productImage && validator.isURL(item.productImage)
                  ? item.productImage
                  : "/images/product-placeholder.png"
              }
              alt="product-image"
            />
          </div>
          <div className="text-container">
            <h4>{item.productName}</h4>
            <p>{item.shortDescription}</p>
            <div className="rating_stars">
              <img src="/images/rating_stars.svg" alt="" />
              <span>02</span>
            </div>
            <h5>${item.offerPrice}</h5>
          </div>
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
