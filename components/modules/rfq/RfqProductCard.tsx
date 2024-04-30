import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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
  productQuantity: number;
  onAdd: (args0: number, args1: number, args2: "add" | "remove") => void;
  onToCart: () => void;
  onEdit: (args0: number) => void;
  isCreatedByMe: boolean;
};

const RfqProductCard: React.FC<RfqProductCardProps> = ({
  id,
  productType,
  productName,
  productNote,
  productStatus,
  productImages,
  productQuantity,
  onAdd,
  onToCart,
  onEdit,
  isCreatedByMe,
}) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(productQuantity || 1);
  }, [productQuantity]);

  return (
    <div className="product_list_part">
      <div className="product_list_image relative">
        <Image
          alt="pro-5"
          src={
            productImages && validator.isURL(productImages?.[0].imageName)
              ? productImages[0].imageName
              : "/images/product-placeholder.png"
          }
          fill
        />
      </div>
      <div className="product_list_content">
        <p>{productName}</p>
        <div className="quantity_wrap mb-2">
          <label>Quantity</label>
          <div className="qty-up-down-s1-with-rgMenuAction">
            <div className="flex items-center gap-x-4">
              <Button
                variant="outline"
                className="relative hover:shadow-sm"
                onClick={() => {
                  setQuantity(quantity - 1);
                  onAdd(quantity - 1, id, "remove");
                }}
                disabled={quantity === 0}
              >
                <Image
                  src="/images/upDownBtn-minus.svg"
                  alt="minus-icon"
                  fill
                  className="p-3"
                />
              </Button>
              <p className="!text-black">{quantity}</p>
              <Button
                variant="outline"
                className="relative hover:shadow-sm"
                onClick={() => {
                  setQuantity(quantity + 1);
                  onAdd(quantity + 1, id, "add");
                }}
              >
                <Image
                  src="/images/upDownBtn-plus.svg"
                  alt="plus-icon"
                  fill
                  className="p-3"
                />
              </Button>
              {productType === "R" && isCreatedByMe ? (
                <Button variant="ghost" onClick={() => onEdit(id)}>
                  <div className="relative h-6 w-6">
                    <Image
                      src="/images/edit-rfq.png"
                      alt="edit-rfq-icon"
                      fill
                    />
                  </div>
                </Button>
              ) : null}
            </div>
          </div>
        </div>
        <div className="cart_button">
          {false ? (
            <button
              type="button"
              className="add_to_cart_button"
              onClick={onToCart}
            >
              Go To RFQ Cart
            </button>
          ) : (
            <button
              type="button"
              className="add_to_cart_button"
              onClick={() => onAdd(1, id, "add")}
            >
              Add To RFQ Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RfqProductCard;
