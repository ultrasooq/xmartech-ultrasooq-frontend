import React from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

type ProductDescriptionCardProps = {
  productDetails: any;
};

const ProductDescriptionCard: React.FC<ProductDescriptionCardProps> = ({
  productDetails,
}) => {
  return (
    <div className="product-view-s1-right">
      <div className="info-col">
        <h2>{productDetails?.productName}</h2>
      </div>
      <div className="info-col mb-2">
        <div className="brand_sold_info">
          <div className="lediv">
            <h5><span>Brand:</span> new</h5>
          </div>
          <div className="rgdiv">
            <h5><span>Sold By:</span> YOUNG SHOP</h5>
          </div>
        </div>
        <div className="rating">
          <img src="images/star.png" alt="" />
          <span>(5 Reviews)</span>
        </div>
        <h3>
          ${productDetails?.offerPrice}{" "}
          <span>${productDetails?.productPrice}</span>
        </h3>

      </div>
      <div className="info-col">
        <div className="row">

          <div className="col-12 col-md-12">
            <div className="col-12 col-md-12">
              <div className="form-group">
                <ul className="ul-lists-style-s1">
                  <li>The standard chunk of Lorem Ipsum</li>
                  <li>The standard chunk of Lorem Ipsum</li>
                  <li>It is a long established fact that a reader</li>
                  <li>Double-ended Coil Cord with 3.5mm Stereo Plugs Included</li>
                  <li>It is a long established fact that a reader</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="info-col top-btm-border">
        <div className="form-group mb-0">
          <div className="quantity-with-right-payment-info">
            <div className="left-qty">
              <label>Quantity</label>
              <div className="qty-up-down-s1">
                <input type="number" className="custom-form-control-s1"></input>
                <button type="button" className="upDownBtn minus">
                  <img src="images/upDownBtn-minus.svg" alt="" />
                </button>
                <button type="button" className="upDownBtn plus">
                  <img src="images/upDownBtn-plus.svg" alt="" />
                </button>
              </div>
            </div>
            <div className="right-payment-info">
              <ul>
                <li>
                <img src="/images/securePaymenticon.svg" alt=""/>
                  <span>Secure Payment</span>
                </li>
                <li>
                  <img src="/images/support-24hr.svg" alt=""/>
                  <span>Secure Payment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="info-col">
        <div className="row">
          <div className="col-12 col-md-12">
            <div className="form-group mb-0">
              <label>Report Abuse</label>
              <p>
                <span className="color-text">SKU:</span> SF1133569600-1
              </p>
              <p>
                <span className="color-text">Categories:</span> Consumer Electronics, Refrigerator Babies & Moms
              </p>
              <p>
                <span className="color-text">Tags:</span> sofa, technologies, wireless
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescriptionCard;
