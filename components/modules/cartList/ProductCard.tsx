import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import MinusIcon from "@/public/images/upDownBtn-minus.svg";
import PlusIcon from "@/public/images/upDownBtn-plus.svg";

type ProductCardProps = {
  cartId: number;
  productId: number;
  productName: string;
  offerPrice: string;
  productQuantity: number;
  productImages: { id: number; image: string }[];
  onAdd: (args0: number, args1: number, args2: "add" | "remove") => void;
  onRemove: (args0: number) => void;
  onWishlist: (args0: number) => void;
  haveAccessToken: boolean;
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
  onWishlist,
  haveAccessToken,
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
              <div className="flex items-center gap-x-4">
                <Button
                  variant="outline"
                  className="relative hover:shadow-sm"
                  onClick={() => {
                    setQuantity(quantity - 1);
                    onAdd(quantity - 1, productId, "remove");
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
                    onAdd(quantity + 1, productId, "add");
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
                  >
                    Remove
                  </Button>
                </li>
                {haveAccessToken ? (
                  <li>
                    <Button
                      variant="ghost"
                      className="px-2 underline"
                      onClick={() => onWishlist(productId)}
                    >
                      Move to wishlist
                    </Button>
                  </li>
                ) : null}
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
