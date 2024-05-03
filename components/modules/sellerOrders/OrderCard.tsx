import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SELLER_DELIVERY_STATUS, formattedDate } from "@/utils/constants";
import { BiSolidCircle, BiCircle } from "react-icons/bi";

type OrderCardProps = {
  id: number;
  purchasePrice: string;
  productName: string;
  produtctImage?: { id: number; image: string }[];
  productColor?: string;
  orderId: string;
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
  orderId,
  orderStatus,
  orderProductDate,
  updatedAt,
}) => {
  return (
    <div className="my-order-card">
      <h5 className="mb-2">
        Order ID: <span className="font-semibold">{orderId}</span>
      </h5>
      <div className="my-order-box">
        <Link href={`/seller-orders/${id}`}>
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
        </Link>
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
          <p>{SELLER_DELIVERY_STATUS[orderStatus]}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
