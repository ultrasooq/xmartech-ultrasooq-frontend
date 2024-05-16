import { formattedDate } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiSolidCircle, BiCircle } from "react-icons/bi";
import PlaceholderImage from "@/public/images/product-placeholder.png";

type OtherItemCardProps = {
  id: number;
  productName: string;
  offerPrice: string;
  orderQuantity?: number;
  productImages?: { id: number; image: string }[];
  sellerName?: string;
  orderNo: string;
  orderProductDate: string;
  orderProductStatus: string;
  updatedAt: string;
};

const OtherItemCard: React.FC<OtherItemCardProps> = ({
  id,
  productName,
  offerPrice,
  orderQuantity,
  productImages,
  sellerName,
  orderNo,
  orderProductDate,
  orderProductStatus,
  updatedAt,
}) => {
  return (
    <div className="my-order-item">
      <div className="my-order-card">
        <div className="cardTitle !mb-2">Other Items in this order</div>
        <h5 className="mb-2">
          Order ID: <span className="font-semibold">{orderNo}</span>
        </h5>
        <div className="my-order-box">
          <Link href={`/my-orders/${id}`}>
            <figure>
              <div className="image-container rounded border border-gray-300">
                <Image
                  src={productImages?.[0]?.image || PlaceholderImage}
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
                <p className="mt-1">Seller: {sellerName}</p>
                <h4 className="mt-1">
                  ${Number(offerPrice) * (orderQuantity ?? 0)}
                </h4>
              </figcaption>
            </figure>
          </Link>
          <div className="right-info">
            <h4 className="mb-2">
              {orderProductStatus === "CONFIRMED" ? (
                <>
                  <BiCircle color="green" />
                  Placed on{" "}
                  {orderProductDate ? formattedDate(orderProductDate) : ""}
                </>
              ) : null}

              {orderProductStatus === "SHIPPED" ? (
                <>
                  <BiCircle color="green" />
                  Shipped on {updatedAt ? formattedDate(updatedAt) : ""}
                </>
              ) : null}

              {orderProductStatus === "OFD" ? (
                <>
                  <BiCircle color="green" /> Out for delivery{" "}
                  {updatedAt ? formattedDate(updatedAt) : ""}
                </>
              ) : null}

              {orderProductStatus === "DELIVERED" ? (
                <>
                  <BiSolidCircle color="green" /> Delivered on{" "}
                  {updatedAt ? formattedDate(updatedAt) : ""}
                </>
              ) : null}

              {orderProductStatus === "CANCELLED" ? (
                <>
                  <BiSolidCircle color="red" /> Cancelled on{" "}
                  {updatedAt ? formattedDate(updatedAt) : ""}
                </>
              ) : null}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherItemCard;
