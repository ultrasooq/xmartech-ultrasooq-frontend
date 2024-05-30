import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import SecurePaymentIcon from "@/public/images/securePaymenticon.svg";
import SupportIcon from "@/public/images/support-24hr.svg";
// import MinusIcon from "@/public/images/upDownBtn-minus.svg";
// import PlusIcon from "@/public/images/upDownBtn-plus.svg";
import Link from "next/link";

type ProductDescriptionCardProps = {
  productName: string;
  brand: string;
  productPrice: string;
  offerPrice: string;
  skuNo: string;
  productTags: any[];
  category: string;
  productShortDescription: any[];
  productQuantity: number;
  productReview: { rating: number }[];
  onAdd: (args0: number, args2: "add" | "remove") => void;
  isLoading: boolean;
  soldBy: string;
};

const ProductDescriptionCard: React.FC<ProductDescriptionCardProps> = ({
  productName,
  brand,
  productPrice,
  offerPrice,
  skuNo,
  productTags,
  category,
  productShortDescription,
  productQuantity,
  productReview,
  onAdd,
  isLoading,
  soldBy,
}) => {
  const [quantity, setQuantity] = useState(1);

  const calculateAvgRating = useMemo(() => {
    const totalRating = productReview?.reduce(
      (acc: number, item: { rating: number }) => {
        return acc + item.rating;
      },
      0,
    );

    const result = totalRating / productReview?.length;
    return !isNaN(result) ? Math.floor(result) : 0;
  }, [productReview?.length]);

  const calculateRatings = useMemo(
    () => (rating: number) => {
      const stars = [];
      for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
          stars.push(<FaStar key={i} color="#FFC107" size={20} />);
        } else {
          stars.push(<FaRegStar key={i} color="#FFC107" size={20} />);
        }
      }
      return stars;
    },
    [productReview?.length],
  );

  useEffect(() => {
    setQuantity(productQuantity || 1);
  }, [productQuantity]);

  return (
    <div className="product-view-s1-right">
      {isLoading ? <Skeleton className="mb-2 h-10 w-full" /> : null}
      <div className="info-col">
        <h2>{productName}</h2>
      </div>
      {isLoading ? (
        <Skeleton className="mb-2 h-28 w-full" />
      ) : (
        <div className="info-col mb-2">
          <div className="brand_sold_info !items-start">
            <div className="lediv w-1/2">
              <h5>
                <span>Brand:</span> {brand}
              </h5>
            </div>

            <div className="rgdiv flex w-1/2 gap-x-2">
              <h5 className="!w-20 !capitalize !text-dark-orange">Sold By:</h5>
              <h5>{soldBy}</h5>
            </div>
          </div>
          <div className="rating">
            {calculateRatings(calculateAvgRating)}
            <span className="mt-1">({productReview?.length} Reviews)</span>
          </div>
          <h3>
            ${offerPrice} <span>${productPrice}</span>
          </h3>
        </div>
      )}

      {isLoading ? (
        <Skeleton className="h-44 w-full" />
      ) : (
        <div className="info-col">
          <div className="row">
            <div className="col-12 col-md-12">
              <div className="col-12 col-md-12">
                <div className="form-group min-h-[160px] pl-8">
                  {productShortDescription?.length ? (
                    <ul className="list-disc">
                      {productShortDescription?.map((item) => (
                        <li key={item?.id}>{item?.shortDescription}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No Description</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="info-col top-btm-border">
        <div className="form-group mb-0">
          <div className="quantity-with-right-payment-info">
            {/* TODO: ask whether to keep or not */}
            {/* <div className="left-qty">
              <label>Quantity</label>
              <div className="flex w-28 items-center justify-center gap-x-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                      onAdd(quantity - 1, "remove");
                    }
                  }}
                  className="relative hover:shadow-sm"
                  disabled={quantity === 1}
                >
                  <Image
                    src={MinusIcon}
                    alt="minus-icon"
                    fill
                    className="p-[10px]"
                  />
                </Button>
                <p>{quantity}</p>
                <Button
                  variant="outline"
                  className="relative hover:shadow-sm"
                  onClick={() => {
                    setQuantity(quantity + 1);
                    onAdd(quantity + 1, "add");
                  }}
                >
                  <Image src={PlusIcon} alt="plus-icon" fill className="p-3" />
                </Button>
              </div>
            </div> */}

            <div className="right-payment-info">
              <ul>
                <li>
                  <Image
                    src={SecurePaymentIcon}
                    alt="secure-payment-icon"
                    width={28}
                    height={22}
                  />
                  <span>Secure Payment</span>
                </li>
                <li>
                  <Image
                    src={SupportIcon}
                    alt="support-24hr-icon"
                    width={28}
                    height={28}
                  />
                  <span>Secure Payment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <Skeleton className="h-28 w-full" />
      ) : (
        <div className="info-col">
          <div className="row">
            <div className="col-12 col-md-12">
              <div className="form-group mb-0">
                <label>Report Abuse</label>
                <p>
                  <span className="color-text">SKU:</span> {skuNo}
                </p>
                <p>
                  <span className="color-text">Categories:</span> {category}
                </p>
                <p>
                  <span className="color-text">Tags:</span>{" "}
                  {productTags
                    ?.map((item) => item.productTagsTag?.tagName)
                    .join(", ")}
                </p>
                <Link href="/other-sellers" className="font-bold text-red-500">
                  See other sellers
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDescriptionCard;
