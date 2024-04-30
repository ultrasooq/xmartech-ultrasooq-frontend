import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import validator from "validator";

type RfqCartMenuCardProps = {
  id: number;
  productName: string;
  productQuantity: number;
  productImages: {
    imageName: string;
  }[];
  onAdd: (args0: number, args1: number, args2: "add" | "remove") => void;
  onRemove: (args0: number) => void;
};

const RfqCartMenuCard: React.FC<RfqCartMenuCardProps> = ({
  id,
  productName,
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
    <div className="rfq_cart_wrap">
      <div className="rfq_cart_wrap_image relative">
        <Image
          src={
            productImages && validator.isURL(productImages?.[0].imageName)
              ? productImages[0].imageName
              : "/images/product-placeholder.png"
          }
          alt="pro-6"
          fill
        />
      </div>
      <div className="rfq_cart_wrap_content">
        <div className="rfq_cart_wrap_content_top">
          <p>{productName}</p>
          <div className="pen_gray_icon">
            <img src="images/pen-gray-icon.png" alt="pen-gray-icon" />
          </div>
        </div>
        <div className="rfq_cart_wrap_content_top_bottom flex-wrap gap-3">
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
            </div>
          </div>
          <Button
            variant="link"
            className="relative hover:shadow-sm"
            onClick={() => onRemove(id)}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RfqCartMenuCard;
