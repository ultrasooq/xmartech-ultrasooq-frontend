import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type ProductCardProps = {
  cartId: number;
  productId: number;
  productName: string;
  offerPrice: string;
  productQuantity: number;
  productImages: { id: number; image: string }[];
  onAdd: (args0: number, args1: number, args2: "add" | "remove") => void;
  onRemove: (args0: number) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({
  cartId,
  productId,
  productName,
  offerPrice,
  productQuantity,
  productImages,
  onAdd,
  onRemove,
}) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(productQuantity);
  }, [productQuantity]);

  return (
    <div className="cart-item-list-col">
      <figure>
        <div className="image-container">
          <Image
            src={productImages?.[0]?.image}
            alt=""
            height={108}
            width={108}
          />
        </div>
        <figcaption>
          <h4 className="!text-lg !font-bold">{productName}</h4>
          <div className="custom-form-group">
            <label>Quantity</label>
            <div className="qty-up-down-s1-with-rgMenuAction">
              <div className="flex items-center gap-x-5">
                <button
                  type="button"
                  className="upDownBtn minus"
                  onClick={() => {
                    setQuantity(quantity - 1);
                    onAdd(quantity - 1, productId, "remove");
                  }}
                >
                  <img src="images/upDownBtn-minus.svg" alt="" />
                </button>
                <p>{quantity}</p>
                <button
                  type="button"
                  className="upDownBtn plus"
                  onClick={() => {
                    setQuantity(quantity + 1);
                    onAdd(quantity + 1, productId, "add");
                  }}
                >
                  <img src="images/upDownBtn-plus.svg" alt="" />
                </button>
              </div>
              <ul className="rgMenuAction-lists">
                <li>
                  <Button
                    variant="ghost"
                    className="px-2 underline"
                    onClick={() => onRemove(cartId)}
                  >
                    Remove
                  </Button>
                </li>
                <li>
                  <Button disabled variant="ghost" className="px-2 underline">
                    Move to wishlist
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </figcaption>
      </figure>
      <div className="right-info">
        <h6>Price</h6>
        <h5>${quantity * Number(offerPrice)}</h5>
      </div>
    </div>
  );
};

export default ProductCard;
