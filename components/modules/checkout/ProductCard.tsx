import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import MinusIcon from "@/public/images/upDownBtn-minus.svg";
import PlusIcon from "@/public/images/upDownBtn-plus.svg";
import PlaceholderImage from "@/public/images/product-placeholder.png";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";

type ProductCardProps = {
  cartId: number;
  productId: number;
  productPriceId: number;
  productName: string;
  offerPrice: string;
  productQuantity: number;
  productImages: { id: number; image: string }[];
  onAdd: (args0: number, args1: "add" | "remove", args2: number) => void;
  onRemove: (args0: number) => void;
  onWishlist: (args0: number) => void;
  haveAccessToken: boolean;
  consumerDiscount: number;
};

const ProductCard: React.FC<ProductCardProps> = ({
  cartId,
  productId,
  productPriceId,
  productName,
  offerPrice,
  productQuantity,
  productImages,
  onAdd,
  onRemove,
  onWishlist,
  haveAccessToken,
  consumerDiscount,
}) => {
  const t = useTranslations();
  const { langDir } = useAuth();
  const [quantity, setQuantity] = useState(1);

  const calculateDiscountedPrice = () => {
    const price = offerPrice ? Number(offerPrice) : 0;
    const discount = consumerDiscount || 0;
    return price - (price * discount) / 100;
  };

  useEffect(() => {
    setQuantity(productQuantity);
  }, [productQuantity]);

  return (
    <div className="cart-item-list-col">
      <figure>
        <div className="image-container">
          <Image
            src={productImages?.[0]?.image || PlaceholderImage}
            alt="product-image"
            height={108}
            width={108}
          />
        </div>
        <figcaption>
          <h4 className="!text-lg !font-bold">{productName}</h4>
          <div className="custom-form-group">
            <label dir={langDir}>{t("quantity")}</label>
            <div className="qty-up-down-s1-with-rgMenuAction">
              <div className="flex items-center gap-x-4">
                <Button
                  variant="outline"
                  className="relative hover:shadow-sm"
                  onClick={() => {
                    setQuantity(quantity - 1);
                    onAdd(quantity - 1, "remove", productPriceId);
                  }}
                  disabled={quantity === 0}
                >
                  <Image
                    src={MinusIcon}
                    alt="minus-icon"
                    fill
                    className="p-3"
                  />
                </Button>
                <p>{quantity}</p>
                <Button
                  variant="outline"
                  className="relative hover:shadow-sm"
                  onClick={() => {
                    setQuantity(quantity + 1);
                    onAdd(quantity + 1, "add", productPriceId);
                  }}
                >
                  <Image src={PlusIcon} alt="plus-icon" fill className="p-3" />
                </Button>
              </div>
              <ul className="rgMenuAction-lists">
                <li>
                  <Button
                    variant="ghost"
                    className="px-2 underline"
                    onClick={() => onRemove(cartId)}
                    dir={langDir}
                  >
                    {t("remove")}
                  </Button>
                </li>
                {haveAccessToken ? (
                  <li>
                    <Button
                      variant="ghost"
                      className="px-2 underline"
                      onClick={() => onWishlist(productId)}
                      dir={langDir}
                    >
                      {t("move_to_wishlist")}
                    </Button>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </figcaption>
      </figure>
      <div className="right-info">
        <h6 dir={langDir}>{t("price")}</h6>
        <h5 dir={langDir}>${quantity * calculateDiscountedPrice()}</h5>
      </div>
    </div>
  );
};

export default ProductCard;
