import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiSolidCircle, BiCircle } from "react-icons/bi";
import { PiStarFill } from "react-icons/pi";

type OrderCardProps = {
  id: number;
  purchasePrice: string;
  productName: string;
  produtctImage?: { id: number; image: string }[];
  productColor?: string;
  orderStatus: string;
  orderDate: string;
};

const OrderCard: React.FC<OrderCardProps> = ({
  id,
  purchasePrice,
  productName,
  produtctImage,
  productColor,
  orderStatus,
  orderDate,
}) => {
  return (
    <Link href={`/my-orders/${id}`}>
      <div className="my-order-box mb-4">
        <figure>
          <div className="image-container rounded border border-gray-300">
            <Image
              src={
                produtctImage?.[0].image || "/images/product-placeholder.png"
              }
              alt="preview-product"
              width={120}
              height={120}
            />
          </div>
          <figcaption>
            <h3>
              {productName} {productColor ? productColor : ""}
            </h3>
            <p>{productColor ? `Color: ${productColor}` : ""}</p>
          </figcaption>
        </figure>
        <div className="center-price-info">
          <h4>${purchasePrice}</h4>
        </div>
        <div className="right-info">
          <h4>
            <BiCircle color="green" />
            Placed on{" "}
            {orderDate
              ? new Date(orderDate).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : ""}
            {/* <BiSolidCircle color="green" /> Delivered on Mar 29 */}
          </h4>
          <p>
            {orderStatus === "CONFIRMED"
              ? "Your order has been placed"
              : "Your Item has been delivered"}
          </p>
          <a href="#" className="ratingLink">
            <PiStarFill />
            Rate & Review Product
          </a>
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
