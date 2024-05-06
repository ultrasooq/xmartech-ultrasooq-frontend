import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import validator from "validator";

type RfqProductCardProps = {
  id: number;
  rfqProductId: number;
  productName: string;
  productQuantity: number;
  productImages: {
    image: string;
  }[];
  onAdd: (args0: number, args1: number, args2: "add" | "remove") => void;
  onRemove: (args0: number) => void;
};

const RfqProductCard: React.FC<RfqProductCardProps> = ({
  id,
  rfqProductId,
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
    <div className="rfq-cart-item-li">
      <figure>
        <div className="image-container relative">
          <Image
            src={
              productImages?.[0]?.image &&
              validator.isURL(productImages?.[0]?.image)
                ? productImages[0].image
                : "/images/product-placeholder.png"
            }
            alt="pro-6"
            fill
          />
        </div>
        <figcaption>
          <h5>{productName}</h5>
          <label>Quantity</label>
          <div className="qty-with-remove">
            <div className="qty-up-down-s1-with-rgMenuAction">
              <div className="flex items-center gap-x-4">
                <Button
                  variant="outline"
                  className="relative hover:shadow-sm"
                  onClick={() => {
                    setQuantity(quantity - 1);
                    onAdd(quantity - 1, rfqProductId, "remove");
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
                    onAdd(quantity + 1, rfqProductId, "add");
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
        </figcaption>
      </figure>
      <div className="price-info">
        <h5>Price</h5>
        <p>$332.38</p>
      </div>
    </div>
  );
};

export default RfqProductCard;
