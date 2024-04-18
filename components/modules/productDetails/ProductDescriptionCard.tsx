import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { Skeleton } from "@/components/ui/skeleton";

type ProductDescriptionCardProps = {
  productName: string;
  brand: string;
  productPrice: string;
  offerPrice: string;
  skuNo: string;
  productTags: any[];
  category: string;
  productShortDescription: string;
  productQuantity: number;
  onAdd: (args0: number) => void;
  isLoading: boolean;
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
  onAdd,
  isLoading,
}) => {
  const [quantity, setQuantity] = useState(1);

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
          <div className="brand_sold_info">
            <div className="lediv">
              <h5>
                <span>Brand:</span> {brand}
              </h5>
            </div>
            <div className="rgdiv">
              <h5>
                <span>Sold By:</span> YOUNG SHOP
              </h5>
            </div>
          </div>
          <div className="rating">
            <img src="images/star.png" alt="" />
            <span>(5 Reviews)</span>
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
                <div className="form-group">
                  {productShortDescription ? (
                    <ReactQuill
                      theme="snow"
                      value={productShortDescription}
                      readOnly
                      modules={{
                        toolbar: false,
                      }}
                      className="readonly-quill"
                    />
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
            <div className="left-qty">
              <label>Quantity</label>
              <div className="flex w-28 items-center justify-center gap-x-8">
                <button
                  type="button"
                  className="upDownBtn minus"
                  onClick={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                      onAdd(quantity - 1);
                    }
                  }}
                  disabled={quantity === 1}
                >
                  <img src="images/upDownBtn-minus.svg" alt="" />
                </button>
                <p>{quantity}</p>
                <button
                  type="button"
                  className="upDownBtn plus"
                  onClick={() => {
                    setQuantity(quantity + 1);
                    onAdd(quantity + 1);
                  }}
                >
                  <img src="images/upDownBtn-plus.svg" alt="" />
                </button>
              </div>
            </div>

            <div className="right-payment-info">
              <ul>
                <li>
                  <img src="/images/securePaymenticon.svg" alt="" />
                  <span>Secure Payment</span>
                </li>
                <li>
                  <img src="/images/support-24hr.svg" alt="" />
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDescriptionCard;
