import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";

type SameBrandProductCardProps = {
  id: number;
  productName: string;
  productImages: { id: number; image: string }[];
  shortDescription: string;
  productPrice: string;
  offerPrice: string;
  onAdd?: () => void;
  onView: () => void;
};

const SameBrandProductCard: React.FC<SameBrandProductCardProps> = ({
  id,
  productName,
  productImages,
  shortDescription,
  productPrice,
  offerPrice,
  onAdd,
  onView,
}) => {
  const offerPercentage = useMemo(
    () => Math.floor(100 - (Number(offerPrice) / Number(productPrice)) * 100),
    [offerPrice, productPrice],
  );

  return (
    <div className="product-list-s1-col">
      <div className="product-list-s1-box">
        <div className="image-container relative mb-4">
          <span className="discount">
            {!isNaN(offerPercentage) ? offerPercentage : 0}%
          </span>
          <Image
            src={productImages?.[0]?.image || "/images/product-placeholder.png"}
            alt="preview"
            fill
          />
        </div>
        <div className="multiple-action-container">
          <Button type="button" className="circle-btn">
            <Image
              src="/images/shopping-icon.svg"
              alt="shopping-icon"
              width={16}
              height={16}
            />
          </Button>
          <Button onClick={onView} className="circle-btn">
            <Image
              src="/images/eye-icon.svg"
              alt="eye-icon"
              width={16}
              height={16}
            />
          </Button>
          {/* <Link href={`/buygroup?id=${id}`} className="circle-btn">
            <Image
              src="/images/eye-icon.svg"
              alt="eye-icon"
              width={16}
              height={16}
            />
          </Link> */}
          <Button type="button" className="circle-btn">
            <Image
              src="/images/heart-icon.svg"
              alt="heart-icon"
              width={16}
              height={16}
            />
          </Button>
          <Button type="button" className="circle-btn">
            <Image
              src="/images/compare-icon.svg"
              alt="compare-icon"
              width={16}
              height={16}
            />
          </Button>
        </div>
        <div className="text-container">
          <h4>{productName}</h4>
          <p title={shortDescription} className="truncate">
            {shortDescription}
          </p>
          <div className="rating_stars">
            <Image
              src="/images/rating_stars.svg"
              alt="star-icon"
              width={85}
              height={15}
            />
            <span>02</span>
          </div>
          <h5>${offerPrice}</h5>
        </div>
      </div>
    </div>
  );
};

export default SameBrandProductCard;
