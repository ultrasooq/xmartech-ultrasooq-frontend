import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiSolidCircle } from "react-icons/bi";

type OtherItemCardProps = {
  id: number;
  productName: string;
  offerPrice: string;
  productImages?: { id: number; image: string }[];
};

const OtherItemCard: React.FC<OtherItemCardProps> = ({
  id,
  productName,
  offerPrice,
  productImages,
}) => {
  return (
    <Link href={`/my-orders/${id}`}>
      <div className="my-order-item">
        <div className="my-order-card">
          <div className="cardTitle">Other Items in this order</div>
          <div className="my-order-box">
            <figure>
              <div className="image-container">
                <Image
                  src={
                    productImages?.[0]?.image ||
                    "/images/product-placeholder.png"
                  }
                  alt="preview-product"
                  width={120}
                  height={120}
                  placeholder="blur"
                  blurDataURL="/images/product-placeholder.png"
                />
              </div>
              <figcaption>
                <h3>{productName}</h3>
                {/* <p>Color: B.A.E Black</p> */}
                {/* TODO: need seller data */}
                <p className="mt-1">Seller: Mythsx-Retail</p>
                <h4 className="mt-1">${offerPrice}</h4>
              </figcaption>
            </figure>
            <div className="right-info">
              <h4>
                <BiSolidCircle color="green" /> Delivered on Mar 21
              </h4>
              <p>Return policy ended on Mar 28</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OtherItemCard;
