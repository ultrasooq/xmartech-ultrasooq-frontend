import { Button } from "@/components/ui/button";
import { DELIVERY_STATUS, formattedDate } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { BiSolidCircle, BiCircle } from "react-icons/bi";
import { PiStarFill } from "react-icons/pi";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import ReviewForm from "@/components/shared/ReviewForm";

type OrderCardProps = {
  id: number;
  productId: number;
  purchasePrice: string;
  productName: string;
  produtctImage?: { id: number; image: string }[];
  productColor?: string;
  orderId: string;
  orderStatus: string;
  orderProductDate: string;
  updatedAt: string;
  // productReview: { productId: number }[];
};

const OrderCard: React.FC<OrderCardProps> = ({
  id,
  productId,
  purchasePrice,
  productName,
  produtctImage,
  productColor,
  orderId,
  orderStatus,
  orderProductDate,
  updatedAt,
  // productReview,
}) => {
  // const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  // const [reviewId, setReviewId] = useState<number>();

  // const handleToggleReviewModal = () =>
  // setIsReviewModalOpen(!isReviewModalOpen);

  // const reviewExists = useMemo(() => {
  //   return productReview?.some(
  //     (item: { productId: number }) => item.productId === id,
  //   );
  // }, [productReview?.length, id]);

  return (
    <div className="my-order-card">
      <h5 className="mb-2">
        Order ID: <span className="font-semibold">{orderId}</span>
      </h5>
      <div className="my-order-box">
        <Link href={`/my-orders/${id}`}>
          <figure>
            <div className="image-container rounded border border-gray-300">
              <Image
                src={
                  produtctImage?.[0]?.image || "/images/product-placeholder.png"
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
          <p>{DELIVERY_STATUS[orderStatus]}</p>

          {orderStatus === "DELIVERED" ? (
            <Link
              href={`/trending/${productId}?type=reviews`}
              className="ratingLink"
            >
              <PiStarFill />
              Rate & Review Product
            </Link>
          ) : null}
        </div>
      </div>
      {/* <Dialog open={isReviewModalOpen} onOpenChange={handleToggleReviewModal}>
        <DialogContent>
          <ReviewForm
            onClose={() => {
              setReviewId(undefined);
              handleToggleReviewModal();
            }}
            reviewId={reviewId}
          />
        </DialogContent>
      </Dialog> */}
    </div>
  );
};

export default OrderCard;
