import Image from "next/image";
import React from "react";
import validator from "validator";

type ProductImagesCardProps = {
  productDetails: any;
};

const ProductImagesCard: React.FC<ProductImagesCardProps> = ({
  productDetails,
}) => {
  return (
    <div className="product-view-s1-left">
      <div className="product-view-s1">
        <div className="product-view-s1-big-image">
            <img
              src={
                productDetails?.productImages?.[0]?.image &&
                validator.isURL(productDetails.productImages[0].image)
                  ? productDetails?.productImages?.[0]?.image
                  : "/images/product-placeholder.png"
              }
              alt="primary-image"
            />
        </div>

        <div className="product-view-s1-thumb-lists">
          {productDetails?.productImages?.map((item: any, index: number) =>
            index !== 0 ? (
              <div className="thumb-item" key={item?.id}>
                <div className="image-container">
                <img
                  src={
                    item?.image && validator.isURL(item.image)
                      ? item.image
                      : "/images/product-placeholder.png"
                  }
                  alt="primary-image"
                />
              </div>
              </div>
            ) : null,
          )}
        </div>
      </div>
      <div className="cart-actions">
        <button type="button" className="custom-btn cart-btn">Add To Cart</button>
        <button type="button" className="custom-btn theme-primary-btn">Buy Now</button>
      </div>
    </div>
  );
};

export default ProductImagesCard;
