import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import validator from "validator";
import PlaceholderImage from "@/public/images/product-placeholder.png";
import { useTranslations } from "next-intl";
// import { useCartStore } from "@/lib/rfqStore";

type RfqProductCardProps = {
  id: number;
  rfqProductId: number;
  productName: string;
  productQuantity: number;
  productImages: {
    image: string;
  }[];
  offerPrice: string;
  onAdd: (
    args0: number,
    args1: number,
    args2: "add" | "remove",
    args3: number,
    args4: string,
  ) => void;
  onRemove: (args0: number) => void;
  note: string;
};

const RfqProductCard: React.FC<RfqProductCardProps> = ({
  id,
  rfqProductId,
  productName,
  productQuantity,
  productImages,
  offerPrice,
  onAdd,
  onRemove,
  note,
}) => {
  const t = useTranslations();
  const [quantity, setQuantity] = useState(1);
  // const cart = useCartStore();

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
                : PlaceholderImage
            }
            alt="pro-6"
            fill
          />
        </div>
        <figcaption>
          <h5>{productName}</h5>
          <label>{t("quantity")}</label>
          <div className="qty-with-remove">
            <div className="qty-up-down-s1-with-rgMenuAction">
              <div className="flex items-center gap-x-4">
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
              {t("remove")}
            </Button>
          </div>
        </figcaption>
      </figure>
      <p>
        <span>{t("note")}:</span> {note}
      </p>
      <div className="price-info">
        <h5>{t("price")}</h5>
        <p>${offerPrice ? Number(offerPrice) * quantity : 0}</p>
      </div>
    </div>
  );
};

export default RfqProductCard;
