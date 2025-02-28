import { Button } from "@/components/ui/button";
// import { useCartStore } from "@/lib/rfqStore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import validator from "validator";
import PlaceholderImage from "@/public/images/product-placeholder.png";

type RfqCartMenuCardProps = {
  id: number;
  rfqProductId: number;
  productName: string;
  productQuantity: number;
  productImages: {
    image: string;
  }[];
  onAdd: (
    args0: number,
    args1: number,
    args2: "add" | "remove",
    args3: number,
    args4: string,
  ) => void;
  onRemove: (args0: number) => void;
  offerPrice: number;
  note: string;
};

const RfqCartMenuCard: React.FC<RfqCartMenuCardProps> = ({
  id,
  rfqProductId,
  productName,
  productQuantity,
  productImages,
  onAdd,
  onRemove,
  offerPrice,
  note,
}) => {
  // const cart = useCartStore();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(productQuantity);
  }, [productQuantity]);

  return (
    <div className="rfq_cart_wrap !pb-0">
      <div className="rfq_cart_wrap_image relative">
        <Image
          src={
            productImages?.[0]?.image &&
            validator.isURL(productImages?.[0]?.image)
              ? productImages[0].image
              : PlaceholderImage
          }
          alt="pro-6"
          fill
        />
      </div>
      <div className="rfq_cart_wrap_content">
        <div className="rfq_cart_wrap_content_top">
          <p>{productName}</p>
          {/* <div className="pen_gray_icon">
            <img src="images/pen-gray-icon.png" alt="pen-gray-icon" />
          </div> */}
        </div>
        <div className="rfq_cart_wrap_content_top_bottom flex-wrap gap-3">
          <div className="qty-up-down-s1-with-rgMenuAction">
            <div className="flex items-center gap-x-3 md:gap-x-4">
              <Button
                variant="outline"
                className="relative hover:shadow-sm"
                onClick={() => {
                  setQuantity(quantity - 1);
                  onAdd(
                    quantity - 1,
                    rfqProductId,
                    "remove",
                    offerPrice ? Number(offerPrice) : 0,
                    note,
                  );
                  // cart.updateCart({ quantity: quantity - 1, rfqProductId });
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
                  onAdd(
                    quantity + 1,
                    rfqProductId,
                    "add",
                    offerPrice ? Number(offerPrice) : 0,
                    note,
                  );
                  // cart.updateCart({ quantity: quantity + 1, rfqProductId });
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
            onClick={() => {
              onRemove(id);
              // cart.deleteCartItem(rfqProductId);
            }}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RfqCartMenuCard;
