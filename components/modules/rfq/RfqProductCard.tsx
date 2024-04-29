import React from "react";
import validator from "validator";

type RfqProductCardProps = {
  id: number;
  productType: "R" | "P";
  productName: string;
  productNote: string;
  productStatus: string;
  productImages: {
    imageName: string;
  }[];
};

const RfqProductCard: React.FC<RfqProductCardProps> = ({
  id,
  productType,
  productName,
  productNote,
  productStatus,
  productImages,
}) => {
  return (
    <div className="product_list_part">
      <div className="product_list_image">
        <img
          alt="pro-5"
          src={
            productImages && validator.isURL(productImages?.[0].imageName)
              ? productImages[0].imageName
              : "/images/product-placeholder.png"
          }
        />
      </div>
      <div className="product_list_content">
        <p>{productName}</p>
        <div className="quantity_wrap">
          <label>Quantity</label>
          <div className="quantity">
            <button className="adjust_field minus">-</button>
            <input type="text" value="1" />
            <button className="adjust_field plus">+</button>
          </div>
        </div>
        <div className="cart_button">
          <button type="button" className="add_to_cart_button">
            Add To RFQ Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default RfqProductCard;
