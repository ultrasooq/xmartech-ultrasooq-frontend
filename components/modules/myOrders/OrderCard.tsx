import { Button } from "@/components/ui/button";
import { DELIVERY_STATUS, formattedDate } from "@/utils/constants";
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
  orderProductDate: string;
  updatedAt: string;
};

const OrderCard: React.FC<OrderCardProps> = ({
  id,
  purchasePrice,
  productName,
  produtctImage,
  productColor,
  orderStatus,
  orderProductDate,
  updatedAt,
}) => {
  return (
    <Link href={`/my-orders/${id}`}>
      <div className="my-order-card">
        <div className="my-order-box">
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
              {orderStatus === "CONFIRMED" ? (
                <>
                  <BiCircle color="green" />
                  Placed on{" "}
                  {orderProductDate ? formattedDate(orderProductDate) : ""}
                </>
              ) : null}
              {orderStatus === "SHIPPED" ? (
                <>
                  <BiCircle color="green" /> Shipped on{" "}
                  {updatedAt ? formattedDate(updatedAt) : ""}
                </>
              ) : null}
              {orderStatus === "OFD" ? (
                <>
                  <BiCircle color="green" /> Out for delivery{" "}
                  {updatedAt ? formattedDate(updatedAt) : ""}
                </>
              ) : null}
              {orderStatus === "DELIVERED" ? (
                <>
                  <BiSolidCircle color="green" /> Delivered on{" "}
                  {updatedAt ? formattedDate(updatedAt) : ""}
                </>
              ) : null}
              {orderStatus === "CANCELLED" ? (
                <>
                  <BiSolidCircle color="red" /> Cancelled on{" "}
                  {updatedAt ? formattedDate(updatedAt) : ""}
                </>
              ) : null}
            </h4>
            <p>{DELIVERY_STATUS[orderStatus]}</p>

            {orderStatus === "DELIVERED" ? (
              <Button variant="ghost" className="ratingLink">
                <PiStarFill />
                Rate & Review Product
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
